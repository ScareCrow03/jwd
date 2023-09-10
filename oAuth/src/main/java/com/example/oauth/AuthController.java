package com.example.oauth;

import com.alibaba.fastjson.JSON;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import me.zhyd.oauth.config.AuthConfig;
import me.zhyd.oauth.model.AuthCallback;
import me.zhyd.oauth.model.AuthResponse;
import me.zhyd.oauth.model.AuthUser;
import me.zhyd.oauth.request.AuthGiteeRequest;
import me.zhyd.oauth.request.AuthGithubRequest;
import me.zhyd.oauth.request.AuthRequest;
import me.zhyd.oauth.utils.AuthStateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/oauth")
@CrossOrigin
public class AuthController {

    @GetMapping("/{type}/login")
    public R login(@PathVariable String type, HttpServletResponse response) throws IOException{
        AuthRequest authRequest = getAuthRequest(type);
        String url = authRequest.authorize(AuthStateUtils.createState());
        return new R(true,url);
    }

    private AuthRequest getAuthRequest(String type) throws IOException {
        AuthRequest authRequest = null;
        System.out.println(type);
        if(type.equals("gitee")){
            authRequest = new AuthGiteeRequest(AuthConfig.builder().clientId("230bcfa3bee110235f2e6f83b872368d8e3d257200ac8037fde7912358e0be46").clientSecret("fddb233e31d5e9d632df7344c65fda7d3d9c54dbba00a8cd2ec5d7044fd5c791")
                    .redirectUri("http://123.60.52.71:8082/oauth/gitee/callback").build());
        }
        else if(type.equals("github")){
            authRequest = new AuthGithubRequest(AuthConfig.builder().clientId("b7a23c82eb5ae4415eac").clientSecret(
                            "f3b569ecd74f24c4247e2e3005f30f6aad1fc0ea")
                    .redirectUri("http://123.60.52.71:8082/oauth/github/callback").build());
        }
        return authRequest;
    }

    @RequestMapping("/{type}/callback")
    public void login(@PathVariable String type, AuthCallback callback,HttpServletResponse httpServletResponse) throws IOException {
        AuthRequest authRequest = getAuthRequest(type);
        AuthResponse<AuthUser> authResponse = authRequest.login(callback);
        if(!authResponse.ok()){
            log.error("登录失败",authResponse.getMsg());
            httpServletResponse.sendRedirect("http://123.60.52.71:80");
            return ;
        }
        String s = JSON.toJSONString(authResponse.getData());
        System.out.println(s);
        System.out.println(authResponse.getData().getUuid());
        httpServletResponse.sendRedirect("http://123.60.52.71:80/login?user="+authResponse.getData().getUuid()+"&type="+type);
    }
}

