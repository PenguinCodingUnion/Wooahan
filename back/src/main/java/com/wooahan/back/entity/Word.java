package com.wooahan.back.entity;

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


    //TODO 대충만
    @Column(nullable = false)
    private Integer difficulty;

}
