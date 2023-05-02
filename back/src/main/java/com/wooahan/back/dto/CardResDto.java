package com.wooahan.back.dto;

import lombok.Builder;

import java.util.List;

@Builder
public class CardResDto {
    private int totalNum;
    private List<SimpleWordInfo> cards;
}
