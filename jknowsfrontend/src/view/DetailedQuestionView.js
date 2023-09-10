import PrimaryDetailedBody from "../components/JknowsBody";
import {Sidebar} from "../components/Sidebar";
import React,{lazy,Suspense} from 'react';

// const Body = lazy(() => import('../components/JknowsBody'));
export class DetailedQuestion extends React.Component{
    render(){
        return(
            <>
            <div style={{background: '#f6f6f6'}}>
            <Sidebar/>
            {/* <Suspense fallback={<div>Loading...</div>}>
                <Body />
            </Suspense> */}
            <PrimaryDetailedBody/>
            </div>
            </>
        )
    }
}