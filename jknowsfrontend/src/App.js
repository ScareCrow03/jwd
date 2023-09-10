import { DetailedQuestion } from './view/DetailedQuestionView';
import Homeclass from './view/HomeView';
import React from 'react';
import { BrowserRouter ,HashRouter, Route, Routes} from 'react-router-dom'
import WriteAnswerView from "./view/WriteAnswerView";
import {WaityouAnswerView} from "./view/WaityouAnswerView";
import LoginView from "./view/LoginView";
import {Profile} from "./components/profile";
import {MyQuestion} from "./components/myQuestion";
import {MyAnswer} from "./components/myAnswer";
import {FollowQuestion} from "./components/followQuestion";
import {FolloweeUser} from "./components/followeeUser";
import {FollowerUser} from "./components/followerUser";
import {ProfileEdit} from "./components/profileEdit";
import {Like} from "./components/like";
import {LikeQuestion} from "./components/likeQuestion";
import {LikeAnswer} from "./components/likeAnswer";
import {LikeComment} from "./components/likeComment";
import {DislikeAnswer} from "./components/dislikeAnswer";
import {Dislike} from "./components/dislike";
import {DislikeQuestion} from "./components/dislikeQuestion";
import {DislikeComment} from "./components/dislikeComment";
import ProfileView from "./view/profileView"
import RegisterForm from "./components/RegisterForm";
import SearchView from "./view/SearchView";
import { MyQuestionView } from './view/MyQuestionView';
import PrivateRoute from './PrivateRoute';
import { ManageUser } from './components/manageUser';
function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route element={<PrivateRoute/>}>
                        <Route exact path='/answer' element={<WaityouAnswerView />}/>
                        <Route exact path='/answer/myQuestion' element={<MyQuestionView />}/>
                        <Route exact path='/profile' element={<ProfileView/>}>
                            <Route exact path='/profile/user' element={<ManageUser/>}/>
                            <Route exact path='/profile/myQuestion' element={<MyQuestion/>}/>
                            <Route exact path='/profile/myAnswer' element={<MyAnswer/>}/>
                            <Route exact path='/profile/like' element={<Like/>}>
                                <Route exact path='/profile/like/question' element={<LikeQuestion/>}/>
                                <Route exact path='/profile/like/answer' element={<LikeAnswer/>}/>
                                <Route exact path='/profile/like/comment' element={<LikeComment/>}/>
                            {/*<Route exact path='/profile/like/' element={<LikeQuestion/>}/>*/}
                        </Route>
                        <Route exact path='/profile/dislike' element={<Dislike/>}>
                            <Route exact path='/profile/dislike/question' element={<DislikeQuestion/>}/>
                            <Route exact path='/profile/dislike/answer' element={<DislikeAnswer/>}/>
                            <Route exact path='/profile/dislike/comment' element={<DislikeComment/>}/>
                            {/*<Route exact path='/profile/dislike/' element={<DislikeQuestion/>}/>*/}
                        </Route>
                        <Route exact path='/profile/follow_question' element={<FollowQuestion/>}/>
                        <Route exact path='/profile/followee_user' element={<FolloweeUser/>}/>
                        <Route exact path='/profile/follower_user' element={<FollowerUser/>}/>
                        {/*<Route exact path='/profile/' element={<MyQuestion/>}/>*/}
                    </Route>
                    <Route exact path='/profileEdit' element={<ProfileEdit/>}/>
                    <Route exact path='/question' element={<DetailedQuestion />}/>
                    <Route exact path='/writeans' element={<WriteAnswerView />}/>
                    <Route exact path='/search' element={<SearchView />}/>
                    <Route exact path='/' element={<Homeclass />}/>
                </Route>
                <Route exact path='/login' element={<LoginView />}/>
                <Route exact path='/register' element={<RegisterForm/>}/>
                </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;
