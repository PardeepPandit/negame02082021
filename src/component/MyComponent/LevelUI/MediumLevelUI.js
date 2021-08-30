import React,{Fragment,useContext,useEffect,useState} from 'react'
import HumanContext from '../context/human/humanContext'

export const MediumLevelUI = () => {

const humanContext=useContext(HumanContext)
const {setHumanPosition,human_position}=humanContext

    return (
    <Fragment>
    <div className="shift-btns medium-btns" style={{fontSize:'25px'}} >
        <h1 style={human_position===1 ? {backgroundColor:"lightgreen"} :{backgroundColor:"lightgray"}} onClick={()=>setHumanPosition(1)} >{"<<"}</h1>
        <h1 style={human_position===1 ? {backgroundColor:"lightgray"} :{backgroundColor:"lightgreen"}}  onClick={()=>setHumanPosition(0)} >{">>"}</h1>
        </div>
    </Fragment>
    )
}


export default MediumLevelUI