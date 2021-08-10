import React,{useReducer,useContext,useEffect} from 'react';
import HumanContext from './humanContext';
import humanReducer from './humanReducer';
import AuthContext from '../auth//authContext'
import CommmonContext from '../common/commonContext'
import axios from 'axios'
import{
  GET_RANDOM_WORD_SUCCESS,
  GET_RANDOM_WORD_FAIL,
  SET_LOADING,
  GET_HINT,
  SET_INPUT_TEXT,
  SET_WORD_DEFINITION,
  SET_START_MATCH_COMPUTER,
  REMOVE_LOCAL_DATA,
  SET_HINT_COUNT,
  SET_HINT_USED,
  SET_HINT_WORDLIST_SUCCESS,
  SET_HINT_WORDLIST_FAIL,
  SET_CONCEDE,
  SET_TIMEOUT,
  SET_LEVEL_TYPE,
  SET_POSITION,
  SET_TURN,
  SET_NEXT_CHAR,
  SET_SHOW_KEYBOARD,
  SET_PLAY,
  WORD_EXIST,
  SET_CURRENT_WINNER_LOSER_HC,
  SET_WINNER_LOSER_COUNTER,
  RESET_STATE_FOR_ROUND_FINSH_HC,
  SET_FINAL_RESULT_HC,
  RESET_STATE_FOR_MATCH_FINSH_HC,
  SET_MATCH_ROUND_DETAILS,
  SET_MASTER_HISTORY
} from '../../../../type'; 


