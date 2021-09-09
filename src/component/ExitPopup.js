import React,{useEffect,useContext} from "react";
import { useHistory } from 'react-router-dom'
import { SAVE_WORD } from "../type";
import CommonContext from './MyComponent/context/common/commonContext'
import HumanContext from "./MyComponent/context/human/humanContext";
import PlayOnlineConterxt from './playonline/context/playOnlineContext'
const ExitPopup = (props) => {

const commonContext =useContext(CommonContext)
const {resetCommonState,game_type,exitUser}=commonContext

const humanContext=useContext(HumanContext)
const {resetHumanState}= humanContext

const playOnlineContext=useContext(PlayOnlineConterxt)
const {resetStateHHForMatch,saveWord,onlineUser,online_round_counter}=playOnlineContext

const history=useHistory()
  useEffect(()=>{

    window.addEventListener("beforeunload", (ev) => 
  {  
      ev.preventDefault();
      console.log("WINDOE CLOSED=",ev.returnValue)
      window.localStorage.clear();
      return ev.returnValue = 'Are you sure you want to close?';
  }); 
  
  },[]) 

  return (
    <div className="popup-box">
      <div className="box">
        <img src="assets/img/logo.png" alt="" width="130" />
        <h3>Do you want to exit?</h3>

        <div className="buttons-box">

        <button onClick={props.handleClose}>No</button>

        <button onClick={()=>{
            resetCommonState()
            resetHumanState()

            if(game_type==='human_vs_online')
            {
              saveWord({
                match_id:onlineUser.user1.match_id,
                gamestatus:'18',
                concede:"0",
                user_id:parseInt(onlineUser.user1.user_id),
                challenge:"0",
                word:"",
                round:online_round_counter
            },25,false)
            //exitUser(parseInt(onlineUser.user1.user_id))
              resetStateHHForMatch()
            }
            
            history.push('/dashboard');
            return props.handleClose
        }
      }
          >Yes</button>
  
        </div>
        
      </div>
    </div>
  );
};
 
export default ExitPopup;