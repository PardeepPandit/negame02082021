import React,{useReducer,useContext,useEffect} from 'react';
import commonReducer from '../common/commonReducer'
import CommonContext from '../common/commonContext'
import axios from 'axios'
import{
    SET_INPUT_TEXT,
    SET_ISACTIVE,
    SET_SECONDS
} from '../../../../type'; 


const CommonState=({children})=>{
  const initialState={
   inputText:null,
   isActive:false,
   seconds:60
  };
 
  const [state,dispatch]=useReducer(commonReducer,initialState);

  const setInputText=(text)=>{
    dispatch({
        type:SET_INPUT_TEXT,
        payload:text
    })
}

const setSeconds=(sec=60)=>{
  dispatch({
    type:SET_SECONDS,
    payload:sec
  })
}

const setIsActive=(true_false)=>{
  dispatch({
    type:SET_ISACTIVE,
    payload:true_false
  })
}
  return (
    <CommonContext.Provider
    value={{
    inputText:state.inputText,
    isActive:state.isActive,
    seconds:state.seconds,
    setInputText,
    setIsActive,
    setSeconds
      }}>
      {children}
    </CommonContext.Provider>
  )
}

export default CommonState;