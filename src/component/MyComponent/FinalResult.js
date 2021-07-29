
import React, { Fragment,useState,useEffect,useContext} from 'react'
import {Redirect,useHistory} from 'react-router-dom'
import {Link} from 'react-router-dom'
import { useTimerConsumer,useTimerConsumerUpdate } from './TimerContext'
import {useCharacterConsumer,useCharacterConsumerUpdate} from './CharacterContext'
import {useMainConsumer,useMainConsumerUpdate} from './MainContext'
import HumanContext from './context/human/humanContext'
import CommonContext from './context/common/commonContext'


import { SET_HINT_USED } from '../../type'


export const FinalResult = ({title}) => {

  const commonContext=useContext(CommonContext)
  const {setInputText,setIsActive }=commonContext

  const humanContext=useContext(HumanContext)
  const {getWordList,wordList,resultWord,removeLocalData,setHintUsed,setConcede,getHintWordList,setTimeOut}=humanContext

    const {seconds, loser } = useTimerConsumer()
    const {setLoser,resetTime}=useTimerConsumerUpdate();
    const {setRoundList1,setRoundList2,setRoundList3,setRoundList4,setRoundList5,setHintCheck,setFinalResult,setPlay,setRedirectTo,setCon,setFinish}=useMainConsumerUpdate();
    const {finalResult,roundList1,roundList2,roundList3,roundList4,roundList5,redirectTo}=useMainConsumer();
    const {round}=useCharacterConsumer();
    const {setRound,setRoundList}=useCharacterConsumerUpdate();
    const history = useHistory()
    //const [finish,setFinish]=useState(false)


    const [temp,setTemp]=useState(false)

    
     

    const redirect = () => {
        console.log("Rdirect function word list",wordList)
        setConcede(false)
        getHintWordList(false)
        removeLocalData()
        setHintUsed(false)
        setFinalResult({win:0,lose:0})
       setHintCheck(true)
       console.log("***************SET IS ACTIVE 5***************")
       setIsActive(false)
       setFinish(false)
       setRound(1)
       setInputText(null)
      // setResultWord({word:'',definition:''})1
       //setCon(false)
       //setSeconds();
       getWordList(null)
       console.log("LOSER AND WINNER 5")
       setLoser({name:'You',out:false})  
        setRoundList1({r1:'1', r1_loser: null }) 
        setRoundList2({r2:'1', r2_loser: null }) 
        setRoundList3({r3:'1', r3_loser: null }) 
        setRoundList4({r4:'1', r4_loser: null }) 
        setRoundList5({r5:'1', r5_loser: null }) 
       //setTemp(true)
       //setRedirectTo(true)
      /*  return history.push('/main') */
     }
   

     var wincount=finalResult.win
     var losecount=finalResult.lose
     var sum=wincount+losecount

    return (
        <Fragment>
            <div class="mod_contany section_card section_card_ga text-center">
<div class="container">
  <div class="over_lay"></div>
  <div class="round_match">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="top-middl_lost text-center">
          <h2 style={{color:"White",fontSize:"4rem"}} className="bg-info">Final Result</h2>
          <h2 class="word">{wincount>losecount ? <span style={{color:"cyan",fontSize:"4rem"}}>You Win</span> : "You Lost"}</h2>
          <div class="clear"></div>
          </div>
          </div>
          </div>
          <div class="row">
            <div class="col-md-10 offset-md-1">
              <div class="trofi">

              {roundList1.r1_loser==='You' ? <img src="assets/img/red.png" alt="img"/> : <Fragment>{roundList1.r1_loser===null ? <img src="assets/img/blank.png" alt="img"/> : <img src="assets/img/green.png" alt="img"/>}</Fragment>}

              {roundList2.r2_loser==='You' ? <img src="assets/img/red.png" alt="img"/> : <Fragment>{roundList2.r2_loser===null ? <img src="assets/img/blank.png" alt="img"/> : <img src="assets/img/green.png" alt="img"/>}</Fragment>}

              {roundList3.r3_loser==='You' ? <img src="assets/img/red.png" alt="img"/> : <Fragment>{roundList3.r3_loser===null ? <img src="assets/img/blank.png" alt="img"/> : <img src="assets/img/green.png" alt="img"/>}</Fragment>}

              {roundList4.r4_loser==='You' ? <img src="assets/img/red.png" alt="img"/> : <Fragment>{roundList4.r4_loser===null ? <img src="assets/img/blank.png" alt="img"/> : <img src="assets/img/green.png" alt="img"/>}</Fragment>}

              {roundList5.r5_loser==='You' ? <img src="assets/img/red.png" alt="img"/> : <Fragment>{roundList5.r5_loser===null ? <img src="assets/img/blank.png" alt="img"/> : <img src="assets/img/green.png" alt="img"/>}</Fragment>}

                    <div class="clear"></div></div>
                    </div>
                    </div>

                    <div class="row">
                    <div class="col-md-8 offset-2">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="round1">
                          <h2 class="text-white round-text">Round</h2>
                          <p><strong class="text-white">Round 1</strong></p>
                          <p><strong class="text-white">Round 2</strong></p>
                          <p><strong class="text-white">Round 3</strong></p>
                          <p><strong class="text-white">Round 4</strong></p>
                          <p><strong class="text-white">Round 5</strong></p>
                        </div>
                      </div>
                        <div class="col-md-6">
                            <div class="round1">
                              <h2 class="text-white round-text">Status</h2>
                              <p><strong class="text-white">{roundList1.r1_loser==='You' ? 'Lost' : <Fragment>{roundList1.r1_loser===null ? 'No Match' : "Win"}</Fragment>}</strong></p>
                              <p><strong class="text-white">{roundList2.r2_loser==='You' ? 'Lost' : <Fragment>{roundList2.r2_loser===null ? 'No Match' : "Win"}</Fragment>}</strong></p>
                              <p><strong class="text-white">{roundList3.r3_loser==='You' ? 'Lost' : <Fragment>{roundList3.r3_loser===null ? 'No Match' : "Win"}</Fragment>}</strong></p>
                              <p><strong class="text-white">{roundList4.r4_loser==='You' ? 'Lost' : <Fragment>{roundList4.r4_loser===null ? 'No Match' : "Win"}</Fragment>}</strong></p>
                              <p><strong class="text-white">{roundList5.r5_loser==='You' ? 'Lost' : <Fragment>{roundList5.r5_loser===null ? 'No Match' : "Win"}</Fragment>}</strong></p>
                            </div>
                          </div>
                        </div>
                        </div>
                        </div>
          <div class="row">
            <div class="col-md-12">
            <div className="new_mtch_btn">
                   {/* <a href="#" style={{"font-size": "26px;"}}> New Match</a> */}
                   {/* <button className='btn btn-info next_r' onClick={redirect}>Next Match</button> */}
                    <Link to='/dashboard' className='play-again' onClick={redirect}>Next Match</Link>
                  </div>
                </div>
                </div>
                </div>

                </div>
                </div>
        </Fragment>
    )
}

export default FinalResult