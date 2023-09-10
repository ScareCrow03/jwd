import * as React from 'react';
import {useState} from "react";
import { useRef } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import remarkGfm from 'remark-gfm';
import rehypeMathJax from "rehype-mathjax";
import 'github-markdown-css';

import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Paper from '@mui/material/Paper';
import MuiAlert from '@mui/material/Alert';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import ReplyIcon from '@mui/icons-material/Reply';
import CreateIcon from '@mui/icons-material/Create';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/system';


import {List, Space, message, Modal  } from 'antd';
import {Button as ButtonAnt}  from 'antd';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { Input } from 'antd';
import { Carousel } from 'antd';

import VirtualList from 'rc-virtual-list';

import copy from 'copy-to-clipboard';

import {Link} from 'react-router-dom';


import { getAnswer, getComment, getQuestion, isFollowQuestion, isLikeQuestion, 
    saveLikeQuestion,saveFollowQuestion, isLikeAnswer, saveLikeAnswer,getAnswers, isLikeComment, 
    saveLikeComment, saveComment, deleteAnswer, deleteComment, getUser, 
    inviteUser, addMessage} from '../service/DetailedQuestionService';
import {deleteQuestion} from "../service/questionService";

import noReply from '../assets/noReply.jpg'
import c1 from '../assets/carousel/1.gif'
import c2 from '../assets/carousel/2.png'
import c3 from '../assets/carousel/3.png'
import c4 from '../assets/carousel/4.png'


//temp!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// const userType = 1
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!




const { TextArea } = Input;

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

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







