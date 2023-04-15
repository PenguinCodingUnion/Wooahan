package com.example.demo.db;

import javax.persistence.Column;
import javax.persistence.Id;

public class BlogEntity {
    @Id
    @Column(name = "blogId")
    private int blogId;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;
}
