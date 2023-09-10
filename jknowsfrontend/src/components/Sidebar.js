import '../css/nav.css'

import logo from '../assets/rlogo.png'
import React from "react";
import {Link} from 'react-router-dom'
import {Menu, Dropdown, Space, Button, Modal, Input, message, Checkbox, Divider, List, Skeleton, Avatar} from 'antd';
import Search from "antd/es/input/Search";
import TextArea from "antd/es/input/TextArea";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Stack from '@mui/material/Stack';
import Tagmatch from "./Tagmatch";
import Homevditor from "./Homevditor";
import VirtualList from 'rc-virtual-list';
import {saveQuestion, searchQuestions, askRobot} from "../service/questionService";
import askEditor from "./AskEditor";
import AskEditor from "./AskEditor";
import {FireOutlined, LikeFilled, LikeOutlined, MessageOutlined, StarFilled, StarOutlined} from "@ant-design/icons";
import {getMessages} from "../service/messageService";
import Badge from "@mui/material/Badge";
import {getUser} from "../service/userService";
import {logout} from '../service/loginService';
import { saveAnswer } from '../service/answerService';

let end = 10;
export class Sidebar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            filterText:'',
            admin: false,
            visiable:false,
            title:'',
            content:" ",
            questionId:0,
            userId:localStorage.getItem("userId"),
            tag1:'',
            tag2:'',
            tag3:'',
            tag4:'',
            tag5:'',
            data:[],
            question:[],
            user:{},
            ifBot:false,
        };
    }

    callback=(data)=>{
        this.setState({data:data})
    }

    callback1=(data)=>{
        this.setState({user:data})
        console.log(JSON.stringify(data))
    }

    callback2=(data)=>{
        this.setState({data:data})
        getUser(localStorage.getItem("userId"),this.callback1)
    }

    callback3=(data)=>{
        this.setState({question:data})
    }


    componentDidMount() {
        // const user = JSON.parse(localStorage.getItem("user"));
        // if(user && user.userType === 'admin'){
        //     this.setState({
        //         admin: true,
        //         userId:user,
        //     })
        // }
        console.log("side",localStorage.getItem("search"))
        getUser(localStorage.getItem("userId"),this.callback1)
        searchQuestions("",1,5,this.callback3)
    }
    handleAsk = () =>{
        this.setState({
            visiable:true,
        })
    }

      handleTags = (data) =>{
        let arr =[]
        for(let j = 0;j < 5;j++){
            arr[j] = '';
        }
        let k = 0;
        for (let i of data){

            arr[k] = i;
            k++;

        }
        console.log('arr',arr)

        this.setState({
            tag1:arr[0],
            tag2:arr[1],
            tag3:arr[2],
            tag4:arr[3],
            tag5:arr[4],
        })

    console.log('pr',data)
}
    handleOk = () =>{
        console.log(this.state.ifBot)
        this.setState({
            visiable:false,
        })

        const callback =  (data) => {
            console.log(data)
            this.setState({
                questionId:data.questionId,
            })
        };
        console.log("content",this.state.questionId, this.state.userId, this.state.title, this.state.content, this.state.tag1, this.state.tag2, this.state.tag3, this.state.tag4, this.state.tag5)
        saveQuestion(this.state.questionId, this.state.userId, this.state.title, this.state.content, this.state.tag1, this.state.tag2, this.state.tag3, this.state.tag4, this.state.tag5,callback);
        if(this.state.ifBot){
            // var askBot={"prompt":this.state.title,"cookie":
            // "BIDUPSID=49B2129FBBA55BDD3F066E5637EB4253; PSTM=1629887382; BDUSS=kZBdlItfnJqODdDZzNicW92a3ZMSExGc3JrUmpDU0E5SHhyTXJpS1RHVkJ4MVZoSVFBQUFBJCQAAAAAAAAAAAEAAADkolTNZmdkZjk5OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEE6LmFBOi5hc; BDUSS_BFESS=kZBdlItfnJqODdDZzNicW92a3ZMSExGc3JrUmpDU0E5SHhyTXJpS1RHVkJ4MVZoSVFBQUFBJCQAAAAAAAAAAAEAAADkolTNZmdkZjk5OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEE6LmFBOi5hc; BAIDUID=6004680E93FC557883F562690103CD5E:FG=1; BAIDUID_BFESS=6004680E93FC557883F562690103CD5E:FG=1; __bid_n=1841da96acdfba8abd4207; BAIDU_WISE_UID=wapp_1678785768705_868; FPTOKEN=skwq4OQWDEN/wBBTGkAq1cwzV6T/aXCSk1AkQ5uxYnr7N/6HRADQGM/8T7lq8U6jf601aE/ggdBjhfy+Rof0N3vBwZZ7dBjiavTvC3RmFuF6vPrtilARPHIAQYA/K14WBQNuSEEVwzYtIKv2edqJfGSe6Ge0T5U88TlXQKquBTtCtq9/38VHH29N+ZVekrc5VfFvaZ8QiCM4GFEAnq1cqV019BIBdiL3/iuNFKm7BgMBpiw/XFCURhgjPct+3uZjkHw9SyAJHbFb3Qba4HCS3y8xJjH/dfJ+qsD4Ke2LoOukUu9yI0lap9wGHXKInnaPRcwYBVZuqzojOQMBT1Bygt7uugDz9N+jEW01KESDtFTJMa+AIceWhqKtS7byYqI1eS0KVFfuNiANRXn+RYpckw==|nqlJTUzTJltlk3Dekjw8bWmkx0PtXGut07Zzaop2lvI=|10|2b425225aa2b6cac0fda07c4a248ff8c; ZFY=FH3OyBN25zbl09p5:AU84QAOfd0JKI9A5Xa2r7cXIWDU:C; ZD_ENTRY=bing; Hm_lvt_01e907653ac089993ee83ed00ef9c2f3=1693879892; Hm_lpvt_01e907653ac089993ee83ed00ef9c2f3=1693970862; XFT=ALw0AciPTlea8H4kVjD5B/+PtiqL68qn1xH5tOCSV44=; ab_sr=1.0.1_NWU1YjlhOGYyNDc1YjM5ZWEyMTIxZmJmOWE3Nzc3MTIzZWZjZWE1OTU1M2I0ODViMDU4ZThjMzhjMGFhZDY0OGI2NzRmNmUzYmRhZTU0OGRkYjU1NzZhMDc0OWYxZmE2ZTAzZDMwZjA1MTNmOGVmNzI2OTk3MzdlNzI5MDljZGVhZDQ0ZDI5YzkwOWYzYzZjNWQ5ZTQxNWEzYmIwNTU2MjhmYmZkMWExNGFjNDRiZTAzOWMyMWExNTJhNTZmMDg0; XFI=6b26b210-4c65-11ee-8ce3-6f429e275cd5; XFCS=59CCD8E4CBFC173B64AEE6A67DEDF9C0964E02B6765F57DC116328FA03F8E4C3; RT=\"z=1&dm=baidu.com&si=25ef30fa-84a6-4471-a7b0-08a8dd66922d&ss=lm7690wo&sl=g&tt=dde&bcn=https%3A%2F%2Ffclog.baidu.com%2Flog%2Fweirwood%3Ftype%3Dperf\""}
            let prompt = this.state.title;
            // let cookie = "BIDUPSID=49B2129FBBA55BDD3F066E5637EB4253; PSTM=1629887382; BDUSS=kZBdlItfnJqODdDZzNicW92a3ZMSExGc3JrUmpDU0E5SHhyTXJpS1RHVkJ4MVZoSVFBQUFBJCQAAAAAAAAAAAEAAADkolTNZmdkZjk5OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEE6LmFBOi5hc; BDUSS_BFESS=kZBdlItfnJqODdDZzNicW92a3ZMSExGc3JrUmpDU0E5SHhyTXJpS1RHVkJ4MVZoSVFBQUFBJCQAAAAAAAAAAAEAAADkolTNZmdkZjk5OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEE6LmFBOi5hc; BAIDUID=6004680E93FC557883F562690103CD5E:FG=1; BAIDUID_BFESS=6004680E93FC557883F562690103CD5E:FG=1; __bid_n=1841da96acdfba8abd4207; BAIDU_WISE_UID=wapp_1678785768705_868; FPTOKEN=skwq4OQWDEN/wBBTGkAq1cwzV6T/aXCSk1AkQ5uxYnr7N/6HRADQGM/8T7lq8U6jf601aE/ggdBjhfy+Rof0N3vBwZZ7dBjiavTvC3RmFuF6vPrtilARPHIAQYA/K14WBQNuSEEVwzYtIKv2edqJfGSe6Ge0T5U88TlXQKquBTtCtq9/38VHH29N+ZVekrc5VfFvaZ8QiCM4GFEAnq1cqV019BIBdiL3/iuNFKm7BgMBpiw/XFCURhgjPct+3uZjkHw9SyAJHbFb3Qba4HCS3y8xJjH/dfJ+qsD4Ke2LoOukUu9yI0lap9wGHXKInnaPRcwYBVZuqzojOQMBT1Bygt7uugDz9N+jEW01KESDtFTJMa+AIceWhqKtS7byYqI1eS0KVFfuNiANRXn+RYpckw==|nqlJTUzTJltlk3Dekjw8bWmkx0PtXGut07Zzaop2lvI=|10|2b425225aa2b6cac0fda07c4a248ff8c; ZFY=FH3OyBN25zbl09p5:AU84QAOfd0JKI9A5Xa2r7cXIWDU:C; ZD_ENTRY=bing; Hm_lvt_01e907653ac089993ee83ed00ef9c2f3=1693879892; Hm_lpvt_01e907653ac089993ee83ed00ef9c2f3=1693970862; XFT=ALw0AciPTlea8H4kVjD5B/+PtiqL68qn1xH5tOCSV44=; ab_sr=1.0.1_NWU1YjlhOGYyNDc1YjM5ZWEyMTIxZmJmOWE3Nzc3MTIzZWZjZWE1OTU1M2I0ODViMDU4ZThjMzhjMGFhZDY0OGI2NzRmNmUzYmRhZTU0OGRkYjU1NzZhMDc0OWYxZmE2ZTAzZDMwZjA1MTNmOGVmNzI2OTk3MzdlNzI5MDljZGVhZDQ0ZDI5YzkwOWYzYzZjNWQ5ZTQxNWEzYmIwNTU2MjhmYmZkMWExNGFjNDRiZTAzOWMyMWExNTJhNTZmMDg0; XFI=6b26b210-4c65-11ee-8ce3-6f429e275cd5; XFCS=59CCD8E4CBFC173B64AEE6A67DEDF9C0964E02B6765F57DC116328FA03F8E4C3; RT=\"z=1\&dm\=baidu.com\&si\=25ef30fa-84a6-4471-a7b0-08a8dd66922d\&ss\=lm7690wo\&sl\=g\&tt\=dde\&bcn\=https%3A%2F%2Ffclog.baidu.com%2Flog%2Fweirwood%3Ftype%3Dperf\""
            // console.log(askBot)
            fetch('http://123.60.52.71:8083/headless', {
                    method: 'POST', 
                    body:`prompt=${prompt}&cookie=${`BIDUPSID=49B2129FBBA55BDD3F066E5637EB4253; PSTM=1629887382; BDUSS=kZBdlItfnJqODdDZzNicW92a3ZMSExGc3JrUmpDU0E5SHhyTXJpS1RHVkJ4MVZoSVFBQUFBJCQAAAAAAAAAAAEAAADkolTNZmdkZjk5OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEE6LmFBOi5hc; BDUSS_BFESS=kZBdlItfnJqODdDZzNicW92a3ZMSExGc3JrUmpDU0E5SHhyTXJpS1RHVkJ4MVZoSVFBQUFBJCQAAAAAAAAAAAEAAADkolTNZmdkZjk5OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEE6LmFBOi5hc; BAIDUID=6004680E93FC557883F562690103CD5E:FG=1; BAIDUID_BFESS=6004680E93FC557883F562690103CD5E:FG=1; __bid_n=1841da96acdfba8abd4207; BAIDU_WISE_UID=wapp_1678785768705_868; FPTOKEN=skwq4OQWDEN/wBBTGkAq1cwzV6T/aXCSk1AkQ5uxYnr7N/6HRADQGM/8T7lq8U6jf601aE/ggdBjhfy+Rof0N3vBwZZ7dBjiavTvC3RmFuF6vPrtilARPHIAQYA/K14WBQNuSEEVwzYtIKv2edqJfGSe6Ge0T5U88TlXQKquBTtCtq9/38VHH29N+ZVekrc5VfFvaZ8QiCM4GFEAnq1cqV019BIBdiL3/iuNFKm7BgMBpiw/XFCURhgjPct+3uZjkHw9SyAJHbFb3Qba4HCS3y8xJjH/dfJ+qsD4Ke2LoOukUu9yI0lap9wGHXKInnaPRcwYBVZuqzojOQMBT1Bygt7uugDz9N+jEW01KESDtFTJMa+AIceWhqKtS7byYqI1eS0KVFfuNiANRXn+RYpckw==|nqlJTUzTJltlk3Dekjw8bWmkx0PtXGut07Zzaop2lvI=|10|2b425225aa2b6cac0fda07c4a248ff8c; ZFY=FH3OyBN25zbl09p5:AU84QAOfd0JKI9A5Xa2r7cXIWDU:C; ZD_ENTRY=bing; Hm_lvt_01e907653ac089993ee83ed00ef9c2f3=1693879892; Hm_lpvt_01e907653ac089993ee83ed00ef9c2f3=1693970862; XFT=ALw0AciPTlea8H4kVjD5B/+PtiqL68qn1xH5tOCSV44=; ab_sr=1.0.1_NWU1YjlhOGYyNDc1YjM5ZWEyMTIxZmJmOWE3Nzc3MTIzZWZjZWE1OTU1M2I0ODViMDU4ZThjMzhjMGFhZDY0OGI2NzRmNmUzYmRhZTU0OGRkYjU1NzZhMDc0OWYxZmE2ZTAzZDMwZjA1MTNmOGVmNzI2OTk3MzdlNzI5MDljZGVhZDQ0ZDI5YzkwOWYzYzZjNWQ5ZTQxNWEzYmIwNTU2MjhmYmZkMWExNGFjNDRiZTAzOWMyMWExNTJhNTZmMDg0; XFI=6b26b210-4c65-11ee-8ce3-6f429e275cd5; XFCS=59CCD8E4CBFC173B64AEE6A67DEDF9C0964E02B6765F57DC116328FA03F8E4C3; RT="z=1%26dm=baidu.com%26si=25ef30fa-84a6-4471-a7b0-08a8dd66922d%26ss=lm7690wo%26sl=g%26tt=dde%26bcn=https%3A%2F%2Ffclog.baidu.com%2Flog%2Fweirwood%3Ftype%3Dperf"`}`,
                    headers: new Headers({
                        "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
                    })
                }).then((response)=>{return response.json();})
                    .catch(error => console.error('Error:', error))
                    .then((data)=>{
                        console.log(data);    
                        saveAnswer(0,10,this.state.questionId,data.text);
                    });
            // askRobot(this.state.title, "BIDUPSID=49B2129FBBA55BDD3F066E5637EB4253; PSTM=1629887382; BDUSS=kZBdlItfnJqODdDZzNicW92a3ZMSExGc3JrUmpDU0E5SHhyTXJpS1RHVkJ4MVZoSVFBQUFBJCQAAAAAAAAAAAEAAADkolTNZmdkZjk5OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEE6LmFBOi5hc; BDUSS_BFESS=kZBdlItfnJqODdDZzNicW92a3ZMSExGc3JrUmpDU0E5SHhyTXJpS1RHVkJ4MVZoSVFBQUFBJCQAAAAAAAAAAAEAAADkolTNZmdkZjk5OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEE6LmFBOi5hc; BAIDUID=6004680E93FC557883F562690103CD5E:FG=1; BAIDUID_BFESS=6004680E93FC557883F562690103CD5E:FG=1; __bid_n=1841da96acdfba8abd4207; BAIDU_WISE_UID=wapp_1678785768705_868; FPTOKEN=skwq4OQWDEN/wBBTGkAq1cwzV6T/aXCSk1AkQ5uxYnr7N/6HRADQGM/8T7lq8U6jf601aE/ggdBjhfy+Rof0N3vBwZZ7dBjiavTvC3RmFuF6vPrtilARPHIAQYA/K14WBQNuSEEVwzYtIKv2edqJfGSe6Ge0T5U88TlXQKquBTtCtq9/38VHH29N+ZVekrc5VfFvaZ8QiCM4GFEAnq1cqV019BIBdiL3/iuNFKm7BgMBpiw/XFCURhgjPct+3uZjkHw9SyAJHbFb3Qba4HCS3y8xJjH/dfJ+qsD4Ke2LoOukUu9yI0lap9wGHXKInnaPRcwYBVZuqzojOQMBT1Bygt7uugDz9N+jEW01KESDtFTJMa+AIceWhqKtS7byYqI1eS0KVFfuNiANRXn+RYpckw==|nqlJTUzTJltlk3Dekjw8bWmkx0PtXGut07Zzaop2lvI=|10|2b425225aa2b6cac0fda07c4a248ff8c; ZFY=FH3OyBN25zbl09p5:AU84QAOfd0JKI9A5Xa2r7cXIWDU:C; ZD_ENTRY=bing; Hm_lvt_01e907653ac089993ee83ed00ef9c2f3=1693879892; Hm_lpvt_01e907653ac089993ee83ed00ef9c2f3=1693970862; XFT=ALw0AciPTlea8H4kVjD5B/+PtiqL68qn1xH5tOCSV44=; ab_sr=1.0.1_NWU1YjlhOGYyNDc1YjM5ZWEyMTIxZmJmOWE3Nzc3MTIzZWZjZWE1OTU1M2I0ODViMDU4ZThjMzhjMGFhZDY0OGI2NzRmNmUzYmRhZTU0OGRkYjU1NzZhMDc0OWYxZmE2ZTAzZDMwZjA1MTNmOGVmNzI2OTk3MzdlNzI5MDljZGVhZDQ0ZDI5YzkwOWYzYzZjNWQ5ZTQxNWEzYmIwNTU2MjhmYmZkMWExNGFjNDRiZTAzOWMyMWExNTJhNTZmMDg0; XFI=6b26b210-4c65-11ee-8ce3-6f429e275cd5; XFCS=59CCD8E4CBFC173B64AEE6A67DEDF9C0964E02B6765F57DC116328FA03F8E4C3; RT=\"z=1&dm=baidu.com&si=25ef30fa-84a6-4471-a7b0-08a8dd66922d&ss=lm7690wo&sl=g&tt=dde&bcn=https%3A%2F%2Ffclog.baidu.com%2Flog%2Fweirwood%3Ftype%3Dperf\"")
        }
    }
    // onClick = (e) =>{
    //     this.setState({
    //         content:e,
    //         visiable:false,
    //     })
    //
    //
    //     const callback =  (data) => {
    //
    //     };
    //     console.log("content",this.state.questionId, this.state.userId, this.state.title, this.state.content, this.state.tag1, this.state.tag2, this.state.tag3, this.state.tag4, this.state.tag5)
    //     saveQuestion(this.state.questionId, this.state.userId, this.state.title, this.state.content, this.state.tag1, this.state.tag2, this.state.tag3, this.state.tag4, this.state.tag5,callback);
    // }
    handleCheck = () =>{

    }
    handleCancel = () =>{
        this.setState({
            visiable:false,
        })
    }

    handleFilterTextChange = (e) =>{
        this.setState({
            filterText:e.target.value
        });
    }
    handleLogOut =()=>{
        localStorage.clear();
        logout();
    }
    onClick = (e) =>{
        this.setState({
            content:e,
        })
    }

    click=()=> {
        getMessages(localStorage.getItem("userId"), 1, end, this.callback2);
    }

    onSearch = (data) =>{
        console.log(data)
        localStorage.setItem("search",data)
        if(this.props!==null) {
            this.props.setSearch(data);
        }
    }

    onClickBot = (e) =>{
        this.setState({
            ifBot:this.state.ifBot===true?false:true,
        })
        // console.log(this.state.ifBot)
    }


    render(){
        const user = JSON.parse(localStorage.getItem("userId"));

        const menu = (
            <Menu
                items={[

                    {
                        danger: true,
                        label: (
                            <Link to={"/login"}
                                onClick={this.handleLogOut}
                            >
                                Log Out
                            </Link>
                        ),
                    },
                ]}
            />
        );

        const appendData =()=>{
            end += 5;
            getMessages(localStorage.getItem("userId"),1,end,this.callback)
        }
        const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
            console.log(e.currentTarget.scrollHeight - e.currentTarget.scrollTop )
            if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === 500) {
                console.log("121");
                appendData();
            }
        };


        const contentStyle: React.CSSProperties = {
            height: 560,
            width : 400,
            zIndex: 2,
            color: '#0',
            backgroundColor: '#fff',
        };

        const contentStyle1: React.CSSProperties = {
            width : 600,
            zIndex: 2,
            color: '#0',
            backgroundColor: '#fff',
        };

        return(


            <nav className="navbar">

                <div className="link bar">
                    <ul className="links-container">
                        <div>
                            <img src={logo} alt=" " width="130px" height="50px"/></div>
                        <Stack direction="row" sx={{mt:1}}>
                        <li className="link-item" ><Link to={"/"} className="link">首页</Link></li>
                        <li className="link-item" ><Link to={"/answer"} className="link">等你来答</Link></li>
                        <li className="link-item" ><Link to={{
                            pathname: '/profile',
                            search: '?id=' + localStorage.getItem("userId")}} className="link">个人中心</Link></li>
                        <div className={"search"}>
                            <Dropdown overlay={null} 
                                      menu={null}
                                      trigger={["click"]}
                                      placement={"bottom"}
                                      onOpenChange={this.click}
                                      dropdownRender={() => (
                                          <div>
                                              <List
                                                  header={<h3 style={{color:'#A5AEBE',height:20}}><FireOutlined style={{fontSize:18}}/>   搜索发现</h3>}
                                                  bordered
                                                  style={contentStyle1}
                                                  dataSource={this.state.question}
                                                  renderItem={(item) => (
                                                      <Link to={{
                                                          pathname: '/question',
                                                          search: '?id=' + item.questionId}}
                                                      >
                                                          <List.Item>
                                                              <List.Item.Meta title={item.title}/>
                                                          </List.Item>
                                                      </Link>
                                                  )}
                                              />
                                          </div>
                                      )}
                            >
                            <Search
                                placeholder="交我答"
                                key={localStorage.getItem("search")}
                                defaultValue={localStorage.getItem("search")}
                                allowClear
                                enterButton={<Link to={"/search"}>{"Search"}</Link>}
                                size="large"
                                onSearch={this.onSearch}
                            />
                            </Dropdown>
                        </div>

                        <div>

                            <Button type="primary" onClick={this.handleAsk} size={"large"}>
                                提问
                            </Button>
                            <Modal title="提问" visible={this.state.visiable} onOk={this.handleOk} okText={"发布问题"} onCancel={this.handleCancel} cancelText={"取消"}>

                                <Input
                                    showCount
                                    maxLength={100}
                                    style={{
                                        height: 50,
                                        marginBottom: 24,
                                    }}
                                    onChange={(e) => this.setState({title: e.target.value})}
                                    placeholder="快来写下你的问题标题吧"
                                />
                                <br/>
                                {
                                    this.state.ifBot===false?
                                    <Button type="primary" onClick={this.onClickBot}>邀请交我答机器人回答</Button>
                                    :
                                    <Button type="dashed" onClick={this.onClickBot}>已邀请</Button>
                                }
                                
                                <br/>
                                <br/>
                                详细阐述你的问题
                                <br/>
                                <br/>
                                <AskEditor sendContent={this.onClick}/>
                                <Tagmatch handledata={this.handleTags}/>



                            </Modal>
                        </div>
                        <Dropdown  menu={null}
                                   trigger={["click"]}
                                   placement={"bottom"}
                                   onOpenChange={this.click}
                                   dropdownRender={() => (
                                       <div>
                                           <List
                                               header={<h3 style={{height:30,color:'#A5AEBE'}}><MessageOutlined style={{fontSize:18}}/>   消息</h3>}
                                               bordered
                                               style={contentStyle}
                                           >
                                               <VirtualList
                                                   itemKey={"nickname"}
                                                   data={this.state.data}
                                                   height={500}
                                                   itemHeight={100}
                                                   onScroll={onScroll}
                                               >
                                                   {(item) => (
                                                       <List.Item key={item.senderInfo?.nickname} style={{height:100}}>

                                                           <h4><Link to={{
                                                               pathname: '/profile',
                                                               search: '?id=' + item.senderInfo?.userId}}>{item.senderInfo?.nickname}</Link>
                                                               邀请您回答
                                                               <Link to={{
                                                               pathname: '/question',
                                                               search: '?id=' + item.questionId}}>{item.questionInfo?.title}</Link></h4>

                                                       </List.Item>
                                                   )}
                                               </VirtualList>
                                           </List>
                                       </div>
                                   )}>
                            <div style={{marginLeft:20,marginTop:2}}>
                                {
                                    (this.state.user.messageFlag === 1)?
                                    <Badge overlap="circular" variant="dot" color="error">
                                        <NotificationsIcon fontSize="large" sx={{color:'#A5AEBE'}}/>
                                    </Badge>: <NotificationsIcon fontSize="large" sx={{color:'#A5AEBE'}}/>
                                }
                            </div>
                        </Dropdown>
                            <Dropdown overlay={menu} placement="bottom">
                                <div style={{marginLeft:20,marginTop:2}}>
                                <Link to={{
                            pathname: '/profile',
                            search: '?id=' + localStorage.getItem("userId")}} className="link">
                                    <Avatar shape={"square"} style={{height:38,width:38}}  src={this.state.user.avatar} />
                                    </Link>
                                </div>
                            </Dropdown>
                        </Stack>
                    </ul>

                </div>
            </nav>

        );
    }

}
