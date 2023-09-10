package com.jknows_backend.controller;

import com.jknows_backend.entity.UserAuth;
import com.jknows_backend.service.UserAuthService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class UserAuthController {

    @Autowired
    private UserAuthService userAuthService;

    @RequestMapping("/checkUserAuth")
    public int checkUserAuth(@RequestParam("username") String username, @RequestParam("password") String password) {
        System.out.println("checkUserAuth");
        UserAuth u = userAuthService.checkUserAuth(username, password);
        if (u == null) return -1;
        return u.getUserId();
    }

    @RequestMapping("/saveUserAuth")
    public int saveUserAuth(@RequestParam("username") String username, @RequestParam("password") String password) {
        System.out.println("saveUserAuth");
        UserAuth u = userAuthService.saveUserAuth(username, password);
        return u.getUserId();//MsgUtil.makeMsg(0, "注册成功！", data);
    }

    @RequestMapping("/changePassword")
    public int changePassword(@RequestParam("userId") int userId, @RequestParam("password") String password) {
        System.out.println("changePassword");
        return userAuthService.changePassword(userId, password);//MsgUtil.makeMsg(0, "注册成功！", data);
    }

    @RequestMapping("/checkUsernameValid")
    public int checkUsernameValid(@RequestParam("username") String username) {
        System.out.println("checkUsernameValid");
        return userAuthService.checkUsernameValid(username) ? 1 : 0;
    }

}
