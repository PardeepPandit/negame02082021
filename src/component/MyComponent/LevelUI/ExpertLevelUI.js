import React,{Fragment,useContext,useEffect,useState,useRef} from 'react'
import PlayOnlineContext from '../../playonline/context/playOnlineContext'
import HumanContext from '../context/human/humanContext'
import CommonContext from '../context/common/commonContext'
let count=0
export const ExpertLevelUI = ({inputRef}) => {
const [text,setText]=useState("demoText")
const commonContext=useContext(CommonContext)
const {inputText,setInputText}=commonContext

const humanContext=useContext(HumanContext)
const {setPosition,human_position}=humanContext

const shiftLeft=()=>{
    count++
       console.log("text=",inputText && inputText.slice(0,inputText.length-count)+' '+text.slice(inputText.length-count))
       setText(inputText)
   }
   const shiftRight=()=>{
    count--
       console.log("text=",inputText && inputText.slice(0,inputText.length-count)+' '+text.slice(inputText.length-count))
       setText(inputText)
   }
   useEffect(()=>{
    setInputText(inputText && inputText.slice(0,inputText.length-count)+' '+text.slice(inputText.length-count))
       
   },[count]) 


/* const shiftLeft=()=>{
 count++
    console.log("text=",text.slice(0,text.length-count)+' '+text.slice(text.length-count))
    setText('demoText')
}
const shiftRight=()=>{
 count--
    console.log("text=",text.slice(0,text.length-count)+' '+text.slice(text.length-count))
    setText('demoText')
}
useEffect(()=>{
    setText(text.slice(0,text.length-count)+' '+text.slice(text.length-count))
    
},[count]) */


return (
    <Fragment>
            <div >
                <input type="text" value={text}/>
         <h1 style={human_position===1 ? {backgroundColor:"white"} :{backgroundColor:"green", Color:"red"}} onClick={()=>setPosition(1)} >{"<======="}</h1>
         <h1 style={human_position===1 ? {backgroundColor:"green", Color:"red"} :{backgroundColor:"white"}} onClick={()=>shiftLeft()} >{"<-------"}</h1>
        <h1 style={human_position===1 ? {backgroundColor:"white"} :{backgroundColor:"green"}} onClick={()=>shiftRight()} >{"------->"}</h1> 
        <h1 style={human_position===1 ? {backgroundColor:"green"} :{backgroundColor:"white"}} onClick={()=>setPosition(1)} >{"=======>"}</h1> 
        </div>
    </Fragment>
    )
}


export default ExpertLevelUI