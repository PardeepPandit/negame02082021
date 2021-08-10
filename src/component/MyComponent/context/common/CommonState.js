import React,{useReducer,useContext,useEffect} from 'react';
import commonReducer from '../common/commonReducer'
import CommonContext from '../common/commonContext'
import axios from 'axios'
import{
    SET_INPUT_TEXT,
    SET_ISACTIVE,
    SET_SECONDS,
    SET_GAME_STATUS
} from '../../../../type'; 


const CommonState=({children})=>{
  const initialState={
   inputText:null,
   isActive:false,
   seconds:150,
   human_vs_computer:false,
   human_vs_online:false,
   human_vs_friend:false
  };
 
  const [state,dispatch]=useReducer(commonReducer,initialState);


  const exitUser=async(id)=>{
    const config={
        headers:{
            'Context-type':'appplication/json',
            'APPKEY' :'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
        }
    }
    try {

        const res=await axios.get(process.env.REACT_APP_BASEURL+`/api/user/exit?user_id=${id}`,config)
        console.log(`Response from ${id} ExitUser`,res.data)
        localStorage.setItem('user_Exit',JSON.stringify(res.data))
        alert(JSON.stringify(res.data))
    }
    catch(error){
        console.log("Exit user Error=",error)
    }
}

  const setGameStatus=(game_type)=>{
    dispatch({
      type:SET_GAME_STATUS,
      payload:game_type
    })
  }


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
    human_vs_computer:state.human_vs_computer,
    human_vs_online:state.human_vs_online,
    human_vs_friend:state.human_vs_friend,
    setInputText,
    setIsActive,
    setSeconds,
    setGameStatus,
    exitUser
      }}>
      {children}
    </CommonContext.Provider>
  )
}

export default CommonState;