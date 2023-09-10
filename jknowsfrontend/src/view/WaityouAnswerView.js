import React from "react";
import {Link} from 'react-router-dom'
import {Menu, Dropdown, Space, Button, Modal, Input, message, List, Avatar, Divider, Row, Col} from 'antd';
import {Sidebar} from "../components/Sidebar";
import {
    DashboardOutlined,
    FireFilled,
    FormOutlined,
    LikeOutlined,
    MessageOutlined,
    StarOutlined,
    UserAddOutlined,
    HighlightOutlined, StarFilled,
} from '@ant-design/icons';
import "../css/answer.css"
import {getQuestions, getUnansweredQuestion} from "../service/questionService";
import IconButton from "@mui/material/IconButton";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {saveFollowQuestion, saveLikeQuestion} from "../service/DetailedQuestionService";


const userId = localStorage.getItem("userId")
const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
export class WaityouAnswerView extends React.Component{

    constructor(props){
        super(props);
        this.state={
            showQuestion:'',
            title:'',
            userId:'',
            content:'',
            time:'',
            tag1:'',
            tag2:'',
            tag3:'',
            tag4:'',
            tag5:'',
            follow:'',
            liked:'',
            answer:'',

        }}

    componentDidMount() {
        this.fetchunquestion();
    }
    handleLikeQuestion = (questionId,status,origin) =>{
        let newlist = [];
        for (let data of this.state.showQuestion){
            if(data.questionId === questionId){
                data.status = status;
                data.liked += status - origin;
            }
        newlist.push(data);}
        this.setState({
            showQuestion: newlist,
        })
        saveLikeQuestion(userId,questionId,status)


    }
    handleFollow = (questionId,status,origin) =>{
        let followlist = [];
        for (let data of this.state.showQuestion){
            if(data.questionId === questionId){
                data.followed = status;
                data.follow += status - origin;
            }
        followlist.push(data);}
        this.setState({
            showQuestion: followlist,
        })
        saveFollowQuestion(userId,questionId,status)


    }
   fetchunquestion=()=>{
        let questionlist = [];
        const callback = (data) => {
            console.log(data);
            for (let question of data){

                console.log("question",question);
                questionlist.push(
                    {   questionId:question.questionId,
                        title:question.title,
                        time:question.time,
                        content:question.content,
                        follow:question.follow,
                        liked:question.liked,
                        answer:question.answer,
                        status:0,
                        followed:0,
                    }
                );
            }
            this.setState(
                {
                    showQuestion:questionlist,
                }
            )
            console.log("un",this.state.showQuestion)
        }
        getUnansweredQuestion(20,callback);
        //getQuestions(1,10,callback);

    }

    render(){
    return(

        <div className={"background"}>
            <Row>
                <Col span={24}>
                    <Sidebar />
                </Col>

        </Row>

            <Space wrap className={"smallbar"}>

                <div className={"btnbar"}>
                    <Link to={{
                        pathname:'/answer',
                    }}>
                <Button   className={"ansbtn"} shape="round" icon={<FormOutlined />} size="large" type={"primary"}>
                    最新问题
                </Button>
                    </Link>
                     <Link to={{
                        pathname:'/answer/myQuestion',
                    }}>
                <Button   className={"ansbtn"} shape="round" icon={<FireFilled />} size="large">
                    我的问题
                </Button>
                     </Link></div>
            </Space>
            <br/>
            <br/>
            <div className={"root"}>

                <List
                    itemLayout="vertical"
                    size="large"
                    split="true"
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 10,
                    }}
                    align="left"
                    dataSource={this.state.showQuestion}
                    //dataSource={data}

                    renderItem={(item) => (
                            <List.Item

                                key={item.title}
                                actions={[

                                    item.status === 1?
                    <>

                    <IconButton  onClick={()=>{this.handleLikeQuestion(item.questionId,0,1)}} color='primary' size='small' sx={{backgroundColor:'#056DE8',color:'#ffffff',":hover":{backgroundColor: '#0461CF',color:'#ffffff'}}}>
                    <ArrowDropUpIcon />
                    </IconButton>
                    <Button color='primary' sx={{fontWeight:'bold'}} >已赞同 {item.liked}</Button>
                    <IconButton  onClick={()=>{this.handleLikeQuestion(item.questionId,-1,1)}} color='primary' size='small' sx={{backgroundColor:'#E6F0FD',color:'#056DE8',":hover":{backgroundColor: '#DAE9FC',color:'#056DE8'}}}>
                    <ArrowDropDownIcon />
                    </IconButton>
                    </>
                    :
                    item.status === -1?
                    <>

                    <IconButton onClick={()=>{this.handleLikeQuestion(item.questionId,1,-1)}}  color='primary' size='small' sx={{backgroundColor:'#E6F0FD',color:'#056DE8',":hover":{backgroundColor: '#DAE9FC',color:'#056DE8'}}}>
                    <ArrowDropUpIcon />
                    </IconButton>
                    <Button color='primary' sx={{fontWeight:'bold'}} >已点踩 {item.liked}</Button>
                    <IconButton  onClick={()=>{this.handleLikeQuestion(item.questionId,0,-1)}} color='primary' size='small' sx={{backgroundColor:'#056DE8',color:'#ffffff',":hover":{backgroundColor: '#0461CF',color:'#ffffff'}}}>
                    <ArrowDropDownIcon />
                    </IconButton>
                    </>
                    :
                    <>
                    <IconButton onClick={()=>{this.handleLikeQuestion(item.questionId,1,0)}} color='primary' size='small' sx={{backgroundColor:'#E6F0FD',color:'#056DE8',":hover":{backgroundColor: '#DAE9FC',color:'#056DE8'}}}>
                    <ArrowDropUpIcon />
                    </IconButton>
                    <Button color='primary' sx={{fontWeight:'bold'}} >赞同 {item.liked}</Button>
                    <IconButton onClick={()=>{this.handleLikeQuestion(item.questionId,-1,0)}} color='primary' size='small' sx={{backgroundColor:'#E6F0FD',color:'#056DE8',":hover":{backgroundColor: '#DAE9FC',color:'#056DE8'}}}>
                    <ArrowDropDownIcon />
                    </IconButton>
                    </>,
                    item.followed === 0 ?
                    <>
                    <Button  icon={<StarOutlined />} onClick={()=>{this.handleFollow(item.questionId,1,0)}}>
                        收藏 {item.follow}
                    </Button>
                    </>
                        :
                        <Button  type="primary" icon={<StarFilled /> } onClick={()=>{this.handleFollow(item.questionId,0,1)}}>
                        已收藏 {item.follow}
                    </Button>


                        ]
                            }
                                extra={
                                <Link to= {{
                                    pathname:'/writeans',
                                    search:'?id=' + item.questionId}}>

                                    <Button type={"primary"} size={"large"} icon={<HighlightOutlined />} className={"writebtn"}> 写回答  </Button>
                                </Link>
                            }
                            >
                                <Link to={{
                                    pathname: '/question',
                                    search: '?id=' + item.questionId}}
                                >
                                <List.Item.Meta


                                    title={item.title}


                                />
                                </Link>
                            </List.Item>


                    )}
                />

            </div>


        </div>

    )}

}