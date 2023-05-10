package com.wooahan.back.repository;

import com.wooahan.back.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByProviderOrEmail(String provider,String email);

    Optional<Member> findByEmail(String email);
}
