import React,{Fragment,useContext,useEffect,useState} from 'react'
import HumanContext from '../context/human/humanContext'

export const MediumLevelUI = () => {

const humanContext=useContext(HumanContext)
const {setHumanPosition,human_position}=humanContext

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