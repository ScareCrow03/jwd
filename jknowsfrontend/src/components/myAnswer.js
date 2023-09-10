import { Avatar, List, Space } from 'antd';
import React from 'react';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
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
import {getUserAnswer} from "../service/answerService";
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
export class MyAnswer extends React.Component {
    constructor(props){
        super(props);
        this.state={
            data:[],
            likeAnswer:[]

        };
    }

    callback=(data)=>{
        let tmpa = []
        tmpa = data;
        for(let i=0;i<tmpa.length;i++){
            let t = tmpa[i].time.split(/[-T:.]/);
            tmpa[i].time = tmpa[i].time.slice(0, 10) + ' ' + String(new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]))).slice(16, 24)
        }

        this.setState({data:data});

    }
    componentDidMount(){
        const urlObj = new URL(window.location.href)
        getUserAnswer(urlObj.searchParams.get("id"),this.callback)
    }

    render() {
        return (
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
                                search: '?id=' + item.questionId
                            }}
                            >
                                <List.Item

                                    key={item.content}
                                    actions={[
                                        // <IconText icon={StarOutlined} text={item.question?.follow} key="list-vertical-star-o" />,
                                        <IconText icon={LikeOutlined} text={item.liked} key="list-vertical-like-o"/>,
                                        <IconText icon={MessageOutlined} text={item.comment} key="list-vertical-message"/>,
                                    ]}
                                >
                                    <List.Item.Meta
                                        title={<h3>{item.question?.title}</h3>}
                                    />
                                    <List.Item.Meta
                                        avatar={<Avatar style={{height:60,width:60}}  src={item.userInfo?.avatar} />}
                                        title={item.userInfo?.nickname}
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
                                                <ReactMarkdown className={'markdown-body'} children={item.content}
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
                                            {item.time}
                                        </Box>
                                    </ThemeProvider>
                                </List.Item>
                            </Link>
                        )}
                    />
                </div>
            </div>)

    }

}