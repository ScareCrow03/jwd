package com.jknows_backend.daoimpl;

import com.jknows_backend.dao.LikeAnswerDao;
import com.jknows_backend.entity.Answer;
import com.jknows_backend.entity.LikeAnswer;
import com.jknows_backend.repository.AnswerRepository;
import com.jknows_backend.repository.LikeAnswerRepository;
import net.sf.json.JSONObject;
import net.sf.json.JSONString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LikeAnswerDaoImpl implements LikeAnswerDao {

    @Autowired
    LikeAnswerRepository likeAnswerRepository;
    @Autowired
    private AnswerRepository answerRepository;

    @Override
    public List<LikeAnswer> getLikeAnswer(int userId) {
        return likeAnswerRepository.findLikeAnswersByUserId(userId);
    }

    @Override
    public void saveLikeAnswer(int userId, int answerId, int liked) {
        LikeAnswer l = likeAnswerRepository.findLikeAnswerByUserIdAndAnswerId(userId, answerId);
        if (l == null) {
            l = new LikeAnswer();
            l.setLiked(0);
            l.setLikeAnswerId(0);
        }
        if (l.getLiked() == liked) return;
        Answer a = answerRepository.findAnswerByAnswerId(answerId);
        a.setLiked(a.getLiked() - l.getLiked());
        if (liked == 0) {
            likeAnswerRepository.deleteLikeAnswerByUserIdAndAnswerId(userId, answerId);
        }
        else {
            LikeAnswer f = new LikeAnswer();
            if (l.getLikeAnswerId() > 0) f.setLikeAnswerId(l.getLikeAnswerId());
            f.setUserId(userId);
            f.setAnswerId(answerId);
            f.setLiked(liked);
            likeAnswerRepository.save(f);
            a.setLiked(a.getLiked() + liked);
        }
        answerRepository.save(a);
    }

    @Override
    public String isLikeAnswer(int userId, int answerId) {
        LikeAnswer f = likeAnswerRepository.findLikeAnswerByUserIdAndAnswerId(userId, answerId);
        JSONObject ret = new JSONObject();
        ret.put("userId", userId);
        ret.put("answerId", answerId);
        ret.put("result", f == null ? 0 : f.getLiked());
        return ret.toString();
    }
}