export default function PrimaryDetailedBody() {
    const userId = localStorage.getItem("userId")
    const ContainerHeight = 400;
    const navi = useNavigate()

    const [messageApi, contextHolder] = message.useMessage();
    const [comment,setComment] = useState([]);
    const [open, setOpen] = React.useState(false);  //mui snackbar 1 (success copied message)
    const [open2, setOpen2] = React.useState(false);  //mui snackbar 2 (warning reply not null message)
    const [Questiondata,setQuestiondata] = React.useState({});
    const [ChipData,setChipData] = React.useState([]);
    const [CommentData,setCommentData] = React.useState([]);
    const [Answerdata,setAnswerdata] = React.useState([]);
    const [likedQuestion,setlikedQuestion] = React.useState(0);
    const [followQuestion,setFollowQuestion] = React.useState(false);
    const [likedAnswer,setlikedAnswer] = React.useState([]);
    const [likedComment,setlikedComment] = React.useState([]);
    const [response,setResponse] = React.useState([]);
    const [inviteUserData,setInviteUserData] = React.useState([]);
    const [replyBar,setReplyBar] = React.useState(false); //antd input bar
    const [userInfo,setUserInfo] = React.useState({});
    const [inviteUserNumber,setInviteUserNumber]= React.useState(1);

    const replyUserRef = React.createRef()
    const replyRef = useRef(null)

    let tmpla = []
    let tmplc = likedComment.concat()

    const [search] = useSearchParams()
    const questionId = search.get('id')

    const callbackQuestionData=(data)=>{
        // console.log(data)
        setQuestiondata({title:data.title,
            answerNum:data.answer,
            content:data.content,
            //TODO:replace like with liked
            likeNum:data.liked,
            followNum:data.follow,
            questionId:data.questionId
        })
        let tmpc=[]
        if(data.tag1!==""){
            tmpc[0]={key:0,tag:data.tag1}
        }
        if(data.tag2!==""){
            tmpc[1]={key:1,tag:data.tag2}
        }
        if(data.tag3!==""){
            tmpc[2]={key:2,tag:data.tag3}
        }
        if(data.tag4!==""){
            tmpc[3]={key:3,tag:data.tag4}
        }
        if(data.tag5!==""){
            tmpc[4]={key:4,tag:data.tag5}
        }
        setChipData(tmpc)
    }
    const callbackAnswerData=(data)=>{
        // console.log(Answerdata)
        // console.log(data)
        let tmpa = []
        tmpa = data.concat()
        for(let i=0;i<tmpa.length;i++){
            let t = tmpa[i].time.split(/[-T:.]/);
            tmpa[i].time = tmpa[i].time.slice(0, 10) + ' ' + String(new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]))).slice(16, 24)
        }
        // console.log(Answerdata)
        setAnswerdata(Answerdata.concat(tmpa))
        let tmpcomment = []
        let tmpCommentdata = []
        for(let i =0 ;i<data.length;i++){
            tmpcomment[i] = {state:false,answerId:data[i].answerId}
            tmpCommentdata[i] = {answerId:data[i].answerId,comments:[]}
        }
        // console.log('*')
        setComment(comment.concat(tmpcomment))
        setCommentData(CommentData.concat(tmpCommentdata))
        for(let i=0;i<data.length;i++){
            isLikeAnswer(userId,data[i].answerId,callbackLikeAnswer) 
        }
    
    }
    const callbackCommentData=(data)=>{
        // console.log(data)
        let tmpc = CommentData.concat()
        let tmpr = response.concat()
        // console.log(data[0].content)
        if(data[0].content!==null){
            
            // console.log(tmpc)
            for(let i=0;i<tmpc.length;i++){
                if(tmpc[i].answerId === data[0].answerId){
                    // console.log(i)
                    if(tmpc[i].comments.length === 0){
                        let tmpa = []
                        tmpa = data.concat()
                        for(let i=0;i<tmpa.length;i++){
                            let t = tmpa[i].time.split(/[-T:.]/);
                            tmpa[i].time = tmpa[i].time.slice(0, 10) + ' ' + String(new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]))).slice(16, 24)
                        }
                        tmpc[i].comments = tmpa
                    }else{
                        tmpc[i].comments = []
                    }
                    break;
                }
            }
            for(let i=0;i<data.length;i++){
                let x =tmpr.findIndex(e=>e.commentId===data[i].commentId)
                if(x===-1){
                    tmpr.push({state:0,commentId:data[i].commentId})
                }else{
                    if(comment.find(e=>e.answerId===data[i].answerId).state===false){
                        tmpr.splice(x,1)
                    }
                    
                }
                isLikeComment(userId,data[i].commentId,(data2)=>callbackLikeComment(data2,data[i].commentId,data[i].answerId))
            }
            setResponse(tmpr)
        }else{
            // console.log('*')
            for(let i=0;i<tmpc.length;i++){
                if(tmpc[i].answerId === data[0].answerId){
                    if(tmpc[i].comments.length === 0){
                        tmpc[i].comments = [{none:"none"}]
                    }else{
                        tmpc[i].comments = []
                    }
                }
            }
        }

        setCommentData(tmpc)
        console.log(tmpc)
        
    }

    const callbackCommentDataNew=(data)=>{
        // console.log(comment,response,CommentData)
        // console.log(data)
        let tmpc = CommentData.concat()
        let tmpr = response.concat()
        for(let i=0;i<tmpc.length;i++){
            if(tmpc[i].answerId === data[0].answerId){
                let tmpa = []
                tmpa = data.concat()
                for(let i=0;i<tmpa.length;i++){
                    let t = tmpa[i].time.split(/[-T:.]/);
                    tmpa[i].time = tmpa[i].time.slice(0, 10) + ' ' + String(new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]))).slice(16, 24)
                }
                tmpc[i].comments = tmpa
                break;
            }
        }
        for(let i=0;i<data.length;i++){
            let x =tmpr.findIndex(e=>e.commentId===data[i].commentId)
            if(x===-1){
                tmpr.push({state:0,commentId:data[i].commentId})
            }else{
                tmpr[x].state = 0
            }
            isLikeComment(userId,data[i].commentId,(data2)=>callbackLikeComment(data2,data[i].commentId,data[i].answerId))
        }
        setResponse(tmpr)
        setCommentData(tmpc)
    }
    const callbackLikeQuestion=(data)=>{
        console.log(data)
        setlikedQuestion(data)       
    }
    const callbackFollowQuestion=(data)=>{
        // console.log(data)
        if(data===1){
            setFollowQuestion(true)
        }else{
            setFollowQuestion(false)
        }
        
    }
    const callbackLikeAnswer=(data)=>{
         console.log(data)
        let fal = true
        for(let i =0;i<tmpla.length;i++){
            if(tmpla[i].answerId === data.answerId){
                tmpla[i].result = data.result
                fal = false
                break
            }
        }
        if(fal){
            tmpla.push({answerId:data.answerId,result:data.result})
        }
        console.log(tmpla,likedAnswer)
        setlikedAnswer(likedAnswer.concat(tmpla))
    }
    const callbackLikeComment=(data,commentId,answerId)=>{
        let fal = true
        for(let i =0;i<tmplc.length;i++){
            if(tmplc[i].commentId === commentId){
                if(comment.find(e=>e.answerId===answerId).state===false){
                    tmplc.splice(i,1)
                }
                fal = false
                break
            }
        }
        if(fal){
            tmplc.push({commentId:commentId,result:data})
        }
        setlikedComment(tmplc)
    }
    const callbackSaveComment=(answerId)=>{
        // console.log('*')
        getComment(answerId,callbackCommentDataNew)
    }
    const callbackUserInfo=(data)=>{
        console.log(data)
        let tmpu = {avatar:data.avatar,type:data.type}
        setUserInfo(tmpu)
    }
    
    const isTouchBottom = (handler) => {
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

    const handleLoadMore = () => {
        console.log('触底！')
        let x = Answerdata.length
        // let x = 3
        // console.log(x)        
        getAnswers(questionId,x+1,callbackAnswerData);
    };

    const handleScroll =(e)=>{
        isTouchBottom(handleLoadMore)
    }
    

    React.useEffect(()=>{
        console.log(userId,questionId)
        getQuestion(questionId,callbackQuestionData)
        getAnswers(questionId,1,callbackAnswerData)
        isLikeQuestion(userId,questionId,callbackLikeQuestion)
        isFollowQuestion(userId,questionId,callbackFollowQuestion)
        getUser(userId,callbackUserInfo)
        
        
    },[])

    React.useEffect(()=>{
        if(Answerdata.length!==0 && likedAnswer.length!==0){
            window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }
    },[Answerdata,likedAnswer])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);

    };
    const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen2(false);

    };
    const handleClick = () => {
        console.info('You clicked the Chip.');
      };

    const handleShare = (e) => {
        e.preventDefault()
        console.log(window.location.href)
        copy(window.location.href)
        setOpen2(false)
        setOpen(true)
    } 
    const handleClickComment = (item) => {
        // console.info(item);
        getComment(item,callbackCommentData)
        var newc = comment.concat()
        for(let i=0;i<newc.length;i++){
            if(newc[i].answerId===item){
                newc[i].state ===false ? newc[i].state = true: newc[i].state = false
                break
            }
        }
        setComment(newc)
        // console.log(comment)
    };
    const handleClickDelete = (item) => {
        // console.info(item);
        showDeleteSuccess()
        deleteAnswer(item) // answerId
        let tmpa = Answerdata.concat()
        let x = tmpa.find(e=>e.answerId===item)
        x.comment = 0
        x.content = "此回答已删除"
        x.liked = 0
        setAnswerdata(tmpa)
    };
    const handleClickDeleteReply= (item,answerId) => {
        console.info(item);
        showDeleteReplySuccess()
        deleteComment(item) // commentId
        let tmpc = CommentData.concat()
        let y = tmpc.find(e=>e.answerId===answerId).comments
        let x = y.find(e=>e.commentId ===item)
        x.content = "此回复已删除"
        x.liked = 0
        setCommentData(tmpc)
        let tmpa = Answerdata.concat()
        tmpa.find(e=>e.answerId === answerId).comment--;
        setAnswerdata(tmpa)
    };
    const handleLikeQuestion = (item) => {
        // console.log(item)
        let i =item.origin
        delete item.origin
        // console.log(item)
        saveLikeQuestion(item)
        setlikedQuestion(item.liked)
        let tmpq = Questiondata;
        tmpq.likeNum += item.liked - i;
        setQuestiondata(tmpq)
        
    }
    const handleFollowQuestion = (item) => {
        // console.log(item)
        saveFollowQuestion(item)
        followQuestion===true?setFollowQuestion(false):setFollowQuestion(true)
        let tmpq = Questiondata;
        followQuestion===true?tmpq.followNum--:tmpq.followNum++
        setQuestiondata(tmpq)
        
    }
    const handleLikeAnswer = (answerId,status,origin)=>{
        // console.log(answerId,status,origin)
        saveLikeAnswer(userId,answerId,status)
        // console.log(likedAnswer,Answerdata)
        let tmpla2 = likedAnswer.concat()
        let tmpa2 = Answerdata.concat()
        for(let i=0;i<tmpla2.length;i++){
            if(tmpla2[i].answerId === answerId){
                tmpla2[i].result = status
                break
            }
        }
        for(let i=0;i<tmpa2.length;i++){
            if(tmpa2[i].answerId === answerId){
                tmpa2[i].liked += status - origin
                break
            }
        }
        setlikedAnswer(tmpla2) 
        setAnswerdata(tmpa2)
    }
    const handleLikeComment = (answerId,commentId,status)=>{
        console.log(answerId,commentId,status)
        saveLikeComment(userId,commentId,status)
        let tmplc2 = likedComment.concat()
        let tmpc2 = CommentData.concat()
        for(let i=0;i<tmplc2.length;i++){
            if(tmplc2[i].commentId === commentId){
                tmplc2[i].result = status
                break
            }
        }
        for(let i=0;i<tmpc2.length;i++){
            if(tmpc2[i].answerId === answerId){
                for(let j=0;j<tmpc2[i].comments.length;j++){
                    if(tmpc2[i].comments[j].commentId===commentId){
                        status===1?tmpc2[i].comments[j].liked++:tmpc2[i].comments[j].liked--
                        break
                    }
                }
            }
        }
        setlikedComment(tmplc2) 
        setCommentData(tmpc2)
    }
    const handleResponse = (commentId)=>{
        let tmpr = response.concat()
        console.log(tmpr)
        let x = tmpr.findIndex(e=>e.commentId===commentId)
        for(let i=0;i<tmpr.length;i++){
            if(i===x){
                tmpr[i].state = 1 - tmpr[i].state;
            }else{
                tmpr[i].state = 0;
            }
        }
        setResponse(tmpr)
    }
    const handleSaveComment = (answerId, responseId, content)=>{
        console.log(answerId, responseId, content)
        // console.log(content.length)
        if(content.length===0){
            setOpen(false)
            setOpen2(true)
            return
        }else{ 
            replyBar===true?setReplyBar(false):setReplyBar(true) 
            saveComment(userId,answerId,responseId,content,()=>callbackSaveComment(answerId))
            showMessageSuccess()
            let tmpc= comment.concat()
            tmpc.find(e=>e.answerId===answerId).state=true
            setComment(tmpc)
            let tmpa = Answerdata.concat()
            tmpa.find(e=>e.answerId===answerId).comment++;
            setAnswerdata(tmpa)

        }
    }
    const handleInvite = () => {
        let x = inviteUserNumber
        console.log(x)        
        inviteUser(questionId,x,x+6,handleRandomUsers);
        setInviteUserNumber(x+7)
    }
    const handleRandomUsers = (item) => {
        console.log(item)
        for(let i =0;i<item.length;i++){
            item[i].invitestate = false
        }
        setInviteUserData(inviteUserData.concat(item))
    }

    const showMessageSuccess = () => {
        messageApi.open({
            type: 'success',
            content: '评论发送成功！'
        })
      
    };
    const showDeleteSuccess = () => {
        messageApi.open({
            type: 'success',
            content: '回答删除成功！'
        })
      
    };
    const showDeleteReplySuccess = () => {
        messageApi.open({
            type: 'success',
            content: '回复删除成功！'
        })
      
    };

    const onScroll = (e) => {
        // console.log(e.currentTarget.scrollHeight - e.currentTarget.scrollTop)
        if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop <= ContainerHeight + 1) {
          console.log('***')
          handleInvite()
        }
      };
    
    const handleModalCancel =()=>{
        // console.log('*')
        setInviteUserData([]);
    }
    const handleInviteAction = (item)  =>{
        console.log(item)
        addMessage(userId,item,questionId);
        let tmpid = inviteUserData.concat()
        tmpid.find(e=>e.userId===item).invitestate=true
        setInviteUserData(tmpid)

    }
    const handleDeleteQuestion = () =>{
        deleteQuestion(Questiondata.questionId)
        navi('/',{replace:true})
    }

    
    

    // console.log('start!!!!!!')
    // console.log(likedAnswer)
    // console.log(followQuestion)
    // console.log(likedQuestion)
    // console.log(Questiondata)
    // console.log(Object.keys(Questiondata).length)
    // console.log(Answerdata)
    // console.log(comment)
    // console.log(CommentData)
    // console.log(likedComment)
    // console.log(response)
    // console.log(userInfo)
    // console.log(inviteUserData)
    // console.log('end!!!!!!')

    return (

            Object.keys(Questiondata).length===0?
            <Box
            height={640}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems:"center",
                backgroundColor:'#ffffff',
            }}
            >
                <Typography variant='h2'>
                    这里似乎没有你想看的问题……
                </Typography>  
            </Box>
            :
            <>
        
         <Box sx={{ bgcolor: '#ffffff' }} >
         
        
         <Grid container spacing={2} sx={{pl:32}}>
        <Grid item xs={7} >
         <Stack
            sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                listStyle: 'none',
                p: 0.5,
                ml: -1,
                mr:0,
                mt:0,
                mb:0,
            }}
            component="ul"
            direction='row'
        >
         {ChipData.map((data) => {
        return (
          <ListItem key={data.key}>
            <Chip
              label={data.tag}   
              variant="outlined" color="info" onClick={handleClick} />
          </ListItem>
        );
      })}
       </Stack>
        <Typography variant="h5" gutterBottom sx={{fontWeight:'bold'}}>
          {Questiondata.title}
        </Typography>
        <Typography variant="body1" gutterBottom sx={{mt:1,mb:2}}>
            <ReactMarkdown className={'markdown-body'} children={Questiondata.content}
                           remarkPlugins={[remarkMath,remarkGfm]}
                           rehypePlugins={[rehypeMathJax,rehypeRaw]}
                           escapeHtml={true}/>
        </Typography>
        </Grid>
        <Grid item xs={5}>
            <ThemeProvider theme={theme}>
            <Typography color='secondary' sx={{fontSize:14,ml:11.2}}>
            关注者
            </Typography>
            </ThemeProvider>
        
        <Box width={70} sx={{ml:9.5,textAlign:'center'}}>
        <Typography  gutterBottom sx={{fontWeight:'bold',fontSize:20}}>
            {Questiondata.followNum}
            </Typography>
        </Box>
        </Grid>
        </Grid>



        <Stack  direction="row" sx={{pl:32}}>
            {followQuestion ?
            <ThemeProvider theme={theme}>
                <Button color="success" variant="contained" size="medium" 
                sx={{mr:1}}
                onClick={(e) => handleFollowQuestion({userId:userId,questionId:Questiondata.questionId,follow:0})}
                >已关注</Button>
            </ThemeProvider>
            :
            <Button variant="contained" size="medium" 
            sx={{mr:1}}
            onClick={(e) => handleFollowQuestion({userId:userId,questionId:Questiondata.questionId,follow:1})}
            >关注问题</Button>
        }
          <Link to={{
                            pathname: '/writeans',
                            search: '?id=' + Questiondata.questionId}}
                style={{textDecoration:'none'}}
                        > 
          <Button variant="outlined" size="medium" startIcon={<CreateIcon />}
          sx={{mr:1}}>写回答</Button>
          </Link>
          
          <ThemeProvider theme={theme}>
          <ModalForm
            modalProps={{
                onCancel:handleModalCancel,
            }}
            title="你可以邀请下面用户，快速获得回答"
            trigger={<Button color="secondary" variant="outlined" size="medium" sx={{mr:2}}
            onClick={()=>handleInvite()} startIcon={<PersonAddAlt1Icon />}>邀请回答</Button>}
            submitter={false}
      > 
      {
        inviteUserData.length===0?
        null
        :
        <List>
        <VirtualList
          data={inviteUserData}
          height={ContainerHeight}
          itemHeight={47}
          itemKey="userId"
          onScroll={onScroll}
        >
          {(item) => (
            <List.Item
            key={item.userId}
            actions={
                item.invitestate===false?
                [<ButtonAnt onClick={(e)=>handleInviteAction(item.userId)}>邀请回答</ButtonAnt>]
                :
                [<ButtonAnt disabled>已邀请</ButtonAnt>]
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar}  sx={{ width: 38, height: 38 }} variant="rounded"/>}
              title={item.nickname}
              description={item.description}
            />
            </List.Item>
          )}
        </VirtualList>
      </List>
      }

      </ModalForm>




          
          {likedQuestion===1 ? 
           <>
           <Button color="warning"  size="medium" 
           onClick={(e) => handleLikeQuestion({userId:userId,questionId:Questiondata.questionId,liked:0,origin:1})} 
           startIcon={<ThumbUpIcon />}>好问题{Questiondata.likeNum}</Button>
           <Button color="secondary"  size="medium" 
           onClick={(e) => handleLikeQuestion({userId:userId,questionId:Questiondata.questionId,liked:-1,origin:1})} 
           startIcon={<ThumbDownIcon/>}
           style={{maxWidth: '30px',  minWidth: '30px'}}
           sx={{pl:2.5,mr:2,ml:-0.5}}></Button>
           </>
           :
           likedQuestion===0?
           <>
           <Button color="secondary"  size="medium" 
           onClick={(e) => handleLikeQuestion({userId:userId,questionId:Questiondata.questionId,liked:1,origin:0})} 
           startIcon={<ThumbUpIcon />}>好问题{Questiondata.likeNum}</Button>
           <Button color="secondary"  size="medium" 
           onClick={(e) => handleLikeQuestion({userId:userId,questionId:Questiondata.questionId,liked:-1,origin:0})} 
           startIcon={<ThumbDownIcon/>}
           style={{maxWidth: '30px',  minWidth: '30px'}}
           sx={{pl:2.5,mr:2,ml:-0.5}}></Button>
           </>
           :
           <>
           <Button color="secondary"  size="medium" 
           onClick={(e) => handleLikeQuestion({userId:userId,questionId:Questiondata.questionId,liked:1,origin:-1})} 
           startIcon={<ThumbUpIcon />}>已点踩{Questiondata.likeNum}</Button>
           <Button color="warning"  size="medium" 
           onClick={(e) => handleLikeQuestion({userId:userId,questionId:Questiondata.questionId,liked:0,origin:-1})} 
           startIcon={<ThumbDownIcon/>}
           style={{maxWidth: '30px',  minWidth: '30px'}}
           sx={{pl:2.5,mr:2,ml:-0.5}}></Button>
           </>
          }
         
          <Button color="secondary"  size="medium" startIcon={<CommentIcon />} sx={{mr:1}}>{Questiondata.answerNum}个回答</Button>
          <Button color="secondary"  size="medium" sx={{mr:1}}
           onClick={(e) => handleShare(e)} startIcon={<ShareIcon />}>分享链接</Button>
            {userInfo.type===1?
          <Button color="error"  size="medium" startIcon={<DeleteIcon />} sx={{mr:1}} onClick={handleDeleteQuestion}>删除问题</Button>
          :
          null}
          </ThemeProvider>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                已复制链接到剪切板
            </Alert>
          </Snackbar>
          </Stack>
          
          
          <Box sx={{ bgcolor: '#ffffff', height: '3vh' }} />
         </Box>
         <Grid container spacing={2}>
        <Grid item xs={7.65} sx={{mt:1}}>
            <Box sx={{ bgcolor: '#ffffff',ml:32 }} >
        <List
    itemLayout="vertical"
    size="large"
    dataSource={Answerdata}
    renderItem={(item) => (
      <List.Item
        key={item.answerId}
      >
        <List.Item.Meta
          avatar={
            <Link to={{
                pathname: '/profile',
                search: '?id=' + item.userId}}>
          <Avatar src={item.userInfo.avatar}  sx={{ width: 38, height: 38 }} variant="rounded"/>
          </Link>
        }
          title={
            <Link to={{
                pathname: '/profile',
                search: '?id=' + item.userId}}>
            {item.userInfo.nickname}
            </Link>}
          
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
                    fontSize: 16,
                    }} onClick={()=>{
                console.log(item.content)}}>
                <ReactMarkdown className={'markdown-body'} children={item.content}
                 remarkPlugins={[remarkMath,remarkGfm]}
                               rehypePlugins={[rehypeMathJax,rehypeRaw]}
                               escapeHtml={true}/>
                </Box>
            </div>
        </Space>
        <ThemeProvider theme={theme}>
        <Box
          sx={{
            color: 'secondary.main',
            display: 'flex',
            fontWeight: 'light',
            fontSize: 14,
            mt:1
          }}
        >
        {item.time}
        </Box>
        </ThemeProvider>
        <Grid container sx={{mt:1}} height={35}>
        <Grid item xs={8}>
            {
                typeof(likedAnswer.find(e=>e.answerId===item.answerId))==='undefined'?null:
                likedAnswer.find(e=>e.answerId===item.answerId).result===1?
                    <>
                    <IconButton  onClick={()=>{handleLikeAnswer(item.answerId,0,1)}} color='primary' size='small' 
                    sx={{backgroundColor:'#056DE8',color:'#ffffff',":hover":{backgroundColor: '#0461CF',color:'#ffffff'}}}>
                    <ArrowDropUpIcon />
                    </IconButton>
                    <Button color='primary' sx={{fontWeight:'bold',ml:0.5,mr:0.5}} >已赞同 {item.liked}</Button>
                    <IconButton  onClick={()=>{handleLikeAnswer(item.answerId,-1,1)}} color='primary' size='small' sx={{backgroundColor:'#E6F0FD',color:'#056DE8',":hover":{backgroundColor: '#DAE9FC',color:'#056DE8'}}}>
                    <ArrowDropDownIcon />
                    </IconButton>
                    </>
                    :
                    likedAnswer.find(e=>e.answerId===item.answerId).result===-1?
                    <>
                    <IconButton onClick={()=>{handleLikeAnswer(item.answerId,1,-1)}}  color='primary' size='small' sx={{backgroundColor:'#E6F0FD',color:'#056DE8',":hover":{backgroundColor: '#DAE9FC',color:'#056DE8'}}}>
                    <ArrowDropUpIcon />
                    </IconButton>
                    <Button color='primary' sx={{fontWeight:'bold',ml:0.5,mr:0.5}} >已点踩 {item.liked}</Button>
                    <IconButton  onClick={()=>{handleLikeAnswer(item.answerId,0,-1)}} color='primary' size='small' sx={{backgroundColor:'#056DE8',color:'#ffffff',":hover":{backgroundColor: '#0461CF',color:'#ffffff'}}}>
                    <ArrowDropDownIcon />
                    </IconButton>
                    </>
                    :
                    <>
                    <IconButton onClick={()=>{handleLikeAnswer(item.answerId,1,0)}} color='primary' size='small' sx={{backgroundColor:'#E6F0FD',color:'#056DE8',":hover":{backgroundColor: '#DAE9FC',color:'#056DE8'}}}>
                    <ArrowDropUpIcon />
                    </IconButton>
                    <Button color='primary' sx={{fontWeight:'bold',ml:0.5,mr:0.5}} >赞同 {item.liked}</Button>
                    <IconButton onClick={()=>{handleLikeAnswer(item.answerId,-1,0)}} color='primary' size='small' sx={{backgroundColor:'#E6F0FD',color:'#056DE8',":hover":{backgroundColor: '#DAE9FC',color:'#056DE8'}}}>
                    <ArrowDropDownIcon />
                    </IconButton>
                    </>
                   
            }
                
               
                
                
                
                <ThemeProvider theme={theme}>
                    <Button color="secondary"  size="medium" startIcon={<CommentIcon />}
                    onClick={(e)=>handleClickComment(item.answerId)}
                    sx={{ml:2}}
                    >{item.comment}条评论</Button>
                </ThemeProvider>
        </Grid>
        <Grid item xs={4}>
                    {contextHolder}
                    {   
                        
                        (userId===item.userInfo.userId || userInfo.type===1)?
                        <Stack 
                        display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                        sx={{width:'100%',
                        }} direction='row'>
                        <Button color="error"  size="medium" startIcon={<DeleteOutlineOutlinedIcon />}
                        sx={{}}
                        onClick={(e)=>handleClickDelete(item.answerId)}
                        >删除回答</Button>
                        </Stack>
                        :
                        null
                    }
                    
        </Grid>
        </Grid>

        {
        comment.find(e=>e.answerId===item.answerId).state  ===false ||
        (CommentData.find(e=>e.answerId === item.answerId)).comments.length===0 
        ? null :
        <div>
            <Stack spacing={1} direction="row" sx={{mb:3,mt:3}}>
            <Avatar src={userInfo.avatar} variant="rounded" />
            {
                replyBar===true?
                <TextArea ref={replyRef} id='reply' defaultValue={''}
                placeholder="评论千万条，友善第一条" size="large" maxLength={1000} autoSize showCount allowClear/>
                :
                setReplyBar(true)
            }
            
            
            {contextHolder}
            <ButtonAnt 
            type="primary" size='large'
            onClick={
            ()=>handleSaveComment(item.answerId,0,replyRef.current.resizableTextArea.textArea.innerHTML)}>发布</ButtonAnt>
            <Snackbar
            open={open2}
            autoHideDuration={6000}
            onClose={handleClose2}
            >
                <Alert onClose={handleClose2} severity="warning" >
                评论不能为空!
                </Alert>
            </Snackbar>
            </Stack>
            {/* {console.log((CommentData.find(e=>e.answerId === item.answerId)).comments)} */}
            {(CommentData.find(e=>e.answerId === item.answerId)).comments[0].none==="none"?
            <div style={{ display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'}}>
                <img src={noReply} style={{height:330}}/>
            </div>
            
            :
            <List
            itemLayout="vertical"
            size="large"
            bordered
            split
            dataSource={(CommentData.find(e=>e.answerId === item.answerId)).comments}
            renderItem={(item) => (
                <List.Item >
                <Grid container spacing={2} >
                <Grid item xs={8}>
                <Stack spacing={1} direction="row" sx={{fontSize:16,fontWeight:'bold'}}>
                <Box >
                <Link to={{
                pathname: '/profile',
                search: '?id=' + item.userId}}>
                <Avatar src={item.userInfo.avatar}  sx={{ width: 30, height: 30 }} variant="rounded"/>
                </Link>
                </Box>
                
                <Box 
                    display='flex'
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        // border:1
                        
                    }}>
                        <Link to={{
                pathname: '/profile',
                search: '?id=' + item.userId}}>
                        {item.userInfo.nickname}
                        </Link>
                    </Box>
                
                {
                    item.responseId===0?null:
                    <>
                    <ThemeProvider theme={theme}>
                    <Box 
                    display='flex'
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        // border:1
                        
                    }}>
                    <ArrowRightIcon color='secondary'/>
                    </Box>
                    </ThemeProvider>
                    <Box sx={{
                        // border:1
                    }}>
                        <Link to={{
                pathname: '/profile',
                search: '?id=' + item.responseId}}>
                    <Avatar src={item.responseInfo.avatar}  sx={{ width: 30, height: 30 }} variant="rounded"/>
                    </Link>
                    </Box>
                    <Box 
                    display='flex'
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        // mr:1,
                        // border:1
                        }}>
                            <Link to={{
                pathname: '/profile',
                search: '?id=' + item.responseId}}>
                            {item.responseInfo.nickname}
                            </Link>
                        </Box>
                    
                    </>
                }


                </Stack>
                
                <Box sx={{fontSize: 16,mt:1}}>
                {item.content}
                </Box>
                <ThemeProvider theme={theme}>
                <Box
                display='flex'
                // justifyContent="center"
                alignItems="flex-end"
                sx={{
                    color: 'secondary.main',
                    fontWeight: 'light',
                    fontSize: 14,
                    // border:1,
                    height:35
                }}>
                {item.time}
                </Box>
                </ThemeProvider>
                
                </Grid>
                <Grid item xs={4} >
                <Box
                    display="flex"
                    justifyContent="flex-end"
                    sx={{
                        // border:1
                    }}
                >
                <ThemeProvider theme={theme}>
                {typeof(likedComment.find(e=>e.commentId===item.commentId))==='undefined'?null:
                    likedComment.find(e=>e.commentId===item.commentId).result===1?
                    <Button color="warning" 
                    onClick={()=>handleLikeComment(item.answerId,item.commentId,0)} 
                    size="medium" startIcon={<ThumbUpIcon />}>{item.liked}</Button>
                    :
                    <Button color="secondary" 
                    onClick={()=>handleLikeComment(item.answerId,item.commentId,1)} 
                    size="medium" startIcon={<ThumbUpIcon />}>{item.liked}</Button>
                }
                    
                </ThemeProvider>
                </Box>
                <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                    sx={{
                        // border:1,
                        height:'70%'
                    }}
                >
                    <Stack direction="row">
                    <ThemeProvider theme={theme}>
                        {contextHolder}
                        {
                            (userId===item.userInfo.userId || userInfo.type===1)?
                            <Button color="secondary" sx={{mr:1}}
                                onClick={()=>handleClickDeleteReply(item.commentId,item.answerId)} 
                                size="medium" startIcon={<DeleteIcon />}>删除评论</Button>
                            :
                            null
                        }
                        <Button color="secondary" 
                        onClick={()=>handleResponse(item.commentId)} 
                        size="medium" startIcon={<ReviewsIcon />}>回复</Button>
                    </ThemeProvider>
                    </Stack>
                    
                </Box>
                </Grid>
            </Grid>
            {typeof(response.find(e=>e.commentId===item.commentId))==='undefined'?
                    null
                    :
                    response.find(e=>e.commentId===item.commentId).state===0?
                        null
                        :
                        <Stack 
                        spacing={1} 
                        direction="row" 
                        sx={{mb:0.5,mt:3}}
                        >
                        <Avatar src={userInfo.avatar} variant="rounded" />
                        <TextArea id='replyUser' ref={replyUserRef} 
                        placeholder={"回复 " +item.userInfo.nickname} size="large" maxLength={1000} autoSize showCount allowClear/>
                        {contextHolder}
                        <ButtonAnt type="primary" size='large' 
                        onClick={
                            ()=>handleSaveComment(item.answerId,item.userId,replyUserRef.current.resizableTextArea.textArea.innerHTML)}
                        >发布</ButtonAnt>
                        <Snackbar
                            open={open2}
                            autoHideDuration={6000}
                            onClose={handleClose2}
                        >
                        <Alert onClose={handleClose2} severity="warning" >
                            评论不能为空!
                        </Alert>
                        </Snackbar>
                        </Stack>
                    
                    }
            </List.Item>
            )}
            />
            
            }
            
        </div>
        }

      </List.Item>
    )}
  />
            </Box>
      </Grid>
          
          
      <Grid item xs={3} sx={{mt:1,ml:-1,pl:10,pr:10}}>
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
          </Grid>
      </>

        
    )


}