import React, { useState, useEffect, Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import PlayOnlineContext from "../context/playOnlineContext";
import HumanContext from "../../MyComponent/context/human/humanContext"
import AuthContext from "../../MyComponent/context/auth/authContext";
import $ from "jquery";
import MediumLevelUI from "../../MyComponent/LevelUI/MediumLevelUI";
import ExpertAndGeniusLevelUI from "../../MyComponent/LevelUI/ExpertAndGeniusLevelUI";
import Trophy from "../../MyComponent/Trophy";
import { Spinner } from "reactstrap";
import CommonContext from '../../MyComponent/context/common/commonContext'
import ChallengePopup from "./ChallengePopup";
import Keyboard from "../../Keyboard";
import HintPopup from '../../HintPopup'
import ExitPopup from "../../ExitPopup";
import WarningPopup from "../../WarningPopup";
import {useCharacterConsumerUpdate} from "../../MyComponent/CharacterContext";

//comment add in playonline

const PlayOnline = () => {

  const commonContext =useContext(CommonContext)
  const {setInputText,inputText,setIsActive,seconds,game_level,exitUser,setSeconds,setShowKeyboard,showKeyboard,setHumanPosition,deleteChar,backup_input_text,word_length}=commonContext
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const humanContext=useContext(HumanContext)
  const {hint,hint_used,hint_count,setHintUsed}=humanContext
  const { myTurn } = useCharacterConsumerUpdate();

  const playOnlineContext = useContext(PlayOnlineContext);
  const {
    onlineUser,
    saveWord,
    save_word,
    getWord,
    get_word,
    setTimer,
    loading,
    turn_change,
    setTurn,
    getWordDefinition,
    winner_loser,
    online_round_counter,
    round_complete,
    challenge_popup_on,
    setChallengePopup,
    round_result,
    reset_state,
    setApiHit,
    setwinnerLoser,
    getwordapihit,
    clearAllInterval,
    finalResultCounter,
    final_result_data,
  } = playOnlineContext;

  let gamestatus=''
  let challenge=''
  let word=''
  const {count,hint_id}=hint_count
    if(get_word)
    {
      gamestatus=get_word.data.gamestatus
      challenge=get_word.data.challenge
      word=get_word.data.word
    }


  
  const { user1, user2 ,image_path} =JSON.parse(localStorage.getItem('start_match_online')) || onlineUser


  const [showChallenge, setShowChallenge] = useState(false);

  let round = 1;


  const [callHint, setCallHint] = useState(true);
  const [playButtonHide, setPlayButtonHide] = useState(false);
  const [changeTurn, setChangeTurn] = useState(() =>
    user1.start === "1" ? true : false
  );
  const [tempSeconds, setTempSeconds] = useState(() => 60);
  const [showResult, setShowResult] = useState(false);
  const [isOpenExit, setIsOpenExit] = useState(false);
  const [isOpenHint, setIsOpenHint] = useState(false);
  const [warning,setWarning]=useState(false)
  window.addEventListener("beforeunload", (ev) => 
  {  
      ev.preventDefault();
      exitUser(user.data.id)
  });

  useEffect(() => {
    $(document).ready(function () {
      $("#challenge").click(function () {
        $("#challenge").hide();
      });
    });
  }, [showChallenge]);

  useEffect(() => {
    if (user1.start === "0" && final_result_data===null) {
     // clearAllInterval()
       console.log("calling save word API from playonline useEffect",final_result_data);
      
       saveWord({
        match_id:onlineUser.user1.match_id,
        gamestatus:'0',
        concede:"0",
        user_id:parseInt(onlineUser.user1.user_id),
        challenge:"0",
        round:online_round_counter,
        word:""
    },12)  
      //getWord(user1.match_id, user.data.id, 20);
    }
  }, [onlineUser])

  useEffect(() => {
    if (reset_state===true && final_result_data===null) {
      //clearAllInterval()
      console.log("calling save word API from playonline useEffect reset_state");
      
       saveWord({
        match_id:onlineUser.user1.match_id,
        gamestatus:'0',
        concede:"0",
        user_id:parseInt(onlineUser.user1.user_id),
        challenge:"0",
        round:online_round_counter,
        word:""
    },14)  
      //getWord(user1.match_id, user.data.id, 20);
    }
  }, [reset_state])



 /* useEffect(()=>{


     if(reset_state===true){
      console.log("calling saveword API from useEffec when state reset")
      clearAllInterval()
      saveWord({
        match_id:onlineUser.user1.match_id,
        gamestatus:'0',
        concede:"0",
        user_id:parseInt(onlineUser.user1.user_id),
        challenge:"0"
    })  

    }

  },[reset_state])
 */

  

  useEffect(() => {
    console.log("Input text changed=", inputText);
  }, [inputText]);

  const playButton = () => {
    //console.log("play button=", inputText);
    console.log("calling save word API form playonline on play button click")
    setApiHit(60)
    setHumanPosition(null)
    saveWord({
      user_id: parseInt(user.data.id),
      word: inputText,
      match_id: user1.match_id,
      gamestatus:"1",
      concede:"0",
      challenge:"0",
      round:online_round_counter
    },13);

    setTurn(null);
    //setShowKeyboard(true)
    if (!loading) {
      setPlayButtonHide(false);
      user1.start === "1" ? setChangeTurn(true) : setChangeTurn(false);
    }
    //setSeconds()
    console.log("***************SET IS ACTIVE 11 **************")
    setIsActive(false);
  };


 /*  const deleteChar = () => {
    //delete only last character from input text
    console.log("SET INPUT TEXT 7")
    setInputText(inputText.slice(0, inputText.length - 1));
    //show keyboard again to enter new character
    console.log("KEYBOARD ON 9")
    setShowKeyboard(true);
  }; */


  let old_str=null
  let new_str=null

  const compareChallengedString=()=>{
    //old_str=Array.from(word).sort().join('').toString()
   // new_str=Array.from(inputText).sort().join('').toString()
    console.log("compare1=",inputText,",",word)
    console.log("compare2=",inputText.substring(0,word.length),",",word)
    if(inputText.substring(0,word.length)===word)
    {
      console.log("calling getWordDefinition from playonline=",inputText.toLowerCase())
      getWordDefinition(inputText.toString().toLowerCase())
      //setCurrentWinnerLoserHC('winner')
    }
    else if(inputText.substring(0,word.length)!==word){
      console.log("calling saveword API from playonline on word not complete")
      setwinnerLoser('loser')

      saveWord({
        match_id:onlineUser.user1.match_id,
        gamestatus:'4',
        concede:'0',
        user_id:parseInt(onlineUser.user1.user_id),
        challenge:"0",
        word:inputText,
        round:online_round_counter
    },28,true)
     
    }
}

  const onClick = (e) => {
    //console.log("onClick called in playOnline", e.target.outerText);
    if (inputText + e.target.outerText.length === 36) {
      alert("word length 36");
    }
    console.log("SET INPUT TEXT 8 and setshow keyboard true 7=",inputText,",",e.target.outerText)
    //setInputText(inputText + e.target.outerText);

    



    myTurn(e);
    console.log("setshow keyboard true 7")
    challenge!=='1' &&   setShowKeyboard(false);

    setPlayButtonHide(true);
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

  const onChange = (e) => {
    //console.log("onChange called in playOnline");
  };
  //console.log("SPINNER value===========",round_complete)
  if(round_complete){
    console.log("SPINNER online,",round_complete)
    return <Spinner/>
  }
  else if(challenge_popup_on){
    return <ChallengePopup/>
  }
  else
  {
  return (
    <Fragment>
      <div class="section_card_ga section_card">
        <div class="container">
          <div class="row">
          <div className="align-items hvc-top">
              <button
                  onClick={() => togglePopupExit()}
                  type="button" className="cus-arrow35"
                > <img src="assets/img/right-arrow.png" alt="" width="70" /></button>
               
               <Link  to='/setting'><img src="assets/img/settings.png" alt="" width="52"/></Link>
              </div>
            <div class="col-lg-6 mb-5 offset-lg-3">
              <div class="logo-wrapper">
                <img src="assets/img/logo-01copy.png" alt="" />
                <h1>The Never Ending Game</h1>
              </div>
            </div>

            <div class="round_text time house">
              <div class=" min_top">
                <div class="ledt_img">
                  <img
                    class="t_image_s"
                    src={onlineUser && user1.image==="" ? 
                    process.env.PUBLIC_URL + "/assets/img/logo.png": image_path+'/'+user1.image }
                    /* src={user && user.data.image==="" ? 
                    process.env.PUBLIC_URL + "/assets/img/logo.png":  user.image_path+'/'+user.data.image } */
                    alt="logo"
                  />
                </div>
                <div class="ledt_img_mid">
                
                  <div class="cup">
                    <h2 style={{ color: "white" }}></h2>
                    
                    <div className="trophy-panel">
                        <div className="tropy">
                          {online_round_counter === 1 ? (
                            <img
                              className="icon_g"
                              src="assets/img/blank-2.png"
                              alt="trofi"
                            />
                          ) : round_result[0] === "loser" ? (
                            <img
                              class="icon_g"
                              src="assets/img/red-cup.png"
                              alt="trofi"
                            />
                          ) : (
                            <img
                              className="icon_g"
                              src="assets/img/green-cup.png"
                              alt="trofi"
                            />
                          )}
                        </div>
                        
                        <div className="tropy">
                          {online_round_counter <= 2 ? (
                            <img
                              className="icon_g"
                              src="assets/img/blank-2.png"
                              alt="trofi"
                            />
                          ) : round_result[1] === "loser" ? (
                            <img
                              class="icon_g"
                              src="assets/img/red-cup.png"
                              alt="trofi"
                            />
                          ) : (
                            <img
                              className="icon_g"
                              src="assets/img/green-cup.png"
                              alt="trofi"
                            />
                          )}
                        </div>
                        
                        <div className="tropy">
                          {online_round_counter <= 3 ? (
                            <img
                              className="icon_g"
                              src="assets/img/blank-2.png"
                              alt="trofi"
                            />
                          ) : round_result[2] === "loser" ? (
                            <img
                              class="icon_g"
                              src="assets/img/red-cup.png"
                              alt="trofi"
                            />
                          ) : (
                            <img
                              className="icon_g"
                              src="assets/img/green-cup.png"
                              alt="trofi"
                            />
                          )}
                        </div>
                        
                        <div className="tropy">
                          {online_round_counter <= 4 ? (
                            <img
                              className="icon_g"
                              src="assets/img/blank-2.png"
                              alt="trofi"
                            />
                          ) : round_result[3] === "loser" ? (
                            <img
                              class="icon_g"
                              src="assets/img/red-cup.png"
                              alt="trofi"
                            />
                          ) : (
                            <img
                              className="icon_g"
                              src="assets/img/green-cup.png"
                              alt="trofi"
                            />
                          )}
                        </div>
                        
                        <div className="tropy">
                          {online_round_counter <= 5 ? (
                            <img
                              className="icon_g"
                              src="assets/img/blank-2.png"
                              alt="trofi"
                            />
                          ) : round_result[4] === "loser" ? (
                            <img
                              class="icon_g"
                              src="assets/img/red-cup.png"
                              alt="trofi"
                            />
                          ) : (
                            <img
                              className="icon_g"
                              src="assets/img/green-cup.png"
                              alt="trofi"
                            />
                          )}
                        </div>
                        </div>
                        
                      <div class="clear"></div>
                    
                    <div class="clear"></div>
                  </div>
                  
                </div>

                <div class="ledt_img">
                  <img
                    class="t_image_s"
                    src={onlineUser && user2.image==="" ? 
                    process.env.PUBLIC_URL + "/assets/img/logo.png": image_path+'/'+user2.image }
                    alt=""
                  />
                </div>
                <div class="clear"></div>

                <div class="half">
                  {/* <div class="left_s"><a href=""><i class="fa fa-clock-o" aria-hidden="true"></i></a></div> */}
                  <div class="left_s">
                    <span>
                      <b>{seconds}</b>
                    </span>
                  </div>
                  {/* <div class="left_s"><span><b>{tempSeconds}</b></span></div> */}
                  <div class="clear"></div>
                </div>
                 
                <div className="round">
              <h1>Round: {online_round_counter} | Level: {game_level && game_level.toUpperCase()}</h1>
              </div>
                 
                  <div className="round_text time house">
                    <input
                      type="text"
                      className="main-input"
                      onChange={onChange}
                      value={inputText}
                    ></input>
                  </div>
                

              {challenge==='1' &&
             <Fragment>
              <div class="btn_b2">
                  <div className="round_text">
                    <h2 style={{backgroundColor:"white",color:"black"}}>{word}
                    </h2>
                  </div>
                </div> 
            </Fragment>
            }  
            {game_level==="Medium" && showKeyboard && <MediumLevelUI />}
            {(game_level==="Expert" || (game_level==="Genius" && backup_input_text!==null && backup_input_text.length!==word_length)) && showKeyboard && <ExpertAndGeniusLevelUI/>}
                
             {/* <h2>keyboard {showKeyboard ? "show" :"hide"}</h2>
             <h2>online_round_counter {online_round_counter}</h2>
             {game_level==="Medium" && showKeyboard && <MediumLevelUI />}
             <h2>round_result {online_round_counter>=2 ? round_result[online_round_counter-2] : "wait"}</h2> 
            <h2>API HIT {getwordapihit}</h2>*/}
                {onlineUser && showKeyboard ? (
                  <div class="keypad">
                    <div class="keypad_in">
                      <div class="key_btn">
                        <Keyboard onClick={onClick}/>

                        <div className="play_btn_m">
                          <div class="btn_b k_pad">
                            {/*    <button onClick={findHint}><b>Hint</b></button> */}

                          {inputText && inputText.length!==0  && challenge!=='1' ?
                          <Fragment>
                                    <button
                                      type="button"
                                      className="hinnt_r"
                                      id="hintDetail"
                                      //onClick={() => setCallHint(true)}
                                      onClick={()=>{
                                        togglePopupHint()
                                        setHintUsed(true,{
                                        user_id:user.data.id,
                                        hint_id:hint_id,
                                        match_id:onlineUser.user1.match_id,
                                        round:round
                                      })}}
                                      data-toggle="modal"
                                      data-target="#hint"
                                    >
                                      Hint{" "}
                                      {!hint_used ? count : " Used"}
                                    </button>
                                    <button
                                      onClick={() => setShowChallenge(!showChallenge)}
                                    >
                                      Challenge
                                    </button>
                            </Fragment> :<Fragment> {challenge==='1' && 
                            <Fragment> 
                              <button onClick={() =>compareChallengedString('loser')}>Check-Word</button> 
                              <button onClick={() => deleteChar()}>
                          <img
                            src="assets/img/backspace.svg"
                            alt=""
                            width="27"
                          />
                        </button>
                            </Fragment>}</Fragment>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Fragment>
                    {!showKeyboard && playButtonHide &&  challenge!=='1' ?  (
                      <div className="play_btn_m game-buttons">
                        <button onClick={() => playButton()}>Play</button>
                        <button onClick={() => {
                          
                          
                          deleteChar()}}>
                          <img
                            src="assets/img/backspace.svg"
                            alt=""
                            width="27"
                          />
                        </button>
                      </div>
                    ): challenge==='1' && <button>Check</button>}
                  </Fragment>
                )}

             
              </div>
            </div>
          </div>
        </div>
      </div>
      {showChallenge && (
        <Fragment>
          <div className="level-contaienr" id="challenge">
            <div className="level-wrapper">
              <span onClick={() => setShowChallenge(!showChallenge)}>X</span>
              <ul className="level-list">
                <li>
                  <Link to="#" onClick={() => getWordDefinition(inputText)}>
                    Check Word
                  </Link>
                </li>
                <li>
                  <Link to="#" onClick={()=>{
                                      
                                      saveWord({
                                          match_id:onlineUser.user1.match_id,
                                          gamestatus:'0',
                                          concede:'0',
                                          user_id:parseInt(onlineUser.user1.user_id),
                                          challenge:"1",
                                          word:inputText,
                                          round:online_round_counter
                                },27,true)
                                      setSeconds(120)
                                      setTurn(null)
                                      setShowKeyboard(false)
                                }}>Complete Word</Link>
                </li>
              </ul>
            </div>
          </div>
        </Fragment>
      )}
      {isOpenHint && <HintPopup handleClose={togglePopupHint} hint={hint}/>}
      {isOpenExit && <ExitPopup handleClose={togglePopupExit}/>}
      {warning && <WarningPopup handleClose={togglePopupWarning} setWarning={setWarning}/>}
    </Fragment>
  )
  }
};

export default PlayOnline;
