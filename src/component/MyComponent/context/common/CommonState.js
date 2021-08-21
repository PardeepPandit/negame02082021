import React,{useReducer,useContext,useEffect} from 'react';
import commonReducer from '../common/commonReducer'
import CommonContext from '../common/commonContext'
import axios from 'axios'
import{
    SET_INPUT_TEXT,
    SET_INPUT_TEXT2,
    SET_ISACTIVE,
    SET_SECONDS,
    SET_GAME_STATUS,
    SET_BACKUP_INPUT_TEXT,
    SET_GAME_LEVEL,
    RESET_COMMONSTATE
} from '../../../../type'; 


const CommonState=({children})=>{
  const initialState={
   inputText:null,
   inputText2:null,
   backup_input_text:null,
   isActive:false,
   seconds:60,
   human_vs_computer:false,
   human_vs_online:false,
   human_vs_friend:false,
   game_level:null
  };
 
  const [state,dispatch]=useReducer(commonReducer,initialState);
  useEffect(()=>{

    if(state.inputText!==null){
          if(state.inputText.indexOf('_')>-1){
            const first_part=state.inputText.substr(0, state.inputText.indexOf('_')) 
            const second_pard=state.inputText.substr(state.inputText.indexOf('_')+1,state.inputText.length)
            const final_part=first_part+second_pard
            dispatch({
              type:SET_BACKUP_INPUT_TEXT,
              payload:final_part
            })
          }
          else{
            dispatch({
              type:SET_BACKUP_INPUT_TEXT,
              payload:state.inputText
            })
          }
    }
     
},[state.inputText])

const setGameLevel=(level)=>[
  dispatch({
    type:SET_GAME_LEVEL,
    payload:level
  })
]

const setBackUpInputText=(arg)=>{
  dispatch({
    type:SET_BACKUP_INPUT_TEXT,
    payload:arg
  })
}
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
  const setInputText2=(text)=>{
    dispatch({
        type:SET_INPUT_TEXT2,
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

const resetCommonState=()=>{
  dispatch({
    type:RESET_COMMONSTATE,
  })
}

  return (
    <CommonContext.Provider
    value={{
    inputText:state.inputText,
    inputText2:state.inputText2,
    isActive:state.isActive,
    seconds:state.seconds,
    human_vs_computer:state.human_vs_computer,
    human_vs_online:state.human_vs_online,
    human_vs_friend:state.human_vs_friend,
    backup_input_text:state.backup_input_text,
    game_level:state.game_level,
    setInputText,
    setInputText2,
    setIsActive,
    setSeconds,
    setGameStatus,
    exitUser,
    setBackUpInputText,
    setGameLevel,
    resetCommonState
      }}>
      {children}
    </CommonContext.Provider>
  )
}

export default CommonState;