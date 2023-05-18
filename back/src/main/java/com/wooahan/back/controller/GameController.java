package com.wooahan.back.controller;

import com.wooahan.back.dto.*;
import com.wooahan.back.service.*;
import io.swagger.annotations.Tag;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@Slf4j
@RequestMapping(value = "/api/game")
public class GameController {
    private final BubbleService bubbleService;
    private final TrainService trainService;
    private final JumpService jumpService;
    private final RunService runService;



    @Operation(summary = "한글방울 게임", description = "난이도를 받아서 단어 가져옵니다.")
    @GetMapping("/bubble/{difficulty}")
    public ResponseEntity<List<BubbleResDto>>bubbleGaming(@Parameter(name="difficulty",description ="난이도") @PathVariable int difficulty){
        return new ResponseEntity<>(bubbleService.bubbleStart(difficulty), HttpStatus.OK);
    }

    @Operation(summary = "끝말기차 게임", description = "난이도를 받아서 단어 가져옵니다.")
    @GetMapping("/train/{difficulty}")
    public ResponseEntity<List<TrainResDto>>trainGaming(@Parameter(name="difficulty",description ="난이도")@PathVariable int difficulty){
        return new ResponseEntity<>(trainService.trainStart(difficulty), HttpStatus.OK);
    }

    @Operation(summary = "펭글썰매 게임", description = "난이도를 받아서 단어와 파일명을 가져옵니다.")
    @GetMapping("/run/{difficulty}")
    public ResponseEntity<List<RunResDto>>runGaming(@Parameter(name="difficulty",description ="난이도")@PathVariable int difficulty){
        return new ResponseEntity<>(runService.runStart(difficulty), HttpStatus.OK);
    }

    @Operation(summary = "뛰어쓰기 게임", description = "난이도를 받아서 단어와 파일명을 가져옵니다.")
    @GetMapping("/jump/{difficulty}")
    public ResponseEntity<List<JumpResDto>>jumpGaming(@Parameter(name="difficulty",description ="난이도")@PathVariable int difficulty){
        return new ResponseEntity<>(jumpService.jumpStart(difficulty), HttpStatus.OK);
    }



}
