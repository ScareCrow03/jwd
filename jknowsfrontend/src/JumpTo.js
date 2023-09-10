import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function JumpTo(props) {
    const navigate = useNavigate();
    useEffect(() => {
        console.log("JumpTo", props.url);
        navigate(props.url);
    },[])
    return null;
}