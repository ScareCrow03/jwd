package com.jknows_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "like_comment", schema = "jknows", catalog = "")
public class LikeComment {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "like_comment_id")
    private int likeCommentId;
    @Basic
    @Column(name = "user_id")
    private int userId;
    @Basic
    @Column(name = "comment_id")
    private int commentId;
    @Basic
    @Column(name = "liked")
    private int liked;

    @ManyToOne
    @JoinColumn(name = "comment_id", insertable=false, updatable=false)
    private Comment commentInfo;

    public Comment getCommentInfo() {
        return commentInfo;
    }

    public void setCommentInfo(Comment commentInfo) {
        this.commentInfo = commentInfo;
    }

    public int getLikeCommentId() {
        return likeCommentId;
    }

    public void setLikeCommentId(int likeCommentId) {
        this.likeCommentId = likeCommentId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getCommentId() {
        return commentId;
    }

    public void setCommentId(int commentId) {
        this.commentId = commentId;
    }

    public int getLiked() {
        return liked;
    }

    public void setLiked(int liked) {
        this.liked = liked;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        LikeComment that = (LikeComment) o;

        if (likeCommentId != that.likeCommentId) return false;
        if (userId != that.userId) return false;
        if (commentId != that.commentId) return false;
        if (liked != that.liked) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = likeCommentId;
        result = 31 * result + userId;
        result = 31 * result + commentId;
        result = 31 * result + liked;
        return result;
    }
}
