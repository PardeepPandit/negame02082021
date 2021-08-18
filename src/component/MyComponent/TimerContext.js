import React, { useContext, useState, useEffect } from 'react'
import { useMainConsumer, useMainConsumerUpdate } from './MainContext'
import { useCharacterConsumerUpdate } from './CharacterContext'
import PlayOnlineContext from '../playonline/context/playOnlineContext'
import HumanContext from './context/human/humanContext'
import CommonContext from './context/common/commonContext'


const TimerContext = React.createContext();
const TimerContextUpdate = React.createContext();

export function useTimerConsumer() {
  return useContext(TimerContext)
}

export function useTimerConsumerUpdate() {
  return useContext(TimerContextUpdate)
}

export function TimerProvider({ children }) {

const commonContext=useContext(CommonContext)
const {inputText,isActive,setIsActive,seconds,setSeconds}=commonContext

const humanContext=useContext(HumanContext)
const {wordDefinition,setTimeOut,hint_wordlist,resultWord,setCurrentWinnerLoserHC,getRandomWordFromApi,getWordFromRapidApiHC}=humanContext


  //console.log("TimerContext rendring")
  const {play,finalResult}=useMainConsumer()
  const {setFinalResult}=useMainConsumerUpdate()
  const [result, setResult] = useState(() => 'win');
  const [loser, setLoser] = useState({ name: 'You', out: false });
  //const [seconds, setSeconds] = useState(60);
 // const [isActive, setIsActive] = useState(()=>false);

  const playOnlineContext=useContext(PlayOnlineContext)
  const {onlineUser,saveWord,setRoundComplete,setwinnerLoser,resetState}=playOnlineContext


  var myVar;
  useEffect(() => {
   //console.log("check is acative in  useEffect=",isActive,",",seconds)
    if(isActive)
    {
      //console.log("Now setisActive==",isActive)
      if (seconds > 0) {
            myVar = setTimeout(() => setSeconds(seconds - 1), 1000);
          }
           else {
            console.log("LOSER AND WINNER 10")
            if(!onlineUser){
              //active only for Human vs computer
              console.log("InputText in Timer Context=",inputText)
              setCurrentWinnerLoserHC('loser')
              getWordFromRapidApiHC()
            }else{
              console.log("PLAY ONLINE TIME UP")
              console.log("calling saveword API from TimerContext")
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
            //setwinnerLoser(null)
            setRoundComplete(false)
            //setSeconds()
            } 
            
          }
    }
    return () => clearTimeout(myVar); 
  }, [isActive,seconds]);

  function clearTime(){
    console.log("clear time")
    clearTimeout(myVar);
  }

  return (
    <TimerContext.Provider value={{result, loser }}>
      <TimerContextUpdate.Provider value={{ clearTime, setResult, setLoser}}>
        {children}
      </TimerContextUpdate.Provider>
    </TimerContext.Provider>
  )
}