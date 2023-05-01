package com.wooahan.back.service;

import com.wooahan.back.dto.OverResDto;
import com.wooahan.back.dto.SimpleWordInfo;
import com.wooahan.back.entity.Member;
import com.wooahan.back.entity.Reward;
import com.wooahan.back.entity.Word;
import com.wooahan.back.repository.MemberRepository;
import com.wooahan.back.repository.RewardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class RewardService {
    private final MemberRepository memberRepository;
    private final RewardRepository rewardRepository;

    //TODO 꼴보기싫음
    public OverResDto giveMeReward(String email) {
        Member member =memberRepository.findByEmail(email)
                .orElseThrow(()->new NoSuchElementException("RewardService에서 일어난 말도안되는 에러"));
        List<Reward> rewards= member.getRewards();
        int updatedStar= member.starUp(member.getStarCount()+1);
        SimpleWordInfo simpleWordInfo = null;
        if(updatedStar==5){
            updatedStar=0;
            member.starUp(0);
            Word word = rewardRepository.findReward()
                    .orElseThrow(()->new NoSuchElementException("만렙이 존재함"));
            rewardRepository.save(new Reward(member,word));
            simpleWordInfo = new SimpleWordInfo(word.getName(),word.getImgUrl());
        }
        return new OverResDto(updatedStar,simpleWordInfo);
        //가지고 있는 rewards 제외하고
    }
}
