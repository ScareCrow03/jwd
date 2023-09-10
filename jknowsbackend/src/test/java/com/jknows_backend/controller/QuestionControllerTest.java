package com.jknows_backend.controller;

import com.jknows_backend.entity.Answer;
import com.jknows_backend.entity.Question;
import com.jknows_backend.repository.*;
import com.jknows_backend.service.QuestionService;
import org.apache.commons.lang.RandomStringUtils;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.RepeatedTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
class QuestionControllerTest {
    @Autowired
    QuestionController questionController;

    @RepeatedTest(value = 30)
    void getQuestion() {
        for (int i = 1; i <= 50; i++)
            questionController.saveQuestion(i, 1, "", "", "", "", "", "", "");
        for (int i = 1; i <= 50; i++)
            questionController.getQuestion(i);
        for (int i = 1; i <= 50; i++)
            questionController.getQuestion(i);
        for (int i = 1; i <= 50; i++)
            questionController.getQuestion(i);
        for (int i = 1; i <= 50; i++)
            questionController.getQuestion(i);
        for (int i = 1; i <= 50; i++)
            questionController.getQuestion(i);
        for (int i = 1; i <= 50; i++)
            questionController.getQuestion(i);
        for (int i = 1; i <= 50; i++)
            questionController.getQuestion(i);
        for (int i = 1; i <= 50; i++)
            questionController.getQuestion(i);
        for (int i = 1; i <= 50; i++)
            questionController.getQuestion(i);
        for (int i = 1; i <= 50; i++)
            questionController.getQuestion(i);
//        for (int i = 1; i <= 50; i++)
//            questionController.saveQuestion(i, 1, "", "", "", "", "", "", "");
    }

    @RepeatedTest(value = 300)
    void getQuestions() {
        questionController.getQuestions(1, 5);
//        for (int i = 1, j = 50; i <= j; i++, j--)
//            questionController.getQuestions(i, j);
    }

    @Test
    void getUserQuestion() {
        questionController.getUserQuestion(1);
    }

    @Test
    void saveQuestion() {
        questionController.saveQuestion(5, 3, "上海交通大学软件学院的互联网应用开发技术到底应该怎么学？", "学破防了呜呜呜...", "上海交通大学", "软件学院", "互联网", "发发牢骚", "学习");
    }

    @Test
    void getUnansweredQuestion() {
        questionController.getUnansweredQuestion(14);
    }

    @Test
    void deleteQuestion() {
        Question q = questionController.saveQuestion(0, 3, "上海交通大学软件学院的互联网应用开发技术到底应该怎么学？", "学破防了呜呜呜...", "上海交通大学", "软件学院", "互联网", "发发牢骚", "学习");
        questionController.deleteQuestion(1);
        questionController.deleteQuestion(q.getQuestionId());
//        questionController.saveQuestion(5, 3, "上海交通大学软件学院的互联网应用开发技术到底应该怎么学？", "学破防了呜呜呜...", "上海交通大学", "软件学院", "互联网", "发发牢骚", "学习");
    }

    @Test
    void inviteUser() {
        questionController.inviteUser(1, 2, 5);
    }

    @RepeatedTest(value = 1000)
    void searchQuestions() {
        questionController.searchQuestions("是", 5, 50);
    }

    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    LikeQuestionRepository likeQuestionRepository;

    @Autowired
    FollowQuestionRepository followQuestionRepository;

    @Autowired
    AnswerRepository answerRepository;

    @Autowired
    CommentRepository commentRepository;

    @Test
    void checkQuestion() {
        for (int i = 9000; i <= 9055; i++) {
            Question q = questionRepository.findQuestionByQuestionId(i);
            q.setAnswer(answerRepository.countAnswersByQuestionId(i));
//            q.setFollow(followQuestionRepository.countFollowQuestionsByQuestionId(i));
//            q.setLiked(likeQuestionRepository.countLikeQuestionsByQuestionId(i));
            q.setFollow((int) (Math.random() * 32767));
            q.setLiked((int) (Math.random() * 32767));
            questionRepository.save(q);
        }
    }

    @Test
    void checkQuestion1() {
        List<String> s = new ArrayList<>();
        s.add("知乎");
        s.add("交我答");
        s.add("jknows");
        s.add("水");
        s.add("好问题");
        s.add("帮我个忙");
        s.add("深度讨论");
        s.add("热点新闻");
        s.add("谈笑风生");
        s.add("心情驿站");
        for (int i = 1001; i <= 9055; i++) {

            Question q = questionRepository.findQuestionByQuestionId(i);
            double x = Math.random();
            if (x > 0.5) {
                q.setTag3(s.get((int) (Math.random() * 10)));
                if (x > 0.75) {
                    q.setTag4(s.get((int) (Math.random() * 10)));
                    if (x > 0.875) q.setTag5(s.get((int) (Math.random() * 10)));
                    else q.setTag5("");
                } else {
                    q.setTag4("");
                    q.setTag5("");
                }

            } else {
                q.setTag3("");
                q.setTag4("");
                q.setTag5("");
            }
            questionRepository.save(q);
        }
    }
    @Test
    void test2() {
        for (int i = 1; i <= 5968; i++) {
            Answer a = answerRepository.findAnswerByAnswerId(i);
            a.setComment(commentRepository.countCommentsByAnswerId(i));
            answerRepository.save(a);
        }
    }
}