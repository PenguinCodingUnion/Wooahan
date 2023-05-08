package com.wooahan.back.entity;

import com.wooahan.back.dto.Difficulty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Sentence {
    //TODO 추후 난이도 조절 필요
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="sentence_id")
    private Long id;

    @Column(nullable = false)
    private int difficulty;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false, name = "spacing_cnt")
    private int spaceCnt;
}
