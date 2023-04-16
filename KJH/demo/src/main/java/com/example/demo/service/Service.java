package com.example.demo.service;

import com.example.demo.db.BlogEntity;

import java.util.List;

public interface Service {
    BlogEntity createBlog();
    BlogEntity updateBlog();
    void deleteBlog();
    List<BlogEntity> readList();
    BlogEntity readOne();
}
