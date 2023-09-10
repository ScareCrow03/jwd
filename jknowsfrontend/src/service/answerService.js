import {postRequest,getRequest} from "../utils/ajax";
export const getUserAnswer = (userId,callback) => {
    const data = {userId : userId};
    const url = "http://123.60.52.71:8081/getUserAnswer"
    postRequest(url, data, callback);
};
export const saveAnswer=(answerId, userId, questionId, content,callback)=>{
    const data = {answerId:answerId,userId:userId,questionId:questionId,content:content};
    const url = "http://123.60.52.71:8081/saveAnswer"
    postRequest(url, data, callback);
}
export const getLikeAnswer = (userId,callback) => {
    const data = {userId : userId};
    const url = "http://123.60.52.71:8081/getLikeAnswer"
    postRequest(url, data, callback);
};