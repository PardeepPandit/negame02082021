import React, { useState,useEffect,useContext,Fragment} from 'react';
import { Link, Redirect,Route,useParams,useHistory } from 'react-router-dom';
import $ from 'jquery';
import AuthContext from './MyComponent/context/auth/authContext'
import LeaderContext from './MyComponent/context/leaderboard/leaderContext'
import MasterContext from './MyComponent/context/master/masterContext'
import UserItem from './UserItem'
import { LOAD_LEADERBOARD_RANK_FAIL } from '../type';
import NoData from './NoData';
export const Rank = () => {
    const authContext=useContext(AuthContext)
    const {user,logout}=authContext
    const masterContext=useContext(MasterContext)
    const {showPopup,togglePopup}=masterContext
    //const [rankList,setRankList]=useState([])
    const leaderContext=useContext(LeaderContext)
    const {rankList,loading}=leaderContext
    console.log("RankLIst=",rankList)
    console.log("User=",user)


    return (

        <Fragment>
            {rankList==='No data found!' && showPopup ? 
            <Fragment>
                <NoData/>
            </Fragment>:
            <Fragment>
       <div class="row">
            <div className="col-lg-8">
                <div className="profile-card">
                    <div className="profile-icon">
                    {/* <img src={!loading && user &&  user.image_path+'/'+user.user.image} alt="noimage" className="img-fluid" /> */}
                   <img src={!loading && user &&  user.image_path+'/'+user.data.image} alt="noimage" className="img-fluid" />
                    </div>
                     <h1 className="profile-name">{!loading && user && user.data.name}</h1> 
                    {rankList==='No data found!' ?
                    <Fragment>
                        <div className="number-box">
                        <h2><strong>Position: </strong></h2>
                        <h2><strong>Points: </strong></h2>
                        </div>
                    </Fragment> :
                    <Fragment>
                        <div className="number-box">
                        <h2><strong>Position: </strong>{!loading && rankList && rankList.user.user_postion}</h2>
                        <h2><strong>Points: </strong>{!loading && rankList && rankList.user.points}</h2>
                        </div>
                    </Fragment>
}
                    

                </div>
            </div>
            <div className="col-lg-4">
                 <div className="cus-rank">
                        {rankList==='No data found!' ? 
                        <Fragment>
                            <h1>No data</h1>
                        </Fragment> :
                        <Fragment>
                            {!loading && rankList && rankList.data.map(list => (
                            <UserItem key={list.user_id} user={list} target="ranklist"/>
                            ))}
                        </Fragment>}
                    </div> 
            </div>
       </div>

        </Fragment>}
        </Fragment>
    )
}

export default Rank