package com.wooahan.back.service;

import com.wooahan.back.dto.SimpleWordInfo;
import com.wooahan.back.dto.TrainResDto;
import com.wooahan.back.repository.WordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class TrainService {
    private final WordRepository wordRepository;

    //TODO 너무 더러워서 보기싫음
    public List<TrainResDto> trainStart(String difficulty){
        List<SimpleWordInfo> simpleWordInfoList= wordRepository.findByRandom(difficulty,6)
                .orElseThrow(()-> new NoSuchElementException("끝말기차여유~"));
        List<TrainResDto>trainResDtoList = new ArrayList<>();
        for(int i=0;i<6;i+=2) {
            String name = simpleWordInfoList.get(i).getName();
            SimpleWordInfo wordInfo = simpleWordInfoList.get(i+1);

            while(name.substring(name.length() - 1)
                    .equals(wordInfo.getName().substring(wordInfo.getName().length() - 1))){
                wordInfo = wordRepository.findByRandom(difficulty,1).get().get(0);
            }
            //위에서 해줬기 떄문에 안함

            TrainResDto trainResDto = TrainResDto.builder()
                    .last(name.substring(name.length()-1))
                    .word1(simpleWordInfoList.get(i))
                    .word2(wordInfo)
                    .ans(simpleWordInfoList.get(i).getName())
                    .build();
            trainResDtoList.add(trainResDto);
        }
        return trainResDtoList;
    }
}
