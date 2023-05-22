package com.wooahan.back.repository;

import com.wooahan.back.entity.Sentence;
import com.wooahan.back.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SentenceRepository extends JpaRepository<Sentence, Long> {
    @Query(value="SELECT * FROM sentence WHERE difficulty= :difficulty ORDER BY RAND() LIMIT :cnt",nativeQuery = true)
    Optional<List<Sentence>> findByRandom(@Param("difficulty") int difficulty, @Param("cnt")int cnt);
}

