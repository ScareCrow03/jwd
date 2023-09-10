import {Form, Input, Button, Tabs, Row, Col, Space, Modal} from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import React, {useEffect, useState} from 'react';
import  '../css/login.css';
import {http} from "../utils/http";
import axios from 'axios';
import {getAuthRequest, githubAuth, login} from "../service/loginService";
import { Box } from '@mui/system';
import gitee from '../assets/gitee.png'
import github from '../assets/github.png'
import Typography from '@mui/material/Typography';
import logo from '../assets/rlogoTM.png'
import {Link, useNavigate} from "react-router-dom";
import { Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import {giteeAuth} from "../service/loginService";


const onFinish = (values) => {
    console.log('Received values of form: ', values);
};

const { TabPane } = Tabs;
function callback(key) {
    console.log(key);
}
export default function LoginView(){

    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [type,setType]=useState("");
    const [user,setUser]=useState("");
    useEffect(() => {
        let reg1 = new RegExp("(^|&)" + "type" + "=([^&]*)(&|$)", "i");
        let reg2 = new RegExp("(^|&)" + "user" + "=([^&]*)(&|$)", "i");
        let r1 = window.location.search.substr(1).match(reg1);
        let r2 = window.location.search.substr(1).match(reg2);
        if(r1!=null&&r2!=null){
            setType(r1[2]);
            setUser(r2[2]);
            setIsModalVisible(true);
        }
    },[])
        const onFinish = (values) => {
            console.log('Received values of form: ', values);
            login(values,callback);
    
        };
        const callback = (key) => {
            console.log("key");

            navigate("/");
        }
        const handleGitee = (data)=>{
            console.log("handle", data)
            setType("gitee")
           http.get("oauth/gitee/login").then(res => {
                window.location = res.data.data;
            })
    
        }
        const handleGithub = (data)=>{
            console.log("handle", data)
            setType("github")
              http.get("oauth/github/login").then(res => {
                window.location = res.data.data;
            })
    
        }
        const authcallback = (data) => {
            console.log("authcallback", data)
            localStorage.setItem("userId", data)
            navigate("/");
    }

    function handleAuth() {
        setIsModalVisible(false);
        console.log("type", type)
        if(type=="gitee"){
            giteeAuth(user,authcallback);
        }
        else if(type=="github"){
            githubAuth(user,authcallback);
        }
    }

    return (
        <div className={"bg_login"}>
            <div className={"login_card"}>
            <img src={logo} alt=" " width="200px" style={{marginBottom:20}}/>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            style={{width:360}}
                        >
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: '请输入手机号 / 用户名!' }]}
                                style={{ borderBottom: '1px solid #DCDCDC'}}
                            >
                                <Input placeholder="请输入手机号 / 用户名" bordered={false} />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: '请输入密码!' }]}
                                style={{ borderBottom: '1px solid #DCDCDC' }}
                            >
                                <Input
                                    bordered={false}
                                    type="password"
                                    placeholder="请输入密码"
                                />
                            </Form.Item>


                            <Form.Item>
                                <Stack direction='row' sx={{
                                    float:'right'
                                    }}>
                                <Typography sx={{fontWeight:13,fontSize:14.5}}>
                                还没有账号？
                                </Typography>
                                <a href="/register">
                                    <Typography sx={{ color: '#3370FF',fontWeight:13,fontSize:14.5,
                                ":hover":{color:'#0461CF'} }} >
                                        点击注册
                                </Typography>
                                </a>
                                </Stack>
                                
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" block style={{ height: '40PX', borderRadius: '6PX',width:'80%' }}>
                                    登录
                                </Button>
                            </Form.Item>
                            <Form.Item >
                            <Box height={25} sx={{color:'#808080'}}>
                            <Divider>使用其他方式登录</Divider>
                            
                            </Box>
                                <Space className={"logbtn"}>
                    
                                <Button type="text" onClick={handleGitee} block style={{ height: '50PX', borderRadius: '6PX' }}>
                                    <img src={gitee} style={{width:40,height:40}}/>
                                </Button>
                                <Typography color='#d3d3d3' variant="h5" sx={{pl:5,pr:5}}>
                                |
                                </Typography>
                                <Button type="text"  onClick={handleGithub} block style={{ height: '50PX', borderRadius: '6PX',textAlign:'center' }}>
                                    <img src={github} style={{width:40,height:40}}/>
                                </Button>
                                </Space>
                            </Form.Item>
                        </Form>
            </div>
            <Footer className={"footer"}>
                <text>
                ©2023 Jknows·交我答
                </text>
            </Footer>
            <Modal open={isModalVisible} onOk={handleAuth} onCancel={()=>{setIsModalVisible(false)}}>
                授权成功，点击登录。
            </Modal>
        </div>
    )
}
