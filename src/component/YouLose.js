import React, { Fragment ,useEffect,useContext,useState} from 'react'
import {Link} from 'react-router-dom'
import PlayOnlineContext from './playonline/context/playOnlineContext'
import {useTimerConsumer,useTimerConsumerUpdate} from './MyComponent/TimerContext'
import CommonContext from './MyComponent/context/common/commonContext'

export const YouLose = () => {

    const commonContext=useContext(CommonContext)
    const {setIsActive,setSeconds,seconds}=commonContext
  
    const playOnlineContext=useContext(PlayOnlineContext)
    const {word_definition,resetState,winner_loser,saveWord,onlineUser,matchRound,round_online, get_word,setRoundComplete,setApiHit,setCurrentStatus,setShowKeyboard,user_click_next_round_button,opponent_click_next_round_button,showNextRoundButton,setShowNextRoundButton,round_complete}=playOnlineContext
    const {data}=get_word || {}
    const {word,user_id,gamestatus,challenge,concede}=data || {}

    useEffect(()=>{

            if(winner_loser==='loser'){

                setTimeout(()=>{
                    console.log("Show Next round button you lose")
                    setShowNextRoundButton(true)
                },13000)

            }
    },[winner_loser])

    useEffect(()=>
    {
        if(user_click_next_round_button===true && opponent_click_next_round_button===true && winner_loser==='loser'){

            console.log("calling save word API from LOSE set all fields to ZERO")
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
            console.log("Time Reset@@@@@@@@@@@@@  1")
            setIsActive(false)
            setSeconds(60)
            setApiHit(60)
            setShowKeyboard(false)
        }

    },[user_click_next_round_button,opponent_click_next_round_button])
 
 
    useEffect(()=>{

        if(showNextRoundButton){
            //Note:following code will execute in response of opponent action
                console.log("Calling save word API after 7 seconds from you lose on loser popup")
                saveWord({
                match_id:onlineUser.user1.match_id,
                gamestatus:'0',
                challenge:"0",
                concede:"1", 
                user_id:parseInt(onlineUser.user1.user_id),
                word:""
            })      
        }

    },[showNextRoundButton])

     useEffect(()=>{
        if(winner_loser==='loser')
        {
          //setCurrentStatus('loser')
          localStorage.setItem('current_status','loser')  
          setApiHit(120)
             
             matchRound(
                {
                    id:onlineUser.user1.id,
                    round:round_online,
                    status:"0",
                    points:"0"
                }
            )
           
                console.log("you lose=",onlineUser.user1.user_id,",",user_id,",",gamestatus,",",challenge,",",concede)
                    if(onlineUser.user1.user_id!==user_id && gamestatus==='1' && challenge==='0' && concede==='0'){
                        //Note: it will execute when user itself checks incorrect word
                       

                            console.log("Calling save word API after 7 seconds , users checked wrong word")
                            saveWord({
                            match_id:onlineUser.user1.match_id,
                            gamestatus:'101',
                            challenge:"0",
                            concede:"1", 
                            user_id:parseInt(onlineUser.user1.user_id),
                            word:""
                        }) 
              
                    }
                   
                    console.log("Time Reset@@@@@@@@@@@@@  10")
                            setSeconds(120)
                            setIsActive(true)
        }
    },[winner_loser]) 


    const onClick=()=>{
        console.log("calling save word API on button click")
        setShowNextRoundButton(false)
        saveWord({
            match_id:onlineUser.user1.match_id,
            gamestatus:'5',
            concede:"1",
            user_id:parseInt(onlineUser.user1.user_id),
            challenge:"0",
            word:""

        })
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
                                        <div className="star-box lose-box">
                                            <span>X</span>
                                        </div>

                                        <h1 className="win-text lose-text">Forfeited</h1>
                                      {/*   <h3>{word}</h3> */}
                                        <h3>word is complete after check</h3>
                                        <h3>Lost</h3>
                                        <Fragment>
                                                <h1><span style={{color:'white'}}>{word_definition.word}</span></h1>
                                                <h1><span style={{color:'white'}}>{word_definition.definition}</span></h1>
                                        </Fragment>
                                       {/*  {gamestatus==="3" ? " " : 

                                            <Fragment>
                                                <h1><span style={{color:'white'}}>{word_definition.word}</span></h1>
                                                <h1><span style={{color:'white'}}>{word_definition.definition}</span></h1>
                                            </Fragment>
                                        } */}

                                      {showNextRoundButton &&   <Link to='/playonline' onClick={()=>onClick()} className='play-again' >Next-Round  {seconds}</Link>}
                                      
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

export default YouLose