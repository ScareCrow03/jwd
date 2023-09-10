import {postRequest} from "../utils/ajax";

export const getQuestions = (start,end, callback) => {
    const data = {start:start,end:end};
    const url = "http://123.60.52.71:8081/getQuestions";
    postRequest(url,data,callback);
};

export const getUnansweredQuestion = (n, callback) => {
    const data = {n:n};
    const url = "http://123.60.52.71:8081/getUnansweredQuestion";
    postRequest(url, data, callback);
};
export const getUserQuestion = (userId,callback) => {
    const data = {userId : userId};
    const url = "http://123.60.52.71:8081/getUserQuestion"
    postRequest(url, data, callback);
};

export const saveQuestion = (questionId, userId, title, content, tag1, tag2, tag3, tag4, tag5, callback) => {
    const data = {questionId:questionId, userId:userId, title:title, content:content, tag1:tag1, tag2:tag2, tag3:tag3, tag4:tag4, tag5:tag5};
    const url = "http://123.60.52.71:8081/saveQuestion";
    postRequest(url, data, callback);
};
export const getFollowQuestion = (userId,callback) => {
    const data = {userId : userId};
    const url = "http://123.60.52.71:8081/getFollowQuestion"
    postRequest(url, data, callback);
};

export const isFollowQuestion = (userId,questionId,callback) => {
    const data = {userId : userId,questionId:questionId};
    const url = "http://123.60.52.71:8081/isFollowQuestion"
    postRequest(url, data, callback);
};

export const getLikeQuestion = (userId,callback) => {
    const data = {userId : userId};
    const url = "http://123.60.52.71:8081/getLikeQuestion"
    postRequest(url, data, callback);
};

export const isLikeQuestion = (userId,questionId,callback) => {
    const data = {userId : userId,questionId:questionId};
    const url = "http://123.60.52.71:8081/isLikeQuestion"
    postRequest(url, data, callback);
};

export const searchQuestions = (x,start,end,callback) => {
    const data = {x:x,start:start,end:end};
    const url = "http://123.60.52.71:8081/searchQuestions"
    postRequest(url, data, callback);
};

export const deleteQuestion = (questionId)=>{
    const data = {questionId:questionId};
    const url = "http://123.60.52.71:8081/deleteQuestion"
    postRequest(url, data, ()=>{});
}