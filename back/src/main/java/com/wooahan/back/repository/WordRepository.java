package com.wooahan.back.repository;

import com.wooahan.back.dto.SimpleWordInfo;
import com.wooahan.back.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface WordRepository extends JpaRepository<Word, String> {
    //Bubble,train
    @Query(value="SELECT word_name as name, img_url as imgUrl FROM word WHERE difficulty= :difficulty ORDER BY RAND() LIMIT :cnt",nativeQuery = true)
    Optional<List<SimpleWordInfo>> findByRandom(@Param("difficulty") String difficulty, @Param("cnt")int cnt);


}
