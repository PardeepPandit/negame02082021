import React, { useState, useEffect, Fragment,useContext } from 'react'
import Vscomputer from '../Vscomputer'
import axios from 'axios'
import { useTimerConsumer, useTimerConsumerUpdate } from './TimerContext'
import { useMainConsumer, useMainConsumerUpdate } from './MainContext'
import {useCharacterConsumer,useCharacterConsumerUpdate} from './CharacterContext'
import AuthContext from './context/auth/authContext'
import CommonContext from './context/common/commonContext'

import HumanContext from './context/human/humanContext'


var exact_word_found,notfound;
export const Main =() => {

  //const {level}=match.params

const commonContext=useContext(CommonContext)
const {inputText,setInputText,setIsActive,setSeconds }=commonContext

  const authContext=useContext(AuthContext)
  const {login_data}=authContext
  const {level}=login_data
  console.log("Level in main=",level)
  const humanContext=useContext(HumanContext)
  const {getWordList,wordList,loading,wordDefinition,resultWord,setResultWord}=humanContext

  const {clearTime,setResult,setLoser,resetTime} = useTimerConsumerUpdate();
  const {once,round}=useCharacterConsumer();
  const {setOnce,findChar}=useCharacterConsumerUpdate()
  const { result ,loser} = useTimerConsumer();
  const {play,finalResult}=useMainConsumer();
  const {setWordList,setTimeFlag,setFinalResult,setRoundList1, setRoundList2, setRoundList3,setRoundList4, setRoundList5,setShowKeyboard}=useMainConsumerUpdate()

  useEffect(() => {
    window.addEventListener('beforeunload', alertUser)
    return () => {
      window.removeEventListener('beforeunload', alertUser)
 
    }
  }, [])

  
  const alertUser = e => {
    e.preventDefault()
    e.returnValue = ''
  }
 

useEffect(()=>{

  //console.log("RESULT WORD SET=",resultWord)

},[resultWord])


//Fetching Data API
useEffect(async() => {
  if(inputText.length===2 && play){ 
    console.log("before calling get word",inputText,",",inputText.length)

    //{loser.out && 
    //setLoading(true)
      getWordList(inputText)
     /*  if(wordList.length===0){
        console.log("WROD LIST LENGTH iz ZEROOOOO=",wordList)
        setResult('lose')
          console.log("set LOser to True*")
          setLoser(pre=>({...loser,out:true}));
          setIsActive(false)
          clearTimeout();
      } */
      /* const searchWord={
        "word":`${inputText}`,
        "limit":"0"
      }
      const config={
        headers: {
          'X-RapidAPI-Key' : '0689b1157bmsh9ca7f4b5701a660p1080c2jsn9e2fa49e7bcf'
        }
      }
      const res =await axios.get(`https://wordsapiv1.p.rapidapi.com/words/?letterPattern=^${inputText.toLowerCase()}[a-zA-Z]*$`, config)
        
       
      console.log("NEW API WORD+=",res.data.results.total)
      if(res.data.status===400){
            //console.log("Status:",res.data.status,"Error_message:",res.data.error_message)
          setResult('lose')
          console.log("set LOser to True*")
          setLoser(pre=>({...loser,out:true}));
          setIsActive(false)
          clearTimeout();
      }else if(res.data.results.total>0){
        console.log("WORD_LIST=",res.data.results.data)
          setWordList(res.data.results.data)
          //turnControler(res.data.data,res.data.data.length);
      }*/
      //setLoading(false)
       
  //}
  console.log("FIRST TIME CALLIGN TURN CONTROLER")
   turnControler(wordList,wordList.length);

    
}
  
}, [inputText,play])

useEffect(()=>{
  console.log("HELOOOOOOO=",wordList.length)
  //if two char word found in dictinary api
   if(inputText.length>=2 && wordList.length===0)
  {
      setLoser({name:'You',out:true})
      //setResultWord({word:inputText,definition:''})1
      setFinalResult(pre=>({...pre,lose:finalResult.lose+1}))
      
  } 
  //console.log("Final Result LOSE****=",finalResult.lose)
},[wordList])

useEffect(()=>{
//console.log("play and loading=",play,",",!loading,",",once,",",wordList.length)
  if(play && !loading)
  {
    //console.log("calling turn controler from useEffect")
      if(inputText.length>3)
      {
        console.log("CALING TURN CONTROLER@@@@@@@@@@@@")
        turnControler();
      }else{
        if(once && wordList.length>0){
          console.log("inside turn controler calling computer turn")
           if(inputText.length===2){
            let tmp=towCharWordCase()
             if(!tmp){
               //console.log("No word found with:",inputText,",",tmp)
               console.log("set loser ture 1",!tmp,",",inputText) 
               console.log("LOSER AND WINNER 6")
               setLoser({name:'You',out:true})
                setFinalResult(pre=>({...pre,lose:finalResult.lose+1}))
                console.log("***************SET IS ACTIVE 6***************")
                setIsActive(false)
            }
            else 
            {
              console.log("calling computer turn 1")
              computerTurn()
              //setLoser({name:"You",out:false})
            }
          }
          else{
            console.log("calling computer turn 1")
            computerTurn()
            //setLoser({name:"You",out:false})
          } 
      } 
     
      }
      //setLoser({name:'You',out:false})
      //console.log("Exit useEffect after calling turn contlr")
  }
  else{
    //console.log("useEffect main line 73")
  }
 
},[wordList,inputText,play])


  
useEffect(() => {

  if(loser.out===true && play){
    callMyStopFun();
  }
},[loser,play])


const callMyStopFun=()=>{
  clearTime()
}


///////////////////////////////////////////

const towCharWordCase=()=>{
   let twocharword=wordList.find((item)=>{
    //console.log("search=",inputText," in ",item.word,",",item.word.substring(0,inputText.length))
    return (inputText.toUpperCase()===item.substring(0,inputText.length).toUpperCase())
  })

  return twocharword 
}


/////////////////////////////////

  const computerTurn=()=>{
   console.log("inside computer turn")

    once && play && setTimeout(() => {
      
      //console.log("next computer char=",char,",",typeof char,",inputText",inputText)
      console.log("LOSER AND WINNER 7")
      setLoser({name:'Computer',out:false});
    
      let char=findChar()
      console.log("find char returns==",char)
      if(char){
        char=char.toUpperCase()
      }
        setInputText(inputText+char);
        console.log("KEYBOARD ON 2")
        setShowKeyboard(true)
        console.log("Time Reset@@@@@@@@@@@@@  6")
        setSeconds()
        setTimeFlag(false)
        //console.log("computer 2 added guesschar",char,",",inputText)
    
      //setOnce(false)
    });
      
     
    
  }
  
/////////////////////////////////////////////


  const turnControler=()=>{
    
    console.log("inside turn controler  1 check word exist",inputText)
    //setResultWord(inputText)
    if((loser.name==='You' || loser.name==='Computer') && wordList.length>0){
      
      exact_word_found=wordList.find((item)=>{
        //console.log("search=",inputText," in ",item.word,",",item.word.substring(0,inputText.length))
        return (item.toUpperCase()===inputText.toUpperCase())
      })

      if(!exact_word_found){
      notfound=wordList.find((item)=>{
              //console.log("notfound=",inputText.toUpperCase(),"===",item.word.substring(0,inputText.length).toUpperCase(),",",inputText.toUpperCase()===item.word.substring(0,inputText.length).toUpperCase())
              return (((inputText.toUpperCase()===item.substring(0,inputText.length).toUpperCase())))
          
            })
      }
      
   
       if(exact_word_found || !notfound){
         console.log("Exact word found=",exact_word_found)
         console.log("Word not found=",!notfound)
         console.log("LOSER AND WINNER 8")
        setLoser(pre=>({...loser,out:true}));

        if(exact_word_found)
        {
          console.log("find definition of exact word=",exact_word_found)
          wordDefinition()
        }
        else{
          console.log("not found=",!notfound)    
          setResultWord('No word can be made') 
        }

        if(loser.name==='You'){
          //console.log("COUNTER INCREMENTED",finalResult.lose)
          setFinalResult(pre=>({...pre,lose:finalResult.lose+1}))
         }
       if(loser.name==='Computer'){
          setFinalResult(pre=>({...pre,win:finalResult.win+1}))
        }
        
        //console.log("now user=",loser.name,",",loser.out)
        //setFinalResult(pre=>pre+1)
        console.log("***************SET IS ACTIVE 7***************")
        setIsActive(false)
        setOnce(false)
        clearTimeout()
        return 
      }
      else{
        setOnce(true)
        //console.log("inside turn controler word not exist  val= ",exact_word_found,",",notfound)
      } 
    }
    
     if(once && wordList.length>0){
        console.log("inside turn controler calling computer turn")
      computerTurn()
      //setLoser({name:"You",out:false})
    } 
  }

  
  return (
    <Fragment>
      {/* {JSON.stringify(wordList)} */}
    <Vscomputer level={level}/>
    </Fragment>

  )
}
export default Main