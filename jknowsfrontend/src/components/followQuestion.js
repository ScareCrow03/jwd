import { Avatar, List, Space } from 'antd';
import React from 'react';
import {MessageOutlined, LikeOutlined, StarOutlined, StarFilled, LikeFilled} from '@ant-design/icons';
import"../css/home.css"
import {Link} from "react-router-dom";
import {getFollowQuestion, getUserQuestion, isFollowQuestion, isLikeQuestion} from "../service/questionService";
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
export class FollowQuestion extends React.Component {
    constructor(props){
        super(props);
        this.state={
            data:[],
            like:[]

        };
    }

    callback=(data)=>{
        let myQues = data.concat()
        myQues.map((item)=>{
            //isFollowQuestion(localStorage.getItem("userId"),item.questionId,(data)=>this.callback2(data,item.questionId))
            isLikeQuestion(localStorage.getItem("userId"),item.questionId,(data)=>this.callback3(data,item.questionId))
        })
        console.log("11",this.state.like)
        this.setState({data:data});
    }

    callback3=(data,questionId)=>{
        let likePtr = this.state.like.concat();
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
        // const urlObj = new URL(window.location.href)
        // localStorage.setItem("profileUserId",urlObj.searchParams.get("id"))
        getFollowQuestion(localStorage.getItem("userId"),this.callback)
    }

    render(){
        console.log("12",this.state.like)
        return(
            <div>
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
                                        <IconText icon={StarFilled} text={item.questionInfo.follow} key="list-vertical-star-o" />,
                                        <IconText icon={(this.state.like.find(e=>e.questionId===item.questionId)?.isLike===1&&this.state.like.find(e=>e.questionId===item.questionId)!==null)?LikeFilled:LikeOutlined} text={item.questionInfo.liked} key="list-vertical-like-o"/>,
                                        <IconText icon={MessageOutlined} text={item.questionInfo.answer} key="list-vertical-message" />,
                                    ]}
                                    // extra={
                                    //     <img
                                    //         width={272}
                                    //         alt="logo"
                                    //         src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                    //     />
                                    // }
                                >
                                    <List.Item.Meta
                                        title={item.questionInfo.title}

                                    />
                                    <ReactMarkdown className={'markdown-body'} children={item.questionInfo.content}
                                                   remarkPlugins={[remarkMath,remarkGfm]}
                                                   rehypePlugins={[rehypeMathJax,rehypeRaw,]} escapeHtml={true}/>
                                </List.Item>
                            </Link>
                        )}
                    />
                </div>
            </div>)
    }
}
