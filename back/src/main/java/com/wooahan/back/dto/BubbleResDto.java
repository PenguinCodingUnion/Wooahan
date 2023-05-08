package com.wooahan.back.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class BubbleResDto {
    private String answer;
    private String answerImg;
    private List<SimpleWordInfo> cards;
}
