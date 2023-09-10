package com.jknows_backend.daoimpl;

import com.jknows_backend.dao.TagDao;
import com.jknows_backend.entity.Tag;
import com.jknows_backend.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TagDaoImpl implements TagDao {

    @Autowired
    TagRepository tagRepository;

    @Override
    public List<Tag> getTag() {
        return tagRepository.findAll();
    }

    @Override
    public void addTag(String tag) {
        if (tagRepository.findTagByContent(tag) != null) return;
        Tag t = new Tag();
        t.setContent(tag);
        tagRepository.save(t);
    }

    @Override
    public void deleteTag(String tag) {
        tagRepository.deleteTagByContent(tag);
    }

    @Override
    public List<Tag> findTag(String x) {
        return null;
    }
}

