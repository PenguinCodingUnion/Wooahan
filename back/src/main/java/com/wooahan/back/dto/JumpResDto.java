package com.wooahan.back.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.wooahan.back.service.JumpService;
import lombok.*;

import java.util.List;



@Builder
@Getter
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class JumpResDto {

    //전체 문장, 어절들, 어절 순서, 파일명
    private String wholeSentence;
    private List<String> fileNameList;
    private List<JumpService.JumpWord>jumpWordList;
}
