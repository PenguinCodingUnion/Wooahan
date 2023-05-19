package com.wooahan.back.dto;

import com.wooahan.back.dto.game.SimpleWordInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class OverResDto {
    private int starCount;
    private SimpleWordInfo card;
}
