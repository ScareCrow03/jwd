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


export class Dislike extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id:0
        }
    }

    componentDidMount() {
        const urlObj = new URL(window.location.href)
        this.setState({id:urlObj.searchParams.get("id")})
    }

    render() {

        const items: MenuItem[] = [
            getItem(<Link to={{
                pathname: '/profile/dislike/question',
                search: '?id=' + this.state.id}}><h4>{'点踩的问题'}</h4></Link>, '/profile/dislike/question'),
            getItem(<Link to={{
                pathname: '/profile/dislike/answer',
                search: '?id=' + this.state.id}}><h4>{'点踩的回答'}</h4></Link>, '/profile/dislike/answer'),
            getItem(<Link to={{
                pathname: '/profile/dislike/comment',
                search: '?id=' + this.state.id}}><h4>{'点踩的评论'}</h4></Link>, '/profile/dislike/comment'),
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
