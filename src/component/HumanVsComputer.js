import React, {useEffect, Fragment, useContext,Suspense, useState } from "react";
import {useCharacterConsumerUpdate} from "./MyComponent/CharacterContext";
import AuthContext from './MyComponent/context/auth/authContext'
import Loading from './MyComponent/Loading'
import HumanContext from "./MyComponent/context/human/humanContext";
import MediumLevelUI from "./MyComponent/LevelUI/MediumLevelUI";
import ExpertAndGeniusLevelUI from "./MyComponent/LevelUI/ExpertAndGeniusLevelUI";
import Trophy from "./MyComponent/Trophy";
import CommonContext from './MyComponent/context/common/commonContext'
import ChallengePopUpHC from './MyComponent/context/human/ChallengePopUpHC'
import ExitPopup from "./ExitPopup";
import HintPopup from "./HintPopup";
import WarningPopup from './WarningPopup'
import RightAdd from './MyComponent/Adds/RightAdd'
import LeftAdd from './MyComponent/Adds/LeftAdd'
import {Link} from 'react-router-dom'


const Keyboard = React.lazy(() => import('./Keyboard'));
let old_str=null
let new_str=null
const HumanVsComputer = () => {
  //console.log("Match===", level);
/* 
  let element = document.getElementById('inputbox');
  console.log("element=",element)
 */
  const commonContext=useContext(CommonContext)
  const {inputText,setIsActive,seconds,setInputText,backup_input_text,inputText2,game_level,word_length}=commonContext
  const authContext=useContext(AuthContext)
  const {user,login_data}=authContext
  const {level}=login_data
  const humanContext = useContext(HumanContext);
  //console.log("User in vscomputer=",user)
  const {
    hint,
    random_word,
    loading_HC,
    start_match_computer,
    hint_count,
    hint_used,
    setHintUsed,
    concede,
    setConcede,
    human_position,
    setShowKeyboard,
    show_keyboard,
    checkWordExistApi,
    round,
    setPlay,
    setCurrentWinnerLoserHC,
    getHint,
    setSingleShiftCounter,
    single_shift_counter,
    deleteChar,
    setWordLength
  } = humanContext;


  const {count,hint_id}=hint_count || {}

  const {image_path,user1}=start_match_computer 
  const {image}=user1 || {}
  const [challenge,setChallenge]=useState(()=>false)
  const { myTurn } = useCharacterConsumerUpdate();
  const [isOpenExit, setIsOpenExit] = useState(false);
  const [isOpenHint, setIsOpenHint] = useState(false);
  const [warning,setWarning]=useState(false)
/* useEffect(()=>{
if(hint){
  togglePopupHint()
}
},[hint]) */


  useEffect(()=>{
    if(concede && inputText!==null)
    {
      console.log("concede and randome_word=",concede,",",random_word)
      setIsActive(false)
      setPlay(false)
      //game_level!=='expert' && getHint()
      game_level==='Easy' && inputText.length===1 && getHint()
      game_level==='Medium' && inputText.length===1 && getHint()
      game_level==='Expert' && inputText.length===1 && getHint()
      game_level==='Genius' && inputText.length===1 && getHint()
      setCurrentWinnerLoserHC('loser')
      setConcede(false)
    }
},[concede])

 
useEffect(()=>{

  if(backup_input_text!==null && word_length%2===0 && backup_input_text.length===word_length){
        setShowKeyboard(true)
  }

},[backup_input_text])


  const playFun = () => {
    setSingleShiftCounter('reset')
    setInputText(backup_input_text)
    checkWordExistApi(inputText)
    //setResultWord();
    setIsActive(false)
  };

  const onClick = (e) => {
    console.log("KEYBOAD HIDE")
      if(inputText!==null && inputText.length!==word_length)
      {
        setShowKeyboard(false)
      }
    console.log("Keyboard Target*******=",e.target)
    myTurn(e);
  };


  const togglePopupExit = () => {
    setIsOpenExit(!isOpenExit);
  }
  const togglePopupHint = () => {
    setIsOpenHint(!isOpenHint);
  }
  const togglePopupWarning=()=>{
    setWarning(true)
  }
 
  const compareChallengedString=()=>{
      old_str=Array.from(inputText).sort().join('').toString()
      new_str=Array.from(inputText2).sort().join('').toString()
   //   console.log("compare=",old_str,",",new_str)
      if(old_str===new_str)
      {
        console.log("Congratulations you win")
        checkWordExistApi(inputText2)
        //setCurrentWinnerLoserHC('winner')
      }
      if(old_str!==new_str){
        console.log("Please try again")
        //alert("please enter correct word")
        togglePopupWarning()
       
      }
  }

console.log("challenge=",challenge)
if(loading_HC)
{
  return <Loading/>
}
else if(backup_input_text!==null && word_length===backup_input_text.length && !challenge)
{
  //setIsActive(false)
  return <ChallengePopUpHC setChallenge={setChallenge} />
}
else 
{
  return (
    <Fragment>
      <div class="section_card_ga section_card">
        <div class="container">
          <div class="row">
          <LeftAdd/>
          <div className="col-md-8">
              <div className="align-items hvc-top">
              <button
                  onClick={() => togglePopupExit()}
                  type="button" className="cus-arrow35"
                > <img src="assets/img/right-arrow.png" alt="" width="70" /></button>
               
               <Link  to='/setting'><img src="assets/img/settings.png" alt="" width="52"/></Link>
              </div>

              <div className="players-box">
              <img /*  There is no image_path in login data only image is available
            src={login_data.image==="" ? 
            process.env.PUBLIC_URL + "/assets/img/logo.png":  login_data.image_path+'/'+login_data.image } */

            src={start_match_computer && image==="" ? 
            process.env.PUBLIC_URL + "/assets/img/logo.png": image_path+'/'+image }
            //src={user ? !loading && user.image_path+'/'+user.data.image : process.env.PUBLIC_URL + "/assets/img/logo.png"}
            //src={process.env.PUBLIC_URL + "/assets/img/logo.png"}
            alt="logo" width="100" />
                  <h1>V</h1>
                  <img src={process.env.PUBLIC_URL + "/assets/img/computer-set.png"} alt="" width="100"/>
              </div>

              <div class="trophy-panel">
              <Trophy round={round} />
            </div>

            <div className="time-round">
              <div className="time">
                <div class="left_s">
                      <span>
                        <b>{seconds}</b>
                      </span>
                </div>
              </div>

              <div className="round">
              <h1>Round: {round} | Level: {game_level && game_level.toUpperCase()} | Word: {word_length}</h1>
              </div>
            </div>

            <div class="">
                  <div className="round_text time house">
                    {/* <input type="text" className="main-input"  value={inputText} onChange={onChange}/> */}
                    <input
                      type="text"
                      className="main-input"
                      //onChange={onChange}
                      value={inputText}
                    ></input>
                  </div>
                </div>
                {/*  {loser.out && <div className="bg-white">{JSON.stringify(val)}</div>} */}
                {game_level==="Medium" && show_keyboard && <MediumLevelUI />}

               {/*  {(game_level==="Expert" || (game_level==="Genius" && backup_input_text!==null && backup_input_text.length!==word_length)) && show_keyboard && <ExpertAndGeniusLevelUI/>} */}
                
                {/* {game_level==="genius" && show_keyboard && inputText!==null && inputText.length!==word_length &&<GeniusLevelUI/>} */}
           
                <div className='challenge-input'> {game_level==="Genius" &&  show_keyboard && backup_input_text!==null && backup_input_text.length===word_length && challenge && <input type="text" className="main-input maininput2" value={inputText2}/>}  

                 {game_level==="Genius" && show_keyboard && backup_input_text!==null && backup_input_text.length===word_length && challenge && <h3 style={{textAlign:'center'}}>*Please type in the letters that will compelete your word</h3>}  </div> 

                {show_keyboard ? (
                  <div class="keypad" >
                    <div class="keypad_in">
                      <div class="key_btn">

                      <Suspense fallback={<div>Loading...</div>}>
                        <Keyboard onClick={onClick} />
                        </Suspense>

                          {game_level==='Genius' && inputText!==null && inputText.length===word_length ? 
                          <Fragment>
                    <div className="play_btn_m game-buttons">
                      <button onClick={()=>compareChallengedString()}>Check</button>
                      <button onClick={()=>deleteChar()}>
                        <img src="assets/img/backspace.svg" alt="" width="27" />
                      </button>
                    </div>
                  </Fragment>:
                  <Fragment>
                        <div className="play_btn_m">
                          <div class="btn_b k_pad">
                            <button
                              type="button"
                              className="hinnt_r"
                              id="hintDetail"
                              onClick={()=>{
                                togglePopupHint()
                                setHintUsed(true,{
                                user_id:user.data.id,
                                hint_id:hint_id,
                                match_id:start_match_computer.user1.match_id,
                                round:round
                              })}}
                              data-toggle="modal"
                              data-target="#hint"
                              //disabled={hint_used}
                            >
                              Hint{" "}
                              {!hint_used ? count : " Used"}
                            </button>
                            <button onClick={()=>setConcede(true)}>Concede</button>
                          </div>
                        </div>
                    </Fragment>}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Fragment>
                    <div className="play_btn_m game-buttons">
                      <button onClick={()=>playFun()}>Play</button>
                      <button onClick={()=>deleteChar()}>
                        <img src="assets/img/backspace.svg" alt="" width="27" />
                      </button>
                    </div>
                  </Fragment>
                )}
            
          </div>
          <RightAdd/>

          </div>
        </div>
      </div>
      
            
      {isOpenHint && <HintPopup handleClose={togglePopupHint} hint={hint}/>}
      {isOpenExit && <ExitPopup handleClose={togglePopupExit}/>}
      {warning && <WarningPopup handleClose={togglePopupWarning} setWarning={setWarning}/>}
    </Fragment>
  )
  }
};

export default HumanVsComputer;
