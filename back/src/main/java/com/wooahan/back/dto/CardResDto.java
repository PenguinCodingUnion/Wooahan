package com.wooahan.back.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class CardResDto {
    private int totalNum;
    private List<SimpleWordInfo> cards;
}
