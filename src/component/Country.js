import React, { useState,useEffect,useContext } from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery'
import AuthContext from './MyComponent/context/auth/authContext'
import LeaderContext from './MyComponent/context/leaderboard/leaderContext'
import UserItem from './UserItem'
import axios from 'axios'
import { Fragment } from 'react';

const Country = (props) => {
    const authContext=useContext(AuthContext)
    const {user,logout}=authContext
    const leaderContext=useContext(LeaderContext)
    const {topCountry,top_country,loading}=leaderContext
   /*  useEffect(()=>{
        topCountry(user.data.id)
        console.log("TOP_COUNTRY=",!loading && top_country && top_country)
    },[]) */
  
  return (
  
<Fragment>
       <div class="row">
            <div className="col-lg-4 offset-md-1">
                   <h1 className="country-hdng"><img src="assets/img/india.webp" width='100px'/>{user.data.country}</h1>
            </div>

               <div className="col-lg-6">
                    <h1 className="country-hdng">Top 10</h1>
               </div>

            <div className="col-lg-6">
                <div className="topten-box">
                <div className="row">
                     {!loading && top_country && top_country.map((list)=>(
                         <UserItem key={list.user_id} user={list} target="topcountry"/>
                     ))}

                </div>
              </div>
           </div>

       </div>   
    
</Fragment>


  );


}

export default Country;