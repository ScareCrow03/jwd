import React from 'react';
import {Avatar, Button, Image, List, Skeleton} from "antd";
import {getFollowee, getFollower, isFollowUser, saveFollowUser} from "../service/userService";
import {Link} from "react-router-dom";

export class FolloweeUser extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            data:[],
            status:{},
            id:0
        }
    }

    callback =  (data) => {
        this.setState({data:data});
        console.log(data)
    };

    componentDidMount() {
        const urlObj = new URL(window.location.href)
        this.setState({id:urlObj.searchParams.get("id")})
        getFollowee(urlObj.searchParams.get("id"),this.callback)
    }

    callback1 = (data)=>{
        console.log("1111")
        getFollowee(this.state.id,this.callback)
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
                           actions={[(this.state.id !== localStorage.getItem("userId"))?<div></div>:<Button onClick={()=>{saveFollowUser(localStorage.getItem("userId"),item.followeeInfo?.userId,0,this.callback1);}} style={{marginLeft:"-100%"}}>{"取消关注"}</Button>]}
                       >
                       <List.Item.Meta
                       avatar={<Link to={{
                           pathname: '/profile',
                           search: '?id=' + item.followeeInfo?.userId
                       }}><Image preview={false} style={{marginLeft:"20%",borderRadius:"5%"}} width={70} src={item.followeeInfo?.avatar} /></Link>}
                       title={<h3 style={{marginTop:"1%",marginLeft:"3%"}}>{item.followeeInfo?.nickname}</h3>}
                       description={<h4 style={{marginLeft:"3%"}}>{item.followeeInfo?.description}</h4>}
                       />
                       </List.Item>
                   )}
               />
           </div>
        );

    }
}