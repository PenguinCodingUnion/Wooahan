package com.wooahan.back.service;

import com.wooahan.back.dto.JumpResDto;
import com.wooahan.back.entity.Segment;
import com.wooahan.back.entity.Sentence;
import com.wooahan.back.repository.SegementRepository;
import com.wooahan.back.repository.SentenceRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JumpService {
    @AllArgsConstructor
    @Setter
    public static class JumpWord {
        private String content;
        private int wordOrder;

    }

    private final SentenceRepository sentenceRepository;
    private final SegementRepository segementRepository;

    public List<JumpResDto> jumpStart(int difficulty) {
        List<Sentence> contents = sentenceRepository.findByRandom(difficulty, 5)
                .orElseThrow(() -> new NoSuchElementException("db 다 날라간거임 이 에러"));

        List<JumpResDto> jumpResDtoList = new ArrayList<>();

        for (Sentence sentence : contents) {
            List<Segment> segments = segementRepository.findAllBySentence(sentence);

            JumpResDto jumpResDto = JumpResDto.builder()
                    .wholeSentence(sentence.getContent())
                    .jumpWordList(
                            segments.stream()
                                    .map(seg -> new JumpWord(seg.getContent(), seg.getWordOrder()))
                                    .collect(Collectors.toList())
                    )
                    .fileNameList(
                            segments.stream()
                                    .map(seg -> sentence.getId().toString() + "_" + seg.getWordOrder().toString()
                                            + "_" + seg.getContent())
                                    .collect(Collectors.toList())
                    )
                    .build();
            jumpResDtoList.add(jumpResDto);
        }
        return jumpResDtoList;
    }
}
