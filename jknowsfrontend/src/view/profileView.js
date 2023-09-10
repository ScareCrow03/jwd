import React from 'react';
import {Profile} from '../components/profile';
import {useLocation} from "react-router-dom";


export default function ProfileView() {
    const loc = useLocation();
    let id = loc.search.split("?id=")[1];
    // localStorage.setItem("profileUserId", id);
    return(
        <Profile id={id}/>
    );
}
