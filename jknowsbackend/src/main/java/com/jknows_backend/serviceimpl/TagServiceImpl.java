package com.jknows_backend.serviceimpl;

import com.jknows_backend.dao.TagDao;
import com.jknows_backend.entity.Tag;
import com.jknows_backend.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagServiceImpl implements TagService {

    @Autowired
    TagDao tagDao;

    @Override
    public List<Tag> getTag() {
        return tagDao.getTag();
    }

    @Override
    public void addTag(String tag) {
        tagDao.addTag(tag);
    }

    @Override
    public List<Tag> findTag(String x) {
        return tagDao.findTag(x);
    }

    @Override
    public void deleteTag(String tag) {
        tagDao.deleteTag(tag);
    }
}
