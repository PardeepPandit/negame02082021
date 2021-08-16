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
  SET_TEMP_WORD,
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
  SET_HUMAN_POSITION,
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
  SET_MASTER_HISTORY,
  SET_RANDOM_POSITION,
  SINGLE_SHIFT_COUNTER,
  SET_BACKUP_INPUT_TEXT
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
        human_position:null,
        single_shift_counter:null,
        start_match_computer:JSON.parse(localStorage.getItem('start_match_computer')),
        turn:null,
        next_char:null,
        temp_word:null,
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
        master_history_HC:[],
        computer_position:null
       //[{round:1,word:,complete_word:,round_respnse}],[]
  };


  
  const [state,dispatch]=useReducer(humanReducer,initialState);

  const authContext = useContext(AuthContext)
  const {user}=authContext

  const commonContext =useContext(CommmonContext)
  const {inputText,setInputText,setSeconds,setIsActive,backup_input_text}=commonContext
console.log("Human state....",inputText)
useEffect(()=>{
  console.log("warning 1")
  console.log("calling checkhintcount from useEffect 1=",user && user.data.id)
  if(user && user.data.id)
  {
    console.log("calling checkhintcount from useEffect 2=",user.data.id)
    checkHintCount(user.data.id)
  }

},[user])  



useEffect(()=>{
  console.log("warning 2")
  if(state.next_char){

    if(state.level_type==='easy'){
      setInputText(inputText+state.next_char.toUpperCase())
    }
    if( state.level_type==='medium'){
      
      state.computer_position===0 ? setInputText(state.next_char.toUpperCase()+inputText) :setInputText(inputText+state.next_char.toUpperCase())
      
    }
    
    console.log("calling findNextChar")
      setSeconds()
      setIsActive(true)
      setShowKeyboard(true)
  }
},[state.next_char])

useEffect(()=>{
  console.log("warning 3")
  if(state.level_type==='medium'){
    if((state.human_position===0 || state.human_position===1) && inputText!==null){
        const index=inputText.indexOf('_')
        if(index>-1){
          setInputText(inputText.substr(0,index)+inputText.substr(index+1))
        }
      }
  }
  

  if(state.level_type==='expert')
  {
    if(state.human_position===0)
    {
      setInputText(backup_input_text && '_'+backup_input_text.slice(0,backup_input_text.length))
    }
    if(state.human_position===1)
    {
      setInputText(backup_input_text && backup_input_text.slice(0,backup_input_text.length)+'_')  
    }
  }
},[state.human_position]) 

useEffect(()=>{
  console.log("warning 4")
  console.log("CHECK POINT 1",state.turn)
        if(state.turn==='computer' && inputText!==null && inputText.length > 1 ){
          console.log("calling checkwordApi ")
          //call checkWordExistApi to check computer's word

            checkWordExistApi()

            //setTurn('human')
           // setShowKeyboard(true)
        }
      
},[inputText]) 


