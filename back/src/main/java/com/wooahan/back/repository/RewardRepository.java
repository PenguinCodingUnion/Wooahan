package com.wooahan.back.repository;

import com.wooahan.back.entity.Member;
import com.wooahan.back.entity.Reward;
import com.wooahan.back.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RewardRepository extends JpaRepository<Reward,Long> {

    //내가 reward로 가지고 있지 않은 word내놔
    @Query(value = "SELECT * FROM word left outer join reward on word.word_name = reward.word_id where :memberId = reward.member_id and reward.word_id is null order by RAND() limit 1",nativeQuery = true)
    Optional<Word> findWordNotMine(@Param("memberId") Long memberId);

    int countByMember(Member member);

    Optional<List<Reward>> findAllByMember(Member member);
}
