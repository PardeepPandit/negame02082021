import React,{useReducer,useState} from 'react';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import{
  SET_ALERT,REMOVE_ALERT,POPUP
} from '../../../../type'; 

const AlertState=({children})=>{
  const initialState=[];


  const [state,dispatch]=useReducer(alertReducer,initialState);
 
    const setAlert=(msg,type,timeout=1000)=>{
        const id= uuidv4();
        dispatch({
            type:SET_ALERT,
            payload:{msg,type,id}
        })

        setTimeout(()=>dispatch({
            type:REMOVE_ALERT,payload:id
        }),timeout)
    }

   
  return (
    <AlertContext.Provider
    value={{
      alerts:state,
      setAlert
      }}>
      {children}
    </AlertContext.Provider>
  )
}

export default AlertState;