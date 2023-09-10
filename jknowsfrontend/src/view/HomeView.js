import {Avatar, Button, Carousel, Col, List, Modal, Row, Space} from 'antd';
import React from 'react';
import {MessageOutlined, LikeOutlined, StarOutlined, StarFilled, CommentOutlined,DeleteOutlined} from '@ant-design/icons';
import"../css/home.css"
import {Sidebar} from "../components/Sidebar";
import {Link} from "react-router-dom";
import {getQuestions,saveQuestion,deleteQuestion} from "../service/questionService";
import {getUser} from "../service/userService";
import IconButton from "@mui/material/IconButton";
import { Button  as ButtonMui} from '@mui/material';
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Grid from '@mui/material/Grid';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {saveFollowQuestion, saveLikeQuestion,isLikeQuestion,isFollowQuestion} from "../service/DetailedQuestionService";
import { Box } from '@mui/system';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {CaretDownOutlined} from '@ant-design/icons';
import Typography from '@mui/material/Typography';
import CommentIcon from "@mui/icons-material/Comment";
import c1 from '../assets/carousel/1.gif'
import c2 from '../assets/carousel/2.png'
import c3 from '../assets/carousel/3.png'
import c4 from '../assets/carousel/4.png'
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import remarkGfm from 'remark-gfm';
import rehypeMathJax from "rehype-mathjax";

const {EventEmitter} = require("events");
const eventEmitter = new EventEmitter();

//temp!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!

const userId = localStorage.getItem("userId")
const theme = createTheme({
    palette: {
      primary:{
        main:'#E0F2F1'
      },
      secondary: {
        main: '#E0F7FA',
      },
      warning:{
        main:'#E3F2FD'
      },
      success:{
        main:'#E8EAF6',
      },
      info:{
        main:'#EDE7F6',
      }
    },
  });

let tmpl = []
let tmpf = []

export class Homeclass extends React.Component {
    constructor(props){
        super(props);
        this.state={
            showQuestion:[],
            start:1,
            end:5,
            likeQuestion:[],
            followQuestion:[],
            isNewData:true,
            isFixed:false,
            isShow:false,
            deleteqID:-1,
            deleteqTitle:'',
            usertype:'',
        };
    }


    componentDidMount(){
        console.log("didmount")
        this.fetchquestion();
        tmpl=[];
        tmpf=[];
        window.addEventListener('scroll',this.handleScroll)
        getUser(localStorage.getItem("userId"),this.callbackUserInfo)

        // const fixedTop = document.getElementById('CAR').offsetTop;
        // window.onscroll = () => {
        //     let scrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop)
        //     //控制元素块A随鼠标滚动固定在顶部
        //     console.log(scrollTop - fixedTop)
        //     if (scrollTop >= fixedTop + 13) {
        //       this.setState({ isFixed: true })
        //     } else if (scrollTop < fixedTop) {
        //       this.setState({ isFixed: false })
        //     }
        //   }

    }
    callbackUserInfo=(data)=>{
        console.log(data)
        this.setState({usertype:data.type})
    }
    componentWillUnmount(){
        window.removeEventListener("scroll", this.handleScroll)
        // eventEmitter.removeAllListeners();
    }
    handleScroll =(e)=>{
        this.isTouchBottom(this.fetchmore)
    }

    handleCancelClick=(id,title)=>{
        // console.log(id)
        this.setState({isShow:true,deleteqID:id,deleteqTitle:title})
    }

