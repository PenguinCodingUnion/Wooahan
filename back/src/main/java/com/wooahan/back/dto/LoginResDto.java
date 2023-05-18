package com.wooahan.back.dto;

import com.wooahan.back.dto.game.SimpleWordInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
@Builder
public class LoginResDto {
    private String email;
    private int starCount;
}
