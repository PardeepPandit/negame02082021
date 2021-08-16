import React, { useState, useEffect, Fragment, useContext,Suspense } from "react";

import {
  useCharacterConsumer,
  useCharacterConsumerUpdate,
} from "./MyComponent/CharacterContext";
import {
  useMainConsumer,
  useMainConsumerUpdate,
} from "./MyComponent/MainContext";
import AuthContext from './MyComponent/context/auth/authContext'
import Loading from '../component/MyComponent/Loading'
import HumanContext from "./MyComponent/context/human/humanContext";

import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react-dom";
import MediumLevelUI from "./MyComponent/LevelUI/MediumLevelUI";
import ExpertLevelUI from "./MyComponent/LevelUI/ExpertLevelUI";
import Trophy from "./MyComponent/Trophy";
//import Keyboard from "./Keyboard";
import CommonContext from '../component/MyComponent/context/common/commonContext'
const Keyboard = React.lazy(() => import('./Keyboard'));



const Vscomputer = () => {
  //console.log("Match===", level);
/* 
  let element = document.getElementById('inputbox');
  console.log("element=",element)
 */
  const commonContext=useContext(CommonContext)
  const {inputText,setIsActive,isActive,setSeconds,seconds,setInputText,backup_input_text}=commonContext
  const authContext=useContext(AuthContext)
  const {user,login_data}=authContext
  const humanContext = useContext(HumanContext);
  //console.log("User in vscomputer=",user)
  const {
    hint,
    random_word,
    loading_HC,
    wordDefinition,
    setResultWord,
    start_match_computer,
    hint_count,
    hint_used,
    setHintUsed,
    hint_wordlist,
    concede,
    setConcede,
    resultWord,
    timeout,
    level_type,
    human_position,
    setShowKeyboard,
    show_keyboard,
    checkWordExistApi,
    round,
    play,
    setPlay,
    setTurn,
    setCurrentWinnerLoserHC,
    getHint,
    setSingleShiftCounter,
    single_shift_counter
  } = humanContext;


  const {count,hint_id}=hint_count

  const {image_path,user1}=start_match_computer
  const {image}=user1

  const {setTimeFlag} = useMainConsumerUpdate();
  const { myTurn } = useCharacterConsumerUpdate();

  useEffect(()=>{
    if(concede){
      console.log("calling getHintWordList from useEffect=",concede,",",random_word)
      setIsActive(false)
      setPlay(false)
      //level_type!=='expert' && getHint()
      level_type==='expert' && inputText.length===1 && getHint()
      setCurrentWinnerLoserHC('loser')
      setConcede(false)
    }
},[concede])

  const deleteChar = () => {
    //console.log("deletechar========",inputText)
    console.log("setshow keyboard true 1")
    setShowKeyboard(true);
    //setTimeFlag(false)
    if(human_position===0){
      setInputText(inputText.substring(1, inputText.length));
    }
    else if(single_shift_counter > 0){
      setInputText(inputText.substring(0,single_shift_counter-1)+inputText.substring(single_shift_counter))
    }
    else if(human_position===1){
      setInputText(inputText.substring(0, inputText.length - 1));
    }
    else{
      setInputText(inputText.substring(0, inputText.length - 1));
    }
   // setSingleShiftCounter('reset')
  //setPlay(true)
  };

  

  const playFun = () => {
    setSingleShiftCounter('reset')
    setInputText(backup_input_text)
    setSingleShiftCounter('zero')
    checkWordExistApi()
    //setResultWord();
    setTimeFlag(true);
    setIsActive(false)
  };

  const onClick = (e) => {
    console.log("KEYBOAD HIDE")
    setShowKeyboard(false);
    console.log("Keyboard Target*******=",e.target)
    myTurn(e);
  };

if(loading_HC){
return <Loading/>
}
else 
  {
  return (
    <Fragment>
      <div class="section_card_ga section_card">
        <div class="container">
          <div class=" row">
            <div class="col-md-12 ">
              <div class=" min_top">
                <div class="ledt_img">
                  <img
                    class="t_image_s"


                    /*  There is no image_path in login data only image is available
                     src={login_data.image==="" ? 
                    process.env.PUBLIC_URL + "/assets/img/logo.png":  login_data.image_path+'/'+login_data.image } */

                    src={start_match_computer && image==="" ? 
                    process.env.PUBLIC_URL + "/assets/img/logo.png": image_path+'/'+image }
                    //src={user ? !loading && user.image_path+'/'+user.data.image : process.env.PUBLIC_URL + "/assets/img/logo.png"}
                    //src={process.env.PUBLIC_URL + "/assets/img/logo.png"}
                    alt="logo"
                  />
                </div>
                <div class="ledt_img_mid">
                  <span>Round {round} {" "} {level_type}</span>
                  <Trophy round={round} />
                </div>

                <div class="ledt_img">
                  <img
                    class="t_image_s"
                    src={
                      process.env.PUBLIC_URL + "/assets/img/computer-set.png"
                    }
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
                  <div class="clear"></div>
                </div>

                {/* <div class="btn_b">
                                <div className="round">
                                    <span ><b>ROUND {round} </b></span>
                                    </div>
                                </div> */}
                <div class="btn_b2">
                  <div className="round_text">
                    {/* <input type="text" className="main-input"  value={inputText} onChange={onChange}/> */}
                    <input
                      type="text"
                      id='inputbox'
                      className="main-input"
                      //onChange={onChange}
                      value={inputText}
                    ></input>
                  </div>
                </div>
                {/*  {loser.out && <div className="bg-white">{JSON.stringify(val)}</div>} */}
                {level_type==="medium" && show_keyboard && <MediumLevelUI />}
                {level_type==="expert" && show_keyboard && <ExpertLevelUI/>}

                {show_keyboard ? (
                  <div class="keypad">
                    <div class="keypad_in">
                      <div class="key_btn">

                      <Suspense fallback={<div>Loading...</div>}>
                        <Keyboard onClick={onClick} />
                        </Suspense>

                        <div className="play_btn_m">
                          <div class="btn_b k_pad">
                            <button
                              type="button"
                              className="hinnt_r"
                              id="hintDetail"
                              //onClick={() => setCallHint(true)}
                              //onClick={()=>checkHintCount(user.data.id)}
                              onClick={()=>setHintUsed(true,{
                                user_id:user.data.id,
                                hint_id:hint_id,
                                match_id:start_match_computer.user1.match_id,
                                round:round
                              })}
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
                      </div>
                    </div>
                  </div>
                ) : (
                  <Fragment>
                    <div className="play_btn_m game-buttons">
                      <button onClick={()=>playFun()}>Play</button>
                      <button onClick={()=>deleteChar()}>
                      {/* <button onClick={()=>playFun()}>Play</button>
                      <button onClick={()=>deleteChar()}> */}
                        <img src="assets/img/backspace.svg" alt="" width="27" />
                      </button>
                    </div>
                  </Fragment>
                )}
                {/* ---------lost-lost-over------ */}

                {/* ---------lost-lost-over------ */}
                {/* ------hint------ */}
                <div
                  className="modal fade"
                  id="hint"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog pop_m" role="document">
                    <div class="modal-content hint-model">
                      <div className="mod_contany text-center">
                        {/* <div className="over_lay"></div> */}

                        <div className="top-middl_t text-center">
                          {hint ? (
                            <h2 className="word">
                              <span>HINT : {hint}</span>
                            </h2>
                          ) : (
                            <h2 className="word">
                              <span>
                                HINT : Only one hint per match is allowed
                              </span>
                            </h2>
                          )}
                        </div>
                        <div className="bott-footer text-center">
                          <div className="next">
                            <div className="bt_btnok">
                              <button
                                type="button"
                                class="close btn btn-info next_r "
                                id="hintok"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">OK</span>
                              </button>
                              <div className="clear"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
};

export default Vscomputer;
