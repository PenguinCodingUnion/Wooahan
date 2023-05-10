package com.wooahan.back.dto;

import com.wooahan.back.entity.Reward;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@Builder
public class LoginResDto {
    private String email;
    private int starCount;
    private List<SimpleWordInfo> rewards;
}
