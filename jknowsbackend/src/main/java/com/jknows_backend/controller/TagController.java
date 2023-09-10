package com.jknows_backend.controller;

import com.jknows_backend.entity.Tag;
import com.jknows_backend.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class TagController {

    @Autowired
    private TagService tagService;

    @RequestMapping(value = "/getTag",method = {RequestMethod.GET,RequestMethod.POST})
    public List<Tag> getTag() {
        System.out.println("getTag");
        return tagService.getTag();
    }

    @RequestMapping(value = "/addTag",method = {RequestMethod.GET,RequestMethod.POST})
    public int addTag(@RequestParam("tag") String tag) {
        System.out.println("addTag");
        tagService.addTag(tag);
        return 1;
    }

    @RequestMapping(value = "/deleteTag",method = {RequestMethod.GET,RequestMethod.POST})
    public int deleteTag(@RequestParam("tag") String tag) {
        System.out.println("deleteTag");
        tagService.deleteTag(tag);
        return 1;
    }

    @RequestMapping(value = "/findTag",method = {RequestMethod.GET,RequestMethod.POST})
    public List<Tag> findTag(@RequestParam("x") String x) {
        System.out.println("findTag");
        return tagService.findTag(x);
    }
}
