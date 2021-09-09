
import React,{useReducer,useContext,useEffect} from 'react';
import commonReducer from '../common/commonReducer'
import CommonContext from '../common/commonContext'
import axios from 'axios'
import{
    SET_INPUT_TEXT,
    SET_INPUT_TEXT2,
    SET_ISACTIVE,
    SET_SECONDS,
    SET_GAME_TYPE,
    SET_BACKUP_INPUT_TEXT,
    SET_GAME_LEVEL,
    RESET_COMMONSTATE,
    LOAD_LEVEL
} from '../../../../type'; 


const CommonState=({children})=>{
  const initialState={
   inputText:null,
   inputText2:null,
   backup_input_text:null,
   isActive:false,
   seconds:60,
   game_type:null,
   game_level:null,
   load_game_level:null
  };
 
  console.log("Common State...")
  const [state,dispatch]=useReducer(commonReducer,initialState);




  useEffect(()=>{

    if(state.inputText!==null && state.inputText!==''){
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

const getCampaign=async()=>{
  /* const config={
    headers:{
      'Context-type':'appplication/json',
      'APPKEY' :'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
  }
}

const res=await axios.get(process.env.REACT_APP_BASEURL+'/api/getCampaigns',config)
    console.log("Response from campagin=",res.data) */
}

const loadGameLevels=async()=>{

  const config={
    headers:{
        'Context-type':'appplication/json',
        'APPKEY' :'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
    }
}
  try{
      const res=await axios.get(process.env.REACT_APP_BASEURL+'/api/levels',config)
      console.log("Response from Load levels=",res.data)

      dispatch({
        type:LOAD_LEVEL,
        payload:res.data
      })
  }
  catch(error){
    console.log("Error in Load level=",error)
  }
}

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

  const setGameType=(game_type)=>{
    dispatch({
      type:SET_GAME_TYPE,
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
    backup_input_text:state.backup_input_text,
    game_type:state.game_type,
    game_level:state.game_level,
    load_game_level:state.load_game_level,
    setInputText,
    setInputText2,
    setIsActive,
    setSeconds,
    setGameType,
    exitUser,
    setBackUpInputText,
    setGameLevel,
    resetCommonState,
    loadGameLevels,
    getCampaign
      }}>
      {children}
    </CommonContext.Provider>
  )
}

export default CommonState;