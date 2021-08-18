import React,{Fragment,useContext,useEffect,useState} from 'react'
import PlayOnlineContext from '../../playonline/context/playOnlineContext'
import HumanContext from '../context/human/humanContext'
import CommonContext from '../context/common/commonContext'
//import HumanContext from '../../MyComponent/context/human/humanContext'
export const MediumLevelUI = () => {

/* const playOnlineContext=useContext(PlayOnlineContext)
const {setInputText,inputText,get_word,turn_change}=playOnlineContext */

//const humanContext=useContext(HumanContext)
//const {setInputText,inputText}=humanContext

const commonContext=useContext(CommonContext)
const {inputText}=commonContext


const humanContext=useContext(HumanContext)
const {setInputText,setHumanPosition,human_position}=humanContext


    return (
        <Fragment>
              <div style={{fontSize:'25px'}} >
            <button style={human_position===1 ? {backgroundColor:"lightgreen"} :{backgroundColor:"lightgray"}} onClick={()=>setHumanPosition(1)} >{"<<<<<<<<"}</button>
            <button style={human_position===1 ? {backgroundColor:"lightgray"} :{backgroundColor:"lightgreen"}}  onClick={()=>setHumanPosition(0)} >{">>>>>>>>"}</button>
            </div>
        </Fragment>
    )
}


export default MediumLevelUI