useEffect(()=>{
  console.log("warning 5")
  if(state.random_word!==null){
      if(state.random_word!=='word not found'){
        
    if(inputText!==null && inputText.length > 1){
          findNextChar()
          setTurn('computer')
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

useEffect(()=>{
  console.log("warning 6")
  if(state.match_round_details!==null){
    console.log("Round DEtails=",state.match_round_details)
    setMasterHistory({round:state.round,word:inputText,complete_word:state.random_word,round_details:state.match_round_details})
  }
},[state.match_round_details]) 

useEffect(()=>{
  console.log("warning 7")
  if(state.turn){
  console.log(`changing turn from ${state.turn}`)
    //state.concede===true ?  setResultWord(state.hint):setResultWord()

  state.turn==='human' ? setTurn('computer') : setTurn('human')
  }
  

},[state.current_winner_loser_HC])

useEffect(()=>{
  console.log("warning 8")
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


useEffect(() => {
    
  if(state.hint_used){
    console.log("calling get hint in humanstate");
    getHint()
}
  
}, [state.hint_used]);

//////////////////////////////////////////////////////////////////////

const getHint=async()=>{
 // setLoading()
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
const setHumanPosition=(position)=>{
    dispatch({
      type:SET_HUMAN_POSITION,
      payload:position
    })
}


const setCurrentWinnerLoserHC=(win_lose)=>{
  dispatch({
    type:SET_CURRENT_WINNER_LOSER_HC,
    payload:win_lose
  })
}


const frequencyCounter=()=>{

    return inputText.split('').reduce((total, letter) => {
      total[letter] ? total[letter]++ : total[letter] = 1;
      return total;
    }, {});

}

const getRandomWordFromApi=async()=>{

    console.log(`getRandom word   starting with=`,inputText,",",state.turn)
    setLoading()
    let dynamic_api=''
    const config={
        headers: {
          'X-RapidAPI-Key' : '0689b1157bmsh9ca7f4b5701a660p1080c2jsn9e2fa49e7bcf'
        }
      }
   
      let res=null
      try {
        if(state.level_type==='easy'){
          res=await axios.get(`https://wordsapiv1.p.rapidapi.com/words/?letterPattern=^${inputText.toLowerCase()}[a-zA-Z]*$&random=true`,config)
        }
        else if(state.level_type==='medium'){
          res=await axios.get(`https://wordsapiv1.p.rapidapi.com/words/?letterPattern=^[a-zA-Z]${inputText.toLowerCase()}[a-zA-Z]*$&random=true`,config)
          setRandomPosition()
        }
        else if(state.level_type==='expert'){

          dynamic_api=''
            Array.from(inputText.toLowerCase()).forEach((item)=>{
              dynamic_api= dynamic_api+'%2B'+item+'%2B(|[a-zA-Z])'
            })

            console.log("Dynamic API=",dynamic_api)
            console.log(`https://wordsapiv1.p.rapidapi.com/words/?letterPattern=^(|[a-zA-Z])${dynamic_api}*$&random=true`)
          res=await axios.get(`https://wordsapiv1.p.rapidapi.com/words/?letterPattern=^(|[a-zA-Z])${dynamic_api}*$&random=true`,config)
          setRandomPosition()
        }
        else if(state.level_type==='genius'){

          const calculate_frequency=frequencyCounter()
          console.log("Frequecy=",calculate_frequency)
          for(const[key,value] of Object.entries(calculate_frequency)){
            
            dynamic_api=dynamic_api+`(?=.*${key.toLowerCase()}{${value}})`
            console.log('dynamic_api=',dynamic_api)
          }
          console.log(`https://wordsapiv1.p.rapidapi.com/words/?letterPattern=^(?=.*^(\\w%2B[^ ])$)(?=.*^${dynamic_api})&random=true&letters=5`)
           res=await axios.get(`https://wordsapiv1.p.rapidapi.com/words/?letterPattern=^(?=.*^(\\w%2B[^ ])$)(?=.*^${dynamic_api})&random=true&letters=5`,config) 
        }
           
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

        if(input_text_length<random_word_length && state.level_type==='easy')
        {
          // setOnce(false)
         // console.log("check 101=",state.random_word,",",inputText,",",input_text_length,",",random_word_length)
          console.log("Next character for computer=",state.random_word.charAt(input_text_length))
          
          setNextCharacter(state.random_word.charAt(input_text_length))
          
        } 
       else if(input_text_length < random_word_length && state.level_type==='medium'){

          if(state.computer_position===1){
            console.log("Debug1=",inputText,",",state.random_word.indexOf(inputText.toLowerCase()))
            console.log("NEXT CHAR1=",state.random_word.charAt(state.random_word.indexOf(inputText.toLowerCase())+inputText.length))
            setNextCharacter(state.random_word.charAt(state.random_word.indexOf(inputText.toLowerCase())+inputText.length))
          }
          else if(state.computer_position===0){
            console.log("Debug2=",inputText,",",state.random_word.indexOf(inputText.toLowerCase()))
            console.log("NEXT CHAR2=",state.random_word.charAt(state.random_word.indexOf(inputText.toLowerCase())-1))
            setNextCharacter(state.random_word.charAt(state.random_word.indexOf(inputText.toLowerCase())-1))
          }
            
        }
        else if(input_text_length < random_word_length && state.level_type==='expert'){
          
           const random_word_len=state.random_word.length
           let demo_array=new Array(random_word_len)
           let random_number_set=Array.from(state.random_word).map((item,index)=>{
            return index
              })
              let k=0;
          for(let i=0;i<inputText.length;i++){

            for(let j=k;j<random_word_len;j++){
              
              //console.log(inputText[i].toLowerCase(),",",state.random_word[j],",",inputText[i].toLowerCase()===state.random_word[j])
              if(inputText[i].toLowerCase()===state.random_word[j]){
                //console.log("ok")
                  demo_array[j]=state.random_word[j]
                  random_number_set[j]=''
                  k=j+1 
                  //console.log("check=",demo_array[j],",",j)
                 
                  break;
              }
              else if(Number.isInteger(random_number_set[j])){
                random_number_set[j]=j 
              }
            }
          }



          random_number_set=random_number_set.filter((item,index)=>{
            return item!==''
          })

          const index_no=random_number_set[Math.floor(Math.random() * random_number_set.length)]
            console.log("TargetIndex=",index_no)
            console.log("Next char=",state.random_word[index_no])

            demo_array[index_no]=state.random_word[index_no]

            console.log("random_word=",state.random_word)
            console.log("demo_array=",demo_array)

            demo_array.forEach((item,index)=>{
                console.log("item=",index,",",item)
            })
             random_number_set.forEach((item,index)=>{
              console.log("ramdon no.=",index,",",item)
            })  
            console.log("Next char=",state.random_word[index_no],",",demo_array,"*",demo_array.join(""))
           // setNextCharacter(state.random_word[index_no])
           setInputText(demo_array.join("").toUpperCase())
           dispatch({
             type:SET_TEMP_WORD,
             payload:demo_array.join("").toUpperCase()
           })
           setSeconds()
           setIsActive(true)
           setShowKeyboard(true)

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


const setHintUsed=async(true_false,param='')=>{

  //setLoading()
   
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
/////////////////////////////////////////////////////////////////////////////////


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
    else if(state.single_shift_counter!==null && (state.single_shift_counter < backup_input_text.length)){
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
        payload:null
      })
    }
    else if(state.single_shift_counter!==null && (state.single_shift_counter >0)){
      dispatch({
        type:SINGLE_SHIFT_COUNTER,
        payload:state.single_shift_counter-1 
      })
    }
  }

  if(inc_dec==='reset'){
    dispatch({
      type:SINGLE_SHIFT_COUNTER,
      payload:null
    })
  }
  
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
        human_position:state.human_position,
        single_shift_counter:state.single_shift_counter,
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
        temp_word:state.temp_word,
        getRandomWordFromApi,
        setResultWord,
        startMatchComputer,
        removeLocalData,
        checkHintCount,
        setHintUsed,
        setConcede,
        setLevelType,
        setHumanPosition,
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
        setLoading,
        setRandomPosition,
        setSingleShiftCounter
      }}>
      {children}
    </HumanContext.Provider>
  )
}

export default HumanState;