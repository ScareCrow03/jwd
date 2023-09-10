import {postRequest,getRequest} from "../utils/ajax";


export const getUser = (userId,callback) => {
    const data = {userId:userId};
    const url = "http://123.60.52.71:8081/getUser"
    postRequest(url, data, callback);
};

export const saveUser = (userId,nickname,telephone,email,address,avatar,qq,description,callback) =>{
    const data = {userId:userId,nickname:nickname,telephone: telephone,email:email,address:address,avatar:avatar,qq:qq,description:description};
    const url = "http://123.60.52.71:8081/saveUser"
    postRequest(url,data,callback);

}

export const getFollower = (userId,callback) => {
    const data = {userId : userId};
    const url = "http://123.60.52.71:8081/getFollower"
    postRequest(url, data, callback);
};

export const getFollowee = (userId,callback) => {
    const data = {userId : userId};
    const url = "http://123.60.52.71:8081/getFollowee"
    postRequest(url, data, callback);
};

export const saveFollowUser =(userId,followee,follow,callback) =>{
    const data = {userId : userId,followee:followee,follow:follow};
    const url = "http://123.60.52.71:8081/saveFollowUser"
    postRequest(url, data, callback);
}

export const isFollowUser =(userId,followee,callback) =>{
    const data = {userId : userId,followee:followee};
    const url = "http://123.60.52.71:8081/isFollowUser"
    postRequest(url, data, callback);
}

export const manageUser = (userId,type,callback) => {
    const data = {userId,type:type};
    const url = "http://123.60.52.71:8081/manageUser"
    postRequest(url, data, callback);
};

export const getUsers = (start,end,callback) => {
    const data = {start:start,end:end};
    const url = "http://123.60.52.71:8081/getUsers"
    postRequest(url, data, callback);
};

export const changePassword = (userId,password,callback) => {
    const data = {userId:userId,password:password};
    const url = "http://123.60.52.71:8081/changePassword"
    postRequest(url, data, callback);
};
