import React, { useContext, useEffect } from 'react'
import PlayOnlineContext from '../playonline/context/playOnlineContext'
import HumanContext from './context/human/humanContext'
import CommonContext from './context/common/commonContext'
const TimerContext = React.createContext();

export function TimerProvider({ children }) {

const commonContext=useContext(CommonContext)
const {inputText,isActive,seconds,setSeconds,game_type,setInputText}=commonContext

const humanContext=useContext(HumanContext)
const {setCurrentWinnerLoserHC,setResultWord}=humanContext

  const playOnlineContext=useContext(PlayOnlineContext)
  const {onlineUser,saveWord,setRoundComplete,resetStateHHForRound,setwinnerLoser,online_round_counter,setResultWordHH,showNextRoundButton,nextRound,gameTimeOut}=playOnlineContext


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
        else if(game_type==='human_vs_online')
        {
            console.log("PLAY ONLINE TIME UP ")

             if(showNextRoundButton)
            {
              console.log("Next Round after Timer out")
              setInputText('')
              nextRound()
            }
            else {
          gameTimeOut(true)       
        setwinnerLoser('loser')
        console.log("ALL STATE RESET for playonline IN Timer Context")
        setResultWordHH(inputText,'Time Over')
            }
             
        //resetStateHHForRound(true)
        //setRoundComplete(false)
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