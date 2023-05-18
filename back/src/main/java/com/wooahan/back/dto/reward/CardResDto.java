package com.wooahan.back.dto.reward;

import com.wooahan.back.dto.game.SimpleWordInfo;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class CardResDto {
    private int totalNum;
    private List<SimpleWordInfo> cards;
}
