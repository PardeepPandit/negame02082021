import React, { useState,useEffect,useContext,Fragment} from 'react';
import { Link, Redirect,Route,useParams,useHistory } from 'react-router-dom';
import $ from 'jquery';
import AuthContext from './MyComponent/context/auth/authContext'
import LeaderContext from './MyComponent/context/leaderboard/leaderContext'
import UserItem from './UserItem'
import Rank from './Rank'
import Age from './Age'
import Country from './Country'
import Header from './Header'
import { LOAD_LEADERBOARD_RANK_FAIL } from '../type';

const Leaderboard = (props) => {
    const authContext=useContext(AuthContext)
    const {user,logout,isAuthenticated}=authContext
    //const [rankList,setRankList]=useState([])
    const leaderContext=useContext(LeaderContext)
    const {rankList,loading,top_country,topCountry,filterByAge,loadRank}=leaderContext
    console.log("RankLIst=",rankList)
    console.log("User=",user)
    
    const [showRank, setShowRank] = useState(true);
    const [showCountry, setShowCountry] = useState(false);
    const [showAge, setShowAge] = useState(false);
       
    useEffect(()=>{
        if(isAuthenticated){
            topCountry(user && user.data.id)
            filterByAge(user && user.data.id,30,0,'elder')
            filterByAge(user && user.data.id,15,30,'adult')
            filterByAge(user && user.data.id,0,15,'teen')
            loadRank(user && user.data.id)
            console.log("TOP_COUNTRY=",!loading && top_country && top_country)
        }
    },[])

    const handlePreview=(e)=>{
        e.preventDefault();
        console.log("REACT****=",e.target.outerText)
        if(e.target.outerText==='Rank')
        {
                setShowRank(true)
                setShowCountry(false)
                setShowAge(false)

        }
        
        if(e.target.outerText==='Country'){
                setShowCountry(true)
                setShowRank(false)
                setShowAge(false)
        } 
        if(e.target.outerText==='Age')
        {
                 setShowAge(true)
                 setShowCountry(false)
                 setShowRank(false)
        } 
    }
  return (
  
<Fragment>
    <Header/>
   <div class="section_card registration-container">
       <div class="container">
       <div class="row">
            <div className="col-lg-4">
                <ul className="rank-list">
                <li><button type="submit" onClick={handlePreview}>Rank</button></li>
                <li><button type="submit" onClick={handlePreview}>Country</button></li>
                <li><button type="submit" onClick={handlePreview}>Age</button></li>
                </ul>
            </div>

            <div className="col-lg-8">
                {showRank && <Rank/>}
                {showCountry && <Country/>}
                {showAge && <Age/>}
            </div>
       </div>
   </div>
    </div>
</Fragment>


  );


}

export default Leaderboard;