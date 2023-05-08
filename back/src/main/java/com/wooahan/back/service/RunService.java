package com.wooahan.back.service;

import com.wooahan.back.dto.RunResDto;
import com.wooahan.back.dto.SimpleWordInfo;
import com.wooahan.back.repository.WordRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RunService {
    private final WordRepository wordRepository;

    @AllArgsConstructor
    @Setter
    @Getter
    public static class RunWord{
        public SimpleWordInfo word;
        private boolean answer;

        public RunWord(SimpleWordInfo simpleWordInfo){
            this.word=simpleWordInfo;
        }
    }
    public List<RunResDto> runStart(int difficulty){
        //TODO difficulty에 따라서 cnt도 달라져볼까?
        List<RunWord> runWords = wordRepository.findByRandom(difficulty,10)
                .orElseThrow(()->new NoSuchElementException("jumpStart에서 일어난 일"))
                .stream()
                .map(word -> new SimpleWordInfo(word.getName(),word.getImgUrl()))
                .map(RunWord::new)
                .collect(Collectors.toList());
        List<RunResDto>runResDtoList = new ArrayList<>();
        for(int i=0;i<runWords.size();i+=2){
            RunWord word1 = runWords.get(i);
            RunWord word2 = runWords.get(i+1);
            word1.setAnswer(true);
            word2.setAnswer(false);
            word2.setAnswer(false);

            List<RunWord>words = new ArrayList<>();

            words.add(word1);
            words.add(word2);
            Collections.shuffle(words);

            runResDtoList.add(new RunResDto(word1.word.getName(),words));
        }
        return runResDtoList;
    }
}
