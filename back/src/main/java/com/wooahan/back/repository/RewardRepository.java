package com.wooahan.back.repository;

import com.wooahan.back.dto.OverResDto;
import com.wooahan.back.dto.SimpleWordInfo;
import com.wooahan.back.entity.Reward;
import com.wooahan.back.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RewardRepository extends JpaRepository<Reward,Long> {

    //TODO dto 처리
    @Query(value = "SELECT word_name, difficulty, img_url, initial, member_id FROM word left outer join reward on word.word_name = reward.word_id where reward.word_id is null order by RAND() limit 1",nativeQuery = true)
    Optional<Word> findReward();
}
