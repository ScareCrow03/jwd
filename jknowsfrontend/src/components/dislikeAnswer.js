import { Avatar, List, Space } from 'antd';
import React from 'react';
import {MessageOutlined, LikeOutlined, StarOutlined, LikeFilled, DislikeFilled} from '@ant-design/icons';
import"../css/home.css"
import {Link} from "react-router-dom";
import {getFollowQuestion} from "../service/questionService";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import remarkGfm from 'remark-gfm';
import rehypeMathJax from "rehype-mathjax";
import 'github-markdown-css';
import {getLikeAnswer, getUserAnswer} from "../service/answerService";
import Box from "@mui/material/Box";
import {createTheme, ThemeProvider} from "@mui/material/styles";

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
const theme = createTheme({
    palette: {
        primary:{
            main:'#000080'
        },
        secondary: {
            main: '#808080',
        },
        warning:{
            main:'#056DE8'
        },
        success:{
            main:'#8590A6'
        }
    },
});
export class DislikeAnswer extends React.Component {
    constructor(props){
        super(props);
        this.state={
            data:[],
        };
    }

    callback=(data)=>{

        for(let i=0;i<data.length;i++){
            let t = data[i].answerInfo?.time.split(/[-T:.]/);
            data[i].answerInfo.time = data[i].answerInfo?.time.slice(0, 10) + ' ' + String(new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]))).slice(16, 24)
        }
        let likeAns = []
        data.map((data)=>{
            if(data.liked === -1){
                likeAns.push(data);
            }
        })
        this.setState({data:likeAns});
        console.log(this.state.data)

    }
    componentDidMount(){
        const urlObj = new URL(window.location.href)
        getLikeAnswer(urlObj.searchParams.get("id"),this.callback)
    }

    render() {
        return (
            <div>
                {
                    (this.state.data === null)?<div></div>:
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
                                        search: '?id=' + item.answerInfo?.questionId
                                    }}
                                    >
                                        <List.Item

                                            key={item.content}
                                            actions={[
                                                // <IconText icon={StarOutlined} text={item.question?.follow} key="list-vertical-star-o" />,
                                                <IconText icon={DislikeFilled} key="list-vertical-like-o"/>,
                                                <IconText icon={MessageOutlined} text={item.answerInfo?.comment} key="list-vertical-message"/>,
                                            ]}
                                        >
                                            <List.Item.Meta
                                                title={<h3>{item.answerInfo?.question?.title}</h3>}
                                            />
                                            <List.Item.Meta
                                                avatar={<Avatar style={{height:60,width:60}}  src={item.answerInfo?.userInfo.avatar} />}
                                                title={item.answerInfo?.userInfo.nickname}
                                                description={
                                                    item.liked>=0?
                                                        item.liked+'人赞同了该回答':
                                                        -item.liked+'人点踩了该回答'
                                                }
                                            />
                                            <Space >
                                                <div style={{display:'flex',flexDirection:'column'}}>
                                                    <Box
                                                        sx={{
                                                            fontSize: 12,
                                                        }}>
                                                        <ReactMarkdown className={'markdown-body'} children={item.answerInfo?.content}
                                                                       remarkPlugins={[remarkMath,remarkGfm]}
                                                                       rehypePlugins={[rehypeMathJax,rehypeRaw,]} escapeHtml={true}/>
                                                    </Box>
                                                </div>
                                            </Space>
                                            <ThemeProvider theme={theme}>
                                                <Box
                                                    sx={{
                                                        color: 'secondary.main',
                                                        display: 'flex',
                                                        fontWeight: 'light',
                                                        fontSize: 10,
                                                        mt:1
                                                    }}
                                                >
                                                    {item.answerInfo?.time}
                                                </Box>
                                            </ThemeProvider>
                                        </List.Item>
                                    </Link>
                                )}
                            />
                        </div>
                }
            </div>

        )

    }

}