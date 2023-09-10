import React from 'react';
import * as userService from "./service/loginService"
import {message} from "antd";
import {Outlet} from "react-router";
import JumpTo from "./JumpTo";

export default class PrivateRoute extends React.Component {
    constructor(props) {
        super(props);
    }

    checkLogin = (data) => {
        console.log(data);
        // if (data >= 0) {
        //     console.log("checkLogin success", data.data);
            
        // } else {
        //     message.destroy();
        //     message.error("请先登录！");
        // }
    };


    componentDidMount() {
        userService.checkSession(this.checkLogin);
    }


    render = () => {
        // console.log("PrivateRoute");
        return (
            localStorage.getItem("userId") != null ? <Outlet /> : <JumpTo url="/login" />
            // <Outlet />
        );
    }
}
