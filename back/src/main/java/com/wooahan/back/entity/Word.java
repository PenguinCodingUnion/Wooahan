package com.wooahan.back.entity;

import com.wooahan.back.dto.Difficulty;

import javax.persistence.*;

@Entity
public class Word {
    public enum Initial {
        ㄱ,ㄴ,ㄷ,ㄹ,ㅁ,ㅂ,ㅅ,ㅇ,ㅈ,ㅊ,ㅋ,ㅌ,ㅍ,ㅎ
    }
    @Id
    @Column(name ="word_name")
    private String name;

    @Enumerated(EnumType.ORDINAL)
    private Initial initial;

    @Column(nullable = false)
    private String imgUrl;

    @Enumerated(EnumType.ORDINAL)
    private Difficulty difficulty;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="member_id")
    private Member member;

}
