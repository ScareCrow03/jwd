package com.jknows_backend.controller;

import com.jknows_backend.entity.User;
import com.jknows_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/getUser",method = {RequestMethod.GET,RequestMethod.POST})
    public User getUser(@RequestParam("userId") int userId) {//RequestParam 通常用于 GET，也可用于其他
        System.out.println("getUser");
        return userService.getUser(userId);
    }

    @RequestMapping(value = "/saveUser", method = {RequestMethod.GET,RequestMethod.POST})
        public User saveUser(@RequestParam("userId") int userId, @RequestParam("nickname") String nickname, @RequestParam("telephone") String telephone, @RequestParam("email") String email, @RequestParam("address") String address, @RequestParam("avatar") String avatar, @RequestParam("qq") String qq, @RequestParam("description") String description) {
        System.out.println("saveUser");
        return userService.saveUser(userId, nickname, telephone, email, address, avatar, qq, description);
    }

    @RequestMapping(value = "/manageUser",method = {RequestMethod.GET,RequestMethod.POST})
    public User manageUser(@RequestParam("userId") int userId, @RequestParam("type") int type) {
        System.out.println("manageUser");
        return userService.manageUser(userId, type);
    }

    @RequestMapping(value = "/getUsers",method = {RequestMethod.GET,RequestMethod.POST})
    public List<User> getUsers(@RequestParam("start") int start, @RequestParam("end") int end) {
        System.out.println("getUsers");
        return userService.getUsers(start, end);
    }
}
