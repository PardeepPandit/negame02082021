import React, { useContext, useState} from 'react'
const MainContext = React.createContext();
const MainContextUpdate = React.createContext();

export function useMainConsumer() {
  return useContext(MainContext)
}

export function useMainConsumerUpdate() {
  return useContext(MainContextUpdate)
}

export function MainProvider({ children }) {
    const [redirectTo,setRedirectTo]=useState(()=>false)
    const [hintCheck,setHintCheck]=useState(()=>true)
   const [con,setCon]=useState(()=>false)
   const [finish,setFinish]=useState(false)
   const initialState={
    audio:new Audio('https://theneverendingwordgame.com/ne_game_api/public/admin/clip-one/assets/audio_files/acoustic%20guitar%203.mp3')
}


  return (
    <MainContext.Provider value={{hintCheck,
      redirectTo,con,finish,initialState}}>
      <MainContextUpdate.Provider value={{setHintCheck,
                                                   setRedirectTo,setCon,setFinish}}>
        {children}
      </MainContextUpdate.Provider>
    </MainContext.Provider>
  )
}