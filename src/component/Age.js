import React,{useState,useEffect,useContext} from 'react';
import { Link } from 'react-router-dom';
import AgeFilter from './AgeFilter'
import LeaderContext from './MyComponent/context/leaderboard/leaderContext'
import AuthContext from './MyComponent/context/auth/authContext'
import { Fragment } from 'react';

const Age = (props) => {
    const leaderContext=useContext(LeaderContext)
    const {user_by_age0,user_by_age15,user_by_age30}=leaderContext
    const authContext=useContext(AuthContext)
    const {user,login_data}=authContext

    const [userByAge,setUserByAge]=useState()

    console.log("user_bu_age=",user_by_age0 && user_by_age0)

    console.log("login_data=",login_data)

        const onClick=(e)=>{
            console.log("Age=",e.target.outerText)
            if(e.target.outerText.trim()==='30 Upper') setUserByAge(user_by_age30)
            if(e.target.outerText==='15 to 30') setUserByAge(user_by_age15)
            if(e.target.outerText==='Below 15') setUserByAge(user_by_age0)
        }
  
  return (
  
<Fragment>
            <div className="row">
                <div className="col-lg-4">
                    <div className="age-btn" onClick={onClick}>30 Upper</div>
                </div>

                <div className="col-lg-4">
                    <div className="age-btn" onClick={onClick}>15 to 30</div>
                </div>

                <div className="col-lg-4">
                    <div className="age-btn" onClick={onClick}>Below 15</div>
                </div>
            </div>   
                <div className="topten-box">
                <div className="row">
                    <AgeFilter user_by_age={userByAge}/>
                </div>
              </div>
 
</Fragment>
  );


}

export default Age;