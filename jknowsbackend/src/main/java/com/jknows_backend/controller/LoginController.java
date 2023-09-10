package com.jknows_backend.controller;

import com.jknows_backend.entity.User;
import com.jknows_backend.entity.UserAuth;
import com.jknows_backend.service.UserAuthService;
import com.jknows_backend.service.UserService;
import com.jknows_backend.utils.sessionutils.SessionUtil;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class LoginController {


    @Autowired
    private UserAuthService userAuthService;

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/login", method = {RequestMethod.GET,RequestMethod.POST})
    public int login(@RequestParam("username") String username, @RequestParam("password") String password){
        System.out.println("login");
        UserAuth auth = userAuthService.checkUserAuth(username, password);
        if (auth != null) {
            User u = userService.getUser(auth.getUserId());
            if (u.getType() == -1) return -103;
            JSONObject obj = new JSONObject();
            obj.put("userId", auth.getUserId());
            obj.put("username", auth.getUsername());
            SessionUtil.setSession(obj);
//            JSONObject data = JSONObject.fromObject(auth);
//            data.remove("password");
            return auth.getUserId();//MsgUtil.makeMsg(0, "登录成功！", data);
        }
        return -100;//MsgUtil.makeMsg(-100, "用户名或密码错误！");
    }

    @RequestMapping("/githubLogin")
    public int githubLogin(@RequestParam("uuid") String uuid) {
        System.out.println("githubLogin");
        uuid = "github" + uuid;
        return oauthLogin(uuid, uuid);
    }

    @RequestMapping("/giteeLogin")
    public int giteeLogin(@RequestParam("uuid") String uuid) {
        System.out.println("giteeLogin");
        uuid = "gitee" + uuid;
        return oauthLogin(uuid, uuid);
    }

    public int oauthLogin(String username, String password) {
        UserAuth auth = userAuthService.checkUserAuth(username, password);
        if (auth == null) {
            auth = userAuthService.saveUserAuth(username, password);
            userService.saveUser(auth.getUserId(), username, "", "", "", "http://123.60.52.71:8080/upload/Emojione_BW_1F453.svg_1694313394027.png", "", "");
        }
        JSONObject obj = new JSONObject();
        obj.put("userId", auth.getUserId());
        obj.put("username", auth.getUsername());
        SessionUtil.setSession(obj);
        return auth.getUserId();
    }

    @RequestMapping("/logout")
    public int logout() {
        System.out.println("logout");
        Boolean status = SessionUtil.removeSession();
        if (status) return 1;//MsgUtil.makeMsg(0, "登出成功！");
        return -1;//MsgUtil.makeMsg(-1, "登出异常！");
    }

    @RequestMapping("/checkSession")
    public int checkSession() {
        System.out.println("checkSession");
        JSONObject auth = SessionUtil.getAuth();
        if (auth == null) return -101;//MsgUtil.makeMsg(-101, "登录失效，请重新登录！");
        return 1;//MsgUtil.makeMsg(0, "登录成功！", auth);
    }
}
