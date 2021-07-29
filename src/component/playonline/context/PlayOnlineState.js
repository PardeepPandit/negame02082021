import axios from 'axios'
import React,{useReducer,useEffect,useContext} from 'react'
import PlayOnlineContext from './playOnlineContext'
import playOnlineReducer from './playOnlineReducer'
import CommonContext from '../../MyComponent/context/common/commonContext'
import ChallengePopup from '../../playonline/play_online_components/ChallengePopup'
import {
    SEARCH_ONLINE,
    SET_LOADING,SAVE_WORD, 
    SET_INPUT_TEXT,
    GET_WORD,
    GET_WORD_FAIL,
    TURN_CHANGE,
    SET_WORD_DEFINITION,
    SET_RESULT,
    RESET_STATE,
    SET_GAME_TYPE,
    SET_ROUND_COMPLETE,
    SET_POPUP,
    API_HIT,
    SET_ROUND_RESULT,
    SET_SHOW_KEYBOARD,
    STOP_OLD_INSTANCE,
    STATE_LIST,
    SET_INTERVAL_ID,
    SET_CURRENT_STATUS
} from '../../../type'
const PlayOnlineState=({children})=>{

const initialState={
onlineUser:null,
save_word:null,
get_word:null,
loading:false,
turn_change:null,
word_definition:{word:"",definition:""},
winner_loser:null,
round_online:1,
info:[],
game_type:null,
match_round:null,
round_complete:false,
popdisabled:false,
getwordapihit:60,
//round_result:{r1:null,r2:null,r3:null,r4:null,r5:null},
round_result:[],
showKeyboard:false,
stop_old_instance:false,
reset_state:false,
interval_id:[],
current_status:localStorage.getItem('current_status')
}

const [state, dispatch] = useReducer(playOnlineReducer, initialState)

const commonContext=useContext(CommonContext)
const{inputText,setInputText,isActive,setIsActive,setSeconds}=commonContext


const stopOldInstance=(true_false)=>{
    dispatch({
        type:STOP_OLD_INSTANCE,
        payload:true_false
    })
}


const setCurrentStatus=(winner_loser)=>{
    dispatch({
        type:SET_CURRENT_STATUS,
        payload:winner_loser
    })
}


useEffect(()=>{
    console.log("setshow keyboard true 5",state.turn_change,",",state.winner_loser)
    if(state.onlineUser && state.get_word)
    {

        if((state.turn_change!==null && state.winner_loser==='winner') || (state.turn_change!==null && state.winner_loser!=='loser'))
        {
            
            setShowKeyboard(true);
            console.log("***************SET IS ACTIVE 10 ***************")
            setIsActive(true);
            setSeconds(60)
        }
}

},[state.turn_change])

/* useEffect(()=>{
 
    if(state.onlineUser){

    
    if(state.winner_loser==="winner" || state.winner_loser==="loser") 
        {
        getWord(state.onlineUser.user1.match_id,state.onlineUser.user1.user_id,120)
        }
        else
        {
        getWord(state.onlineUser.user1.match_id,state.onlineUser.user1.user_id,60)
        }
    }
}) */


useEffect(()=>{
    if(state.onlineUser)
    {
        console.log("setshow keyboard true 8")
    setShowKeyboard(state.onlineUser.user1.start === "1" ? true :  state.winner_loser==="winner" ? true :false)
    }
    
},[state.onlineUser])

const setShowKeyboard=(true_false)=>{
    dispatch({
        type:SET_SHOW_KEYBOARD,
        payload:true_false
    })
}

useEffect(()=>{

if(state.winner_loser){

    if(state.round_online===1 || state.round_online===2 || state.round_online===3 || state.round_online===4 || state.round_online===5)
    {

        setRoundResult(state.winner_loser)
    }

}

},[state.winner_loser])


const setRoundResult=(result)=>{
    dispatch({
        type:SET_ROUND_RESULT,
        payload:result
    })
}

const setPopup=(true_false)=>{
    dispatch({
        type:SET_POPUP,
        payload:true_false
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
        console.log("Response from ExitUser",res.data)
    }
    catch(error){
        console.log("Exit user Error=",error)
    }
}

const setRoundComplete=(true_false)=>{

    //console.log("set Round complete called=",true_false)

    dispatch({
        type:SET_ROUND_COMPLETE,
        payload:true_false
    })
}

const matchRound=async(formdata)=>{

    //console.log("Form data for match round=",formdata)
    
    const config={
        headers:{
            'Context-type':'appplication/json',
            'APPKEY' :'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
        }
    }
    const {id,round,status,points}=formdata
    const body=formdata
    try {

        const res=await axios.post(process.env.REACT_APP_BASEURL+'/api/match/round',body,config)
        /* const res=await axios.post(process.env.REACT_APP_BASEURL+`/api/match/round?id=${id}&round=${round}&status=${status}&points=${points}`,config) */
        //console.log("Response from match round",res.data)
    }
    catch(error){
        console.log("Match Round Error=",error)
    }

}


const searchUserOnline=async(id)=>{
    //console.log("getting data for online user id=",id)
    //search opponent for 120 seconds
    let time=120
   let myinterval=setInterval(async()=>{

    setLoading()
    
    const config={
        headers:{
            'Context-type':'appplication/json',
            'APPKEY' :'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
        }
    }
    try {

        const res=await axios.get(process.env.REACT_APP_BASEURL+`/api/start/match?user_id=${id}&level=1`,config)
        //console.log("Response from search_user_online",res.data)

        if(JSON.stringify(res.status)==='200' && JSON.stringify(res.data.status)==='200')
        {
            dispatch({
                type:SEARCH_ONLINE,
                payload:res.data
            })
            
            state.info.push({
                round:state.round_online
            })
            localStorage.setItem('info',JSON.stringify(state.info))
            clearInterval(myinterval)
        }
        else if(time===0){
            dispatch({
                type:SEARCH_ONLINE,
                payload:'opponent_not_found'
            })
            clearInterval(myinterval)

            console.log("STOP=",time)
        }
        time--
        console.log("Time=",time)
    } catch (error) {
        
    }
   },1000)
  
}
////////////////////////////////////////////////SAVE WORD
const saveWord=async(formData)=>{

    
   /*  if(state.stop_old_instance)
    {
        clearInterval(myinterval2)
        stopOldInstance(false)
    }
    else{

        stopOldInstance(true)
    } */

    const {user_id,match_id,word,gamestatus}=formData
    const config={
        headers:{
            'Context-type':'appplication/json',
            'APPKEY' :'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
        }
    }

    const body=formData
    //console.log("save word API body=",body)
    try {

        const res=await axios.post(process.env.REACT_APP_BASEURL+`/api/save/word`,body,config)
        console.log("Response from saveWord=",res.data)

        if(JSON.stringify(res.status)==='200' && JSON.stringify(res.data.status)==='200'){
        dispatch({
            type:SAVE_WORD,
            payload:res.data
        })
        /* if(!state.result){
                console.log("calling getWord from saveword")
            getWord(match_id,user_id,60)
        } */
     

        
        if(res.data.status===200){
           
                setTimeout(()=>{

                    if(state.winner_loser==="winner" || state.winner_loser==="loser") 
                    {
                        console.log("calling getword API form saveword 120=",match_id,",",user_id)
                        getWord(match_id,user_id,120)
                    }
                    else
                    {
                        console.log("calling getword API form saveword 60=",match_id,",",user_id)
                        getWord(match_id,user_id,60)
                    } 

                },2000)
           
        }
        else{
            console.log("NOT CALLING getword API from saveWord")
        }  
            
 
   
    }
    } catch (error) {
        console.log("Error from savewrod API=",error)
    }

}

/* 
useEffect(()=>{

    if(state.onlineUser){
        time=state.getwordapihit
    getWord(state.onlineUser.user1.match_id,state.onlineUser.user1.user_id)
    }
},[state.onlineUser,state.save_word]) */


/* useEffect(()=>{

    const {match_id,user_id,gamestatus,challenge,concede,word}=state.get_word.data

    if(state.onlineUser.user1.user_id!==parseInt(user_id) && gamestatus==="0" && challenge==="0" && concede==="1")
    {
           // setwinnerLoser('loser')
           console.log("YOU CAN PLAY NEXT MOVE")
           //clearInterval(myinterval)
    }
    else if(state.onlineUser.user1.user_id!==parseInt(user_id) && gamestatus==="5" && challenge==="0" && concede==="1"){

        console.log("YOUR OPPONENT PLAYED IT FIRST , NOW ITS YOUR TURN...")
        //clearInterval(myinterval)
    }
    else if(state.onlineUser.user1.user_id===parseInt(user_id) && gamestatus==="5"  && challenge==="0" && concede==="0"){
        console.log("What to do next")
        console.log("Clear get word API 2")
        ///clearInterval(myinterval)
    }
    else if(state.onlineUser.user1.user_id!==parseInt(user_id)  && (gamestatus!=="0" && challenge!=="0" && concede!=="0"))
    {
        console.log("STOP CALLING GET WORD and Clear get word API 3",user_id,",",parseInt(user_id),",",state.getwordapihit)
        if(word.length===36){
            alert("word length==36")
        }
    }
   else if(state.onlineUser.user1.user_id!==parseInt(user_id)  && (gamestatus==="101" || gamestatus==="3" || gamestatus==="4"))
    {
        // getWordDefinition(res.data.data.word)
        console.log("*********SET LOSER*************")
        setwinnerLoser('loser')
        console.log("Clear get word API 4")
        ///clearInterval(myinterval)
    }
    else if(gamestatus==="5")
    {
        //console.log("Setting Winner from playonline getWord API")
        //setwinnerLoser('winner')
    }
    else if(word && user_id!==parseInt(user_id)  && (gamestatus==="1" && challenge==="0" && concede==="0"))
    {
        console.log("Changing turn and Clear get word API 5")
            if(!isActive){
                setIsActive(true)
            }
        //alert("changing turn and setShowkeyboard true")
           setTurn(true) 
           setShowKeyboard(true)
        setInputText(word)
        //console.log("Clear get word API 5")
        ///clearInterval(myinterval)
     }
    else if(word==="") {
       // console.log("Setting input text  2=",res.data.data.word)
        console.log("SET INPUT TEXT 4 and Clear get word API 6")
        setInputText('')
        //console.log("Clear get word API 6")
        ///clearInterval(myinterval)
    }
   else if(word && user_id!==parseInt(user_id) && concede==="0" && gamestatus==="0" && challenge==="0")
    {
        //console.log("*************SPECIAL CASE 2***********")
        console.log("SET INPUT TEXT 5")
        setInputText('')
        //clearInterval(myinterval)
    }
    else{
        console.log("SET INPUT TEXT 3")
        setInputText(word)
        //clearInterval(myinterval)
    }

},[state.get_word])
 */

//////////////////////////////      GET WORD
const getWord=(match_id,user_id,time)=>{

    //console.log("My interval in get word API =",user_id)
state.interval_id.forEach(clearInterval);
    let myinterval= setInterval(async()=>{

        //console.log("My Interval instance start=",myinterval)
        
     setLoading()
    
    const config={
        headers:{
            'Context-type':'appplication/json',
            'APPKEY' :'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
        }
    }
        //console.log("matchid=",match_id)
    try {

        const res=await axios.get(process.env.REACT_APP_BASEURL+`/api/get/word?match_id=${match_id}`,config)
       console.log("Response from getWord=",res.data.data)

       const{concede,gamestatus,challenge}=res.data.data
         //console.log("Response from getWord=",user_id,",",res.data.data.user_id,",",res.data.data.word,",",time)

        if(JSON.stringify(res.status)==='200' && JSON.stringify(res.data.status)==='200'){
        dispatch({
            type:GET_WORD,
            payload:res.data
        })
    }
    console.log(time,",",res.data.data.word,",",user_id,",",parseInt(res.data.data.user_id))

       // setApiHit(state.getwordapihit)
        //user_id!==parseInt(res.data.data.user_id)
        //&& user_id!==parseInt(res.data.data.user_id) && concede!=="1" 

    if(JSON.stringify(res.status)==='200' && JSON.stringify(res.data.status)==='200' &&  res.data.data.word)
    {    
        if(time < 0)
        {
            console.log("Clear get word API 1")
            console.log("My Interval instance end=",myinterval)
            clearInterval(myinterval)
        }
        else
        {
        if(user_id!==parseInt(res.data.data.user_id) && gamestatus==="0" && challenge==="0" && concede==="1")
        {
               // setwinnerLoser('loser')
               //console.log("YOU CAN PLAY NEXT MOVE")
               //clearInterval(myinterval)
        }
        else if(user_id!==parseInt(res.data.data.user_id) && gamestatus==="5" && challenge==="0" && concede==="1"){

            //console.log("YOUR OPPONENT PLAYED IT FIRST , NOW ITS YOUR TURN...")
            //clearInterval(myinterval)
        }
        else if(user_id===parseInt(res.data.data.user_id) && gamestatus==="5" && challenge==="0" && concede==="1"){

            //console.log("My Interval instance end=",myinterval)
            //clearInterval(myinterval)
        }
        else if(user_id===parseInt(res.data.data.user_id) && gamestatus==="5"  && challenge==="0" && concede==="0"){
           // console.log("What to do next")
           // console.log("Clear get word API 2")
            ///clearInterval(myinterval)
        }
        else if(user_id!==parseInt(res.data.data.user_id)  && (gamestatus!=="0" && challenge!=="0" && concede!=="0"))
        {
            //console.log("STOP CALLING GET WORD and Clear get word API 3",user_id,",",parseInt(res.data.data.user_id),",",state.getwordapihit)
            if(res.data.data.word.length===36){
                alert("word length==36")
            }
        }
       else if(user_id!==parseInt(res.data.data.user_id)  && (challenge==="0" && concede==="0" && (gamestatus==="3" || gamestatus==="4")))
        {
            // getWordDefinition(res.data.data.word)
            console.log("*********SET LOSER*************")
            setwinnerLoser('loser')
            //console.log("Clear get word API 4")
            ///clearInterval(myinterval)
        }
        else if(user_id!==parseInt(res.data.data.user_id)  && challenge==="0" && concede==="0" && gamestatus==="101"){

            console.log("*********SET WINNER*************")
            setwinnerLoser('winner')
        }
        else if(gamestatus==="5")
        {
            //console.log("Setting Winner from playonline getWord API")
            //setwinnerLoser('winner')
        }
        else if(res.data.data.word && user_id!==parseInt(res.data.data.user_id)  && (gamestatus==="1" && challenge==="0" && concede==="0"))
        {
            console.log("Changing turn and Clear get word API 5")
                if(!isActive){
                    setIsActive(true)
                }
            //alert("changing turn and setShowkeyboard true")
               setTurn(true) 
               setShowKeyboard(true)
            setInputText(res.data.data.word)
            //console.log("Clear get word API 5")
            console.log("My Interval instance end=",myinterval)
            clearInterval(myinterval)
         }
        else if(res.data.data.word==="") {
           // console.log("Setting input text  2=",res.data.data.word)
            console.log("SET INPUT TEXT 4 and Clear get word API 6")
            setInputText('')
            //console.log("Clear get word API 6")
            ///clearInterval(myinterval)
        }
       else if(res.data.data.word && user_id!==parseInt(res.data.data.user_id) && concede==="0" && gamestatus==="0" && challenge==="0")
        {
            //console.log("*************SPECIAL CASE 2***********")
            console.log("SET INPUT TEXT 5")
            //console.log("My Interval instance end=",myinterval)
            setInputText('')
            //clearInterval(myinterval)
        }
        else{
            console.log("SET INPUT TEXT 3")
            setInputText(res.data.data.word)
            //clearInterval(myinterval)
        }
       

        if(JSON.stringify(res.status)==='200' && JSON.stringify(res.data.status)==='400')
        {
                dispatch({
                    type:GET_WORD_FAIL,
                    payload:null
                })
        }
    }
    }
    else{
        console.log("No conditon match=",res.status,",",res.data.status,",",res.data.data.word)
    }
    } catch (error) {
        console.log("Error from Get Word=",error)
        
    }
    time=time-1
    //setApiHit(time)
    
},1000)

    setIntervalId(myinterval)

}


const setIntervalId=(intervalid)=>{

    dispatch({
     type:SET_INTERVAL_ID,
     payload:intervalid   
    })
}

////////////////////////////////////////////////// CHECK WORD

const getWordDefinition=async(word)=>{
   
          try {
            const config={
            headers:{
              'APPKEY': 'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
            }
          }
          const body=
          {
              word:word
          }
            
          const res =await axios.post(process.env.REACT_APP_BASEURL+'/api/get/words/meaning',body,config)
         
          console.log("word meaning=====>",res.data)
          if(JSON.stringify(res.data.status)==='400'){
            console.log("setting demo word")
            //setResultWord({word:inputText ,definition:res.data.error_message})
            dispatch({
              type:SET_WORD_DEFINITION,
              payload:{word:inputText,definition:''}
              /* payload:{word:inputText ,definition:res.data.error_message} */
            })
            console.log("Setting Loser from playonline getWordDefinition API")
            setwinnerLoser('loser')
          }
          //console.log("word meaning=====>",res.data.data.definition) 
          if(JSON.stringify(res.data.status)==='200'){
              console.log("definition found=",res.data.data)
            dispatch({
              type:SET_WORD_DEFINITION,
              payload:res.data.data
            })
            console.log("Setting Winner from playonline getWordDefinition API")
            setwinnerLoser('winner')
             //get current round no. from localstroge and increament by 1
            state.info.push({
                round:JSON.parse(localStorage.getItem('info'))[JSON.parse(localStorage.getItem('info')).length-1].round+1
            })
            //store increamented round in localstorage
            localStorage.setItem('info',JSON.stringify(state.info))
          }
          
          } catch (error) {
            //setResultWord({word:inputText,definition:''})
            dispatch({
              type:SET_WORD_DEFINITION,
              payload:{word:inputText,definition:''}
            })
          }
      
        }
       

        const setwinnerLoser=(winner_loser)=>{
            dispatch({
                type:SET_RESULT,
                payload:winner_loser
            })
        }


 ////////////////////////////////// TIMER


const setTimer=(functionCall,time)=>{

    console.log("set Timer=",functionCall,",",time)
    functionCall()

}

////////////////////////////////// TURN CHANGE

const setTurn=(flag)=>{
    dispatch({
        type:TURN_CHANGE,
        payload:flag
    })
}

const resetState=(true_false)=>{
    dispatch({
        type:RESET_STATE,
        payload:true_false
    })
}
 ////////////////// SET LOADING

const setLoading=()=>{
    dispatch({
        type:SET_LOADING
    })
}

const gameType=(type)=>{
    dispatch({
        type:SET_GAME_TYPE,
        payload:type
    })
}


const setApiHit=(count)=>{
    dispatch({
        type:API_HIT,
        payload:count
    })
}


    return(
        <PlayOnlineContext.Provider 
        value={{
            onlineUser:state.onlineUser,
            loading:state.loading,
            save_word:state.save_word,
            get_word:state.get_word,
            turn_change:state.turn_change,
            word_definition:state.word_definition,
            winner_loser:state.winner_loser,
            round_online:state.round_online,
            game_type:state.game_type,
            match_round:state.match_round,
            round_complete:state.round_complete,
            popdisabled:state.popdisabled,
            getwordapihit:state.getwordapihit,
            round_result:state.round_result,
            showKeyboard:state.showKeyboard,
            stop_old_instance:state.stopOldInstance,
            reset_state:state.reset_state,
            interval_id:state.interval_id,
            current_status:state.current_status,
            setLoading,
            searchUserOnline,
            saveWord,
            getWord,
            setTimer,
            setTurn,
            getWordDefinition,
            resetState,
            exitUser,
            gameType,
            matchRound,
            setRoundComplete,
            setwinnerLoser,
            setPopup,
            setApiHit,
            setRoundResult,
            setShowKeyboard,
            stopOldInstance,
            setIntervalId,
            setCurrentStatus
        }}>
            {children }

        </PlayOnlineContext.Provider>
    )
}

export default PlayOnlineState