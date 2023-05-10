package com.wooahan.back.controller;

import com.wooahan.back.dto.CardReqDto;
import com.wooahan.back.dto.CardResDto;
import com.wooahan.back.dto.OverResDto;
import com.wooahan.back.service.RewardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping(value = "/api/reward")
public class RewardController {
    private final RewardService rewardService;

    @Operation(summary = "게임 끝나고 별 올라가는거", description = "email을 request로 받음")
    @GetMapping("/over/{email:.+}")
    public ResponseEntity<OverResDto> overSign(@Parameter(name="email",description ="email")@PathVariable String email){
        return new ResponseEntity<>(rewardService.giveMeReward(email), HttpStatus.OK);
    }

    @Operation(summary = "member의 reward 보는거 ", description = "email하고 초성을 request로 받음")
    @PostMapping
    public ResponseEntity<CardResDto>myRewards(@Parameter(name="cardReqDto",description ="text(초성),email")@RequestBody CardReqDto cardReqDto){
        return new ResponseEntity<>(rewardService.getMyRewards(cardReqDto),HttpStatus.OK);
    }

}
