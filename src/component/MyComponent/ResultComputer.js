import React, { Fragment,useState,useEffect,useContext} from 'react'
import {Redirect,useHistory} from 'react-router-dom'
import {Link} from 'react-router-dom'
import { useTimerConsumer,useTimerConsumerUpdate } from './TimerContext'
import {useCharacterConsumer,useCharacterConsumerUpdate} from './CharacterContext'
import {useMainConsumer,useMainConsumerUpdate} from './MainContext'
import Result from './Result'
import ResultOnline from '../playonline/play_online_components/ResultOnline'
import FinalResult from './FinalResult'
import HumanContext from './context/human/humanContext'
import PlayOnlineContext from '../playonline/context/playOnlineContext'
import CommonContext from './context/common/commonContext'

export const ResultComputer= () => {

  const commonContext=useContext(CommonContext)
  const {setIsActive }=commonContext

  const humanContext=useContext(HumanContext)
  const {getWordList,wordList,resultWord}=humanContext
  const {setLoser,resetTime}=useTimerConsumerUpdate();
  const {finalResult,roundList1,roundList2,roundList3,roundList4,roundList5,redirectTo,finish}=useMainConsumer();
  const {round}=useCharacterConsumer();
  //const [finish,setFinish]=useState(false)


//console.log("Time rendring",loser.name,",",loser.out)

  useEffect(() => {
    if(round>4){
        //setFinish(true)
        console.log("***************SET IS ACTIVE 9***************")
        setIsActive(false)
    }   
  }, [round])


  useEffect(()=>{
    //console.log("REDIRECT ****")
          if(redirectTo){
           //console.log("Redirect to home.......")
              return <Redirect to='/home' />
               //window.location.reload();
          }
  },[redirectTo])

  //console.log("final Result ********=====>",finalResult)
  return (
     <Fragment>
                {finalResult.win===3 && finish ? 
                <FinalResult title={"You Win*"}/> : 
                      <Fragment>
                        {finalResult.lose===3 && finish ? <FinalResult title={"You Lost*"}/> :<Fragment><Result/></Fragment>}
                      </Fragment>
                }
                
            
    </Fragment> 
  )
}
export default ResultComputer
