import { FALSE } from 'node-sass'
import React,{useReducer} from 'react'
import {PLAY_AUDIO,PAUSE_AUDIO} from '../../../../type'
import MasterContext from './masterContext'
import audioReducer from './audioReducer'


const AudioStates=({children})=>{

      const initialState={
        playing:'false',
        //audio:new Audio('https://theneverendingwordgame.com/ne_game_api/public/admin/clip-one/assets/audio_files/acoustic%20guitar%203.mp3')
    }

    const [state,dispatch]=useReducer(audioReducer,initialState)

    const playMusic=()=>{

        dispatch({
            type:PLAY_AUDIO,
            payload:true
        })
    }
    const pauseMusic=()=>{

        dispatch({
            type:PAUSE_AUDIO,
            payload:false
        })
    }


    return (
        <MasterContext.Provider 
        value={{
            playing:state.playing,
            audio:state.audio,
            playMusic,
            pauseMusic
        }}>
            {children}
        </MasterContext.Provider>
    ) 

}

export default AudioStates 