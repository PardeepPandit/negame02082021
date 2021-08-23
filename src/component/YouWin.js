// eslint-disable-next-line react-hooks/exhaustive-deps
import React, { Fragment,useContext,useEffect} from 'react';
import {Link} from 'react-router-dom'
import PlayOnlineContext from './playonline/context/playOnlineContext'
import CommonContext from './MyComponent/context/common/commonContext'


const YouWin = () => {

    const commonContext=useContext(CommonContext)
    const {setSeconds,seconds,setIsActive}=commonContext

    const playOnlineContext=useContext(PlayOnlineContext)
    const {word_definition,resetState,winner_loser,saveWord,onlineUser,sendMatchRound,online_round_counter,setRoundComplete,setShowKeyboard,get_word,clearAllInterval,opponent_click_next_round_button,user_click_next_round_button,showNextRoundButton,setShowNextRoundButton,setUserOpponentAgree,finalResultCounter,final_result_winner_counter,final_result_loser_counter,setwinnerLoser,getFinalResultOnline,changeMatchStatus}=playOnlineContext
 
    const {data}=get_word || {}
    const {user_id,gamestatus,challenge,concede}=data || {}

    useEffect(()=>{
        if(showNextRoundButton===true && (final_result_winner_counter!==3 && final_result_loser_counter!==3)){

            console.log("call save word API=",showNextRoundButton,",",final_result_winner_counter,",",final_result_loser_counter)
            saveWord({
                match_id:onlineUser.user1.match_id,
                gamestatus:'0',
                concede:"1",
                user_id:parseInt(onlineUser.user1.user_id),
                challenge:"0",
                word:""
            },5)
        }
    },[showNextRoundButton])


    useEffect(()=>{
        if(winner_loser==='winner')
        {
            finalResultCounter(winner_loser)
            console.log("Sending Status Winner")
            //setCurrentStatus('winner')
            localStorage.setItem('current_status','winner')
           // setApiHit(120)
            
           sendMatchRound(
                {
                    id:onlineUser.user1.id,
                    round:online_round_counter,
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
                        },6)
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
                        },7)
                        
                        console.log("Time Reset@@@@@@@@@@@@@  11")
                               
                    }

                      //  interval_id.forEach(clearInterval)
                      clearAllInterval()

                  

             setSeconds(120)
             console.log("setisActive true")
             setIsActive(true)
            //setRoundComplete(true)
      
     }
     
    },[winner_loser])
    
    useEffect(()=>{

        if(winner_loser==='winner'){

            setTimeout(()=>{
                console.log("Show Next round button after 10 sec you winner")
                setShowNextRoundButton(true)
            },10000)

        }
},[winner_loser])




    const finishFun=()=>{

        localStorage.setItem('match_finish',true)
 
        getFinalResultOnline(onlineUser.user1.match_id,onlineUser.user1.user_id)
        setRoundComplete(true)
        setwinnerLoser(false)
        changeMatchStatus(onlineUser.user1.match_id)
   } 

    useEffect(()=>
    {

        if(user_click_next_round_button===true && opponent_click_next_round_button===true && winner_loser==='winner'){
            
            console.log("calling save word API from WIN set all fields to ZERO")
            setUserOpponentAgree(true)
            saveWord({
                match_id:onlineUser.user1.match_id,
                gamestatus:"0",
                concede:"0",
                user_id:parseInt(onlineUser.user1.user_id),
                challenge:"0",
                word:""
            },8,false)
                
            
            setTimeout(()=>{
                console.log("calling reset state in you win after 3 seconds")
                resetState(true)
            },[4000])
            setRoundComplete(true)
            console.log("setisActive true")
            setIsActive(true)
            setSeconds(60)
            console.log("KEYBOARD ON 1")
            setShowKeyboard(true)
        }

    },[user_click_next_round_button,opponent_click_next_round_button])



const onClick=()=>{
    
    setShowNextRoundButton(false)
    console.log("calling save word API form you Win on button click after 3sec")
    saveWord({
        match_id:onlineUser.user1.match_id,
        gamestatus:'5',
        concede:"1",
        user_id:parseInt(onlineUser.user1.user_id),
        challenge:"0",
        word:""
    },9)
   
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
                                {showNextRoundButton &&
                                    <Fragment>{(final_result_winner_counter===3 || final_result_loser_counter===3) ?<Link to='/dashboard' onClick={()=>finishFun()} className='play-again' >Finish</Link>:<Link to="/playonline" onClick={()=>onClick()} className="play-again">Next Round{"   "}{seconds}</Link>}</Fragment> 
                                }
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