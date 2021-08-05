import React, { useState,useEffect,Fragment, useContext,useHistory} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useTimerConsumer,useTimerConsumerUpdate } from './MyComponent/TimerContext'
import {useCharacterConsumer,useCharacterConsumerUpdate} from './MyComponent/CharacterContext'
import {useMainConsumer,useMainConsumerUpdate} from './MyComponent/MainContext'
import PlayOnlineContext from './playonline/context/playOnlineContext'
import AuthContext from './MyComponent/context/auth/authContext'
import HumanContext from './MyComponent/context/human/humanContext';
import Header from './Header';
import $ from 'jquery'
import Spinner from '../component/MyComponent/Spinner';
import Level from './Level'
import CommonContext from './MyComponent/context/common/commonContext'
import { SET_SECONDS } from '../type';


const Dashboard = (props) => {
    //console.log("Home rendring")

    const commonContext =useContext(CommonContext)
    const {setInputText,setIsActive,setSeconds}=commonContext

    const authContext=useContext(AuthContext)
    const {user,login_data}=authContext
    const {level}=login_data

    const humanContext=useContext(HumanContext)
    const {startMatchComputer,start_match_computer,loading,checkHintCount,setLevelType}=humanContext

    const {isActive,loser}=useTimerConsumer();
    const {setLoser}=useTimerConsumerUpdate();
    const {setCon,setAlpha}=useMainConsumerUpdate()
    const [showLevel,setShowLevel]=useState(false)
    const [levelCheck,setLevelCheck]=useState(false)
    const [levelNumber,setLevelNumber]=useState(level)
    const [startMatch,setStartMatch]=useState(false)


    const playOnlineContext=useContext(PlayOnlineContext)
    const {searchUserOnline,onlineUser,exitUser,gameType,game_type,online_match_finish,onlineMatchFinish}=playOnlineContext
    const [search,setSearch]=useState(false)
    const [sec,setSec]=useState(()=>10)
    console.log("login data=",login_data)
    
    /* useEffect(()=>{
        console.log("SPINNER in useEffect=",startMatch)
        if(startMatch)
        {
            return <Spinner/>
        }
    },[startMatch]) */

    useEffect(() => {
       console.log("show level=",showLevel)
       console.log("level check=",levelCheck)
    }, [levelCheck,showLevel])

    useEffect(()=>{
        //if onlineUser has data then setIsActive to start timer
        if(onlineUser && onlineUser!=='opponent_not_found' && onlineUser.user1.start==="1" && !online_match_finish){
            console.log("***************SET IS ACTIVE 1***************")
            setIsActive(true)
        }
    },[onlineUser,online_match_finish])

    useEffect(()=>{
        console.log("calling resttime=",loser.name,",",loser.out)
        console.log("Time Reset@@@@@@@@@@@@@  2")
        setSeconds()
    },[loser])


      useEffect(()=>{
       // console.log("start_match_computer useEffect=",start_match_computer)

          if(start_match_computer){

                //moveForward()
                setCon(false)
                setLoser({name:'You',out:false})
                console.log("***************SET IS ACTIVE 2***************")
                setIsActive(true)  
                setStartMatch(false)
            }      
    },[start_match_computer])  

    

/* const moveForward=()=>{
    console.log("MOVE FORWARD CALLED")
  
    
    setCon(false)
    setLoser({name:'You',out:false})
    setIsActive(true)  
    setStartMatch(false)
} */
         const onClick=(levelno,l_type)=>{
                    
                    setLevelType(l_type)
                    checkHintCount(user.data.id)
                    setStartMatch(true) 
                    
                    if(game_type==='playonline')
                    {
                            playOnline()
                    }
                    else if(game_type==='humanvscomputer'){
                            startMatchComputer(login_data.id,levelno)
                    }            
         
        } 

        useEffect(()=>{
            $(document).ready(function(){
                $("#level").click(function(){
                  $("#level").hide();

                });
              });
        },[showLevel])



useEffect(() => {
    window.addEventListener('beforeunload', alertUser)
    return () => {
      window.removeEventListener('beforeunload', alertUser)
 
    }
  }, [])
  const alertUser = e => {
    e.preventDefault()
    e.returnValue = ''
  }
  
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

    const newFun=()=>{
        console.log("NEW FUN ***")
    }

  if(start_match_computer)
    {
        console.log("REDIRECTING TO MAIN=",start_match_computer,",",levelNumber)
         return <Redirect to='/main' />
    } 


    if((!onlineUser && search) || startMatch ){
         /*if (sec===0) {
            setSearch(false);
          } else {
            setTimeout(() => setSec(sec - 1), 1000);
            console.log("Time=",sec)
          } */
          //setStartMatch(false)
        return <Spinner/>
    }
    else{

  return (
  
<Fragment>
    <Header/>
{/* <!----banner-sectopn---> */}
   <div class="section_card">
       <div class="container">
       <div class=" row">
           <div class="col-md-4">
                   <div class="card man1 card1 ">
                            <div class=" row m-1">          

                       <div class="col-md-8">
                           <div class="left">
                               <h3 class="play_heading">Play Online </h3>
                               <p class="text-white m_p">PlayOnline</p>
                               <Link to="#" class="play_btn" onClick={()=>{
                                   onlineMatchFinish(false)
                                   gameType('playonline')
                                   exitUser(user.data.id)
                                   setShowLevel(!showLevel)}
                                   } >Play</Link>
                           </div>
                       </div>
                       <div class="col-md-4">
                           <div class="image_r">
                               <img class="earth1" src="assets/img/earth.jpg" alt="" />
                           </div>
                       </div>
                   </div>
               </div>
               </div>
                 <div class="col-md-4">
                   <div class=" card man1 card2 ">
                            <div class=" row m-1">          

                       <div class="col-md-8">
                           <div class="left">
                               <h3 class="play_heading_n">Play With  Friends </h3>
                                  <p class="text-white m_p">Play With  you own people</p>
                               <Link class="play_btn" to="/friendrequest">Play</Link>
                           </div>
                       </div>
                       <div class="col-md-4">
                           <div class="image_r">
                               <img class="earth" src="assets/img/friend.png" alt="" />
                           </div>
                       </div>
                   </div>
               </div>
               </div>
                 <div class="col-md-4">
                   <div class=" card man1 card3 ">
                            <div class=" row m-1">          

                       <div class="col-md-8">
                           <div class="left">
                               <h3 class="play_heading_n">VS Computer </h3>
                               <p class="text-white  m_p">Play With  Computer</p>
                                 {/* <button class="play_btn" data-toggle="modal" data-target="#level" onClick={onClick}>Play</button>  */}
                                   <button class="play_btn" onClick={()=>
                                    {
                                        gameType('humanvscomputer')
                                        setShowLevel(!showLevel)}
                                   }>Play</button>   
                                  {/*  <Link class="play_btn" to="/main" onClick={onClick}>Play</Link> */}
                           </div>
                       </div>
                       <div class="col-md-4">
                           <div class="image_r">
                               <img class="earth" src="assets/img/desk.png" alt="" />
                           </div>
                       </div>
                   </div>
               </div>
               </div> 
           </div>
      
       </div>
   </div>
        {showLevel && <Fragment>
            <div className="level-contaienr" id='level'>
                <div className="level-wrapper">
                <span  onClick={()=>setShowLevel(!showLevel)}>X</span>
                <h2>Select level</h2>
                <ul className="level-list">
                    <li>{(levelNumber==="1" || levelNumber==='1,2' || levelNumber==='1,2,3' || levelNumber==='1,2,3,4') ? 
                    <Link to='#' onClick={()=>onClick("1","easy")}>Easy*</Link> : 
                     <Link to="#" onClick={()=>{
                            setShowLevel(false)
                            setLevelCheck(true)
                        }}>Easy</Link>}</li>

                    <li>{(levelNumber==='1,2' || levelNumber==='1,2,3' || levelNumber==='1,2,3,4')  ?
                     <Link to='#' onClick={()=>onClick("2","medium")}>Medium*</Link> :
                     <Link to="#" onClick={()=>{
                        
                            setShowLevel(false)
                            setLevelCheck(true)
                        }}>Medium</Link>}</li>
                    <li>{(levelNumber==='1,2,3' || levelNumber==='1,2,3,4')  ? 
                    <Link to='/main' onClick={()=>onClick("3")}>Expert*</Link> :
                     <Link to="#" onClick={()=>{
                        
                            setShowLevel(false)
                            setLevelCheck(true)
                        }}>Expert</Link>}</li>
                    <li>{(levelNumber==='1,2,3,4')  ?
                     <Link to='/main' onClick={()=>onClick("4")}>Genius*</Link> :
                     <Link onClick={()=>{
                        
                        setShowLevel(false)
                        setLevelCheck(true)
                    }}>Genius</Link>}</li>
                    </ul>
                </div>
            </div>
        </Fragment>}

        {levelCheck &&  <Level onClick={onClick} levelCheck={levelCheck} setLevelCheck={setLevelCheck}/> }
    
</Fragment>


  )
        }


}

export default Dashboard;