const HumanState=({children})=>{
  const initialState={
        random_word:null,
        hint:null,
        resultWord:{word:'',definition:''},
        loading_HC:false,
        hint_count:null,
        hint_used:false,
        concede:false,
        level_type:null,
        position:null,
        start_match_computer:JSON.parse(localStorage.getItem('start_match_computer')),
        turn:null,
        next_char:null,
        show_keyboard:false,
        round:1,
        play:true,
        word_exist:false,
        current_winner_loser_HC:null,
        winner_counter:0,
        loser_counter:0,
        result_history:[],
        final_result_HC:null,
        match_round_details:null,
       master_history_HC:[]
       //[{round:1,word:,complete_word:,round_respnse}],[]
  };

  const [state,dispatch]=useReducer(humanReducer,initialState);

  const authContext = useContext(AuthContext)
  const {user}=authContext

  const commonContext =useContext(CommmonContext)
  const {inputText,setInputText,setSeconds,seconds,setIsActive}=commonContext

  useEffect(()=>{
  console.log("calling checkhintcount from useEffect 1=",user && user.data.id)
  if(user && user.data.id)
  {
    console.log("calling checkhintcount from useEffect 2=",user.data.id)
    checkHintCount(user.data.id)
  }

},[user])  

useEffect(()=>{
      if(state.next_char){
          setInputText(inputText+state.next_char.toUpperCase())
          console.log("calling findNextChar")
            setSeconds()
            setIsActive(true)
            setShowKeyboard(true)
      }
},[state.next_char])




 useEffect(()=>{
  console.log("CHECK POINT 1",state.turn)
        if(state.turn==='computer' && inputText!==null && inputText.length > 1 ){
          console.log("calling checkwordApi ")
          //call checkWordExistApi to check computer's word

            checkWordExistApi()

            //setTurn('human')
           // setShowKeyboard(true)
        }
      
},[inputText]) 



useEffect(() => {
    
  if(state.hint_used){
    console.log("calling get hint in humanstate");
    //getHint()
}
  
}, [state.hint_used]);

useEffect(()=>{
  console.log("HINT=======",state.hint)
 // setResultWord(state.hint,'')
},[state.hint])


const getHint=async()=>{
  setLoading()
  const config={
      headers: {
        'X-RapidAPI-Key' : '0689b1157bmsh9ca7f4b5701a660p1080c2jsn9e2fa49e7bcf'
      }
    }
    try {
      const res= await axios.get(`https://wordsapiv1.p.rapidapi.com/words/?letterPattern=^${inputText.toLowerCase()}[a-zA-Z]*$&random=true`,config)
  console.log(`Response code ${res.status} from getRandomWord=`,res.data)

  if(res.status===200)
  {
    //console.log("Property exist=", res.data.hasOwnProperty('results'))
      if(res.data.hasOwnProperty('results'))
      {
        console.log("Property exist=", res.data.hasOwnProperty('results'))
        setResultWord(res.data.word,res.data.results[0].definition)
      }
      else{
        setResultWord(res.data.word)
      }

    dispatch({
      type:GET_HINT,
      payload:res.data.word
    }) 
  }

  } catch (error) {
    console.log("Error in getRandomWordFromApi=",error)
    if(error)
    {

      dispatch({
        type:GET_HINT,
        payload:'Word not exist**'
      }) 
      
    } 
  }  
}




useEffect(()=>{

  if(state.random_word!==null){
      if(state.random_word!=='word not found'){
        if(inputText!==null && inputText.length===1 && seconds===0){
          //setResultWord(state.random_word)
        }
        else if(inputText!=='' && inputText.length > 1){
          findNextChar()
          setTurn('computer')
      /*   setTimeout(()=>{
            //computer will find next character from random word
            console.log("calling findNextChar")
            setTurn('computer')
            findNextChar()
            setSeconds()
            setIsActive(true)
            setShowKeyboard(true)
        },2000) */
        
      }
      else if(state.random_word==='word not found'){
        setCurrentWinnerLoserHC('loser')
      }
      else{
        console.log("OTHER CASE 1")
      }
    }
  }
},[state.random_word])

  const setPlay=(true_false)=>{
    dispatch({
      type:SET_PLAY,
      payload:true_false
    })
  }


 const setMasterHistory=(details)=>{
   dispatch({
     type:SET_MASTER_HISTORY,
     payload:details
   })
 }
 useEffect(()=>{
  if(state.match_round_details!==null){
    console.log("Round DEtails=",state.match_round_details)
    setMasterHistory({round:state.round,word:inputText,complete_word:state.random_word,round_details:state.match_round_details})
  }
},[state.match_round_details]) 

  const sendMatchRoundHC=async(formdata)=>{

    //console.log("Form data for match round=",formdata)
    
    const config={
        headers:{
            'Context-type':'appplication/json',
            'APPKEY' :'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
        }
    }
    const {id,round,status,points}=formdata

    console.log("Form data=",formdata)
    const body=formdata
    try {

        const res=await axios.post(process.env.REACT_APP_BASEURL+'/api/match/round',body,config)
        /* const res=await axios.post(process.env.REACT_APP_BASEURL+`/api/match/round?id=${id}&round=${round}&status=${status}&points=${points}`,config) */
        console.log("Response from match round",res.data)
        dispatch({
          type:SET_MATCH_ROUND_DETAILS,
          payload:res.data
        })
    }
    catch(error){
        console.log("Match Round Error=",error)
    }

}

const changeMatchStatusHC=async(match_id)=>{
  const config={
      headers:{
          'Context-type':'appplication/json',
          'APPKEY' :'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
      }
  }
  try {
      const res=await axios.get(process.env.REACT_APP_BASEURL+`/api/change/match/status?match_id=${match_id}`,config)
      console.log("Response form Change match status HC=",res.data)
      /* dispatch({
          type:CHANGE_MATCH_STATUS,
          payload:res.data
      }) */
  } catch (error) {
      console.log("Error in change match status API HC=",error)
      
  }
}

  const getFinalResultHC=async(match_id,user_id)=>{
    const config={
        headers:{
            'Context-type':'appplication/json',
            'APPKEY' :'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
        }
    }

    try {
        const res=await axios.get(process.env.REACT_APP_BASEURL+`/api/final/result?match_id=${match_id}&user_id=${user_id}`,config)
        console.log("Response form final result API HC=",res.data)
        dispatch({
            type:SET_FINAL_RESULT_HC,
            payload:res.data
        })
    } catch (error) {
        console.log("Error in final result API HC=",error)
        
    }
}


  const setShowKeyboard=(true_false)=>{
      dispatch({
        type:SET_SHOW_KEYBOARD,
        payload:true_false
      })
  }

  const setTurn=(true_false)=>{
    dispatch({
      type:SET_TURN,
      payload:true_false
    })
  }
  
const setLevelType=(type)=>{
  dispatch({
    type:SET_LEVEL_TYPE,
    payload:type
  })
}

// set position of character in inputText
const setPosition=(position)=>{
    dispatch({
      type:SET_POSITION,
      payload:position
    })
}


const setCurrentWinnerLoserHC=(win_lose)=>{
  dispatch({
    type:SET_CURRENT_WINNER_LOSER_HC,
    payload:win_lose
  })
}


useEffect(()=>{

  if(state.turn){
  console.log(`changing turn from ${state.turn}`)
    //state.concede===true ?  setResultWord(state.hint):setResultWord()

  state.turn==='human' ? setTurn('computer') : setTurn('human')
  }
  

},[state.current_winner_loser_HC])





  const getRandomWordFromApi=async()=>{

    console.log(`getRandom word   starting with=`,inputText,",",state.turn)
    setLoading()
    const config={
        headers: {
          'X-RapidAPI-Key' : '0689b1157bmsh9ca7f4b5701a660p1080c2jsn9e2fa49e7bcf'
        }
      }
   
      try {
          const res=await axios.get(`https://wordsapiv1.p.rapidapi.com/words/?letterPattern=^${inputText.toLowerCase()}[a-zA-Z]*$&random=true`,config)
      console.log(`Response code ${res.status} from getRandomWord=`,res.data.word)

      if(res.status===200)
      {

        if(res.data.hasOwnProperty('results'))
        {
          console.log("Property exist=", res.data.hasOwnProperty('results'))
          setResultWord(res.data.word,res.data.results[0].definition)
        }
        else{
          setResultWord(res.data.word)
        }

            dispatch({
              type:GET_RANDOM_WORD_SUCCESS,
              payload:res.data.word===undefined ? 'word not found' : res.data.word
          })

          if(res.data.word===undefined){
            setCurrentWinnerLoserHC('loser')
          }
         
      }

      } catch (error) {
        console.log("Error in getRandomWordFromApi=",error)
        if(error)
        {

          setCurrentWinnerLoserHC('loser')
          setResultWord()
            dispatch({
                type:GET_RANDOM_WORD_FAIL,
            })

          /*  if(error.response.status===404)
          {
            dispatch({
                type:GET_RANDOM_WORD_FAIL,
            })
          }  */
        } 
      }  
  }

//////////////////////////////////////////////////////////////////
useEffect(()=>{

      console.log("WORD EXITS CHNGE USEEFFECT=",state.word_exist,",",inputText,",", state.turn)
      if(state.word_exist)
      {
          if((state.word_exist===true || state.word_exist==='word not found') && inputText.length<=2){

              getRandomWordFromApi()
          }
          else if(state.word_exist===true && inputText.length > 3){

              state.turn==='human' ? setCurrentWinnerLoserHC('loser') :setCurrentWinnerLoserHC('winner')
              
            }
          else if(state.word_exist==='word not found' && inputText.length > 3 && state.turn==='human'){
            console.log("Word not found in check word API , now calling Random word API")
            
            dispatch({
              type:GET_RANDOM_WORD_FAIL,

            })
             getRandomWordFromApi()
                //setMyTurn(false)
                //getRandomWordFromApi(2)
          }
          else{
            console.log("OTHER REASON changing turn")
            setTurn('human')

          }
    }

},[state.word_exist])

//////////////////////////////////////////////////////////////////////

  const checkWordExistApi=async()=>{
    console.log(`${state.turn} checks word=`,inputText.toLowerCase())
    const config={
      headers: {
        'X-RapidAPI-Key' : '0689b1157bmsh9ca7f4b5701a660p1080c2jsn9e2fa49e7bcf'
      }
    }
 
    try {
        const res =await axios.get(`https://wordsapiv1.p.rapidapi.com/words/${inputText.toLowerCase()}`, config)
        
        console.log(`${state.turn}Response code ${res.status} form check word API=`,res.data)

        if(res.status===200)
        {
              if(res.data.hasOwnProperty('results'))
                {
                  console.log("Property exist=", res.data.hasOwnProperty('results'))
                  setResultWord(res.data.word,res.data.results[0].definition)
                }
                else{
                  setResultWord(res.data.word)
                }

          dispatch({
            type:WORD_EXIST,
            payload:true
          })
        }       
    }
    catch(error){
      console.log("Error form check word API=",error.response.status)

      if(error.response.status===404)
      {
          dispatch({
        type:WORD_EXIST,
        payload:"word not found"
        })
      }
      
    }
  }


  const findNextChar=()=>{
   // console.log("called findNexChar")
    if(state.random_word){
        const input_text_length=inputText.length
        const random_word_length=state.random_word.length

        if(input_text_length<random_word_length)
        {
          // setOnce(false)
         // console.log("check 101=",state.random_word,",",inputText,",",input_text_length,",",random_word_length)
          console.log("Next character for computer=",state.random_word.charAt(input_text_length))

          setNextCharacter(state.random_word.charAt(input_text_length))
          
        }    
  }
} 


const setNextCharacter=(char)=>{
    dispatch({
      type:SET_NEXT_CHAR,
      payload:char
    })
}
  


  const checkHintCount=async(id)=>{
    
    console.log("CheckHintCount called=")
    setLoading()
    const config={
      headers:{
        'Content-Type':'application/json',
        'APPKEY' : 'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
      }
    }
      console.log("USR ID**********=",id)
      try {
          const res =await axios.get(process.env.REACT_APP_BASEURL+`/api/userHints?user_id=${id}&level=1`, config)
        
      console.log("Response from checkHintCount=",res.data)
      dispatch({
        type:SET_HINT_COUNT,
        payload:res.data
      })

     
      } catch (error) {
          console.log("Error in checkHintCount=",error)
      }
      
  }


  function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

 



const setHintUsed=async(true_false,param='')=>{

  setLoading()
   
         const config={
          headers:{
            'Content-Type':'application/json',
            'APPKEY' : 'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
          }
        } 
        console.log("Form data for setHintUsed=",param)
        const {user_id,hint_id,match_id,round}=param
      if(!state.hint_used && param!==''){
          try {
            const body=param
            const res=await axios.post(process.env.REACT_APP_BASEURL+'/api/useHints',body,config)
              /*  const res=await axios.post(process.env.REACT_APP_BASEURL+`/api/useHints?user_id=${user_id}&hint_id=${hint_id}&match_id=${match_id}&round=${round}`,config)   */
              console.log("Response from setHintUsed=",res.data)
          } catch (error) {
            console.log("Error in setHintUsed=",error)
          }

        


          try {
            const res=await axios.get(process.env.REACT_APP_BASEURL+`/api/userHints?user_id=${user_id}`,config)
            console.log("Resoponse from setHintUsed Available hint=",res.data)
            dispatch({
              type:SET_HINT_COUNT,
              payload:res.data
            })
          } catch (error) {
            console.log("Error in Available hint=",error)
          }
         
        }
       
      dispatch({
          type:SET_HINT_USED,
          payload:true_false
      })  
}



const startMatchComputer=async(id,level)=>{
  setLoading()
console.log("form data of startMatchComputer=",id,",",level)
  const config={
    headers:{
      'APPKEY': 'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
    }
  }
  
  try{
    const res=await axios.get(process.env.REACT_APP_BASEURL+`/api/start/match/computer?user_id=${id}&level=${level}`,config)
    console.log("Response from startMatchComputer=",res.data)
    localStorage.setItem('start_match_computer',JSON.stringify(res.data))

     dispatch({
      type:SET_START_MATCH_COMPUTER,
      payload:res.data
    }) 

    
  }
  catch(error){
    console.log("Error in startMatchComputer=",error)
    //localStorage.setItem('start_match_computer',null)
  }
  
}

 const removeLocalData=()=>{
   console.log("Removiong local data ")
   dispatch({
     type:REMOVE_LOCAL_DATA
   })
 }

const setResultWord=(word=inputText,def='Meaning not found')=>{
  dispatch({
    type:SET_WORD_DEFINITION,
    payload:{word:word,definition:def}
  })
}

  const setLoading=()=>{
      dispatch({
          type:SET_LOADING
      })
  }

  const setConcede=(true_false)=>
  {
    dispatch({
      type:SET_CONCEDE,
      payload:true_false
    })
  }

const roundFinishResetHC=()=>{

  dispatch({
    type:RESET_STATE_FOR_ROUND_FINSH_HC,
  })
}
const matchFinishResetHC=()=>{

  dispatch({
    type:RESET_STATE_FOR_MATCH_FINSH_HC,
  })
}

  return (
    <HumanContext.Provider
    value={{
        random_word:state.random_word,
        loading_HC:state.loading_HC,
        hint:state.hint,
        resultWord:state.resultWord,
        start_match_computer:state.start_match_computer,
        hint_count:state.hint_count,
        hint_used:state.hint_used,
        concede:state.concede,
        level_type:state.level_type,
        position:state.position,
        turn:state.turn,
        show_keyboard:state.show_keyboard,
        round:state.round,
        play:state.play,
        word_exist:state.word_exist,
        current_winner_loser_HC:state.current_winner_loser_HC,
        winner_counter:state.winner_counter,
        loser_counter:state.loser_counter,
        result_history:state.result_history,
        final_result_HC:state.final_result_HC,
        match_round_details:state.match_round_details,
        master_history_HC:state.master_history_HC,
        getRandomWordFromApi,
        setResultWord,
        startMatchComputer,
        removeLocalData,
        checkHintCount,
        setHintUsed,
        setConcede,
        setLevelType,
        setPosition,
        checkWordExistApi,
        setTurn,
        findNextChar,
        setShowKeyboard,
        setPlay,
        setCurrentWinnerLoserHC,
        roundFinishResetHC,
        getFinalResultHC,
        sendMatchRoundHC,
        changeMatchStatusHC,
        matchFinishResetHC,
        setMasterHistory,
        getHint,
        setLoading
      }}>
      {children}
    </HumanContext.Provider>
  )
}

export default HumanState;