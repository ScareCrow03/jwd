import { Avatar, List, Space } from 'antd';
import React from 'react';
import {MessageOutlined, LikeOutlined, StarOutlined, StarFilled, LikeFilled} from '@ant-design/icons';
import"../css/home.css"
import {Link} from "react-router-dom";
import {getLikeQuestion, getUserQuestion, isFollowQuestion, isLikeQuestion} from "../service/questionService";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import remarkGfm from 'remark-gfm';
import rehypeMathJax from "rehype-mathjax";

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
export class MyQuestion extends React.Component {
    constructor(props){
        super(props);
        this.state={
            data:[],
            follow:[],
            like:[],
        };
    }

    callback=(data)=>{
        let myQues = data;
        console.log(data);
        myQues.map((item)=>{
            isFollowQuestion(localStorage.getItem("userId"),item.questionId,(data)=>this.callback2(data,item.questionId))
            isLikeQuestion(localStorage.getItem("userId"),item.questionId,(data)=>this.callback3(data,item.questionId))
        })
        data.reverse()
        this.setState({data:data});
    }


    callback2=(data,questionId)=>{
        let followPtr = this.state.follow;
        let flag = true;
        followPtr.map((item)=>{
            if(item.questionId === questionId) {
                flag = false
            }
        })
        if(flag) {
            followPtr.push({questionId: questionId, isFollow: data})
            this.setState({follow:followPtr});
        }
    }

    callback3=(data,questionId)=>{
        let likePtr = this.state.like;
        let flag = true;
        likePtr.map((item)=>{
            if(item.questionId === questionId) {
                flag = false
            }
        })
        if(flag) {
            likePtr.push({questionId: questionId, isLike: data})
            this.setState({like:likePtr});
        }
    }
    componentDidMount(){
        console.log(window.location.href)
        console.log(document.URL)
        console.log(document.location.href)
        const urlObj = new URL(window.location.href)
        getUserQuestion(urlObj.searchParams.get("id"),this.callback)
    }

    render(){
        console.log(this.state.follow);
        console.log(this.state.like);
        return(
            <div>
                {
                    (this.state.data == null)?<div></div>:
                <div>
                    <List
                        itemLayout="vertical"
                        size="large"
                        align="left"
                        dataSource={this.state.data}

                        renderItem={(item) => (
                            <Link to={{
                                pathname: '/question',
                                search: '?id=' + item.questionId}}
                            >
                                <List.Item

                                    key={item.title}
                                    actions={[
                                        <IconText icon={(this.state.follow.find(e=>e.questionId===item.questionId)!==null&&this.state.follow.find(e=>e.questionId===item.questionId)?.isFollow===1)?StarFilled:StarOutlined} text={item.follow} key="list-vertical-star-o" />,
                                        <IconText icon={(this.state.like.find(e=>e.questionId===item.questionId)?.isLike===1&&this.state.like.find(e=>e.questionId===item.questionId)!==null)?LikeFilled:LikeOutlined} text={item.liked} key="list-vertical-like-o"/>,
                                        <IconText icon={MessageOutlined} text={item.answer} key="list-vertical-message" />,
                                    ]}
                                >
                                    <List.Item.Meta
                                        title={item.title}

                                    />
                                    <ReactMarkdown className={'markdown-body'} children={item.content}
                                                    remarkPlugins={[remarkMath,remarkGfm]}
                                                    rehypePlugins={[rehypeMathJax,rehypeRaw,]} escapeHtml={true}/>
                                </List.Item>
                            </Link>
                        )}
                    />
                </div>
                }
            </div>)

    }
}