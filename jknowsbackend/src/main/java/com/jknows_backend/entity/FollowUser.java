package com.jknows_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "follow_user", schema = "jknows", catalog = "")
public class FollowUser {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "follow_user_id")
    private int followUserId;
    @Basic
    @Column(name = "user_id")
    private int userId;
    @Basic
    @Column(name = "followee")
    private int followee;

    @ManyToOne
    @JoinColumn(name = "user_id", insertable=false, updatable=false)
    private User userInfo;

    public User getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(User userInfo) {
        this.userInfo = userInfo;
    }

    @ManyToOne
    @JoinColumn(name = "followee", insertable=false, updatable=false)
    private User followeeInfo;

    public User getFolloweeInfo() {
        return followeeInfo;
    }

    public void setFolloweeInfo(User followeeInfo) {
        this.followeeInfo = followeeInfo;
    }

    public int getFollowUserId() {
        return followUserId;
    }

    public void setFollowUserId(int followUserId) {
        this.followUserId = followUserId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getFollowee() {
        return followee;
    }

    public void setFollowee(int followee) {
        this.followee = followee;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        FollowUser that = (FollowUser) o;

        if (followUserId != that.followUserId) return false;
        if (userId != that.userId) return false;
        if (followee != that.followee) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = followUserId;
        result = 31 * result + userId;
        result = 31 * result + followee;
        return result;
    }
}
