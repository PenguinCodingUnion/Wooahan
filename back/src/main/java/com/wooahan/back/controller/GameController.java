package com.wooahan.back.controller;

import com.wooahan.back.dto.*;
import com.wooahan.back.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/game")
public class GameController {
    private final BubbleService bubbleService;
    private final TrainService trainService;
    private final RewardService rewardService;
    private final JumpService jumpService;
    private final RunService runService;

    @GetMapping("/bubble/{difficulty}")
    public ResponseEntity<List<BubbleResDto>>bubbleGaming(@PathVariable int difficulty){
        return new ResponseEntity<>(bubbleService.bubbleStart(difficulty), HttpStatus.OK);
    }

    @GetMapping("/train/{difficulty}")
    public ResponseEntity<List<TrainResDto>>trainGaming(@PathVariable int difficulty){
        return new ResponseEntity<>(trainService.trainStart(difficulty), HttpStatus.OK);
    }

    @GetMapping("/run/{difficulty}")
    public ResponseEntity<List<RunResDto>>runGaming(@PathVariable int difficulty){
        return new ResponseEntity<>(runService.runStart(difficulty), HttpStatus.OK);
    }

    @GetMapping("/jump/{difficulty}")
    public ResponseEntity<List<JumpResDto>>jumpGaming(@PathVariable int difficulty){
        return new ResponseEntity<>(jumpService.jumpStart(difficulty), HttpStatus.OK);
    }

    @GetMapping("/over/{email:.+}")
    public ResponseEntity<OverResDto>overSign(@PathVariable String email){
        return new ResponseEntity<>(rewardService.giveMeReward(email), HttpStatus.OK);
    }

    @PostMapping("/reward")
    public ResponseEntity<CardResDto>myRewards(@RequestBody CardReqDto cardReqDto){
        return new ResponseEntity<>(rewardService.getMyRewards(cardReqDto),HttpStatus.OK);
    }



}
