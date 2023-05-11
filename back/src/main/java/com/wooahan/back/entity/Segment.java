package com.wooahan.back.entity;

import lombok.Getter;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;

@Entity
@Getter
public class Segment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="segment_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="sentence_id")
    private Sentence sentence;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false, name = "word_order")
    private Integer wordOrder;

    @Column(nullable = false,name = "file_length")
    private Integer fileLength;
}

