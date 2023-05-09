package com.wooahan.back.dto;

import lombok.Getter;

@Getter
public class UpdateReqDto {
    private String email;
    private String provider;
    private String name;
    private String androidId;
}
