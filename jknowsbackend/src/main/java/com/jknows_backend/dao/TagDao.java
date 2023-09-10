package com.jknows_backend.dao;

import com.jknows_backend.entity.Tag;

import java.util.List;

public interface TagDao {

    List<Tag> getTag();

    void addTag(String tag);

    void deleteTag(String tag);

    List<Tag> findTag(String x);
}
