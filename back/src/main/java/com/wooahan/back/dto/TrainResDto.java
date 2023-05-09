package com.wooahan.back.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class TrainResDto {
    private String last;
    private SimpleWordInfo word1;
    private SimpleWordInfo word2;
    private String ans;

}
