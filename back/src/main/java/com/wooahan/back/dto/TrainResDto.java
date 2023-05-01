package com.wooahan.back.dto;

import lombok.Builder;

@Builder
public class TrainResDto {
    private String last;
    private SimpleWordInfo word1;
    private SimpleWordInfo word2;
    private String ans;

}