    handleCancel=(data)=>{
        
        console.log(data)
        deleteQuestion(data)
        console.log(this.state.showQuestion)
        let x = this.state.showQuestion.concat()
        let a = x.findIndex(e=>e.questionId===data)
        x.splice(a,1)
        console.log(x)
        this.setState({isShow:false,
        showQuestion:x
    })
    }
    handleDelete=(id)=>{
        console.log(id);
        this.setState({isShow:false})
    }
    isTouchBottom = (handler) => {
        // 文档显示区域高度
        const showHeight = window.innerHeight;
        // 网页卷曲高度
        const scrollTopHeight =
            document.body.scrollTop || document.documentElement.scrollTop;
        // 所有内容高度
        const allHeight = document.body.scrollHeight;
        // (所有内容高度 = 文档显示区域高度 + 网页卷曲高度) 时即为触底
        // console.log(allHeight,showHeight + scrollTopHeight)
        if (allHeight <= showHeight + scrollTopHeight + 1) {
            handler();
        };
    };
    getQuestiondLikeAndFollow=(e)=>{
        // console.log(this.state.showQuestion)
        const callbackLike = (data)=>{
            
            // console.log(e,data)
            let fal = true
            for(let i =0;i<tmpl.length;i++){
                if(tmpl[i].questionId === e){
                    tmpl[i].liked = data
                    fal = false
                    break
                }
            }
            if(fal){
                tmpl.push({questionId:e,liked:data})
            }
            // console.log(tmpl)
            this.setState({likeQuestion:tmpl})
        }
        const callbackFollow = (data)=>{
            // console.log(e,data)
            let fal = true
            for(let i =0;i<tmpf.length;i++){
                if(tmpf[i].questionId === e){
                    tmpf[i].follow = data
                    fal = false
                    break
                }
            }
            if(fal){
                tmpf.push({questionId:e,follow:data})
            }
            // console.log(tmpf)
            this.setState({followQuestion:tmpf})
        }
        isLikeQuestion(userId,e,callbackLike)
        isFollowQuestion(userId,e,callbackFollow)
        
    }
    fetchquestion=()=>{
        this.setState({isNewData:true})
        let questionlist = [];
        const callback = (data) => {
            for (let question of data){
                this.getQuestiondLikeAndFollow(question.questionId)
                // console.log("question",question);
                let t = question.time.split(/[-T:.]/);
                let nt = question.time.slice(0, 10) + ' ' + String(new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]))).slice(16, 24)
                questionlist.push(
                    {   questionId:question.questionId,
                        title:question.title,
                        content:question.content,
                        follow:question.follow,
                        liked:question.liked,
                        answer:question.answer,
                        status:0,
                        followed:0,
                        time:nt,
                        questionUserId:question.userId,
                        tag1:question.tag1,
                        tag2:question.tag2,
                        tag3:question.tag3,
                        tag4:question.tag4,
                        tag5:question.tag5,
                    }
                );
            }
            this.setState(
                {
                    showQuestion:questionlist,
                }
            )
        }
        getQuestions(1,5,callback);

    }
    fetchmore = ()=>{
        let starting = this.state.start + 5;
        let ending = this.state.end + 5;
        let questionlist = this.state.showQuestion.concat()
        const callback = (data) => {
            for (let question of data){
                this.getQuestiondLikeAndFollow(question.questionId)
                // console.log("question",question);
                let t = question.time.split(/[-T:.]/);
                let nt = question.time.slice(0, 10) + ' ' + String(new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]))).slice(16, 24)
                
                questionlist.push(
                    {   questionId:question.questionId,
                        title:question.title,
                        content:question.content,
                        follow:question.follow,
                        liked:question.liked,
                        answer:question.answer,
                        status:0,
                        followed:0,
                        time:nt,
                        questionUserId:question.userId,
                        tag1:question.tag1,
                        tag2:question.tag2,
                        tag3:question.tag3,
                        tag4:question.tag4,
                        tag5:question.tag5,
                    }
                );
            }
            this.setState(
                {
                    start:starting,
                    end:ending,
                    showQuestion:questionlist,
                    isNewData:true,
                }
            )
        }
        console.log("123")
        getQuestions(starting,ending,callback);

    }
    handleLikeQuestion = (questionId,status,origin) =>{
        let newlist = [];
        for (let data of this.state.showQuestion){
            if(data.questionId === questionId){
                data.status = status;
                data.liked += status - origin;
            }
        newlist.push(data);
        }
        let tmpl = this.state.likeQuestion.concat()
        for(let i of tmpl){
            if(i.questionId === questionId){
                i.liked = status;
            }
        }
        this.setState({
            showQuestion: newlist,
            likeQuestion:tmpl
        })
        saveLikeQuestion({userId:userId,questionId:questionId,liked:status})


    }
    handleFollow = (questionId,status,origin) =>{
        let followlist = [];
        for (let data of this.state.showQuestion){
            if(data.questionId === questionId){
                data.followed = status;
                data.follow += status - origin;
            }
        followlist.push(data);}
        let tmpf = this.state.followQuestion.concat()
        for(let i of tmpf){
            if(i.questionId === questionId){
                i.follow = status;
            }
        }

        this.setState({
            showQuestion: followlist,
            followQuestion:tmpf
        })
        saveFollowQuestion({userId:userId,questionId:questionId,follow:status})


    }
    
    setSearch=(data)=>{
        localStorage.setItem("search",data);
    }

    render(){
        // console.log(this.state.likeQuestion,this.state.followQuestion,this.state.showQuestion,this.state.isNewData,this.state.end)
        // console.log(this.state.isNewData)
        // console.log(this.state.isFixed)
        if(this.state.likeQuestion.length===this.state.end&&this.state.followQuestion.length===this.state.end
            &&this.state.showQuestion.length===this.state.end&&this.state.isNewData){
                console.log('ready',this.state.showQuestion.length)
                let tmps = this.state.showQuestion.concat()
                for(let i in this.state.likeQuestion){
                    tmps.find(e=>e.questionId===this.state.likeQuestion[i].questionId).status = this.state.likeQuestion[i].liked
                }
                for(let i in this.state.followQuestion){
                    tmps.find(e=>e.questionId===this.state.followQuestion[i].questionId).followed = this.state.followQuestion[i].follow
                }
                this.setState({
                    isNewData:false,
                    showQuestion:tmps
                })
        }
        return(

        <div className={"background"}>
            <Row>
                <Col span={24}>
                    <Sidebar setSearch={this.setSearch}/>
                </Col>

        </Row>
        <Grid container spacing={2}>
        <Grid item xs={7.65} sx={{mt:1}}>
        <Box sx={{ bgcolor: '#ffffff',ml:32 }} >
                <List
                    itemLayout="vertical"
                    size="large"
                    align="left"
                    dataSource={this.state.showQuestion}
                    //dataSource={data}

                    renderItem={(item) => (
                            <List.Item
                                key = {item.content}


                                actions={[

                                    item.status === 1?
                    <>
                    <ButtonMui color='primary' startIcon={<ArrowDropUpIcon />} 
                    onClick={()=>{this.handleLikeQuestion(item.questionId,0,1)}} 
                    sx={{backgroundColor:'#056DE8',color:'#ffffff',mr:0.5,pr:1,fontSize:14,pl:1,
                    ":hover":{backgroundColor: '#0461CF',color:'#ffffff'}}}>
                    已赞同 {item.liked}</ButtonMui>
                    <ButtonMui color='primary' startIcon={<ArrowDropDownIcon />} 
                    style={{maxWidth: '30px',  minWidth: '30px',maxHeight:'38px',minHeight:'38px'}}
                    onClick={()=>{this.handleLikeQuestion(item.questionId,-1,1)}} 
                    sx={{backgroundColor:'#E6F0FD',color:'#056DE8',pl:2.45,
                    ":hover":{backgroundColor: '#DAE9FC',color:'#056DE8'}}}>
                    </ButtonMui>
                    </>
                    :
                    item.status === -1?
                    <>
                    <ButtonMui color='primary' startIcon={<ArrowDropUpIcon />} 
                    onClick={()=>{this.handleLikeQuestion(item.questionId,1,-1)}} 
                    sx={{backgroundColor:'#E6F0FD',color:'#056DE8',mr:0.5,pr:1,fontSize:14,pl:1,
                    ":hover":{backgroundColor: '#DAE9FC',color:'#056DE8'}}}>
                    已点踩 {item.liked}</ButtonMui>
                    <ButtonMui color='primary' startIcon={<ArrowDropDownIcon />} 
                    style={{maxWidth: '30px',  minWidth: '30px',maxHeight:'38px',minHeight:'38px'}}
                    onClick={()=>{this.handleLikeQuestion(item.questionId,0,-1)}} 
                    sx={{backgroundColor:'#056DE8',color:'#ffffff',pl:2.45,
                    ":hover":{backgroundColor: '#0461CF',color:'#ffffff'}}}>
                    </ButtonMui>
                    </>
                    :
                    <>
                    <ButtonMui color='primary' startIcon={<ArrowDropUpIcon />} 
                    onClick={()=>{this.handleLikeQuestion(item.questionId,1,0)}} 
                    sx={{backgroundColor:'#E6F0FD',color:'#056DE8',mr:0.5,pr:1,fontSize:14,pl:1,
                    ":hover":{backgroundColor: '#DAE9FC',color:'#056DE8'}}}>
                    赞同 {item.liked}</ButtonMui>
                    <ButtonMui color='primary' startIcon={<ArrowDropDownIcon />} 
                    style={{maxWidth: '30px',  minWidth: '30px',maxHeight:'38px',minHeight:'38px'}}
                    onClick={()=>{this.handleLikeQuestion(item.questionId,-1,0)}} 
                    sx={{backgroundColor:'#E6F0FD',color:'#056DE8',pl:2.45,
                    ":hover":{backgroundColor: '#DAE9FC',color:'#056DE8'}}}>
                    </ButtonMui>
                    </>,
                    item.followed === 0 ?
                    <>
                    <Button  icon={<StarOutlined />} type={'text'} onClick={()=>{this.handleFollow(item.questionId,1,0)}}>
                        收藏 {item.follow}
                    </Button>
                    </>
                        :
                        <Button  icon={<StarFilled /> } type={'text'} onClick={()=>{this.handleFollow(item.questionId,0,1)}}>
                        已收藏 {item.follow}
                    </Button>,
                    <Link to={{
                        pathname: '/question',
                        search: '?id=' + item.questionId}}
                    >
                    <Button  type="text"  size="medium" icon={<CommentOutlined  />} >
                        {item.answer} 个回答
                    </Button>
                    </Link>,
                    this.state.usertype===1?
                    <Button  type="text"  size="medium" icon={<DeleteOutlined />} onClick={()=>{this.handleCancelClick(item.questionId,item.title)}}>
                        删除问题
                    </Button>:null,
                    <Modal open={this.state.isShow} onOk={()=>{this.handleCancel(this.state.deleteqID)}} onCancel={this.handleCancel} width={400}>
                        <p>确定删除该问题:</p>
                        <p style={{fontSize:"22px"}}>{this.state.deleteqTitle}</p>
                    </Modal>
                        ]
                            }>



                                   <Link to={{
                            pathname: '/question',
                            search: '?id=' + item.questionId}}
                        >
                                <List.Item.Meta
                                    title={
                                        <Typography  sx={{fontWeight:'bold',fontSize:21}}>
                                        {item.title}
                                        </Typography>
                                    }
                                    description={item.time}

                                />
                                       </Link>

                                <Typography  sx={{fontSize:15}}>
                                    <ReactMarkdown className={'markdown-body'} children={item.content}
                                                   remarkPlugins={[remarkMath,remarkGfm]}
                                                   rehypePlugins={[rehypeMathJax,rehypeRaw]}
                                                   escapeHtml={true}/>
                                </Typography>
                                
                                <ThemeProvider theme={theme}>
                                <Stack direction="row" spacing={1} sx={{mt:1.5}}>
                                    {item.tag1!==''?
                                    <Chip label={item.tag1} color="primary" />
                                    :
                                    null
                                    }
                                    {item.tag2!==''?
                                    <Chip label={item.tag2} color="secondary"/>
                                    :
                                    null
                                    }
                                    {item.tag3!==''?
                                    <Chip label={item.tag3} color="warning"  />
                                    :
                                    null
                                    }
                                    {item.tag4!==''?
                                    <Chip label={item.tag4} color="success"  />
                                    :
                                    null
                                    }
                                    {item.tag5!==''?
                                    <Chip label={item.tag5} color="info"  />
                                    :
                                    null
                                    }
                                </Stack>
                                </ThemeProvider>
                            </List.Item>

                    )}
                />
            </Box>
            </Grid>
            {/* <div style={{position:this.state.isFixed?'fixed':'default'}}  id='CAR'> */}
            <Grid item xs={3} sx={{
                // mt:this.state.isFixed?-10:1,
                pl:10,pr:10,mt:1,ml:-1
                // ml:121,
                // border:1,
                // position:this.state.isFixed?'fixed':'absolute'
            
                }} 
                id='CAR'
                >
            <Carousel 
            autoplay
            >
                <div>
                    {/* <h3 style={contentStyle}>1</h3> */}
                    <img src={c1} style={{ width: '100%'}}></img>
                </div>
                <div>
                    <img src={c2} style={{ width: '100%'}}></img>
                </div>
                <div>
                    <img src={c3} style={{ width: '100%'}}></img>
                </div>
                <div>
                    <img src={c4} style={{ width: '100%'}}></img>
                </div>
            </Carousel>
          </Grid>
          {/* </div> */}
        </Grid>
        </div>)

        }



}
export default Homeclass;