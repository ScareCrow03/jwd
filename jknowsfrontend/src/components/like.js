import React from 'react';
import {Button, Divider, Image, Layout, Menu, Space, Typography} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content, Header} from "antd/es/layout/layout";
import {Link, Outlet} from "react-router-dom";

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


export class Like extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id:0
        }
    }

    componentDidMount() {
        const urlObj = new URL(window.location.href)
        // localStorage.setItem("profileUserId",urlObj.searchParams.get("id"))
        this.setState({id:urlObj.searchParams.get("id")})
    }

    render() {

        const items: MenuItem[] = [
            getItem(<Link to={{
                pathname: '/profile/like/question',
                search: '?id=' + this.state.id}}><h4>{'点赞的问题'}</h4></Link>, '/profile/like/question'),
            getItem(<Link to={{
                pathname: '/profile/like/answer',
                search: '?id=' + this.state.id}}><h4>{'点赞的回答'}</h4></Link>, '/profile/like/answer'),
            getItem(<Link to={{
                pathname: '/profile/like/comment',
                search: '?id=' + this.state.id}}><h4>{'点赞的评论'}</h4></Link>, '/profile/like/comment'),
        ]


        return (
            <div>
                <Menu
                    theme="light"
                    mode="horizontal"
                    items={items}
                />
                <Outlet/>
            </div>
        );
    }
}