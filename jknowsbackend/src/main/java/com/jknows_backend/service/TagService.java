package com.jknows_backend.service;

import com.jknows_backend.entity.Tag;

import java.util.List;


public interface TagService {


    List<Tag> getTag();

    void addTag(String tag);

    List<Tag> findTag(String x);

    void deleteTag(String tag);
}
