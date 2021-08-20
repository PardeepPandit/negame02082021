import React,{Fragment,useContext,useEffect,useState,useRef} from 'react'
import PlayOnlineContext from '../../playonline/context/playOnlineContext'
import HumanContext from '../context/human/humanContext'
import CommonContext from '../context/common/commonContext'


export const ExpertAndGeniusLevelUI = () => {
const commonContext=useContext(CommonContext)
const {inputText,setInputText,backup_input_text}=commonContext

const humanContext=useContext(HumanContext)
const {setHumanPosition,human_position,single_shift_counter,temp_word,setSingleShiftCounter}=humanContext

const [activeButton,setActiveButton]=useState(1)

const active={backgroundColor:"green", color:'white',fontSize:'40px'}
const nonactive={backgroundColor:"white"}

const shiftCounter=(arg)=>{
    
    arg==='increment' && setSingleShiftCounter('increment')
    arg==='decrement' && setSingleShiftCounter('decrement')
    temp_word && setInputText(temp_word)

}


   useEffect(()=>{
       console.log("genius 2---")
       if(inputText!==null){

        if(single_shift_counter>=1)
        {
            console.log("check use Effect in ExpertUI",single_shift_counter,",*",inputText.length,",*",inputText.slice(0,inputText.length-single_shift_counter))
             setInputText(backup_input_text && backup_input_text.slice(0,backup_input_text.length-single_shift_counter)+'_'+backup_input_text.slice(backup_input_text.length-single_shift_counter))
        }
        else if(single_shift_counter===0 || single_shift_counter===-1)
         {
             console.log("slicebackup=",backup_input_text)
             setInputText(backup_input_text.slice(0)+'_')
         }
    }

   },[single_shift_counter]) 

return (
    <Fragment>
    <div style={{textAlign:'center' , color:'blue', backgroundColor:'yellow'}}>
            <h1 style={activeButton===4 ? active : nonactive} onClick={()=>{
                                                                            setActiveButton(4)
                                                                            setHumanPosition(1)
                                                                            }} >
            {"Left End"}</h1> 
            <h1 style={activeButton===3 ? active : nonactive} onClick={()=>{
                                                                            setActiveButton(3)
                                                                            shiftCounter('increment')
                                                                            }} >
            {"Left Shift"}</h1>
            <h1 style={activeButton===2 ? active : nonactive} onClick={()=>{
                                                                            setActiveButton(2)
                                                                            shiftCounter('decrement')
                                                                            }} >
            {"Right Shift"}</h1> 
            <h1 style={activeButton===1 ? active : nonactive} onClick={()=>{
                                                                            setActiveButton(1)
                                                                            setHumanPosition(0)
                                                                            }} >
            {"Right End"}</h1> 
    </div>
    </Fragment>
    )
}


export default ExpertAndGeniusLevelUI