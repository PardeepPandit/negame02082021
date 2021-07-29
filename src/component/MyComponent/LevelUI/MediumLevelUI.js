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
const {setInputText,setPosition,position}=humanContext



const [active,setActive]=useState(()=>true)

const insertRight=()=>{
    console.log("InputText=",inputText)
    let char=inputText.charAt(inputText.length-1)
    console.log("char=",char)
    setInputText(char+inputText.slice(0,inputText.length-1))
    setActive(pre=>!pre)
}
const insertLeft=()=>{
    console.log("InputText=",inputText)
    let char=inputText.charAt(0)
    console.log("char=",char)
    setInputText(inputText.slice(1)+char)
    setActive(pre=>!pre)
}


useEffect(()=>{
    if(position){
        setActive(pre=>!pre)  
    }
                
},[position])
    return (
        <Fragment>
              <div >
            <button style={active ? {backgroundColor:"white"} :{backgroundColor:"green"}} onClick={()=>setPosition("left")} >{"<<<<<<<"}</button>
            <button style={active ? {backgroundColor:"green"} :{backgroundColor:"white"}}  onClick={()=>setPosition("right")} >{">>>>>>"}</button>
            </div>
        </Fragment>
    )
}


export default MediumLevelUI