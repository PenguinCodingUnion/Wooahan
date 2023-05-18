package com.wooahan.back.repository;

import com.wooahan.back.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmailOrProvider(String email,String provider);
    Optional<Member> findByProvider(String provider);
    Optional<Member> findByEmail(String email);
}
