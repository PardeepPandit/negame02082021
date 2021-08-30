import React, { useContext, useEffect } from 'react'
import PlayOnlineContext from '../playonline/context/playOnlineContext'
import HumanContext from './context/human/humanContext'
import CommonContext from './context/common/commonContext'
const TimerContext = React.createContext();

export function TimerProvider({ children }) {

const commonContext=useContext(CommonContext)
const {inputText,isActive,seconds,setSeconds,game_type,human_vs_online}=commonContext

const humanContext=useContext(HumanContext)
const {setCurrentWinnerLoserHC,setResultWord}=humanContext

  const playOnlineContext=useContext(PlayOnlineContext)
  const {onlineUser,saveWord,setRoundComplete,resetState}=playOnlineContext


  var myVar;
  useEffect(() => {
   //console.log("check is acative in  useEffect=",isActive,",",seconds)
    if(isActive)
    {
      //console.log("Now setisActive==",isActive)
      if (seconds > 0)
      {
         myVar = setTimeout(() => setSeconds(seconds - 1), 1000);
      }
        else {
        if(game_type==='human_vs_computer')
        {
          console.log("InputText in Timer Context=",inputText);
          setCurrentWinnerLoserHC('loser')
          setResultWord(inputText,'Time Over')
        }
        else if(human_vs_online)
        {
          console.log("PLAY ONLINE TIME UP calling saveword API from TimerContext")
            saveWord({
            match_id:onlineUser.user1.match_id,
            gamestatus:'0',
            concede:"0",
            user_id:parseInt(onlineUser.user1.user_id),
            challenge:"0",
            word:""
        },10) 
        console.log("ALL STATE RESET for playonline IN Timer Context")
        resetState(true)
        setRoundComplete(false)
        } 
        
      }
    }
    return () => clearTimeout(myVar); 
  }, [isActive,seconds]);
 
  return (
    <TimerContext.Provider>
        {children}
    </TimerContext.Provider>
  )
}