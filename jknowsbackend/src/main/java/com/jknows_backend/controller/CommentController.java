package com.jknows_backend.controller;

import com.jknows_backend.entity.Comment;
import com.jknows_backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class CommentController {

    @Autowired
    private CommentService commentService;

    @RequestMapping(value = "/getComment",method = {RequestMethod.GET,RequestMethod.POST})
    public List<Comment> getComment(@RequestParam("answerId") int answerId) {
        System.out.println("getComment");
        return commentService.getComment(answerId);
    }

    @RequestMapping(value = "/saveComment",method = {RequestMethod.GET,RequestMethod.POST})
    public Comment saveComment(
            @RequestParam("commentId") int commentId, @RequestParam("userId") int userId,
            @RequestParam("answerId") int answerId, @RequestParam("responseId") int responseId,
            @RequestParam("content") String content) {
        System.out.println("saveComment");
        return commentService.saveComment(commentId, userId, answerId, responseId, content);
    }

    @RequestMapping(value = "/deleteComment",method = {RequestMethod.GET,RequestMethod.POST})
    public int deleteComment(@RequestParam("commentId") int commentId) {
        System.out.println("deleteComment");
        return commentService.deleteComment(commentId);
    }

}
