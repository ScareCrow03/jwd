import {postRequest} from "../utils/ajax";
import {message} from 'antd';
import {history} from "../utils/history";
import {useNavigate} from "react-router-dom";

export const checkSession = (callback) => {
    const url = `http://123.60.52.71:8081/checkSession`;
    postRequest(url, {}, callback);
};

export const logout = () => {
    const url = `http://123.60.52.71:8081/logout`;

    const callback = () => {
        localStorage.removeItem("user");
        history.push("/login");
        message.success('登出成功！');
    };
    postRequest(url, {}, callback);
};


export const login = (sdata, callback1) => {
    const url = `http://123.60.52.71:8081/login`;

    const callback = (data) => {
        if(data >= 0) {
            console.log("sdata",sdata)
            localStorage.setItem('userId', JSON.stringify(data));
            // history.push("/");
            message.success("登陆成功！");
            callback1(sdata);
        } else {
            if (data == -103) message.error("用户已被封禁，请联系管理员！");
            else message.error("用户名或密码错误！");
        }

    };
    postRequest(url, sdata, callback);
};

export const checkUsernameValid=(username,callback)=>{
    const data={username:username};
    const url = 'http://123.60.52.71:8081/checkUsernameValid'
    postRequest(url,data,callback);
}
export const saveUserAuth=(username,password,callback)=>{
    const data={username:username,password:password};
    const url = 'http://123.60.52.71:8081/saveUserAuth'
    postRequest(url,data,callback);
}

export const giteeAuth=(uuid,callback)=>{
    console.log(uuid)
    const data={uuid:uuid};
    const url = 'http://123.60.52.71:8081/giteeLogin'
    postRequest(url,data,callback);
}

export const githubAuth=(uuid,callback)=>{
    console.log(uuid)
    const data={uuid:uuid};
    const url = 'http://123.60.52.71:8081/githubLogin'
    postRequest(url,data,callback);
}