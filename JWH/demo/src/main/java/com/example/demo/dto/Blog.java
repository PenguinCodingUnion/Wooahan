package com.example.demo.dto;

import lombok.Data;

@Data
public class Blog {
    private int blogId;
    private String title;
    private String content;
    private int userId;

    public Blog(int blogId, String title, String content, int userId) {
        this.blogId=blogId;
        this.title = title;
        this.content = content;
        this.userId = userId;
    }
}
