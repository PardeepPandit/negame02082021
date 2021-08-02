import React, { Fragment,useContext,useEffect,useState } from 'react';
import {Link} from 'react-router-dom'
import PlayOnlineContext from './playonline/context/playOnlineContext'
import {useTimerConsumer,useTimerConsumerUpdate} from './MyComponent/TimerContext'
import humanContext from './MyComponent/context/human/humanContext';
import HumanContext from './MyComponent/context/human/humanContext';
import CommonContext from './MyComponent/context/common/commonContext'


const YouWin = () => {

    const commonContext=useContext(CommonContext)
    const {setSeconds,seconds,setIsActive}=commonContext

    const playOnlineContext=useContext(PlayOnlineContext)
    const {word_definition,resetState,winner_loser,saveWord,onlineUser,matchRound,round_online,setRoundComplete,round_complete,setApiHit,setCurrentStatus,setShowKeyboard,interval_id,get_word,clearAllInterval,opponent_click_next_round_button,user_click_next_round_button,showNextRoundButton,setShowNextRoundButton}=playOnlineContext
    const humanContext=useContext(HumanContext);
    const {setConcede,getHintWordList}=humanContext
    const {data}=get_word || {}
    const {word,user_id,gamestatus,challenge,concede}=data || {}


    useEffect(()=>{

        if(winner_loser==='winner'){

            setTimeout(()=>{
                console.log("Show Next round button you winner")
                setShowNextRoundButton(true)
            },13000)

        }
},[winner_loser])


    useEffect(()=>{
        console.log("After 6 seconds",showNextRoundButton)
        if(showNextRoundButton===true){
            console.log("After 6 seconds hit save word API")
            saveWord({
                match_id:onlineUser.user1.match_id,
                gamestatus:'0',
                concede:round_online,
                user_id:parseInt(onlineUser.user1.user_id),
                challenge:"0",
                word:""
            })
        }
    },[showNextRoundButton])


    useEffect(()=>{
        if(winner_loser==='winner')
        {
            console.log("Sending Status Winner")
            //setCurrentStatus('winner')
            localStorage.setItem('current_status','loser')
           // setApiHit(120)
            
              matchRound(
                {
                    id:onlineUser.user1.id,
                    round:round_online,
                    status:"1",
                    points:"5"   
                }
            )

                    if(onlineUser.user1.user_id!==user_id && gamestatus==='101' && challenge==='0' && concede==='0'){
                            console.log("calling save word API in response of 101 ")
                        saveWord({
                            match_id:onlineUser.user1.match_id,
                            gamestatus:'0',
                            concede:'0',
                            user_id:parseInt(onlineUser.user1.user_id),
                            challenge:"0",
                            word:""
                        })
                       
                    }
                    else{
                        console.log("calling save word API form you Win on winner popup")
                        saveWord({
                            match_id:onlineUser.user1.match_id,
                            gamestatus:'3',
                            concede:"1",
                            user_id:parseInt(onlineUser.user1.user_id),
                            challenge:"0",
                            word:""
                        })
                        
                        console.log("Time Reset@@@@@@@@@@@@@  11")
                               
                    }

                      //  interval_id.forEach(clearInterval)
                      clearAllInterval()

                  

             setSeconds(120)
             setIsActive(true)
            //setRoundComplete(true)
      
     }
    },[winner_loser])
    

   /*  useEffect(()=>{
            resetState()
    },[round_complete]) */

    useEffect(()=>
    {

        if(user_click_next_round_button===true && opponent_click_next_round_button===true && winner_loser==='winner'){
            
            console.log("calling save word API from WIN set all fields to ZERO")
            saveWord({
                match_id:onlineUser.user1.match_id,
                gamestatus:"0",
                concede:"0",
                user_id:parseInt(onlineUser.user1.user_id),
                challenge:"0",
                word:""
            },false)
                
            
            setTimeout(()=>{
                console.log("calling reset state in you win after 3 seconds")
                resetState(true)
            },[1000])
            setRoundComplete(true)
            setIsActive(true)
            setSeconds(60)
            setShowKeyboard(true)
        }

    },[user_click_next_round_button,opponent_click_next_round_button])



const onClick=()=>{
    console.log("calling save word API form you Win on button click")
    setShowNextRoundButton(false)
    //setApiHit(60)
    clearAllInterval()
    saveWord({
        match_id:onlineUser.user1.match_id,
        gamestatus:'5',
        concede:"1",
        user_id:parseInt(onlineUser.user1.user_id),
        challenge:"0",
        word:""
    })
   
   // interval_id.forEach(clearInterval)
}

    return (

        <Fragment>
           
            <div className="section_card_ga section_card">
                <div className="container">
                    <div className=" row">
                    <div className="col-lg-6 mb-5 offset-md-3"><div className="logo-wrapper"><img src="assets/img/logo-01copy.png" alt="" /><h1>The Never Ending Game</h1></div></div>

                        <div className="col-md-12 ">
                            <div className=" min_top cus-padd">
                                <div className="win-container">
                                    <div className="win-wrapper">
                                        <div className="star-box">
                                            <ul className="star-list">
                                            <li><img src="assets/img/star2.png" alt="" /></li>
                                            <li><img src="assets/img/star2.png" alt="" /></li>
                                            <li><img src="assets/img/star2.png" alt="" /></li>
                                            </ul>
                                        </div>
                                            
                                        <h1 className="win-text">You Win</h1>
                                        <h1><span style={{color:'white'}}>{word_definition && word_definition.word}</span></h1>
                                        <h1><span style={{color:'white'}}>{word_definition &&  word_definition.definition}</span></h1>
                                        {showNextRoundButton && <Link to="/playonline" onClick={()=>onClick()} className="play-again">Next Round{"   "}{seconds}</Link>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </Fragment>


    );


}

export default YouWin;