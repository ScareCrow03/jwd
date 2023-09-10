package com.jknows_backend.controller;

import com.jknows_backend.entity.Question;
import com.jknows_backend.entity.User;
import com.jknows_backend.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@CrossOrigin
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @RequestMapping(value = "/getQuestion",method = {RequestMethod.GET,RequestMethod.POST})
    public Question getQuestion(@RequestParam("questionId") int questionId) {
        System.out.println("getQuestion");
        return questionService.getQuestion(questionId);
    }

    @RequestMapping(value = "/getQuestions",method = {RequestMethod.GET,RequestMethod.POST})
    public List<Question> getQuestions(@RequestParam("start") int start, @RequestParam("end") int end) {
        System.out.println("getQuestions");
        return questionService.getQuestions(start, end);
    }

    @RequestMapping(value = "/getUserQuestion",method = {RequestMethod.GET,RequestMethod.POST})
    public List<Question> getUserQuestion(@RequestParam("userId") int userId) {
        System.out.println("getUserQuestion");
        return questionService.getUserQuestion(userId);
    }

    @RequestMapping(value = "/saveQuestion",method = {RequestMethod.GET,RequestMethod.POST})
    public Question saveQuestion(
            @RequestParam("questionId") int questionId, @RequestParam("userId") int userId,
            @RequestParam("title") String title, @RequestParam("content") String content,
            @RequestParam("tag1") String tag1, @RequestParam("tag2") String tag2,
            @RequestParam("tag3") String tag3, @RequestParam("tag4") String tag4,
            @RequestParam("tag5") String tag5) {
        System.out.println("saveQuestion");
        return questionService.saveQuestion(questionId, userId, title, content, tag1, tag2, tag3, tag4, tag5);
    }

    @RequestMapping(value = "/getUnansweredQuestion",method = {RequestMethod.GET,RequestMethod.POST})
    public List<Question> getUnansweredQuestion(@RequestParam("n") int n) {//距今一段时间内未回答的问题
        System.out.println("getUnansweredQuestion");
        return questionService.getUnansweredQuestion(n);
    }

    @RequestMapping(value = "/deleteQuestion",method = {RequestMethod.GET,RequestMethod.POST})
    public int deleteQuestion(@RequestParam("questionId") int questionId) {
        System.out.println("deleteQuestion");
        return questionService.deleteQuestion(questionId);
    }

    @RequestMapping(value = "/inviteUser",method = {RequestMethod.GET,RequestMethod.POST})
    public List<User> inviteUser(@RequestParam("questionId") int questionId, @RequestParam("start") int start, @RequestParam("end") int end) {
        System.out.println("inviteUser");
        return questionService.inviteUser(questionId, start, end);
    }

    @RequestMapping(value = "/searchQuestion",method = {RequestMethod.GET,RequestMethod.POST})
    public List<Question> searchQuestion(@RequestParam("x") String x) {
        System.out.println("searchQuestion");
        return questionService.searchQuestion(x);
    }

    @RequestMapping(value = "/searchQuestions",method = {RequestMethod.GET,RequestMethod.POST})
    public List<Question> searchQuestions(@RequestParam("x") String x, @RequestParam("start") int start, @RequestParam("end") int end) {
        System.out.println("searchQuestions");
        return questionService.searchQuestions(x, start, end);
    }

}
