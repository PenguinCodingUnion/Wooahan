package com.wooahan.back.service;

import com.wooahan.back.dto.*;
import com.wooahan.back.dto.game.SimpleWordInfo;
import com.wooahan.back.dto.reward.CardReqDto;
import com.wooahan.back.dto.reward.CardResDto;
import com.wooahan.back.entity.Member;
import com.wooahan.back.entity.Reward;
import com.wooahan.back.entity.Word;
import com.wooahan.back.repository.MemberRepository;
import com.wooahan.back.repository.RewardRepository;
import com.wooahan.back.repository.WordRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class RewardService {
    private final MemberRepository memberRepository;
    private final RewardRepository rewardRepository;
    private final WordRepository wordRepository;

    //TODO 꼴보기싫음
    public OverResDto giveMeReward(String email) {
        //이메일로 member가져와. 만약 없으면 문제 있다.
        Member member =memberRepository.findByEmail(email)
                .orElseThrow(()->new NoSuchElementException("RewardService에서 일어난 말도안되는 에러, 난다면 근본적으로 문제가 있음"));

        //그 멤버의 star갯수를 올린다.
        int updatedStar= member.starUp(member.getStarCount()+1);
        memberRepository.save(member);

        //텅 빈 녀석
        SimpleWordInfo simpleWordInfo = null;

        //근데 만약 star갯수가 5개다..? 그럼 갯수 0으로 만들고 reward지급해
        if(updatedStar==5){
            //그럼 0으로 만들어줘
            updatedStar=0;
            member.starUp(0);
            memberRepository.save(member);
//            List<Reward> rewards = rewardRepository.findAllByMember(member);
            //member가 가지고 있는
            Word word = rewardRepository.findWordNotMine(member.getId())
                    .orElseGet(()->wordRepository.findByRandom(1).get().get(0));
//                    .orElseThrow(()->new NoSuchElementException("만렙이 존재함"));
            rewardRepository.save(new Reward(member,word));
            simpleWordInfo = new SimpleWordInfo(word.getName(),word.getImgUrl());
        }
        return new OverResDto(updatedStar,simpleWordInfo);
        //가지고 있는 rewards 제외하고
    }

    public CardResDto getMyRewards(CardReqDto cardReqDto){
        //이메일로 멤버 가져와
        Member member = memberRepository.findByEmail(cardReqDto.getEmail()).get();

        //그 멤버의 reward들 가져와
        List<Reward>rewardList = rewardRepository.findAllByMember(member)
                .orElseThrow(()->new NoSuchElementException("넌 card가 없어ㅋㅋ"));

        List<SimpleWordInfo> simpleWordInfoList = rewardList.stream()
                //reward의 단어에 이니셜(숫자)==Initial에 매핑된 숫자인것만 가져
                .filter(reward -> reward.getWord().getInitial()==Initial.valueOf(cardReqDto.getText()).getValue())
                //그 reward의 word 정보로 simplewordinfo 만들어
                .map(reward -> new SimpleWordInfo(reward.getWord().getName(),reward.getWord().getImgUrl()))
                .collect(Collectors.toList());

        //dto로 묶어주고 뱉어
        return CardResDto.builder()
                .totalNum(rewardRepository.countByMember(member))
                .cards(simpleWordInfoList)
                .build();
    }
}
