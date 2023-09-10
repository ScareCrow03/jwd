import React from 'react';
import {Button, Divider, Form, Image, Input, Layout, message, Modal, Typography, Upload} from "antd";
import {ArrowRightOutlined, BugFilled, HighlightOutlined, PlusOutlined} from "@ant-design/icons";
import Paragraph from "antd/es/typography/Paragraph";
import Sider from "antd/es/layout/Sider";
import {Content, Header} from "antd/es/layout/layout";
import {Link} from "react-router-dom";
import {Sidebar} from "./Sidebar";
import {changePassword, getUser, saveUser} from "../service/userService";
import ImgCrop from "antd-img-crop";


export class ProfileEdit extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            data:{},
            flag1:false,
            flag2:false
        }
    }

    callback =(data) => {
        this.setState({data:data});
    };
    componentDidMount() {
        getUser(localStorage.getItem("userId"),this.callback);

    }

    saveNickname=(data)=>{
        console.log(data)
        saveUser(localStorage.getItem("userId"),data,this.state.data.telephone,this.state.data.email,this.state.data.address,this.state.data.avatar,this.state.data.qq,this.state.data.description,this.callback);
    }
    saveEmail=(data)=>{
        saveUser(localStorage.getItem("userId"),this.state.data.nickname,this.state.data.telephone,data,this.state.data.address,this.state.data.avatar,this.state.data.qq,this.state.data.description,this.callback);
    }
    saveTel=(data)=>{
        saveUser(localStorage.getItem("userId"),this.state.data.nickname,data,this.state.data.email,this.state.data.address,this.state.data.avatar,this.state.data.qq,this.state.data.description,this.callback);
    }
    saveAddr=(data)=>{
        saveUser(localStorage.getItem("userId"),this.state.data.nickname,this.state.data.telephone,this.state.data.email,data,this.state.data.avatar,this.state.data.qq,this.state.data.description,this.callback);
    }
    saveQQ=(data)=>{
        saveUser(localStorage.getItem("userId"),this.state.data.nickname,this.state.data.telephone,this.state.data.email,this.state.data.address,this.state.data.avatar,data,this.state.data.description,this.callback);
    }
    saveDesc=(data)=>{
        saveUser(localStorage.getItem("userId"),this.state.data.nickname,this.state.data.telephone,this.state.data.email,this.state.data.address,this.state.data.avatar,this.state.data.qq,data,this.callback);
    }

    saveImag=(data)=>{
        saveUser(localStorage.getItem("userId"),this.state.data.nickname,this.state.data.telephone,this.state.data.email,this.state.data.address,data,this.state.data.qq,this.state.data.description,this.callback);
        this.setState({flag1:false})
    }
    setSearch=(data)=>{
        localStorage.setItem("search",data)
    }

    render(){


        const siderStyle: React.CSSProperties = {
            textAlign: 'center',
            lineHeight: '120px',
            backgroundColor: '#f6f6f6',
        };
        const siderStyle1: React.CSSProperties = {
            textAlign: 'center',
            lineHeight: '120px',
            backgroundColor: '#fff',
        };
        const siderStyle2: React.CSSProperties = {
            textAlign: 'center',
            lineHeight: '50px',
            backgroundColor: '#fff',
        };


        const headerStyle: React.CSSProperties = {
            textAlign: 'center',
            height: 150,
            paddingInline: 50,
            lineHeight: '64px',
            backgroundColor: '#fff',
        };

        const contentStyle: React.CSSProperties = {
            textAlign: 'center',
            minHeight: 650,
            lineHeight: '120px',
            color: '#0',
            backgroundColor: '#fff',
        };

        const contentStyle1: React.CSSProperties = {
            textAlign: 'center',
            lineHeight: '120px',
            color: '#0',
            backgroundColor: '#fff',
        };

        const upload=(x)=>{
            let file = x.file
            console.log(file);
            var formData = new FormData();
            formData.append('file[]', file);
            console.log(formData)
            fetch('http://123.60.52.71:8080/image/upload',{
                body:formData,
                method:"POST",
            }).then((response) => {
                //console.log(response.json())
                response.json().then((res:any)=>{
                    this.saveImag('http://123.60.52.71:8080'+res.url)
                })
            })
                .then((data) => {
                    console.log(data);
                })
        }

        const show=()=>{
            this.setState({flag1:true})
        }

        const show1=()=>{
            this.setState({flag2:true})
        }

        const callback1=()=>{
            this.setState({flag2:false})
            message.success("修改密码成功！");
        }
        const onFinish=(value)=>{
            console.log(value)
            changePassword(localStorage.getItem("userId"),value.password,callback1);
        }

        console.log("123"+this.state.data)
        return(
            <div id="contact">
                <Sidebar setSearch={this.setSearch}/>
                <Layout><Sider width={'15%'} style={siderStyle}></Sider>
                <Layout>
                    <Header style={headerStyle}></Header>
                    <Layout hasSider>
                    <Sider width={200} style={
                       siderStyle1
                    }>
                        <div>
                            <Image
                                preview={false}
                                onClick={show}
                                width={145}
                                key={this.state.data.avatar}
                                src={this.state.data.avatar || null}
                                style={{borderRadius:"4%"}}
                            />
                        </div>
                    </Sider>
                        <Content style={contentStyle}>
                <div>
                    <Layout>
                    <Content style={contentStyle1}>
                    <Typography.Title
                        level = {2}
                        editable={{
                            onChange: this.saveNickname,
                            maxLength: 35,
                        }}
                        strong={true}
                        style={{marginLeft: "2%",marginBottom:"5%",marginTop:"8%",textAlign: 'left'}}
                    >{this.state.data.nickname}
                    </Typography.Title>
                    </Content>
                    <Sider style={siderStyle2}>
                        <Button type="primary" style={{marginTop:20,width:150}}><Link to={{pathname: '/profile', search: '?id=' + localStorage.getItem("userId")}}>返回我的主页</Link></Button>
                        <Button type="primary" style={{width:150}} onClick={show1} > 修改密码 </Button>
                    </Sider>
                    </Layout>
                    <Divider />
                    <div  style={{height:"5%",display:'flex'}}>
                        <Typography.Title level={4} style={{marginLeft:"2%",marginBottom:"1%",marginTop:"1%",textAlign: 'left'}}>{"邮箱: "}</Typography.Title>
                        <Typography.Title
                            level = {3}
                            editable={{
                                onChange: this.saveEmail,
                                maxLength: 40,

                            }}
                            strong={true}
                            style={{marginLeft: "3%",marginBottom:"0%",marginTop:"0.7%",textAlign: 'left'}}
                        >{this.state.data.email}
                        </Typography.Title>
                    </div>
                    <Divider />
                    <div  style={{height:"5%",display:'flex'}}>
                        <Typography.Title level={4} style={{marginLeft:"2%",marginBottom:"1%",marginTop:"1%",textAlign: 'left'}}>{"电话: "}</Typography.Title>
                        <Typography.Title
                            level = {3}
                            editable={{
                                onChange: this.saveTel,
                                maxLength: 40,

                            }}
                            strong={true}
                            style={{marginLeft: "3%",marginBottom:"0%",marginTop:"0.7%",textAlign: 'left'}}
                        >{this.state.data.telephone}
                        </Typography.Title>
                    </div>
                    <Divider />
                    <div  style={{height:"5%",display:'flex'}}>
                        <Typography.Title level={4} style={{marginLeft:"2%",marginBottom:"1%",marginTop:"1%",textAlign: 'left'}}>{"地址: "}</Typography.Title>
                        <Typography.Title
                            level = {3}
                            editable={{
                                onChange: this.saveAddr,
                                maxLength: 40,

                            }}
                            strong={true}
                            style={{marginLeft: "3%",marginBottom:"0%",marginTop:"0.7%",textAlign: 'left'}}
                        >{this.state.data.address}
                        </Typography.Title>
                    </div><Divider/>
                    <div  style={{height:"5%",display:'flex'}}>
                        <Typography.Title level={4} style={{marginLeft:"2%",marginBottom:"1%",marginTop:"1%",textAlign: 'left'}}>{"QQ: "}</Typography.Title>
                        <Typography.Title
                            level = {3}
                            editable={{
                                onChange: this.saveQQ,
                                maxLength: 40,
                            }}
                            strong={true}
                            style={{marginLeft: "3%",marginBottom:"0%",marginTop:"0.7%",textAlign: 'left'}}
                        >{this.state.data.qq}
                        </Typography.Title>
                    </div><Divider />
                    <div  style={{height:"5%",display:'flex'}}>
                        <Typography.Title level={4} style={{marginLeft:"2%",marginBottom:"1%",marginTop:"1%",textAlign: 'left'}}>{"简介: "}</Typography.Title>
                        <Typography.Title
                            level = {3}
                            editable={{
                                onChange: this.saveDesc,
                                maxLength: 40,

                            }}
                            strong={true}
                            style={{marginLeft: "3%",marginBottom:"0%",marginTop:"0.7%",textAlign: 'left'}}
                        >{this.state.data.description}
                        </Typography.Title>
                        <Modal open={this.state.flag1} title={"更改头像"} footer={null} onCancel={()=>{this.setState({flag1:false})}} width={300}>
                            <div style={{marginTop:30,marginLeft:"30%"}}>
                                <ImgCrop
                                    resize={false}
                                >
                                <Upload
                                name="avatar"
                                width={"75%"}
                                listType="picture-card"
                                customRequest={upload}
                                maxCount={1}
                                >
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>上传</div>
                                    </div>
                                </Upload>
                                </ImgCrop>
                             </div>
                        </Modal>
                        <Modal open={this.state.flag2} title={"修改密码"} footer={null} onCancel={()=>{this.setState({flag2:false})}} width={500}>
                            <div>
                                <Form
                                    name="password"
                                    className="password"
                                    onFinish={onFinish}
                                    scrollToFirstError
                                    style={{marginTop:20}}
                                >
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
                                    <Form.Item style={{marginTop:30,marginLeft:"18%"}}>
                                        <Button  icon={<ArrowRightOutlined />} type="primary" htmlType="submit" className="register-form-button" style={{width:300}}>
                                            修改
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </Modal>
                    </div>
                </div>
                        </Content>
                </Layout>
                </Layout>
                    <Sider width={'15%'} style={siderStyle}></Sider>
                </Layout>
                </div>
        );

    }
}
