package com.wooahan.back.dto;

import com.wooahan.back.service.RunService;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class RunResDto {

    private String quiz;
    private List<RunService.RunWord>words;
}
