import {postRequest} from "../utils/ajax";
export const getQuestion = (questionId, callback) => {
    const data = {questionId: questionId};
    const url = "http://123.60.52.71:8081/getQuestion"
    postRequest(url, data, callback);
};
export const getAnswer = (questionId, callback) => {
    const data = {questionId: questionId};
    const url = "http://123.60.52.71:8081/getAnswer"
    postRequest(url, data, callback);
};
export const getAnswers = (questionId,start, callback) => {
    const data = {questionId: questionId,start: start,end: start + 2};
    const url = "http://123.60.52.71:8081/getAnswers"
    postRequest(url, data, callback);
};
export const getComment = (answerId,callback) => {
    const data = {answerId:answerId};
    const url = "http://123.60.52.71:8081/getComment"
    postRequest(url, data, callback);
};
export const isLikeQuestion = (userId, questionId, callback) =>{
    const data = {userId:userId, questionId:questionId};
    const url = "http://123.60.52.71:8081/isLikeQuestion"
    postRequest(url, data, callback);
}
export const  saveLikeQuestion = (Sdata) =>{
    const data = Sdata;
    const url = "http://123.60.52.71:8081/saveLikeQuestion"
    postRequest(url, data, ()=>{});
}
export const  isFollowQuestion = (userId, questionId, callback) =>{
    const data = {userId:userId, questionId:questionId};
    const url = "http://123.60.52.71:8081/isFollowQuestion"
    postRequest(url, data, callback);
}
export const  saveFollowQuestion = (Sdata) =>{
    const data = Sdata;
    const url = "http://123.60.52.71:8081/saveFollowQuestion"
    postRequest(url, data, ()=>{});
}
export const  isLikeAnswer = (userId, answerId, callback) =>{
    const data = {userId:userId, answerId:answerId};
    const url = "http://123.60.52.71:8081/isLikeAnswer"
    // postRequest(url, data, ()=>{callback(userId,answerId)});
     postRequest(url, data, callback);
}

export const  saveLikeAnswer = (userId, answerId, liked)=>{
    const data = {userId:userId, answerId:answerId,liked:liked};
    const url = "http://123.60.52.71:8081/saveLikeAnswer"
    postRequest(url, data, ()=>{});

}
export const  isLikeComment = (userId, commentId, callback) =>{
    const data = {userId:userId, commentId:commentId};
    const url = "http://123.60.52.71:8081/isLikeComment"
    postRequest(url, data, callback);
}
export const  saveLikeComment = (userId, commentId, liked) =>{
    const data = {userId:userId, commentId:commentId, liked:liked};
    const url = "http://123.60.52.71:8081/saveLikeComment"
    postRequest(url, data, ()=>{});
}
export const  saveComment = ( userId, answerId, responseId, content,callback) =>{
    const data = {commentId:0,userId:userId,answerId:answerId,responseId:responseId,content:content};
    const url = "http://123.60.52.71:8081/saveComment"
    postRequest(url, data, callback);
}
export const deleteAnswer = (answerId)=>{
    const data = {answerId:answerId}
    const url = "http://123.60.52.71:8081/deleteAnswer"
    postRequest(url, data, ()=>{});
}
export const deleteComment = (commentId)=>{
    const data = {commentId:commentId}
    const url = "http://123.60.52.71:8081/deleteComment"
    postRequest(url, data, ()=>{});
}
export const getUser = (userId,callback)=>{
    const data = {userId:userId}
    const url = "http://123.60.52.71:8081/getUser"
    postRequest(url, data, callback);
}
export const inviteUser = (questionId,start,end,callback)=>{
    const data = {questionId:questionId,start:start,end:end}
    console.log(data)
    const url = "http://123.60.52.71:8081/inviteUser"
    postRequest(url, data, callback);
}
export const addMessage = (sender,receiver,questionId) =>{
    const data = {sender:sender,receiver:receiver,questionId:questionId}
    const url = "http://123.60.52.71:8081/addMessage"
    postRequest(url, data, ()=>{});
}






