import React, { useState,useEffect,useContext,Fragment} from 'react';
import {Link } from 'react-router-dom';
import axios from 'axios'
import AuthContext from './MyComponent/context/auth/authContext'
import LeaderContext from './MyComponent/context/leaderboard/leaderContext'
import MasterContext from './MyComponent/context/master/masterContext'
import Header from './Header'

const Details = (props) => {
    const authContext=useContext(AuthContext)
    const {user,logout,loading}=authContext
    const masterContext=useContext(MasterContext)
    const {playing,setPlaying}=masterContext
    const leaderContext=useContext(LeaderContext)
    const {loadRank}=leaderContext

console.log("user in detail page=",user)
        const onLogout=()=>{
            logout();
            setPlaying(!playing)
            setTimeout(()=>{
            window.location.reload(false)
            },100)  
          }

const leaderRank=()=>{
  //loadRank(user.data.id)
}


  
  return (
<Fragment>
  <Header/>
   <div class="section_card registration-container">
       <div class="container container-xl">
                <div class="row">
                <div className="col-lg-6 offset-md-1">
                <div className="profile-card">
                    <div className="profile-icon infoicon">
                    <img src={user && !loading && user.image_path+'/'+user.data.image} alt="No image" className="img-fluid"/>
                    </div>
                    <h1 className="profile-name">{user && user.name}</h1>
                    <div className="number-box">
                    <h2>Rank 3</h2>
                    <h2>Points 8</h2>
                    </div>
                </div>
            </div>

                    <div class="col-lg-4">
                        <ul className="rank-list setting-list">
                        <li><Link to="/setting">Settings</Link></li>
                        <li><Link to="/changepassword">Change Password</Link></li>
                        <li><Link to="/leaderboard" onClick={leaderRank}>Leaderboard</Link></li>
                        <li><Link to="/historywithcomputer">History</Link></li>
                        <li><Link to="/hint">Buy Hint</Link></li>
                        <li><Link to="/login" onClick={onLogout}>Logout</Link></li>
                        </ul>
                    </div>
                </div>
               </div>
           </div>   
</Fragment>

  );
}
export default Details;