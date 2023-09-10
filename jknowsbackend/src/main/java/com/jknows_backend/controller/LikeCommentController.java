package com.jknows_backend.controller;

import com.jknows_backend.entity.LikeComment;
import com.jknows_backend.service.LikeCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class LikeCommentController {

    @Autowired
    private LikeCommentService likeCommentService;

    @RequestMapping(value = "/getLikeComment",method = {RequestMethod.GET,RequestMethod.POST})
    public List<LikeComment> getLikeComment(@RequestParam("userId") int userId){
        System.out.println("getLikeComment");
        return likeCommentService.getLikeComment(userId);
    }

    @RequestMapping(value = "/saveLikeComment", method = {RequestMethod.GET,RequestMethod.POST})
    public int saveLikeComment(@RequestParam("userId") int userId, @RequestParam("commentId") int commentId, @RequestParam("liked") int liked) {
        System.out.println("saveLikeComment");
        likeCommentService.saveLikeComment(userId, commentId, liked);
        return 1;
    }

    @RequestMapping(value = "/isLikeComment", method = {RequestMethod.GET,RequestMethod.POST})
    public int isLikeComment(@RequestParam("userId") int userId, @RequestParam("commentId") int commentId) {
        System.out.println("isLikeComment");
        return likeCommentService.isLikeComment(userId, commentId);
    }


}
