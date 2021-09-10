
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
    LOAD_LEVEL,
    SET_HUMAN_POSITION,
    SINGLE_SHIFT_COUNTER,
    SET_SHOW_KEYBOARD,
    SET_RANDOM_POSITION,
    SET_WORD_LENGTH
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
   load_game_level:null,
   human_position:null,
   showKeyboard:false,
   single_shift_counter:null,
   word_length:null
  };
 
  console.log("Common State...")
  const [state,dispatch]=useReducer(commonReducer,initialState);

useEffect(()=>{
  console.log("warning 3")
  if(state.game_level==='Medium')
  {
      if(state.human_position===0)
      {
        setInputText(state.backup_input_text+'_')
      }
      else if(state.human_position===1)
      {
          setInputText('_'+state.backup_input_text)    
      }
  }
  else if(state.game_level==='Expert' || state.game_level==='Genius')
  {
    if(state.human_position===1)
    {
      setInputText(state.backup_input_text && '_'+state.backup_input_text.slice(0,state.backup_input_text.length))
    }
    if(state.human_position===0)
    {
      setInputText(state.backup_input_text && state.backup_input_text.slice(0,state.backup_input_text.length)+'_')  
    }
  }
},[state.human_position])


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


const deleteChar = () => {
  //console.log("deletechar========",inputText)

    if(state.game_level==='Easy')
    {
      setInputText(state.inputText.substring(0,state.inputText.length-1))
    }
    else if(state.game_level==='Medium')
    {

      if(state.human_position===0 || state.human_position===null)
      {
        setInputText(state.inputText.substring(0, state.inputText.length-1));
      }
      else if(state.human_position===1){
        setInputText(state.inputText.substring(1, state.inputText.length));
      }
    }
    else if(state.game_level==='Expert')
    {
      if((state.human_position===0 || state.human_position===null) && (state.single_shift_counter===null || state.single_shift_counter===-1))
      {
        setInputText(state.inputText.substring(0, state.inputText.length-1));
      }
      else if(state.human_position===1)
      {
        setInputText(state.inputText.substring(1, state.inputText.length));
      }
      else if(state.single_shift_counter > 0)
      {
        console.log("first half=",state.inputText.substring(0,state.single_shift_counter-1))
        console.log("second hlaf=",state.inputText.substring(state.single_shift_counter))
        console.log("final text=",state.inputText.substring(0,state.single_shift_counter-1)+state.inputText.substring(state.single_shift_counter))
        setInputText(state.inputText.substring(0,state.single_shift_counter-1)+state.inputText.substring(state.single_shift_counter))
      }
      
    }
    else if(state.game_level==='Genius' )
    {
      
      if(state.inputText!==null && state.inputText.length===state.word_length )
      {
        setInputText2(state.inputText2.substring(0, state.inputText2.length - 1));
      }
      else
      {
        if((state.human_position===0 || state.human_position===null) && (state.single_shift_counter===null || state.single_shift_counter===-1))
        {
          setInputText(state.inputText.substring(0, state.inputText.length-1));
        }
        else if(state.human_position===1)
        {
          setInputText(state.inputText.substring(1, state.inputText.length));
        }
        else if(state.single_shift_counter > 0)
        {
          console.log("first half=",state.inputText.substring(0,state.single_shift_counter-1))
          console.log("second hlaf=",state.inputText.substring(state.single_shift_counter))
          console.log("final text=",state.inputText.substring(0,state.single_shift_counter-1)+state.inputText.substring(state.single_shift_counter))
          setInputText(state.inputText.substring(0,state.single_shift_counter-1)+state.inputText.substring(state.single_shift_counter))
        }
      }
    }

    setSingleShiftCounter('reset')
    console.log("KEYBOARD ON 2")
    setShowKeyboard(true);
}; 


const setRandomPosition=()=>{
  dispatch({
    type:SET_RANDOM_POSITION,
    payload:Math.floor(Math.random() * 2)
  })
}

const setSingleShiftCounter=(inc_dec)=>{
 // console.log("counter value=",state.single_shift_counter,",",inputText.length)
  if(inc_dec==='increment')
  {
    if(state.single_shift_counter===null){
      dispatch({
        type:SINGLE_SHIFT_COUNTER,
        payload:state.single_shift_counter+1 
      })
    }
    else if(state.single_shift_counter!==null && (state.single_shift_counter < state.backup_input_text.length)){
      dispatch({
        type:SINGLE_SHIFT_COUNTER,
        payload:state.single_shift_counter+1 
      })
    }
    else{
      dispatch({
        type:SINGLE_SHIFT_COUNTER,
        payload:null
      })
    }
  }
  else if(inc_dec==='decrement'){
  
    if(state.single_shift_counter===0 || state.single_shift_counter===null){
      dispatch({
        type:SINGLE_SHIFT_COUNTER,
        payload:-1
      })
    }
    else if(state.single_shift_counter >0){
      dispatch({
        type:SINGLE_SHIFT_COUNTER,
        payload:state.single_shift_counter-1 
      })
    }
  }
else{
    dispatch({
      type:SINGLE_SHIFT_COUNTER,
      payload:null
    })
  }
  
}

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

// set position of character in inputText
const setHumanPosition=(position)=>{
  dispatch({
    type:SET_HUMAN_POSITION,
    payload:position
  })
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
const setShowKeyboard=(true_false)=>{
  dispatch({
      type:SET_SHOW_KEYBOARD,
      payload:true_false
  })
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
const setWordLength=(len)=>{
  dispatch({
    type:SET_WORD_LENGTH,
    payload:len
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
    human_position:state.human_position,
    single_shift_counter:state.single_shift_counter,
    showKeyboard:state.showKeyboard,
    word_length:state.word_length,
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
    getCampaign,
    setHumanPosition,
    deleteChar,
    setShowKeyboard,
    setWordLength
    
      }}>
      {children}
    </CommonContext.Provider>
  )
}

export default CommonState;