package com.wooahan.back.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="member_id")
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String provider;

    @Column(nullable = false)
    private boolean isGuest;

    @ColumnDefault("0")
    private int starCount;

    @OneToMany(mappedBy = "member")
    private List<Reward> rewards;

    public Member update(String name, boolean isGuest) {
        this.name = name;
        this.isGuest = isGuest;
        return this;
    }

    public int starUp(int starCount) {
        this.starCount=starCount;
        return this.starCount;
    }
}
