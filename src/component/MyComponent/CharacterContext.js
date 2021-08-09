import React, { useContext, useState, useEffect } from 'react'
import { useTimerConsumer, useTimerConsumerUpdate } from './TimerContext'
import { useMainConsumer, useMainConsumerUpdate } from './MainContext'
import {useBackgroundMusicConsumer} from './CustomHook'
import CommonContext from './context/common/commonContext'
import playOnlineContext from '../playonline/context/playOnlineContext'
import useSound from 'use-sound';
import HumanContext from './context/human/humanContext'
import PlayOnlineContext from '../playonline/context/playOnlineContext'
import { SET_SHOW_KEYBOARD, SET_TURN } from '../../type'
const CharacterContext = React.createContext();
const CharacterContextUpdate = React.createContext();

export function useCharacterConsumer() {
  return useContext(CharacterContext)
}

export function useCharacterConsumerUpdate() {
  return useContext(CharacterContextUpdate)
}

/////////////////////////////////////////////////////////////////////////////////////

export function CharacterProvider({ children }) {
  
const commonContext=useContext(CommonContext)
const {inputText,setInputText,setIsActive,isActive,setSeconds,seconds}=commonContext

const playOnlineContext=useContext(PlayOnlineContext)
const {game_type,onlineUser}=playOnlineContext

  const humanContext=useContext(HumanContext)
  const {level_type,position,setShowKeyboard,play,setPlay,setTurn,round,current_winner_loser_HC,start_match_computer}=humanContext


  const { setLoser, resetTime } = useTimerConsumerUpdate();
  const {timeFlag,alpha}=useMainConsumer();
  const {setWordList,setResultWord,setAlpha,checkSound}=useMainConsumerUpdate()
  const {keyAudio}=useBackgroundMusicConsumer();
 
  var alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  //const [round, setRound] = useState(() => 1)
  const [once, setOnce] = useState(() => { return false })
  const [audioA] = useSound('https://theneverendingwordgame.com/ne_game_api/public/admin/clip-one/assets/audio_files/a.mp3');
  const [audioB] = useSound('https://theneverendingwordgame.com/ne_game_api/public/admin/clip-one/assets/audio_files/b.mp3');
  const [audioC] = useSound('https://theneverendingwordgame.com/ne_game_api/public/admin/clip-one/assets/audio_files/c.mp3');
  const [audioD] = useSound('https://theneverendingwordgame.com/ne_game_api/public/admin/clip-one/assets/audio_files/d.mp3');
  const [audioE] = useSound('https://theneverendingwordgame.com/ne_game_api/public/admin/clip-one/assets/audio_files/e.mp3');
  const [audioF] = useSound('https://theneverendingwordgame.com/ne_game_api/public/admin/clip-one/assets/audio_files/f.mp3');
  const [audioG] = useSound('https://theneverendingwordgame.com/ne_game_api/public/admin/clip-one/assets/audio_files/g.mp3');
  const [audioH] = useSound('https://theneverendingwordgame.com/ne_game_api/public/admin/clip-one/assets/audio_files/h.mp3');
  const [audioI] = useSound('https://theneverendingwordgame.com/ne_game_api/public/admin/clip-one/assets/audio_files/i.mp3');
  const [audioJ] = useSound('https://theneverendingwordgame.com/ne_game_api/public/admin/clip-one/assets/audio_files/j.mp3');
  const [audioK] = useSound('https://theneverendingwordgame.com/ne_game_api/public/admin/clip-one/assets/audio_files/k.mp3');
  const [audioL] = useSound('https://theneverendingwordgame.com/ne_game_api/public/admin/clip-one/assets/audio_files/l.mp3');
  const [audioM] = useSound('https://theneverendingwordgame.com/ne_game_api/public/admin/clip-one/assets/audio_files/m.mp3');
  const [audioN] = useSound('https://theneverendingwordgame.com/ne_game_api/public/admin/clip-one/assets/audio_files/n.mp3');
  const [audioO] = useSound('https://theneverendingwordgame.com/ne_game_api/public/admin/clip-one/assets/audio_files/o.mp3');
  const [audioP] = useSound('https://theneverendingwordgame.com/ne_game_api/public/admin/clip-one/assets/audio_files/p.mp3');
  const [audioQ] = useSound('https://theneverendingwordgame.com/ne_game_api/public/admin/clip-one/assets/audio_files/q.mp3');
  const [audioR] = useSound('https://theneverendingwordgame.com/ne_game_api/public/admin/clip-one/assets/audio_files/r.mp3');
  const [audioS] = useSound('https://theneverendingwordgame.com/ne_game_api/public/admin/clip-one/assets/audio_files/s.mp3');
  const [audioT] = useSound('https://theneverendingwordgame.com/ne_game_api/public/admin/clip-one/assets/audio_files/t.mp3');
  const [audioU] = useSound('https://theneverendingwordgame.com/ne_game_api/public/admin/clip-one/assets/audio_files/u.mp3');
  const [audioV] = useSound('https://theneverendingwordgame.com/ne_game_api/public/admin/clip-one/assets/audio_files/v.mp3');
  const [audioW] = useSound('https://theneverendingwordgame.com/ne_game_api/public/admin/clip-one/assets/audio_files/w.mp3');
  const [audioX] = useSound('https://theneverendingwordgame.com/ne_game_api/public/admin/clip-one/assets/audio_files/x.mp3');
  const [audioY] = useSound('https://theneverendingwordgame.com/ne_game_api/public/admin/clip-one/assets/audio_files/y.mp3');
  const [audioZ] = useSound('https://theneverendingwordgame.com/ne_game_api/public/admin/clip-one/assets/audio_files/z.mp3');


  
  useEffect(() => {
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$=",isActive,",",round,",",game_type,",",onlineUser,",",inputText)
    if((inputText==='' || inputText===null) && game_type!=='playonline' && !onlineUser){
      console.log("Calling getrandom char******************************** 1")
      let c = getRandomChar();
    //console.log("inside useEffect getrandomchar c=", c)
    setInputText(c)
    }
    
  }, [current_winner_loser_HC,start_match_computer])


  
  const getRandomChar = () => {
    let char = '';
    let flag = true
    if (true) {
      const charLength = alphabets.length;
      char = alphabets.charAt(Math.floor(Math.random() *
        charLength));

      while (flag) {
        if (char === 'X' || char === 'Y' || char === 'Z') {
          char = getRandomChar();
        } else {
          flag = false;
        }
      }
      console.log("Random Char=",char)
    }
      setShowKeyboard(true)
    return char
  }

  useEffect(() => {
    console.log("Calling getrandom char******************************** 2")
    
   setInputText(getRandomChar())
    setTurn('human')
  
  }, [])

 /*   const [inputText, setInputText] = useState(() => {
    console.log("initialstate")
    return getRandomChar()
  });  */

  /* useEffect(() => {
    console.log("CHECK ReusLT WORD=",resultWord)
  }, [resultWord]) */


 


 
  
  const myTurn = (e) => {
    
    let currentChar;
    if(e.target.localName==='span')
    {
      //console.log("SPAN=",e.target.outerText)
      currentChar=e.target.outerText
    }
    if(e.target.localName==='li')
    {
      //console.log("SPAN=",e.target.outerText)
      currentChar=e.target.outerText
    }
    
    if(e.target.localName==='input')
    {
      //console.log("INPUT=",e.target.value)
      currentChar=e.target.value 
    }

    if(keyAudio){
      if(currentChar.toUpperCase()==='A') audioA()
if(currentChar.toUpperCase()==='B') audioB()
if(currentChar.toUpperCase()==='C') audioC()
if(currentChar.toUpperCase()==='D') audioD()
if(currentChar.toUpperCase()==='E') audioE()
if(currentChar.toUpperCase()==='F') audioF()
if(currentChar.toUpperCase()==='G') audioG()
if(currentChar.toUpperCase()==='H') audioH()
if(currentChar.toUpperCase()==='I') audioI()
if(currentChar.toUpperCase()==='J') audioJ()
if(currentChar.toUpperCase()==='K') audioK()
if(currentChar.toUpperCase()==='L') audioL()
if(currentChar.toUpperCase()==='M') audioM()
if(currentChar.toUpperCase()==='N') audioN()
if(currentChar.toUpperCase()==='O') audioO()
if(currentChar.toUpperCase()==='P') audioP()
if(currentChar.toUpperCase()==='Q') audioQ()
if(currentChar.toUpperCase()==='R') audioR()
if(currentChar.toUpperCase()==='S') audioS()
if(currentChar.toUpperCase()==='T') audioT()
if(currentChar.toUpperCase()==='U') audioU()
if(currentChar.toUpperCase()==='V') audioV()
if(currentChar.toUpperCase()==='W') audioW()
if(currentChar.toUpperCase()==='X') audioX()
if(currentChar.toUpperCase()==='Y') audioY()
if(currentChar.toUpperCase()==='Z') audioZ()
    }

  
    //let currentChar = e
    currentChar = currentChar.charAt(currentChar.length - 1)
    console.log("myturn inputtext=", currentChar,",Timeflag=",timeFlag)
    //console.log("play 3=",play)
      setPlay(false)
      console.log("LOSER AND WINNER 4")
      //setLoser({ name: 'You', out: false })

        if(level_type==="medium" && position==='left'){
          setInputText(currentChar + inputText)
        }
        else if(level_type==="medium" && position==='right'){
          setInputText(inputText + currentChar); 
        }
        else{
          setInputText(inputText + currentChar); 
        }

        console.log("Time Reset@@@@@@@@@@@@@  5")
     // timeFlag && setSeconds()
      setOnce(true)  
      
  }



  return (
    <CharacterContext.Provider value={{  
                                             once,
                                             play }}>
      <CharacterContextUpdate.Provider value={{ 
                                                   setOnce, 
                                                   myTurn,
                                                    }}>
        {children}
      </CharacterContextUpdate.Provider>
    </CharacterContext.Provider >
  )

}