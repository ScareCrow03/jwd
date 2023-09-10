import {postRequest} from "../utils/ajax";

export const getLikeComment = (userId,callback) => {
    const data = {userId : userId};
    const url = "http://123.60.52.71:8081/getLikeComment"
    postRequest(url, data, callback);
};