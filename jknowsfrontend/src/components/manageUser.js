import React from 'react';
import {Avatar, Button, Image, Layout, List, Skeleton} from "antd";
import {getFollower, getUsers, isFollowUser, manageUser, saveFollowUser} from "../service/userService";
import {Content} from "antd/es/layout/layout";
import {indigo} from "@mui/material/colors";
import {Link} from "react-router-dom";
import {MessageOutlined} from "@ant-design/icons";
import VirtualList from "rc-virtual-list";
import {getMessages} from "../service/messageService";

let end = 20;
export class ManageUser extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            data:[],
        }
    }

    callback=(data)=>{
        this.setState({data:data})
    }

    callback1=()=>{
        getUsers(1,end,this.callback)
    }

    componentDidMount() {
        getUsers(1,end,this.callback)
    }


    render(){
        const appendData =()=>{
            end += 20;
            getUsers(1,end,this.callback)
        }
        const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
            console.log(e.currentTarget.scrollHeight - e.currentTarget.scrollTop )
            if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === 2000) {
                console.log("121");
                appendData();
            }
        };

        const manage=(userId,type)=>{
            if(type === 0){
                manageUser(userId,-1,this.callback1)
            }
            if(type === -1){
                manageUser(userId,0,this.callback1)
            }

        }

        return(
            <div>
                <List
                    className="list"
                    loading={false}
                    itemLayout="horizontal"
                >
                    <VirtualList
                        itemKey={"userId"}
                        data={this.state.data}
                        height={2000}
                        itemHeight={100}
                        onScroll={onScroll}
                    >
                        {(item) => (
                            <List.Item
                                actions={[(item.type === 1)?<div></div>:<Button onClick={()=>{manage(item.userId,item.type)}} style={{marginLeft:-180}}>{(item.type === 0)?"封禁":"解禁"}</Button>]}
                            >
                                <List.Item.Meta
                                    style={{height:100}}
                                    avatar={<Link to={{
                                        pathname: '/profile',
                                        search: '?id=' + item.userId
                                    }}><Image preview={false} style={{marginLeft:40,marginTop:15,borderRadius:5}} height = {70} width={70} src={item.avatar} /></Link>}
                                    title={<h3 style={{marginTop:15,marginLeft:45}}>{item.nickname}</h3>}
                                    description={<h4 style={{marginLeft:45,marginTop:5}}>{item.description}</h4>}
                                />
                            </List.Item>
                        )}
                    </VirtualList>
                </List>
            </div>
        );

    }
}