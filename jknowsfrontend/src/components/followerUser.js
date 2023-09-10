import React from 'react';
import {Avatar, Button, Image, Layout, List, Skeleton} from "antd";
import {getFollower, isFollowUser, saveFollowUser} from "../service/userService";
import {Content} from "antd/es/layout/layout";
import {indigo} from "@mui/material/colors";
import {Link} from "react-router-dom";

export class FollowerUser extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            data:[],
            array:[]
        }
    }


    callback =  (data) => {
        let states = this.state.array.concat();
        this.setState({data:data});
        this.state.data.map((data,index)=>{
            isFollowUser(localStorage.getItem("userId"),data.userInfo?.userId,(data)=>{
                if(states.length <= index){
                    states.push(data);
                }
                else{
                    states[index] = data;
                }
                this.setState({array:states})
            });
        })
    }
    componentDidMount() {
        const urlObj = new URL(window.location.href)
        this.setState({id:urlObj.searchParams.get("id")})
        getFollower(urlObj.searchParams.get("id"),this.callback)
    }


    callback2=()=>{
        this.setState({})
    }

    render(){
        return(
            <div>
                <List
                    className="list"
                    loading={false}
                    itemLayout="horizontal"
                    dataSource={this.state.data}
                    renderItem={(item,index)=>(
                        <List.Item
                            actions={[(this.state.id !== localStorage.getItem("userId"))?<div></div>:<Button onClick={()=>{saveFollowUser(localStorage.getItem("userId"),item.userInfo?.userId,1 - this.state.array[index],this.callback2);this.state.array[index] = 1-this.state.array[index]}} style={{marginLeft:"-100%"}}>{(this.state.array[index]===1)?"取消关注":"互相关注"}</Button>]}
                        >
                            <List.Item.Meta
                                    avatar={<Link to={{
                                        pathname: '/profile',
                                        search: '?id=' + item.userInfo?.userId
                                    }}><Image preview={false} style={{marginLeft:"20%",borderRadius:"5%"}} width={70} src={item.userInfo?.avatar} /></Link>}
                                    title={<h3 style={{marginTop:"1%",marginLeft:"3%"}}>{item.userInfo?.nickname}</h3>}
                                    description={<h4 style={{marginLeft:"3%"}}>{item.userInfo?.description}</h4>}
                                />
                        </List.Item>
                    )}
                />
            </div>
        );

    }
}