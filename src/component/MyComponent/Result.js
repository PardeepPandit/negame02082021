import React, { Fragment ,useEffect,useContext} from 'react'
import {useCharacterConsumer,useCharacterConsumerUpdate} from './CharacterContext'
import { useTimerConsumer,useTimerConsumerUpdate } from './TimerContext'
import {useMainConsumer,useMainConsumerUpdate} from './MainContext'
import {Link} from 'react-router-dom'
import HumanContext from './context/human/humanContext'
import CommonContext from './context/common/commonContext'
import { SET_CURRENT_WINNER_LOSER_HC, SET_POSITION } from '../../type'

export const Result = () => {
   
  const commonContext=useContext(CommonContext)
  const {setInputText,inputText,setIsActive,setSeconds }=commonContext


  const humanContext=useContext(HumanContext)
  const {start_match_computer,resultWord,timeout,current_winner_loser_HC,resetStateHC,winner_counter,loser_counter,getFinalResultHC,sendMatchRoundHC,round,changeMatchStatusHC}=humanContext

  const {loser } = useTimerConsumer()
  const {finalResult,finish}=useMainConsumer();
  const {setLoser,resetTime}=useTimerConsumerUpdate();
  const {setWordList,setFinalResult,setTimeFlag,setCon,setFinish,setShowKeyboard}=useMainConsumerUpdate();
 //console.log("Resule component",resultWord.word,",",resultWord.definition)

 useEffect(()=>{
  console.log("finish set in useEffect",resultWord)
 },[finish])
 
 useEffect(()=>{
    console.log("Time out state=",timeout)
 },[timeout])

 const onClick=()=>{

  console.log("ONLICK is called in Timer")
  
  sendMatchRoundHC(
    {
        id:start_match_computer.user1.id,
        round:round,
        status:current_winner_loser_HC==='winner'  ? "1" : "0",
        points:current_winner_loser_HC==='winner' ? "5" : "0"
    }
)
 /*  setInputText('')
  setCurrentWinnerLoserHC(null)
  console.log("KEYBOARD ON 3")
  setShowKeyboard(true)
  setCon(false)
  setPlay(true)
  setTimeFlag(false)
  console.log("Time Reset@@@@@@@@@@@@@  7")
  setSeconds()
  console.log("***************SET IS ACTIVE 8***************")
  setIsActive(true) */
  setInputText('')
  setTimeFlag(false)
  setSeconds()
  setIsActive(true)
  resetStateHC()
  
  
}

const finishFun=()=>{
  console.log("KEYBOARD ON 4")
  sendMatchRoundHC(
    {
        id:start_match_computer.user1.id,
        round:round,
        status:current_winner_loser_HC==='winner'  ? "1" : "0",
        points:current_winner_loser_HC==='winner' ? "5" : "0"
    }
)
  getFinalResultHC(start_match_computer.user1.match_id,start_match_computer.user1.user_id)
  setShowKeyboard(true)
  setFinish(true)
  changeMatchStatusHC(start_match_computer.user1.match_id)
}


return (
  <Fragment>
      <div className="finish section_card">
      <div class="mod_contany text-center">
      
<div class="container">
<div class="over_lay"></div>
<div class="round_match">
<div class="row">
<div class="col-md-12">
<div className="star-box lose-box">

    

    {/* <span>X</span> */}
</div>

  <div class="top-middl_lost text-center">
    <h2 class="win-text">{current_winner_loser_HC ==='loser' ?<Fragment><span className="lose-text">YOU LOST</span></Fragment>:
    <Fragment>
        <ul className="star-list">
        <li><img src="assets/img/star2.png" alt="" /></li>
        <li><img src="assets/img/star2.png" alt="" /></li>
        <li><img src="assets/img/star2.png" alt="" /></li>
        </ul>
        <span style={{color:"green"}}>Winner</span> 
      </Fragment> }</h2>
    
    <div class="clear"></div>
    </div>
    </div>
    </div>
   
            <div class="row">
                    <div class="col-md-8 offset-2">
                        <h2 className="word"><span style={{color:'white'}}>{current_winner_loser_HC ==='loser' ? "" : ""}</span></h2>
                        <h1><span style={{color:'white',fontSize:'50px'}}>{resultWord.word}</span></h1>
                        <h1><span style={{color:'white',fontSize:'50px'}}>{resultWord.definition}</span></h1>
                  </div>
             </div>


    <div class="row">
      <div class="col-md-12">
      <div className="new_mtch_btn">
             {/* <a href="#" style={{"font-size": "26px;"}}> New Match</a> */}
             {(winner_counter===3 || loser_counter===3) ?<Link to='#' className='play-again' onClick={()=>finishFun()}>Finish</Link>:<Link to='/main' className='play-again' onClick={()=>onClick()}>Next-Round-HC</Link>}
             
            </div>
          </div>
          </div>

          </div>

          </div>
          </div>
          </div>

  </Fragment>
)
}


export default Result