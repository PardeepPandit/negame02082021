import React, { useContext, useState, useEffect } from 'react'
import { useTimerConsumer, useTimerConsumerUpdate } from './TimerContext'
import { useMainConsumer, useMainConsumerUpdate } from './MainContext'
import {useBackgroundMusicConsumer} from './CustomHook'
import CommonContext from './context/common/commonContext'
import useSound from 'use-sound';
import HumanContext from './context/human/humanContext'
import PlayOnlineContext from '../playonline/context/playOnlineContext'
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
const {inputText,setInputText,setIsActive,isActive,setSeconds,seconds,inputText2,setInputText2,game_level}=commonContext

const playOnlineContext=useContext(PlayOnlineContext)
const {game_type,onlineUser}=playOnlineContext

  const humanContext=useContext(HumanContext)
  const {human_position,setShowKeyboard,play,setPlay,setTurn,round,current_winner_loser_HC,start_match_computer,word_length}=humanContext

  const {keyAudio}=useBackgroundMusicConsumer();
 
  var alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';


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
    console.log("KEYBOARD ON 3")
      setShowKeyboard(true)
    return char
  }

  useEffect(() => {
    console.log("Calling getrandom char******************************** 2")
    
   setInputText(getRandomChar())
   console.log("Set Turn 1 human")
    setTurn('human')
  
  }, [])

  function setTextPositioning(currentChar){
    if(inputText!==null &&  inputText.indexOf('_') > -1){
            
      const first_part=inputText.substr(0, inputText.indexOf('_')) 
      const second_pard=inputText.substr(inputText.indexOf('_')+1,inputText.length)
      const final_part=first_part+currentChar+second_pard

     console.log("first_part=", first_part)
     console.log("second_pard=", second_pard)
     console.log("final_part=", final_part)

        setInputText(final_part)
    }
    else if(human_position===1){
      setInputText(inputText + currentChar)
    }
    else if(human_position===0){
      setInputText(currentChar + inputText)
    }
    else
    {
    setInputText(inputText + currentChar); 
    }
  }
 
  
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

if(keyAudio)
{
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
    console.log("myturn input Text=", currentChar)
        if(game_level==='easy')
        {
            setInputText(inputText+currentChar)
        }
        else if(game_level==="medium")
        {
            /* if(human_position===1)
            {
              setInputText(currentChar + inputText)
            }
            else if(human_position===0 || human_position===null)
            {
              setInputText(inputText + currentChar);
            } */
            setTextPositioning(currentChar)
        }
        else if(game_level==='expert')
        {
            setTextPositioning(currentChar) 
        }
        else if(game_level==='genius')
        {
         console.log(`${game_level} set text`) 
          if(inputText.length===word_length)
          {
              console.log("Input box 2=",currentChar)
            setInputText2(inputText2 ? inputText2+currentChar : currentChar); 
          }
          else
          {
            setTextPositioning(currentChar)
          }
          
        } 
  }



  return (
    <CharacterContext.Provider value={{  
                                             play }}>
      <CharacterContextUpdate.Provider value={{ 
                                                   myTurn,
                                                    }}>
        {children}
      </CharacterContextUpdate.Provider>
    </CharacterContext.Provider >
  )

}