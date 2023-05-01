package com.wooahan.back.dto;

import lombok.Builder;

import java.util.List;

@Builder
public class BubbleResDto {
    private String answer;
    private String answerImg;
    private List<SimpleWordInfo> cards;
}
