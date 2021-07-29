import React, { useState,useEffect,useContext,useLocation} from 'react';
import AuthContext from './MyComponent/context/auth/authContext'
import LeaderContext from './MyComponent/context/leaderboard/leaderContext'


const Profile = ({match}) => {
    //let location = useLocation()
    const {id,position,points}=match.params
    console.log("Profile ID=",id,",",position,",",points)
    const authContext=useContext(AuthContext)
    const {loadUser,otherUser,loading}=authContext
    const leaderContext=useContext(LeaderContext)
    const {userHints,hints}=leaderContext

    useEffect(()=>{
        loadUser(id,'other')
        userHints(id)
        console.log("HINT ********",hints)
    },[])
  console.log("User in profile=",otherUser)
  return (
  
<h-me>

   <div class="section_card registration-container">
       <div class="container">
       <div class="row">
       <div className="col-lg-5 offset-md-1">
                <div className="profile-card">
                    <div className="profile-icon">
                    <img src={otherUser && !loading && otherUser.image_path+'/'+otherUser.data.image} alt="" className="img-fluid" />
                    </div>
                    <h1 className="profile-name player-name">{otherUser && !loading && otherUser.data.name}</h1>
                    
                </div>
            </div>

            <div className="col-lg-5">
                <ul className="player-list detail-list">
                <li><a href="#">Plan <span>Free for 15 days</span></a></li>
                <li><a href="#">Points <span>{points}</span></a></li>
                <li><a href="#">Hint <span>{!loading && hints}</span></a></li>
                <li><a href="#">Position <span>{position}</span></a></li>
                </ul>
            </div>


            <div className="col-lg-10 offset-md-1">
                <div className="details-box">
                    <table className="table table-bordered">
                        <tbody>
                        <tr>
                        <td>Date of Birth</td>
                        <td>{!loading && otherUser && otherUser.data.dob}</td>
                        </tr>

                        <tr>
                        <td>Phone Number</td>
                        <td>{!loading && otherUser && otherUser.data.mobile}</td>
                        </tr>

                        <tr>
                        <td>Email</td>
                        <td>{!loading && otherUser && otherUser.data.email}</td>
                        </tr>

                        <tr>
                        <td width="220">Bio</td>
                        <td>{!loading && otherUser && otherUser.data.bio}</td>
                        </tr>

                        <tr>
                        <td>Country</td>
                        <td>{!loading && otherUser && otherUser.data.country}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
       </div>
      
       </div>
   </div>

    
    
</h-me>


  );


}

export default Profile;


/* import React, { useState,useEffect,useContext,useLocation} from 'react';
import AuthContext from './MyComponent/context/auth/authContext'


const Profile = ({match}) => {
    //let location = useLocation()
    console.log("Profile ID=",match.params.id)
    const authContext=useContext(AuthContext)
    const {loadUser,user,loading}=authContext

    useEffect(()=>{
        loadUser(match.params.id,'other')
    },[])
  console.log("User in profile=",user)
  return (
  
<h-me>

   <div class="section_card registration-container">
       <div class="container">
       <div class="row">
       <div className="col-lg-5 offset-md-1">
                <div className="profile-card">
                    <div className="profile-icon">
                    <img src={user && !loading && user.image} alt="" className="img-fluid" />
                    </div>
                    <h1 className="profile-name player-name">{user && !loading && user.data.name}</h1>
                    
                </div>
            </div>

            <div className="col-lg-5">
                <ul className="player-list detail-list">
                <li><a href="#">Plan <span>Free for 15 days</span></a></li>
                <li><a href="#">Points <span>105</span></a></li>
                <li><a href="#">Hint <span>0</span></a></li>
                <li><a href="#">Position <span>1</span></a></li>
                </ul>
            </div>


            <div className="col-lg-10 offset-md-1">
                <div className="details-box">
                    <table className="table table-bordered">
                        <tbody>
                        <tr>
                        <td>Date of Birth</td>
                        <td>{!loading && user && user.data.dob}</td>
                        </tr>

                        <tr>
                        <td>Phone Number</td>
                        <td>{!loading && user && user.data.mobile}</td>
                        </tr>

                        <tr>
                        <td>Email</td>
                        <td>{!loading && user && user.data.email}</td>
                        </tr>

                        <tr>
                        <td width="220">Bio</td>
                        <td>{!loading && user && user.data.bio}</td>
                        </tr>

                        <tr>
                        <td>Country</td>
                        <td>{!loading && user && user.data.country}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
       </div>
      
       </div>
   </div>

    
    
</h-me>


  );


}

export default Profile;
 */