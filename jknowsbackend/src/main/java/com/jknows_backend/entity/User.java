package com.jknows_backend.entity;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Objects;

@Entity
public class User implements Serializable {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "user_id")
    private int userId;
    @Basic
    @Column(name = "nickname")
    private String nickname;
    @Basic
    @Column(name = "telephone")
    private String telephone;
    @Basic
    @Column(name = "email")
    private String email;
    @Basic
    @Column(name = "address")
    private String address;
    @Basic
    @Column(name = "avatar")
    private String avatar;
    @Basic
    @Column(name = "qq")
    private String qq;
    @Basic
    @Column(name = "description")
    private String description;
    @Basic
    @Column(name = "follower")
    private int follower;
    @Basic
    @Column(name = "followee")
    private int followee;
    @Basic
    @Column(name = "message_flag")
    private int messageFlag;
    @Basic
    @Column(name = "type")
    private int type;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getQq() {
        return qq;
    }

    public void setQq(String qq) {
        this.qq = qq;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getFollower() {
        return follower;
    }

    public void setFollower(int follower) {
        this.follower = follower;
    }

    public int getFollowee() {
        return followee;
    }

    public void setFollowee(int followee) {
        this.followee = followee;
    }

    public int getMessageFlag() {
        return messageFlag;
    }

    public void setMessageFlag(int messageFlag) {
        this.messageFlag = messageFlag;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return userId == user.userId && follower == user.follower && followee == user.followee && messageFlag == user.messageFlag && type == user.type && Objects.equals(nickname, user.nickname) && Objects.equals(telephone, user.telephone) && Objects.equals(email, user.email) && Objects.equals(address, user.address) && Objects.equals(avatar, user.avatar) && Objects.equals(qq, user.qq) && Objects.equals(description, user.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, nickname, telephone, email, address, avatar, qq, description, follower, followee, messageFlag, type);
    }
}
