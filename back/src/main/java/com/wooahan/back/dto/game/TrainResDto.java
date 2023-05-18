package com.wooahan.back.dto.game;

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
