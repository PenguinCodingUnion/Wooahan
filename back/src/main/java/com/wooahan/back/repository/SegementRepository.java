package com.wooahan.back.repository;

import com.wooahan.back.entity.Segment;
import com.wooahan.back.entity.Sentence;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SegementRepository extends JpaRepository<Segment, Long> {
    List<Segment> findAllBySentence(Sentence sentence);
}

