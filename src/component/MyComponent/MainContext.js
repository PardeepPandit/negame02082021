import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react'
import useSound from 'use-sound';
const MainContext = React.createContext();
const MainContextUpdate = React.createContext();

export function useMainConsumer() {
  return useContext(MainContext)
}

export function useMainConsumerUpdate() {
  return useContext(MainContextUpdate)
}

export function MainProvider({ children }) {
   // const [play,setPlay]=useState(()=>true)
    const [redirectTo,setRedirectTo]=useState(()=>false)
    const [timeFlag,setTimeFlag]=useState(()=>false)
    const [hintCheck,setHintCheck]=useState(()=>true)
    const [wordList, setWordList] = useState([])
    const [showKeyboard,setShowKeyboard]=useState(()=>true)
    //const [resultWord,setResultWord]=useState({word:'',definition:''})
    //const [finalResult,setFinalResult]=useState(()=>({win:0,lose:0}))
    const [roundList1, setRoundList1] = useState({r1:'1', r1_loser: null }) 
   const [roundList2, setRoundList2] = useState({r2:'2', r2_loser: null }) 
   const [roundList3, setRoundList3] = useState({r3:'3', r3_loser: null }) 
   const [roundList4, setRoundList4] = useState({r4:'4', r4_loser: null }) 
   const [roundList5, setRoundList5] = useState({r5:'5', r5_loser: null }) 
   const [con,setCon]=useState(()=>false)
   const [finish,setFinish]=useState(false)
   const initialState={
    audio:new Audio('https://theneverendingwordgame.com/ne_game_api/public/admin/clip-one/assets/audio_files/acoustic%20guitar%203.mp3')
}


  return (
    <MainContext.Provider value={{showKeyboard,timeFlag,wordList,hintCheck,roundList1,
      roundList2,
      roundList3,
      roundList4,
      roundList5,
      redirectTo,con,finish,initialState}}>
      <MainContextUpdate.Provider value={{setTimeFlag,setWordList,setHintCheck,setRoundList1,
                                                   setRoundList2,
                                                   setRoundList3,
                                                   setRoundList4,
                                                   setRoundList5,
                                                   setRedirectTo,setCon,setFinish,setShowKeyboard}}>
        {children}
      </MainContextUpdate.Provider>
    </MainContext.Provider>
  )
}