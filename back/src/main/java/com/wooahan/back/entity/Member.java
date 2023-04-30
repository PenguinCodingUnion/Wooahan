//package com.wooahan.back.entity;
//
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.RequiredArgsConstructor;
//
//import javax.persistence.*;
//
//@Entity
//@Getter
//@AllArgsConstructor
//@NoArgsConstructor
//public class Member {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name ="member_id")
//    private Long id;
//
//    @Column(nullable = false)
//    private String name;
//
//    @Column(nullable = false)
//    private String email;
//
//    @Column(nullable = false)
//    private String provider;
//
//    @Column(nullable = false)
//    private boolean isGuest;
//
//    public Member update(String name, boolean isGuest) {
//        this.name = name;
//        this.isGuest = isGuest;
//        return this;
//    }
//}
