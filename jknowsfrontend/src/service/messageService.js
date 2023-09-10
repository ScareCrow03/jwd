import {postRequest} from "../utils/ajax";

export const getMessages = (userId,start,end,callback) => {
    const data = {userId:userId,start:start,end:end};
    const url = "http://123.60.52.71:8081/getMessages"
    postRequest(url, data, callback);
};