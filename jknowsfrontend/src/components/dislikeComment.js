import {Avatar, Button, List, Space} from 'antd';
import React from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {MessageOutlined, LikeOutlined, StarOutlined, LikeFilled} from '@ant-design/icons';
import"../css/home.css"
import {Link} from "react-router-dom";
import {getLikeQuestion, getUserQuestion} from "../service/questionService";
import {getLikeComment} from "../service/commentService";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import IconContext from "@ant-design/icons/es/components/Context";
import Icon from "antd/es/icon";


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
export class DislikeComment extends React.Component {
    constructor(props){
        super(props);
        this.state={
            data:[]
        };
    }

    callback=(data)=>{
        for(let i=0;i<data.length;i++){
            let t = data[i].commentInfo?.time.split(/[-T:.]/);
            data[i].commentInfo.time = data[i].commentInfo?.time.slice(0, 10) + ' ' + String(new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]))).slice(16, 24)
        }
        let likeComm = [];
        data.map((data,index)=>{
            if(data.liked === -1){
                likeComm.push(data);
            }
        })
        this.setState({data:likeComm});
    }

    componentDidMount(){
        const urlObj = new URL(window.location.href)
        getLikeComment(urlObj.searchParams.get("id"),this.callback)

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
                                split
                                dataSource={this.state.data}
                                renderItem={(item) => (
                                    <List.Item >
                                        <Grid container spacing={2} >
                                            <Grid item xs={8}>
                                                <Stack spacing={1} direction="row" sx={{fontSize:16,fontWeight:'bold'}}>
                                                    <Box >
                                                        <Avatar src={item.commentInfo?.userInfo.avatar} />
                                                    </Box>
                                                    <Box
                                                        display='flex'
                                                        justifyContent="center"
                                                        alignItems="center"
                                                    >
                                                        {item.commentInfo?.userInfo.nickname}
                                                    </Box>

                                                    {
                                                        item.commentInfo?.responseId===1?<div></div>:
                                                            <>
                                                                <ThemeProvider theme={theme}>
                                                                    <Box
                                                                        display='flex'
                                                                        justifyContent="center"
                                                                        alignItems="center"
                                                                    >
                                                                        <ArrowRightIcon color='secondary'/>
                                                                    </Box>
                                                                </ThemeProvider>
                                                                <Box sx={{
                                                                    // border:1
                                                                }}>
                                                                    <Avatar src={item.commentInfo?.responseInfo.avatar} />
                                                                </Box>
                                                                <Box
                                                                    display='flex'
                                                                    justifyContent="center"
                                                                    alignItems="center"
                                                                >
                                                                    {item.commentInfo?.responseInfo.nickname}
                                                                </Box>

                                                            </>
                                                    }


                                                </Stack>

                                                <Box sx={{fontSize: 15,mt:1}}>
                                                    {item.commentInfo?.content}
                                                </Box>
                                                <ThemeProvider theme={theme}>
                                                    <Box
                                                        display='flex'
                                                        // justifyContent="center"
                                                        alignItems="flex-end"
                                                        sx={{
                                                            color: 'secondary.main',
                                                            fontWeight: 'light',
                                                            fontSize: 13,
                                                            height:25
                                                        }}>
                                                        {item.commentInfo?.time}
                                                    </Box>
                                                </ThemeProvider>
                                            </Grid>
                                        </Grid>
                                    </List.Item>
                                )}
                            />
                        </div>
                }
            </div>)

    }
}