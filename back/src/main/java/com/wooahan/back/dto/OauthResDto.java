package com.wooahan.back.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class OauthResDto {
    private String email;
    private String provider;
    private String name;
}
