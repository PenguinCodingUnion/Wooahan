package com.wooahan.back.service;

import com.wooahan.back.dto.game.SimpleWordInfo;
import com.wooahan.back.dto.game.BubbleResDto;
import com.wooahan.back.repository.WordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BubbleService {
    private final WordRepository wordRepository;

    //TODO 살찐 코드
    public List<BubbleResDto> bubbleStart(int difficulty){
        List<SimpleWordInfo> simpleWordInfoList = wordRepository.findRandomByDifficulty(difficulty,20)
                .orElseThrow(()->new NoSuchElementException("bubbleStart에서 일어난 일"))
                .stream()
                .map(word -> new SimpleWordInfo(word.getName(),word.getImgUrl()))
                .collect(Collectors.toList());
        List<BubbleResDto>bubbleResDtoList = new ArrayList<>();
        Random randomizer = new Random();
        int i=0;
        while(i<20) {
            List<SimpleWordInfo>tmp = simpleWordInfoList.subList(i,i+4);
            SimpleWordInfo randomWord = tmp.get(randomizer.nextInt(tmp.size()));

            BubbleResDto bubbleResDto = BubbleResDto.builder()
                    .answer(randomWord.getName())
                    .answerImg(randomWord.getImgUrl())
                    .cards(tmp)
                    .build();
            bubbleResDtoList.add(bubbleResDto);
            i+=4;
        }
        return bubbleResDtoList;
    }

}
