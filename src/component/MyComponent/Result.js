import React, { Fragment ,useContext} from 'react'
import {useMainConsumerUpdate} from './MainContext'
import {Link} from 'react-router-dom'
import HumanContext from './context/human/humanContext'
import CommonContext from './context/common/commonContext'

export const Result = () => {
   
  const commonContext=useContext(CommonContext)
  const {setInputText,inputText,setIsActive,setSeconds,setBackUpInputText,setInputText2,game_level }=commonContext


  const humanContext=useContext(HumanContext)
  const {random_word,start_match_computer,resultWord,current_winner_loser_HC,roundFinishResetHC,winner_counter,loser_counter,getFinalResultHC,sendMatchRoundHC,round,changeMatchStatusHC,setLoading,setShowKeyboard}=humanContext

  const {setFinish}=useMainConsumerUpdate();
 //console.log("Resule component",resultWord.word,",",resultWord.definition)

 const nextRound=()=>{

  console.log("nextRound() called in Timer");
  (game_level==='Easy' || game_level==='Medium' || game_level==='Expert') ? setSeconds(60) : setSeconds(120)
  sendMatchRoundHC(
    {
        id:start_match_computer.user1.id,
        round:round,
        status:current_winner_loser_HC==='winner'  ? "1" : "0",
        points:current_winner_loser_HC==='winner' ? "5" : "0"
    }
)
     setLoading()
    
    setTimeout(()=>{
      setInputText(null);
      setInputText2(null);
      setBackUpInputText(null);
      setIsActive(true)
      roundFinishResetHC()
  },2000) 
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
setLoading()
setTimeout(()=>{
    getFinalResultHC(start_match_computer.user1.match_id,start_match_computer.user1.user_id)
    console.log("KEYBOARD ON 4")
    setShowKeyboard(true)
    setFinish(true)
    changeMatchStatusHC(start_match_computer.user1.match_id)
},2000)
  
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
    <h2 class="win-text">{current_winner_loser_HC ==='loser' ?<Fragment><span className="lose-text">You Lost</span></Fragment>:
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
             {(winner_counter===3 || loser_counter===3) ?<Link to='#' className='play-again' onClick={()=>finishFun()}>Finish</Link>:<Link to='/human_vs_computer' className='play-again' onClick={()=>nextRound()}>Next-Round-HC</Link>}       
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