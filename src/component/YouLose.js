import React, { Fragment ,useEffect,useContext,useState} from 'react'
import {Link} from 'react-router-dom'
import PlayOnlineContext from './playonline/context/playOnlineContext'
import CommonContext from './MyComponent/context/common/commonContext'
import Spinner from '../component/MyComponent/Spinner'
export const YouLose = () => {

    const commonContext=useContext(CommonContext)
    const {setIsActive,setSeconds,seconds,setInputText,setBackUpInputText,inputText,setShowKeyboard}=commonContext
  
    const playOnlineContext=useContext(PlayOnlineContext)
    const {word_definition,resetStateHHForRound,winner_loser,saveWord,onlineUser,sendMatchRound,online_round_counter, get_word,setRoundComplete,setApiHit,setCurrentStatus,user_click_next_round_button,opponent_click_next_round_button,showNextRoundButton,setShowNextRoundButton,round_complete,setUserOpponentAgree,finalResultCounter,final_result_winner_counter,final_result_loser_counter,setwinnerLoser,getFinalResultOnline,final_result_data,changeMatchStatus,nextRound,setResultWordHH,game_timeout}=playOnlineContext
    const {data}=get_word || {}
    const {word,user_id,gamestatus,challenge,concede}=data || {}
    const [spinnerShow,setSpinnerShow]=useState(false)
    
    useEffect(()=>{

        if(showNextRoundButton && (final_result_winner_counter===3 || final_result_loser_counter===3))
                 {
                     console.log("STOP TIMER *W*")
                   setIsActive(false)
                 }
    },[final_result_winner_counter,final_result_loser_counter])


     useEffect(()=>{
        console.log("winner_loser useEffect 2=",winner_loser)
        if(winner_loser==='loser')
        {
            setShowNextRoundButton(true)
          //setCurrentStatus('loser')
          console.log("Increment loser counter")
          //alert("loser counter=",final_result_loser_counter)
          finalResultCounter(winner_loser)
          localStorage.setItem('current_status','loser')  
         // setApiHit(120)
             
             sendMatchRound(
                {
                    id:onlineUser.user1.id,
                    round:online_round_counter,
                    status:"0",
                    points:"0"
                }
            )
           
                console.log("you lose=",onlineUser.user1.user_id,",",user_id,",",gamestatus,",",challenge,",",concede)
                    if(onlineUser.user1.user_id!==user_id && gamestatus==='1' && challenge==='0' && concede==='0')
                    {
                        //Note: it will execute when user checks incorrect word
                       

                        console.log("SAVEWORD API 3=",gamestatus,challenge,",",concede)
                            saveWord({
                            match_id:onlineUser.user1.match_id,
                            gamestatus:'101',
                            challenge:"0",
                            concede:"0", 
                            user_id:parseInt(onlineUser.user1.user_id),
                            word:"",
                            round:online_round_counter
                        },3) 
              
                    }
                    else if(onlineUser.user1.user_id!==user_id && gamestatus==='3' && challenge==='0' && concede==='0')
                    {
                        //This will exexcute when opponent check complete complete word
                        console.log("SAVEWORD API 20=",gamestatus,challenge,",",concede)
                        saveWord({
                            match_id:onlineUser.user1.match_id,
                            gamestatus:"0",
                            concede:"0",
                            user_id:parseInt(onlineUser.user1.user_id),
                            challenge:"0",
                            word:"",
                            round:online_round_counter
                        },20,true)
                        
                    }
                    else if(onlineUser.user1.user_id!==user_id && gamestatus==='0' && challenge==='1' && concede==='0')
                    {
                        console.log("SAVEWORD API 29=",gamestatus,challenge,",",concede)
                        saveWord({
                            match_id:onlineUser.user1.match_id,
                            gamestatus:'4',
                            concede:'0',
                            user_id:parseInt(onlineUser.user1.user_id),
                            challenge:"0",
                            word:inputText,
                            round:online_round_counter
                        },29,true)

                        setResultWordHH(inputText,'Word not complete')
                    }
                    else if(game_timeout)
                    {
                        saveWord({
                            match_id:onlineUser.user1.match_id,
                            gamestatus:'2',
                            concede:"0",
                            user_id:parseInt(onlineUser.user1.user_id),
                            challenge:"0",
                            round:online_round_counter,
                            word:""
                        },10,true) 
                    }
                   
                    console.log("Time Reset@@@@@@@@@@@@@  10")
                            setSeconds(120)

           
                setIsActive(true) 
             
        }
    },[winner_loser]) 


    /* useEffect(()=>{
        console.log("winner_loser useEffect 1=",winner_loser)
        if(winner_loser==='loser'){

            setTimeout(()=>{
                console.log("Show Next round button you lose")
                setShowNextRoundButton(true)
            },1000)

        }
},[winner_loser]) */



    const finishFun=()=>{
        console.log("Finish function called")
        localStorage.setItem('match_finish',true)
        
        getFinalResultOnline(onlineUser.user1.match_id,onlineUser.user1.user_id)
        //setRoundComplete(true)
        console.log("setwinnerloser 1")
        setwinnerLoser(false)
        changeMatchStatus(onlineUser.user1.match_id)
        setIsActive(false)
    }



useEffect(()=>{
        console.log(`ROUND CHANGE YL-${online_round_counter}`)
        
    if(winner_loser==='loser' && (showNextRoundButton || (user_click_next_round_button===true && opponent_click_next_round_button===true))){
        setShowNextRoundButton(false)
        console.log("SAVEWORD API 1=",gamestatus,challenge,",",concede)
        setUserOpponentAgree(true)
        saveWord({
            match_id:onlineUser.user1.match_id,
            gamestatus:"0",
            concede:"0",
            user_id:parseInt(onlineUser.user1.user_id),
            challenge:"0",
            word:"",
            round:online_round_counter
        },111,false)


        setTimeout(()=>{
            console.log(`calling reset state in you lose after 3 seconds`)
            resetStateHHForRound(true)
        },[4000])
        setRoundComplete(true)
        console.log("Time Reset@@@@@@@@@@@@@  1")
        setIsActive(false)
        setSeconds(60)
        setShowKeyboard(false)
        setSpinnerShow(true)
    }

},[online_round_counter])


/* useEffect(()=>{
        console.log(`ROUND CHANGE YL-${online_round_counter}`)

    if(user_click_next_round_button===true && opponent_click_next_round_button===true && winner_loser==='loser'){

        console.log("SAVEWORD API 1=",gamestatus,challenge,",",concede)
        
        saveWord({
            match_id:onlineUser.user1.match_id,
            gamestatus:"0",
            concede:"0",
            user_id:parseInt(onlineUser.user1.user_id),
            challenge:"0",
            word:"",
            round:online_round_counter
        },1,false)


        setTimeout(()=>{
            console.log(`calling reset state in you lose after 3 seconds`)
            resetStateHHForRound(true)
        },[4000])
        setRoundComplete(true)
        console.log("Time Reset@@@@@@@@@@@@@  1")
        setIsActive(false)
        setSeconds(60)
        setShowKeyboard(false)
        
    }

},[online_round_counter]) */


    useEffect(()=>
    {
        console.log("user_click_next_round_button=",user_click_next_round_button)
        console.log("opponent_click_next_round_button=",opponent_click_next_round_button)
        if(user_click_next_round_button===true && opponent_click_next_round_button===true && winner_loser==='loser'){
            console.log("BOTH USERS AGREE TO GO IN NEXT ROUND")
            console.log("SET INPUT TEXT BLANK YL")
            localStorage.setItem('user_opponent_agree',true)
            setUserOpponentAgree(true)
            setInputText('')
            setBackUpInputText('')
            setTimeout(()=>{
                nextRound()
            },4000)
        }
    },[user_click_next_round_button,opponent_click_next_round_button])


    

    const onClick=()=>{
        console.log("SAVEWORD API 4=",gamestatus,challenge,",",concede)
        setShowNextRoundButton(false)
        //finalResultCounter(winner_loser)
        saveWord({
            match_id:onlineUser.user1.match_id,
            gamestatus:'5',
            concede:"0",
            user_id:parseInt(onlineUser.user1.user_id),
            challenge:"0",
            word:"",
            round:online_round_counter

        },4)
       
    }


   /*  useEffect(()=>{
        if(final_result_data)
        {
            finalResultCounter(winner_loser)
            setIsActive(false)
            setSeconds(0)
            setwinnerLoser(null)
        }
    
    },[final_result_data]) */

   

    if((spinnerShow))
    {
        console.log("spinneron==",spinnerShow)
        return <Spinner/>
    }
    else{
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

                                        <h1 className="win-text lose-text">You Lost</h1>
                                      {/*   <h3>{word}</h3> */}
                                        <h3>word is complete after check</h3>
                                        <h3>Lost</h3>
                                        <Fragment>
                                                <h1><span style={{color:'white'}}>{word_definition.word}</span></h1>
                                                <h1><span style={{color:'white'}}>{word_definition.definition}</span></h1>
                                        </Fragment>

                                      {showNextRoundButton && <Fragment>{(final_result_winner_counter===3 || final_result_loser_counter===3) ?<Link to='/dashboard' onClick={()=>{
                                    
                                              console.log("MATCH FINISH L,",round_complete)  
                                                finishFun()
                                    
                                    }} className='play-again' >Finish-HH</Link>:<Link to="/playonline" onClick={()=>onClick()} className="play-again">Next Round{"   "}{seconds}</Link>}</Fragment>
                                    
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
}

export default YouLose