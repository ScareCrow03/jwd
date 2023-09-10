package com.jknows_backend.controller;

import com.jknows_backend.entity.FollowUser;
import com.jknows_backend.service.FollowUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class FollowUserController {

    @Autowired
    private FollowUserService followUserService;

    @RequestMapping(value = "/getFollowee",method = {RequestMethod.GET,RequestMethod.POST})
    public List<FollowUser> getFollowee(@RequestParam("userId") int userId) {
        System.out.println("getFollowee");
        return followUserService.getFollowee(userId);
    }

    @RequestMapping(value = "/getFollower",method = {RequestMethod.GET,RequestMethod.POST})
    public List<FollowUser> getFollower(@RequestParam("userId") int userId) {
        System.out.println("getFollower");
        return followUserService.getFollower(userId);
    }

    @RequestMapping(value = "/saveFollowUser", method = {RequestMethod.GET,RequestMethod.POST})
    public int saveFollowUser(@RequestParam("userId") int userId, @RequestParam("followee") int followee, @RequestParam("follow") int follow) {
        System.out.println("saveFollowUser");
        followUserService.saveFollowUser(userId, followee, follow);
        return 1;
    }

    @RequestMapping(value = "/isFollowUser", method = {RequestMethod.GET,RequestMethod.POST})
    public int isFollowUser(@RequestParam("userId") int userId, @RequestParam("followee") int followee) {
        System.out.println("isFollowUser");
        return followUserService.isFollowUser(userId, followee);
    }

}
