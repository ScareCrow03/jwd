package com.jknows_backend.daoimpl;

import com.jknows_backend.dao.LikeQuestionDao;
import com.jknows_backend.entity.LikeQuestion;
import com.jknows_backend.entity.Question;
import com.jknows_backend.repository.LikeQuestionRepository;
import com.jknows_backend.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LikeQuestionDaoImpl implements LikeQuestionDao {

    @Autowired
    LikeQuestionRepository likeQuestionRepository;

    @Autowired
    QuestionRepository questionRepository;

    @Override
    public List<LikeQuestion> getLikeQuestion(int userId) {
        return likeQuestionRepository.findLikeQuestionsByUserId(userId);
    }

    @Override
    public void saveLikeQuestion(int userId, int questionId, int liked) {
        LikeQuestion l = likeQuestionRepository.findLikeQuestionByUserIdAndQuestionId(userId, questionId);
        if (l == null) {
            l = new LikeQuestion();
            l.setLiked(0);
            l.setLikeQuestionId(0);
        }
        if (l.getLiked() == liked) return;
        Question q = questionRepository.findQuestionByQuestionId(questionId);
        q.setLiked(q.getLiked() - l.getLiked());
        if (liked == 0) {
            likeQuestionRepository.deleteLikeQuestionByUserIdAndQuestionId(userId, questionId);
        }
        else {
            LikeQuestion f = new LikeQuestion();
            if (l.getLikeQuestionId() > 0) f.setLikeQuestionId(l.getLikeQuestionId());
            f.setUserId(userId);
            f.setQuestionId(questionId);
            f.setLiked(liked);
            likeQuestionRepository.save(f);
            q.setLiked(q.getLiked() + liked);
        }
        questionRepository.save(q);
    }

    @Override
    public int isLikeQuestion(int userId, int questionId) {
        LikeQuestion f = likeQuestionRepository.findLikeQuestionByUserIdAndQuestionId(userId, questionId);
        return f == null ? 0 : f.getLiked();
    }
}

