package com.wooahan.back.repository;

import com.wooahan.back.dto.OverResDto;
import com.wooahan.back.entity.Reward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RewardRepository extends JpaRepository<Reward,Long> {

    @Query(value = "SELECT word_name FROM word left outer join reward on word.word_name = reward.word_id where reward.word_id is null order by RAND() limit 1",nativeQuery = true)
    Optional<OverResDto> findReward();
}
