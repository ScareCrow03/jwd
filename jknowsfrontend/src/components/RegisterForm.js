import React, {useEffect} from 'react';
import {Form, Input, Button, Checkbox, message, Upload} from 'antd';
import '../css/register.css'
import {LockOutlined, LoginOutlined, PlusOutlined, UserOutlined,LoadingOutlined,ArrowRightOutlined} from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom";
import isNumeric from "antd/es/_util/isNumeric";
import TextArea from "antd/es/input/TextArea";
import {checkUsernameValid, saveUserAuth} from "../service/loginService";
import {saveUser} from "../service/userService";
import Grid from '@mui/material/Grid';
import suplogo from '../assets/signuplogo.png'
import {http} from "../utils/http";
import { Stack } from '@mui/system';
import ImgCrop from "antd-img-crop";

const formItemLayout = {
    labelCol: {
      flex: '80px',
    },
    wrapperCol: {
      flex: '1',
    },
};

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

export default function RegisterForm(props) {
    const navigate = useNavigate();
    const [avator, setAvator] = React.useState(null);
    const [username, setUsername] = React.useState(null);

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
      };

    const uploadImage = (x) => {
        let file = x.file
        console.log("in ")
            console.log(file);
            let  formData = new FormData();
            formData.append('file[]', file);
            console.log(formData)
            fetch('http://123.60.52.71:8080/image/upload',{
                body:formData,
                method:"POST",
            }).then((response) => {
                //console.log(response.json())
                response.json().then((res)=>{
                    setAvator('http://123.60.52.71:8080'+res.url)
                })
            })
                .then((data) => {
                    console.log(data);
                })
    }


    
    const onFinish = (values) => {
        console.log(values)
        saveUserAuth(values.username,values.password,(data)=> {
            console.log(data)
            saveUser(data, values.nickname, values.telephone, values.email, values.address, avator, values.qq, values.description, (data) => {
                console.log("done")
            })
        })
        navigate("/login")
    }

    const checkVal = (rule,value,callback) => {
        const checkUsernameCallback = (response) => {
            if (response > 0) {
                callback();
            } else {
                callback("The username has been used!");
            }
        };
        console.log(value);
        checkUsernameValid(value, checkUsernameCallback);
        setUsername(value);
    }

    return (
        <div className="bg_register">
            
            <Form
                {...formItemLayout}
                name="normal_register"
                className="register-form"
                initialValues={{username: "", password1: ""}}
                onFinish={onFinish}
                scrollToFirstError
            >   
            <img src={suplogo} alt=" " width="500px" />
                <Grid container spacing={2}>
                <Grid item xs={8} >
                <Form.Item
                    name="username"
                    label="用户名"
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名！',
                        },
                        {
                            validator: checkVal//表单自定义校验
                        }
                    ]}
                >
                    <Input allowClear/>
                </Form.Item>
                <Form.Item
                    name="password"
                    label="密码"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码！',
                        },
                        {
                            min: 6,
                            message: '密码长度至少为6位！'
                        }
                    ]}
                >
                    <Input.Password autoComplete="new-password" allowClear/>
                </Form.Item>
                <Form.Item
                    name="confirm"
                    label="确认密码"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: '请重复密码!',
                        },
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('输入的两次密码不匹配！'));
                            },
                        }),
                    ]}
                  >
                    <Input.Password allowClear/>
                </Form.Item>
                </Grid>
                <Grid item xs={4} sx={{mt:2}}>
                <ImgCrop resize={false}>
                <Upload
                        name="avatar"
                        width={"75%"}
                        className="avatar-uploader"
                        listType="picture-card"
                        beforeUpload={beforeUpload}
                        customRequest={uploadImage}
                        maxCount={1}
                        showUploadList={false}
                    >   
                    {/* {console.log(avator)} */}
                        {
                            avator===null?
                            <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>上传</div>
                        </div>
                        :
                        <img src={avator} alt="avatar" style={{ width: '100%' ,borderRadius: '8px'}} />
                        }
                        
                    </Upload>
                    </ImgCrop>
                    </Grid>
                    </Grid>
                    <Grid container spacing={0}>
                <Grid item xs={6} >
                <Form.Item
                    name="nickname"
                    label="昵称"
                    rules={[
                        {
                            required: true,
                            message: '请输入昵称！',
                        }
                    ]}
                >
                    <Input allowClear/>
                </Form.Item>
                </Grid>
                <Grid item xs={6} >
                <Form.Item
                    name="telephone"
                    label="电话号码"
                    rules={[
                        // {
                        //     required: true,
                        //     message: '请输入电话号码！',
                        // },
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                const x = getFieldValue('telephone');
                                if (x == null) return Promise.resolve();
                                const len = x.length;

                                for (let i = 0; i < len; i ++)
                                    if (!(x[i] == '-' || x[i] >= '0' && x[i] <= '9'))
                                        return Promise.reject(new Error('请输入正确的电话号码！'));
                                return Promise.resolve();
                            },
                        }),
                    ]}
                >
                    <Input allowClear/>
                </Form.Item>
                </Grid>
                </Grid>
                <Grid container spacing={0}>
                <Grid item xs={6} >
                <Form.Item
                    name="email"
                    label="邮箱"
                    rules={[
                        // {
                        //     required: true,
                        //     message: '请输入邮箱！',
                        // },
                        {
                            pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                            message: '邮箱格式不正确'
                        }
                    ]}
                >
                    <Input allowClear/>
                </Form.Item>
                </Grid>
                <Grid item xs={6} >
                <Form.Item
                    name="QQ"
                    label="QQ"
                    rules={[
                        // {
                        //     required: true,
                        //     message: '请输入QQ！',
                        // }
                    ]}
                >
                    <Input allowClear/>
                </Form.Item>
                </Grid>
                </Grid>
                <Form.Item
                    name="address"
                    label="地址"
                    rules={[
                        // {
                        //     required: true,
                        //     message: '请输入地址！',
                        // }
                    ]}
                >
                    <Input allowClear/>
                </Form.Item>
                
                <Form.Item
                    name="description"
                    label="个人简介"
                >
                    <TextArea rows={2} />
                </Form.Item>


                <Form.Item style={{marginTop:30}}>

                    <Button icon={<ArrowRightOutlined />} type="primary" htmlType="submit" className="register-form-button" style={{width:'90%'}}>
                        注册
                    </Button>

                </Form.Item>
            </Form>
        </div>
    )
}