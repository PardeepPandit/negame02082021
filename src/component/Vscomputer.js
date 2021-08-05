import React, { useState, useEffect, Fragment, useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { NavLink } from "react-router-dom";
import {
  useTimerConsumer,
  useTimerConsumerUpdate,
} from "./MyComponent/TimerContext";
import {
  useCharacterConsumer,
  useCharacterConsumerUpdate,
} from "./MyComponent/CharacterContext";
import {
  useMainConsumer,
  useMainConsumerUpdate,
} from "./MyComponent/MainContext";
import AuthContext from './MyComponent/context/auth/authContext'

import HumanContext from "./MyComponent/context/human/humanContext";

import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react-dom";
import MediumLevelUI from "./MyComponent/LevelUI/MediumLevelUI";
import Trophy from "./MyComponent/Trophy";
import Keyboard from "./Keyboard";
import CommonContext from '../component/MyComponent/context/common/commonContext'



const Vscomputer = () => {
  //console.log("Match===", level);

  const commonContext=useContext(CommonContext)
  const {inputText,setIsActive,isActive,setSeconds,seconds}=commonContext
  const authContext=useContext(AuthContext)
  const {user,loading,login_data}=authContext
  const humanContext = useContext(HumanContext);
  //console.log("User in vscomputer=",user)
  const {
    setInputText,
    getWordList,
    wordList,
    getHint,
    checkHintCount,
    hint,
    wordDefinition,
    setResultWord,
    start_match_computer,
    hint_count,
    hint_used,
    setHintUsed,
    getHintWordList,
    hint_wordlist,
    concede,
    setConcede,
    resultWord,
    timeout,
    level_type,
    position
  } = humanContext;


  const {count,hint_id}=hint_count

  const {image_path,user1}=start_match_computer
  const {image}=user1
  const {
    timeFlag,
    hintCheck,
    finalResult,
    roundList1,
    roundList2,
    roundList3,
    roundList4,
    roundList5,
    con,
    showKeyboard,
  } = useMainConsumer();
  const {
    setTimeFlag,
    setHintCheck,
    setFinalResult,
    setRoundList1,
    setRoundList2,
    setRoundList3,
    setRoundList4,
    setRoundList5,
    setPlay,
    setCon,
    checkSound,
    playSound,
    setShowKeyboard,
  } = useMainConsumerUpdate();
  const { round, play } = useCharacterConsumer();
  const { myTurn } = useCharacterConsumerUpdate();
  const { loser } = useTimerConsumer();
  const { setLoser, resetTime } = useTimerConsumerUpdate();
  const [char, setChar] = useState(() => "");
  //const [showKeyboard,setShowKeyboard]=useState(()=>true)
  const [concideFlag, setConcideFlag] = useState(() => false);
  const [callHint, setCallHint] = useState(false);

  useEffect(() => {
    console.log("con=", con);
    //below if (con)=>if(concede) chainging con to concede
    if (con) {
      console.log("LOSER AND WINNER 3");
      setLoser({ name: "You", out: true });
      if (loser.name === "You") {
        //console.log("COUNTER INCREMENTED",finalResult.lose)
        setFinalResult((pre) => ({ ...pre, lose: finalResult.lose + 1 }));
      }
      if (loser.name === "Computer") {
        setFinalResult((pre) => ({ ...pre, win: finalResult.win + 1 }));
      }
    }
  }, [roundList1, roundList2, roundList3, roundList4, roundList5]);

  useEffect(() => {
    console.log("CONCIDE===", loser.name, ",", loser.out);

    if (round === 1) setRoundList1({ r1_loser: loser.name });
    if (round === 2) setRoundList2({ r2_loser: loser.name });
    if (round === 3) setRoundList3({ r3_loser: loser.name });
    if (round === 4) setRoundList4({ r4_loser: loser.name });
    if (round === 5) setRoundList5({ r5_loser: loser.name });
  }, [loser, isActive, con]);

 

  const deleteChar = () => {
    //console.log("deletechar========",inputText)
    console.log("setshow keyboard true 1")
    setShowKeyboard(true);
    //setTimeFlag(false)
    if(position==='left'){
      setInputText(inputText.substring(1, inputText.length));
    }
    else if(position==='right'){
      setInputText(inputText.substring(0, inputText.length - 1));
    }
    else{
      setInputText(inputText.substring(0, inputText.length - 1));
    }
    //setPlay(true)
  };

  useEffect(() => {
    console.log("Final RESULT=", finalResult);
    if (finalResult === 3) {
      console.log("Final Result count", finalResult);
    }
  }, [finalResult]);

  useEffect(()=>{

    
        if(concede){
          console.log("calling getHintWordList from useEffect=",concede)
          getHintWordList(inputText)
        }

  },[concede])

  const onClickConcede =() => {
    setCon(true);
    //wordDefinition();
    setPlay(false);
    console.log("***************SET IS ACTIVE 4***************")
    setIsActive(false);
    console.log("LOSER AND WINNER 4");
    setLoser({ name: "You", out: false });
    console.log("Time Reset@@@@@@@@@@@@@  3")
    setSeconds();

  };

  useEffect(() => {
    console.log("Time Reset@@@@@@@@@@@@@  4")
    setSeconds();
  }, [play]);

  const playFun = () => {
    //console.log("click on play 1",play)
    setResultWord();
    // setShowKeyboard(true)
    setTimeFlag(true);
    //setPlay(pre=>!pre)
    setPlay(true);
    //console.log("click on play 2",play)
  };

  const onClick = (e) => {
    setShowKeyboard(false);
    setTimeFlag(false);
    console.log("Keyboard Target*******=",e.target)
    myTurn(e);
  };
  const onChange = (e) => {
    myTurn(e);
  };

  /*  const [modal, setModal] = useState(false);
    
      const toggle = () => setModal(!modal); */

 /*  useEffect(() => {
    
    if(hint_used){
      console.log("I am caling get hint");
      getHintWordList(inputText)
     // getHint();
    }
    
  }, [hint_used]); */


/* useEffect(()=>
  {
    if(hint_wordlist.length>0){
      console.log("Calling wordDefinition form useEffect=",hint_wordlist)
          getHint()
          wordDefinition()
    }
    

  },[hint_wordlist]) */

  useEffect(()=>{
    console.log("Result word in useEffect=",concede,",",resultWord)
          if(concede && resultWord && !timeout){
        console.log("Calling onClicKConcede")
          onClickConcede()
      }
      if(timeout){
        setFinalResult(pre=>({...pre,lose:finalResult.lose+1}))
        setLoser({ name:'You', out: true })
      }
  },[resultWord])

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
                      className="main-input"
                      onChange={onChange}
                      value={inputText}
                    ></input>
                  </div>
                </div>
                {/*  {loser.out && <div className="bg-white">{JSON.stringify(val)}</div>} */}
                {level_type==="medium" && <MediumLevelUI />}

                {showKeyboard ? (
                  <div class="keypad">
                    <div class="keypad_in">
                      <div class="key_btn">
                        <Keyboard onClick={onClick} />

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
                      <button onClick={playFun}>Play</button>
                      <button onClick={deleteChar}>
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

               {/*  <div className="modal cus-modal fade" id="myModal">
                  <div className="modal-dialog modal-md">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h4 className="modal-title">Chat</h4>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                        >
                          &times;
                        </button>
                      </div>

                      <div className="modal-body cus-body">
                        <div className="chat-container">
                          <div className="chat-window">
                            <div className="start-chat">
                              <div className="received-msg">
                                <div className="msg-align">
                                  <p>Hi</p>
                                </div>
                              </div>

                              <div className="received-msg outgoing-msg">
                                <div className="msg-align-right">
                                  <p>How r u?</p>
                                </div>
                              </div>

                              <div className="received-msg">
                                <div className="msg-align">
                                  <p>I am fine</p>
                                </div>
                              </div>

                              <div className="received-msg">
                                <div className="msg-align">
                                  <p>Lets play now</p>
                                </div>
                              </div>

                              <div className="received-msg outgoing-msg">
                                <div className="msg-align-right">
                                  <p>Ok, lest play</p>
                                </div>
                              </div>
                            </div>

                            <div className="chatting-feild">
                              <input type="text" placeholder="Chat..." />{" "}
                              <button>
                                <img src="assets/img/arrow.png" alt="" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> 
                  <div className="chat-wrapper">
                  <span>1</span>
                  <div
                    className="chat-box"
                    data-toggle="modal"
                    data-target="#myModal"
                  >
                    <div className="chat-icon">
                      <img src="assets/img/chat1.png" alt="" />
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Vscomputer;
