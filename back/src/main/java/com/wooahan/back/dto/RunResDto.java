package com.wooahan.back.dto;

import com.wooahan.back.service.RunService;
import lombok.AllArgsConstructor;

import java.util.List;

@AllArgsConstructor
public class RunResDto {

    private String quiz;
    private List<RunService.RunWord>words;
}
