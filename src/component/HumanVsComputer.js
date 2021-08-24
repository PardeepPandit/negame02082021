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
const Keyboard = React.lazy(() => import('./Keyboard'));

const HumanVsComputer = () => {
  //console.log("Match===", level);
  /* 
    let element = document.getElementById('inputbox');
    console.log("element=",element)
  */
  const commonContext=useContext(CommonContext)
  const {inputText,setIsActive,seconds,setInputText,backup_input_text,inputText2,game_level}=commonContext
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
    word_length,
    deleteChar,
    setResultWord
  } = humanContext;


  const {count,hint_id}=hint_count || {}

  const {image_path,user1}=start_match_computer || {}
  const {image}=user1 || {}
  const [challenge,setChallenge]=useState(()=>false)
  const { myTurn } = useCharacterConsumerUpdate();

 

/*   useEffect(()=>{
    if(seconds===0){
        setCurrentWinnerLoserHC('loser')
        setResultWord(inputText,'Time Over')
      }
  },[seconds]) */



  useEffect(()=>{
    if(concede){
      console.log("concede and randome_word=",concede,",",random_word)
      setIsActive(false)
      setPlay(false)
      //game_level!=='expert' && getHint()
      game_level==='easy' && inputText.length===1 && getHint()
      game_level==='medium' && inputText.length===1 && getHint()
      game_level==='expert' && inputText.length===1 && getHint()
      game_level==='genius' && inputText.length===1 && getHint()
      setCurrentWinnerLoserHC('loser')
      setConcede(false)
    }
},[concede])

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

  const compareChallengedString=()=>{
      let old_str=Array.from(inputText).sort().join('').toString()
      let new_str=Array.from(inputText2).sort().join('').toString()
   //   console.log("compare=",old_str,",",new_str)
      if(old_str===new_str)
      {
        console.log("Congratulations you win")
        checkWordExistApi(inputText2)
       // setCurrentWinnerLoserHC('winner')
      }
      if(old_str!==new_str)
      {
        console.log("Please try again")
        alert("please enter correct word")
      }
  }
console.log("challenge=",challenge)
if(loading_HC)
{
  return <Loading/>
}
else if(inputText!==null && word_length===inputText.length && !challenge)
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
          <div class=" row">
            <div class="col-md-12 ">
              <div class=" min_top">
                <div class="ledt_img">
                  <img
                    class="t_image_s"


                    /*  There is no image_path in login data only image is available
                     src={login_data.image==="" ? 
                    process.env.PUBLIC_URL + "/assets/img/logo.png":  login_data.image_path+'/'+login_data.image } */

                    src={start_match_computer && image==="" ? process.env.PUBLIC_URL + "/assets/img/logo.png": image_path+'/'+image }
                    //src={user ? !loading && user.image_path+'/'+user.data.image : process.env.PUBLIC_URL + "/assets/img/logo.png"}
                    //src={process.env.PUBLIC_URL + "/assets/img/logo.png"}
                    alt="logo"
                  />
                </div>
                <div class="ledt_img_mid">
                  <h1 style={{backgroundColor:'greenyellow',borderRadius:'100%',padding:'10px' , display:'inline-block',color:'black'}}>Round {round} {" "} {game_level && game_level.toUpperCase()}</h1>
                  <span style={{backgroundColor:'white'}}><Trophy round={round} /></span>
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
                <div class="btn_b2">
                  <div className="round_text">
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
                {game_level==="medium" && show_keyboard && <MediumLevelUI />}
                {(game_level==="expert" || (game_level==="genius" && inputText!==null && inputText.length!==word_length)) && show_keyboard && <ExpertAndGeniusLevelUI/>}
                {/* {game_level==="genius" && show_keyboard && inputText!==null && inputText.length!==word_length &&<GeniusLevelUI/>} */}
           
                 {game_level==="genius" && show_keyboard && inputText!==null && inputText.length===word_length && challenge && <input type="text" className="main-input" value={inputText2}/>}  

                {show_keyboard ? (
                  <div class="keypad" >
                    <div class="keypad_in">
                      <div class="key_btn">

                      <Suspense fallback={<div>Loading...</div>}>
                        <Keyboard onClick={onClick} />
                        </Suspense>

                          {game_level==='genius' && inputText!==null && inputText.length===word_length ? 
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

export default HumanVsComputer;
