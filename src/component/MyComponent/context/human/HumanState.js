import React,{useReducer,useContext,useEffect} from 'react';
import HumanContext from './humanContext';
import humanReducer from './humanReducer';
import AuthContext from '../auth//authContext'
import CommmonContext from '../common/commonContext'
import axios from 'axios'
import{
  GET_WORDLIST_SUCCESS,
  GET_WORDLIST_FAIL,
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
  SET_POSITION
} from '../../../../type'; 


const HumanState=({children})=>{
  const initialState={
        wordList:[],
        hint:null,
        resultWord:{word:'',definition:''},
        loading:false,
        hint_count:null,
        hint_used:false,
        hint_wordlist:[],
        concede:false,
        timeout:false,
        level_type:null,
        position:null,
        start_match_computer:JSON.parse(localStorage.getItem('start_match_computer'))
  };

  const [state,dispatch]=useReducer(humanReducer,initialState);

  const authContext = useContext(AuthContext)
  const {user}=authContext

  const commonContext =useContext(CommmonContext)
  const {inputText}=commonContext

  useEffect(()=>{
  console.log("calling checkhintcount from useEffect 1=",user && user.data.id)
  if(user && user.data.id)
  {
    console.log("calling checkhintcount from useEffect 2=",user.data.id)
    checkHintCount(user.data.id)
  }

},[user])  


useEffect(() => {
    
  if(state.hint_used){
    console.log("I am caling get hint in humanstate");

    //call getHintWordList methode to fetch list of word from word API
    getHintWordList(inputText)
  }
  
}, [state.hint_used]);


useEffect(()=>
  {
    if(state.hint_wordlist.length>0){
      console.log("Calling wordDefinition form useEffect=",state.hint_wordlist)
      
      
      //call getHint method to find hint word  form hintwordlist 
      getHint()

      //calll wordDefinition method to find meaning of that hint word
      wordDefinition()
    }
    

  },[state.hint_wordlist])


  //console.log("Human state called$$$$$$")

  const setTimeOut=(true_false)=>{
    dispatch({
      type:SET_TIMEOUT,
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
  const getWordList=async(str)=>{
    if(str){
    setLoading()
    const config={
        headers: {
          'X-RapidAPI-Key' : '0689b1157bmsh9ca7f4b5701a660p1080c2jsn9e2fa49e7bcf'
        }
      }
   
      console.log("Word list in HUman state=",state.wordList)
      try {
          const res =await axios.get(`https://wordsapiv1.p.rapidapi.com/words/?letterPattern=^${str.toLowerCase()}[a-zA-Z]*$`, config)
        
      console.log("NEW API WORD+=",res.data)

      dispatch({
          type:GET_WORDLIST_SUCCESS,
          payload:res.data.results.data
      })
      } catch (error) {
          dispatch({
              type:GET_WORDLIST_FAIL,
          })
      }
    }else{
        console.log("SETTING WORD LIST TO NULL")
        dispatch({
            type:GET_WORDLIST_FAIL,
        })
    }
      
  }


  const getHintWordList=async(str)=>{
    console.log("getHintWordList called with text=",str)
    if(str){
    setLoading()
    const config={
        headers: {
          'X-RapidAPI-Key' : '0689b1157bmsh9ca7f4b5701a660p1080c2jsn9e2fa49e7bcf'
        }
      }
   
      try {
          const res =await axios.get(`https://wordsapiv1.p.rapidapi.com/words/?letterPattern=^${str.toLowerCase()}[a-zA-Z]*$`, config)
        
      console.log("HINT WORD LIST+=",res.data)

      dispatch({
          type:SET_HINT_WORDLIST_SUCCESS,
          payload:res.data.results.data
      })
      

      } catch (error) {
        console.log("Error in gethintword list=",error)
           dispatch({
              type:SET_HINT_WORDLIST_FAIL,
          }) 
      }
    }else{
         console.log("SETTING HINT WORD LIST TO NULL")
        dispatch({
            type:SET_HINT_WORDLIST_FAIL,
        }) 
    }
      
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

  const getHint=()=>{
    console.log("calling githint***",state.hint_wordlist)
    if(state.hint_wordlist){
    shuffle(state.hint_wordlist)
      var temphint=''
        console.log("Hint word list after shuffle=",state.hint_wordlist);
        //setHintCheck(false)
         var len=inputText.length
         var substr=''
          temphint=state.hint_wordlist.find((item)=>{ 
             console.log("Hint=",item.substring(0,len),"===",inputText)
              substr=item.toUpperCase().substring(0,len)
              console.log(substr,"===",inputText.toUpperCase(),",",item,",",item.length,",",len)
             return (substr===inputText.toUpperCase() && item.length>len)  
            })
            console.log("HINT========",temphint)
          
          if(temphint)
          {
            console.log("^^^^^^^^^^^^^^^^ 1")
             dispatch({
              type:GET_HINT,
              payload:temphint
            }) 
          }
        if(!temphint){
          console.log("**************  2")
          dispatch({
            type:GET_HINT,
            payload:'Word not exist**'
          }) 
        }
      }else{
        console.log("ELSE OF GETHINT")
      }
    // wordDefinition()
      //console.log("Hint word====>",state.hint)  
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

const wordDefinition=async()=>{
  let body=''
  //filter array is an array of words whose length is greater than inputText,so that we can find substrig of that word
  let temparrary
  if(state.concede || state.timeout){
      temparrary=state.hint_wordlist
  }
  else{
    temparrary=state.wordList
  }
  temparrary= shuffle(temparrary)
  console.log("NOW TEMP ARRAY=>",temparrary)
  let filterarray=temparrary.filter((item)=>{
    return item.length>=inputText.length
    })
    
    //console.log("InputText and filterarry",inputText,",",filterarray)
      const defword=filterarray.find((item)=>{
            return item.substring(0,inputText.length).toUpperCase()===inputText.toUpperCase()
      })
      if(defword || inputText.length===1)
      {
           console.log("defWrod====>",defword)
      
        try {
          const config={
          headers:{
            'APPKEY': 'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
          }
        }
        if(inputText.length===1 && !state.concede && !state.timeout){
          console.log("if 1=",inputText,",",!state.concede)
           body={
            "word":`${inputText}`
          }
        }
       else{
          console.log("if 3=",defword)
           body={
            "word":`${defword}`
          }
        }
          
        console.log("Body for word meaning=",body,",",state.concede)
        const res =await axios.post(process.env.REACT_APP_BASEURL+'/api/get/words/meaning',body,config)
       
        console.log("word meaning=====>",res.data)
        if(JSON.stringify(res.data.status)==='400'){
          console.log("setting demo word=",body.word,",",res.data.error_message)
          //setResultWord({word:inputText ,definition:res.data.error_message})
          dispatch({
            type:SET_WORD_DEFINITION,
            payload:{word:body.word,definition:res.data.error_message}
            /* payload:{word:inputText ,definition:res.data.error_message} */
          })
        }
        //console.log("word meaning=====>",res.data.data.definition) 
        if(JSON.stringify(res.data.status)==='200'){
          dispatch({
            type:SET_WORD_DEFINITION,
            payload:res.data.data
          })
        }
        
        } catch (error) {
          //setResultWord({word:inputText,definition:''})
          dispatch({
            type:SET_WORD_DEFINITION,
            payload:{word:inputText,definition:''}
          })
        }
    
      }
      else{
            console.log("No defword found")
            dispatch({
              type:SET_WORD_DEFINITION,
              payload:{word:inputText,definition:''}
            })

      }
        
}
//const res=await axios.post(process.env.REACT_APP_BASEURL+'/api/useHints',body,config)
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

const setResultWord=(def='')=>{
  dispatch({
    type:SET_WORD_DEFINITION,
    payload:{word:inputText,definition:def}
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


  return (
    <HumanContext.Provider
    value={{
        wordList:state.wordList,
        loading:state.loading,
        hint:state.hint,
        resultWord:state.resultWord,
        start_match_computer:state.start_match_computer,
        hint_count:state.hint_count,
        hint_used:state.hint_used,
        hint_wordlist:state.hint_wordlist,
        concede:state.concede,
        timeout:state.timeout,
        level_type:state.level_type,
        position:state.position,
        getWordList,
        getHint,
        wordDefinition,
        setResultWord,
        startMatchComputer,
        removeLocalData,
        checkHintCount,
        setHintUsed,
        getHintWordList,
        setConcede,
        setTimeOut,
        setLevelType,
        setPosition
      }}>
      {children}
    </HumanContext.Provider>
  )
}

export default HumanState;