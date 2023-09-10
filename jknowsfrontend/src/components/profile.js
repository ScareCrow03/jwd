import React from 'react';
import {Button, Divider, Image, Layout, Menu, Space, Typography} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content, Header} from "antd/es/layout/layout";
import {Link, Outlet} from "react-router-dom";
import {Sidebar} from "./Sidebar";
import {getUser, isFollowUser, saveFollowUser} from "../service/userService";
import Stack from "@mui/material/Stack";

type MenuItem = Required<MenuProps>['items'][number];

function getItem (
    label: React.ReactNode,
    key?: React.Key | null,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        children,
        label,
        type,
    }// as MenuItem;
}


export class Profile extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            user: {},
            id:null,
            follow:null
        }
    }

    callback =(data) => {
        this.setState({user:data});
    };


    callback2 = (data) =>{
        this.setState({follow:data});
    }
    componentDidMount() {
        // const urlObj = new URL(window.location.href)
        // localStorage.setItem("profileUserId",urlObj.searchParams.get("id"))
        // this.setState({id:urlObj.searchParams.get("id")})
        // getUser(urlObj.searchParams.get("id"),this.callback);
        // localStorage.setItem("profileUserId",this.props.id);
        this.setState({id: this.props.id});
        getUser(this.props.id, this.callback);
        isFollowUser(localStorage.getItem("userId"),this.props.id,this.callback2)
        console.log(this.props.id);
    }

    componentDidUpdate(prevState:Readonly<S>) {
        if(prevState.id !== this.props.id && prevState.id !== null){
            // localStorage.setItem("profileUserId",this.props.id);
            this.setState({id: this.props.id});
            getUser(this.props.id, this.callback);
            isFollowUser(localStorage.getItem("userId"),this.props.id,this.callback2)
        }
    }
    setSearch=(data)=>{
        localStorage.setItem("search",data)
    }
    render(){
        const items: MenuItem[] = [
            getItem(<Link to={{
                pathname: '/profile/myQuestion',
                search: '?id=' + this.props.id}}><h3>{'我的提问'}</h3></Link>, '/profile/myQuestion'),
            getItem(<Link to={{
                pathname: '/profile/myAnswer',
                search: '?id=' + this.props.id}}><h3>{'我的回答'}</h3></Link>, '/profile/myAnswer'),
            getItem(<Link to={{
                pathname: '/profile/like',
                search: '?id=' + this.props.id}}><h3>{'我的点赞'}</h3></Link>, '/profile/like'),
            getItem(<Link to={{
                pathname: '/profile/dislike',
                search: '?id=' + this.props.id}}><h3>{'我的点踩'}</h3></Link>, '/profile/dislike'),
            getItem(<Link to={{
                pathname: '/profile/follow_question',
                search: '?id=' + this.props.id}}><h3>{'关注的问题'}</h3></Link>, '/profile/follow_question'),
            getItem(<Link to={{
                pathname: '/profile/followee_user',
                search: '?id=' + this.props.id}}><h3>{'我关注的用户'}</h3></Link>, '/profile/followee_user'),
            getItem(<Link to={{
                pathname: '/profile/follower_user',
                search: '?id=' + this.props.id}}><h3>{'关注我的用户'}</h3></Link>, '/profile/follower_user'),
        ];


        const adminItems: MenuItem[] = [
            getItem(<Link to={{
                pathname: '/profile/user',
                search: '?id=' + this.props.id}}><h3>{'用户列表'}</h3></Link>, '/profile/user'),
            getItem(<Link to={{
                pathname: '/profile/myQuestion',
                search: '?id=' + this.props.id}}><h3>{'我的提问'}</h3></Link>, '/profile/myQuestion'),
            getItem(<Link to={{
                pathname: '/profile/myAnswer',
                search: '?id=' + this.props.id}}><h3>{'我的回答'}</h3></Link>, '/profile/myAnswer'),
            getItem(<Link to={{
                pathname: '/profile/like',
                search: '?id=' + this.props.id}}><h3>{'我的点赞'}</h3></Link>, '/profile/like'),
            getItem(<Link to={{
                pathname: '/profile/dislike',
                search: '?id=' + this.props.id}}><h3>{'我的点踩'}</h3></Link>, '/profile/dislike'),
            getItem(<Link to={{
                pathname: '/profile/follow_question',
                search: '?id=' + this.props.id}}><h3>{'关注的问题'}</h3></Link>, '/profile/follow_question'),
            getItem(<Link to={{
                pathname: '/profile/followee_user',
                search: '?id=' + this.props.id}}><h3>{'我关注的用户'}</h3></Link>, '/profile/followee_user'),
            getItem(<Link to={{
                pathname: '/profile/follower_user',
                search: '?id=' + this.props.id}}><h3>{'关注我的用户'}</h3></Link>, '/profile/follower_user'),
        ];

        const siderStyle: React.CSSProperties = {
            textAlign: 'center',
            lineHeight: '120px',
            backgroundColor: '#f6f6f6',
        };
        const siderStyle1: React.CSSProperties = {
            textAlign: 'center',
            lineHeight: '120px',
            zIndex: 0,
            backgroundColor: '#fff',
        };
        const siderStyle2: React.CSSProperties = {
            textAlign: 'center',
            lineHeight: '120px',
            zIndex:1,
            Height:'300px',
            backgroundColor: '#fff',
        };

        const headerStyle: React.CSSProperties = {
            textAlign: 'center',
            height: '300px',
            paddingInline: 50,
            lineHeight: '64px',
            backgroundColor: '#fff',
        };
        const headerStyle1: React.CSSProperties = {
            textAlign: 'center',
            height: 100,
            paddingInline: 50,
            lineHeight: '64px',
            backgroundColor: '#fff',
        };

        const contentStyle: React.CSSProperties = {
            textAlign: 'left',
            marginTop : "1.6%",
            minHeight: '700px',
            lineHeight: '120px',
            zIndex: 2,
            color: '#0',
            backgroundColor: '#fff',
        };

        const contentStyle1: React.CSSProperties = {
            textAlign: 'left',
            minHeight: '300px',
            lineHeight: '120px',
            zIndex: 2,
            color: '#0',
            backgroundColor: '#fff',
        };

        const follow = (userId)=>{
            if(this.state.follow === 0) {
                saveFollowUser(localStorage.getItem("userId"), userId, 1, ()=>{isFollowUser(localStorage.getItem("userId"),this.state.id,this.callback2);})
            }
            if(this.state.follow === 1) {
                saveFollowUser(localStorage.getItem("userId"), userId, 0, ()=>{isFollowUser(localStorage.getItem("userId"),this.state.id,this.callback2);})
            }
        }


        return(
            <div id="contact">
                <Sidebar setSearch={this.setSearch}/>
                <Layout><Sider width={'15%'} style={siderStyle}></Sider>
                    <Layout>
                        <Header style={headerStyle}>
                            <Layout hasSider>
                            <Sider width={200} style={
                                siderStyle2
                            }>
                                <div>
                                    <Image
                                        width={160}
                                        preview={false}
                                        key={this.state.user.avatar}
                                        src={this.state.user.avatar || null}
                                        style={{marginTop:"40%",borderRadius:"5%"}}
                                    />
                                </div>
                            </Sider>
                            <Content style={contentStyle1}>
                                <Typography.Title level={2} style={{marginLeft:"2%",marginTop:120}}>{this.state.user.nickname}</Typography.Title>
                                <Typography.Title level={3} type = {"secondary"} style={{color:'#A5AEBE',marginLeft:"2%",marginTop:-13}}>{this.state.user.email}</Typography.Title>
                                <Typography.Title level={3} type={"secondary"} style={{color:'#A5AEBE',marginLeft:"2%",marginTop:-10}}>{this.state.user.description}</Typography.Title>
                            </Content>
                                <Sider width={"25%"} style={
                                    siderStyle2
                                }>
                                    {(this.props.id === localStorage.getItem("userId"))?
                                        <div>
                                            <div style={{marginTop:5,display:'flex'}}>
                                            <div style={{marginLeft:75}}>
                                            <h3 style={{marginTop:15,color:'#A5AEBE'}}>
                                                关注了
                                            </h3>
                                                <Typography.Title level={4} style={{marginTop:-30}}>{this.state.user.followee}</Typography.Title>
                                            </div>
                                                <Divider style={{color:'#fff',backgroundColor:"#fff",width:12.5,marginLeft:20,marginTop:55,height:88}} type={"vertical"}/>
                                            <div>
                                                <h3 style={{marginTop:15,color:'#A5AEBE'}}>
                                                    关注者
                                                </h3>
                                                <Typography.Title level={4} style={{marginTop:-30}}>{this.state.user.follower}</Typography.Title>
                                            </div>
                                            </div>
                                            <Button  type="primary" style={{marginLeft:55,marginTop:10}}><Link to={'/profileEdit'}>编辑个人资料</Link></Button>
                                    </div>
                                            :
                                        <div>
                                        <div style={{marginTop:5,display:'flex'}}>
                                            <div style={{marginLeft:70}}>
                                                <h3 style={{marginTop:15,color:'#A5AEBE'}}>
                                                    关注了
                                                </h3>
                                                <Typography.Title level={4} style={{marginTop:-30}}>{this.state.user.followee}</Typography.Title>
                                            </div>
                                            <Divider style={{color:'#fff',backgroundColor:"#fff",width:13.5,marginLeft:20,marginTop:55,height:88}} type={"vertical"}/>
                                            <div>
                                                <h3 style={{marginTop:15,color:'#A5AEBE'}}>
                                                    关注者
                                                </h3>
                                                <Typography.Title level={4} style={{marginTop:-30}}>{this.state.user.follower}</Typography.Title>
                                            </div>
                                        </div>

                                            {
                                                (this.state.follow === 0)?
                                                <Button  type="default" onClick={()=>follow(this.props.id)} style={{marginLeft:55,marginTop:10}}>关注用户</Button>
                                                :<Button  type="primary" onClick={()=>follow(this.props.id)} style={{marginLeft:55,marginTop:10}}>已关注</Button>
                                            }
                                            </div>

                                    }
                                </Sider>
                            </Layout>
                        </Header>
                        <Content style={contentStyle}>
                            <Layout>
                                <Content style={contentStyle1}>
                                    <Menu
                                        theme="light"
                                        mode="horizontal"
                                        items={(this.props.id === localStorage.getItem("userId")&& this.state.user.type === 1)?adminItems:items}
                                    />
                                    <Outlet style={{width:"80%"}}/>
                                </Content>
                            </Layout>
                        </Content>
                    </Layout>
                    <Sider width={'15%'} style={siderStyle}></Sider>
                </Layout>
            </div>
        );

    }
}
