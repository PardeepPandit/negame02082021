import React, { Fragment ,useEffect,useContext} from 'react'
import {useCharacterConsumer,useCharacterConsumerUpdate} from './CharacterContext'
import { useTimerConsumer,useTimerConsumerUpdate } from './TimerContext'
import {useMainConsumer,useMainConsumerUpdate} from './MainContext'
import {Link} from 'react-router-dom'
import HumanContext from './context/human/humanContext'
import CommonContext from './context/common/commonContext'
import { SET_POSITION } from '../../type'

export const Result = () => {
   
  const commonContext=useContext(CommonContext)
  const {setInputText,inputText,setIsActive,setSeconds }=commonContext


  const humanContext=useContext(HumanContext)
  const {getWordList,wordList,resultWord,setConcede,getHintWordList,setTimeOut,timeout,setPosition}=humanContext

  const {loser } = useTimerConsumer()
  const {finalResult,finish}=useMainConsumer();
  const {setLoser,resetTime}=useTimerConsumerUpdate();
  const {setWordList,setFinalResult,setPlay,setTimeFlag,setCon,setFinish,setShowKeyboard}=useMainConsumerUpdate();
  const {setRound}=useCharacterConsumerUpdate();
 //console.log("Resule component",resultWord.word,",",resultWord.definition)

 useEffect(()=>{
  console.log("finish set in useEffect",resultWord)
 },[finish])
 
 useEffect(()=>{
    console.log("Time out state=",timeout)
 },[timeout])

 const onClick=()=>{

  console.log("ONLICK is called in Timer")
  //setResultWord({word:'',definition:''})1
  setPosition(null)
  setConcede(false)
  getHintWordList(false)
  console.log("KEYBOARD ON 3")
  setShowKeyboard(true)
  setCon(false)
  setPlay(true)
  setTimeFlag(false)
  setRound(pre=>pre+1)
  console.log("Time Reset@@@@@@@@@@@@@  7")
  setSeconds()
  console.log("***************SET IS ACTIVE 8***************")
  setIsActive(true)
  getWordList([])
  setInputText('')
  console.log("LOSER AND WINNER 9")
  setLoser({name:'You',out:false})
}

const finishFun=()=>{
  console.log("KEYBOARD ON 4")
  setShowKeyboard(true)
  setFinish(true)
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
    <h2 class="win-text">{loser.name ==='You' ?<Fragment><span className="lose-text">YOU LOST</span></Fragment>:<Fragment>
      <ul className="star-list">
    <li><img src="assets/img/star2.png" alt="" /></li>
    <li><img src="assets/img/star2.png" alt="" /></li>
    <li><img src="assets/img/star2.png" alt="" /></li>
    </ul>
      <span style={{color:"green"}}>Winner</span> </Fragment> }</h2>
    
    <div class="clear"></div>
    </div>
    </div>
    </div>
   
              <div class="row">
                    <div class="col-md-8 offset-2">
                        <h2 className="word"><span style={{color:'white'}}>{loser.name ==='You' ? "" : ""}</span></h2>
                        <h1><span style={{color:'white',fontSize:'50px'}}>{resultWord.word}</span></h1>
                        <h1><span style={{color:'white',fontSize:'50px'}}>{resultWord.definition}</span></h1>
                  </div>
             </div>


    <div class="row">
      <div class="col-md-12">
      <div className="new_mtch_btn">
             {/* <a href="#" style={{"font-size": "26px;"}}> New Match</a> */}
             {(finalResult.win===3 || finalResult.lose===3) ?<Link to='#' className='play-again' onClick={finishFun}>Finish</Link>:<Link to='/main' className='play-again' onClick={onClick}>Next-Round**</Link>}
             
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