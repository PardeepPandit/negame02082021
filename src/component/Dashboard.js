import React, { useState,useEffect,Fragment, useContext} from 'react';
import { Link, Redirect } from 'react-router-dom';
import PlayOnlineContext from './playonline/context/playOnlineContext'
import AuthContext from './MyComponent/context/auth/authContext'
import HumanContext from './MyComponent/context/human/humanContext';
import Header from './Header';
import $ from 'jquery'
import Spinner from '../component/MyComponent/Spinner';
import Level from './Level'
import CommonContext from './MyComponent/context/common/commonContext'
import WordLengthUI from './MyComponent/LevelUI/WordLengthUI';
import RightAdd from './MyComponent/Adds/RightAdd'
import LeftAdd from './MyComponent/Adds/LeftAdd'
import PlayBackPopup from './PlayBackPopup';
import {withRouter} from 'react-router-dom'
import  {useHistory}  from 'react-router-dom';


const Dashboard = (props) => {
    //console.log("Home rendring")
   const history=useHistory()
    const commonContext =useContext(CommonContext)
    const {game_type,setInputText,setIsActive,setSeconds,setGameType,exitUser,setGameLevel,loadGameLevels,human_vs_computer,human_vs_online,load_game_level}=commonContext

    const authContext=useContext(AuthContext)
    const {user,login_data}=authContext
    const {level}=login_data || {}

    const humanContext=useContext(HumanContext)
    const {startMatchComputer,start_match_computer,loading,checkHintCount,setWordLength}=humanContext

    const [showLevel,setShowLevel]=useState(false)
    const [levelCheck,setLevelCheck]=useState(false)
    const [levelNumbers,setLevelNumbers]=useState(level)
    const [startMatch,setStartMatch]=useState(false)

    const playOnlineContext=useContext(PlayOnlineContext)
    const {searchUserOnline,onlineUser,gameType,online_match_finish,onlineMatchFinish}=playOnlineContext
    const [search,setSearch]=useState(false)
    const [sec,setSec]=useState(()=>10)
    console.log("login data=",login_data)
    const [wordLengthPopUp,setWordLengthPopUp]=useState(false)
    const [startgame,setStartGame]=useState({levelno:null,l_type:null})
    
/*     useEffect(()=>{

        window.addEventListener("beforeunload", (ev) => 
      {  
          ev.preventDefault();
          console.log("WINDOE CLOSED=",ev.returnValue)
          window.localStorage.clear();
          return ev.returnValue = 'Are you sure you want to close?';
      }); 
      
      },[])  */ 

/*     useEffect(() => {
       console.log("show level=",showLevel)
       console.log("level check=",levelCheck)
    }, [levelCheck,showLevel]) */

    useEffect(()=>{
        let mounted = true;
        //if onlineUser has data then setIsActive to start timer
        if(mounted)
        {
            if(onlineUser && onlineUser!=='opponent_not_found' && onlineUser.user1.start==="1" && !online_match_finish){
                console.log("***************SET IS ACTIVE 1***************")
                setIsActive(true)
            }
        }
       
        return () => mounted = false;
    },[onlineUser,online_match_finish])


   /*    useEffect(()=>{
       // console.log("start_match_computer useEffect=",start_match_computer)
       console.log("Test case 3");
          if(start_match_computer)
          {
                //moveForward()
                console.log("***************SET IS ACTIVE 2***************")
                setIsActive(true)  
                setStartMatch(false)
          }      
    },[start_match_computer])   */


    useEffect(()=>{
        console.log("state=>",startgame.levelno,",",startgame.l_type)
        if(startgame.levelno && startgame.l_type){
            console.log("Game Start")
            //onClick(startgame.levelno,startgame.l_type)
        }
    },[startgame])
  
        /* const onClick=(levelno,l_type)=>{
            console.log("ONClick function called=",human_vs_computer)
            setGameLevel(l_type)
            checkHintCount(user.data.id)
            //setStartMatch(true) 
            
            if(human_vs_online)
            {
                    playOnline()
            }
            else if(human_vs_computer)
            {
                    console.log("Test case 1");
                    (l_type==='Easy' || l_type==='Medium' || l_type==='Expert') ? setSeconds(60) : setSeconds(120)
                    startMatchComputer(login_data.id,levelno)
            }            
            console.log("Test case 2")
        }  */

        useEffect(()=>{
            $(document).ready(function(){
                $("#level").click(function(){
                  $("#level").hide();

                });
              });
        },[showLevel])



 
/*  useEffect(() => {
    window.addEventListener('beforeunload', alertUser)
    return () => {
      window.removeEventListener('beforeunload', alertUser)
 
    }
  }, [])
  const alertUser = e => {
    e.preventDefault()
    e.returnValue = '' 
  }  */


 /*  useEffect(()=>{
    if(load_game_level){
        setGameType('human_vs_computer')   
    }
  },[load_game_level]) */


  useEffect(()=>{
    if(game_type){
        console.log("Redirect to gameleves")
        routeChange()
    }
  },[game_type])
  
console.log("Dashboard=",onlineUser,",",online_match_finish)

  if(onlineUser && onlineUser!=='opponent_not_found' && !online_match_finish){
        console.log("redirect")
        return <Redirect to='/playonline'/>
    }
const playOnline=()=>{
    console.log("SET INPUT TEXT 1")
    setInputText('')
    searchUserOnline(user && user.data.id)  
    //setSearch state for spinner
    setSearch(true)
}        
const routeChange = () =>{ 
    
     let path = `/gamelevels`; 
        props.history.push({
        pathname: path,
        //state:{levelNumbers:levelNumbers},
    
      }); 
  }

  


    if((!onlineUser && search) || startMatch )
    {
        console.log("?????=>",!onlineUser,",",search,",",startMatch)
        return <Spinner/>
    }
    else
    {
        return (
        <Fragment>
            <Header/>
        {/* <!----banner-sectopn---> */}
        <div class="section_card">
            <div class="container">
            <div class=" row">
                <RightAdd/>

                    <div className="col-md-8">
                        <div className="align-items">
                        {user && <img src={user.image_path+'/'+user.data.image} alt='Image not found' width="70"/>}
                          {/*   <img src="assets/img/right-arrow.png" alt="" width="70" /> */}
                            <h2 class="ne-game">The Never Ending Game</h2>
                            <Link  to='/setting'><img src="assets/img/settings.png" alt="" width="52"/></Link>
                        </div>

                        <div className="intro-panel">
                            <div className="intro-box">
                                <div className="intro-icon">
                                    <img src="assets/img/world.jpg" alt="" />
                                        <div class="intro-caption-top">
                                            <h3>Play online with the online pool</h3>
                                        </div>
                                        <div className="plat-btn">
                                        <button  onClick={()=>{
                                                            setGameType('human_vs_online') 
                                                            loadGameLevels()
                                                            }
                                                    }><img src="assets/img/play.png" /></button>
                                       {/*  <Link to="#" onClick={()=>{
                                        onlineMatchFinish(false)
                                        gameType('playonline')
                                        setGameType('human_vs_online')
                                        exitUser(user.data.id)
                                        setShowLevel(!showLevel)}
                                        } ><img src="assets/img/play.png" /></Link> */}
                                        </div>
                                        <div class="intro-caption-bottom">
                                            <h3>Anywhere in the world</h3>
                                        </div>
                                </div>
                            </div>

                            <div className="intro-box">
                                <div className="intro-icon">
                                    <img src="assets/img/friends.jpg" alt="" />
                                        <div class="intro-caption-top">
                                            <h3 className="friend-color">PLAY WITH FRIENDS</h3>
                                        </div>
                                        <div className="plat-btn">
                                        <Link to="/friendrequest"><img src="assets/img/play.png" /></Link>
                                        </div>
                                </div>
                            </div>

                            <div className="intro-box">
                                <div className="intro-icon">
                                    <img src="assets/img/computer.jpg" alt="" />
                                        <div class="intro-caption-top">
                                            <h3>PLAY AGAINST THE COMPUTER</h3>
                                        </div>
                                        <div className="plat-btn">

                                            {/* <button onClick={()=>{
                                                gameType('humanvscomputer')
                                                setGameType('human_vs_computer')
                                                togglePopupPlayBack()
                                                }} ><img src="assets/img/play.png"/></button> */}
                                        {/* <Link to={{
                                            pathname:'/gamelevels',
                                            aboutProps:{
                                                onClick,
                                                showLevel:showLevel,
                                                levelNumber:levelNumber
                                            }
                                        }}><img src="assets/img/play.png" /></Link>  */}

                                        <button  onClick={()=>{
                                                            setGameType('human_vs_computer')
                                                            setWordLengthPopUp(true) 
                                                            loadGameLevels()
                                                            }
                                                    }><img src="assets/img/play.png" /></button>

                                        {/* <button onClick={()=>
                                            {
                                                gameType('humanvscomputer')
                                                setGameType('human_vs_computer')
                                                setShowLevel(!showLevel)}
                                        }><img src="assets/img/play.png" /></button> */}
                                        </div>
                                </div>
                            </div>

                            <div className="learn-game">
                                <div className="learn-row">
                                    <div className="learn-left">
                                        <img src="assets/img/userico1n.png" alt="" />
                                        <h4>How to play and <br/> Privacy - Terms &amp; Conditions</h4>
                                    </div>

                                    <div class="learn-right learn-left">
                                        <img src="assets/img/invite-friend.jpeg" alt="" />
                                        <h4>INVITE <br/> FRIENDS</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <LeftAdd/>


                </div>
            
            </div>
        </div>
               {/*  {showLevel && <Fragment><GameLevels setShowLevel={setShowLevel} onClick={onClick} setLevelCheck={setLevelCheck} showLevel={showLevel}levelNumber={levelNumber}/></Fragment>} */}
               
                {/* {wordLengthPopUp && <WordLengthUI setWordLengthPopUp={setWordLengthPopUp}  setWordLength={setWordLength}/>} */}

                {levelCheck &&  <Level  levelCheck={levelCheck} setLevelCheck={setLevelCheck}/> }
            
        </Fragment>


  )
    }
}

export default Dashboard;