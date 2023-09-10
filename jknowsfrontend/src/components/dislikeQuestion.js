import { Avatar, List, Space } from 'antd';
import React from 'react';
import {MessageOutlined, LikeOutlined, StarOutlined, LikeFilled, DislikeFilled, StarFilled} from '@ant-design/icons';
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
export class DislikeQuestion extends React.Component {
    constructor(props){
        super(props);
        this.state={
            data:[],
            follow:[]
        };
    }

    callback=(data)=>{
        let likeQues = [];
        data.map((data,index)=>{
            if(data.liked === -1){
                likeQues .push(data);
            }
        })
        let followPtr = []
        followPtr.push({questionId: 0, isFollow: 0})
        this.setState({follow:followPtr});
        let myQues = data;
        console.log(data);
        myQues.map((item)=>{
            isFollowQuestion(localStorage.getItem("userId"),item.questionId,(data)=>this.callback2(data,item.questionId))
            //isLikeQuestion(localStorage.getItem("userId"),item.questionId,(data)=>this.callback3(data,item.questionId))
        })
        this.setState({data:likeQues});
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

    componentDidMount(){
        const urlObj = new URL(window.location.href)
        getLikeQuestion(urlObj.searchParams.get("id"),this.callback)

    }
    render(){
        return(
            <div>
                {
                    (this.state.data == null)?<div></div>:
                        <div>

                            <List
                                itemLayout="vertical"
                                size="large"
                                pagination={{
                                    onChange: (page) => {
                                        console.log(page);
                                    },
                                    pageSize: 5,
                                }}
                                align="left"
                                //dataSource={this.state.showQuestion}
                                dataSource={this.state.data}

                                renderItem={(item) => (
                                    <Link to={{
                                        pathname: '/question',
                                        search: '?id=' + item.questionId}}
                                    >
                                        <List.Item

                                            key={item.title}
                                            actions={[
                                                <IconText icon={(this.state.follow.find(e=>e.questionId===item.questionId)!==null&&this.state.follow.find(e=>e.questionId===item.questionId)?.isFollow===1)?StarFilled:StarOutlined} text={item.questionInfo?.follow} key="list-vertical-star-o" />,
                                                <IconText icon={DislikeFilled} key="list-vertical-like-o"/>,
                                                <IconText icon={MessageOutlined} text={item.questionInfo?.answer} key="list-vertical-message" />,
                                            ]}
                                        >
                                            <List.Item.Meta
                                                title={item.questionInfo?.title}

                                            />
                                            <ReactMarkdown className={'markdown-body'} children={item.questionInfo?.content}
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