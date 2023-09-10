package com.jknows_backend.repository;

import com.jknows_backend.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Integer> {

    List<Tag> findAll();

    List<Tag> findTagsByContentContaining(String x);

    @Transactional
    void deleteTagByContent(String x);

    Tag findTagByContent(String content);

}