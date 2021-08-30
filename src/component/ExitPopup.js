import React,{useEffect,useContext} from "react";
import { useHistory } from 'react-router-dom'
import CommonContext from './MyComponent/context/common/commonContext'
import HumanContext from "./MyComponent/context/human/humanContext";
const ExitPopup = (props) => {

const commonContext =useContext(CommonContext)
const {resetCommonState}=commonContext

const humanContext=useContext(HumanContext)
const {resetHumanState}= humanContext

const history=useHistory()
  useEffect(()=>{

    window.addEventListener("beforeunload", (ev) => 
  {  
      ev.preventDefault();
      console.log("WINDOE CLOSED=",ev.returnValue)
      window.localStorage.clear();
      return ev.returnValue = 'Are you sure you want to close?';
  }); 
  
  },[]) 

  return (
    <div className="popup-box">
      <div className="box">
        <h3>Do you want to exit?</h3>
        <button onClick={()=>{
            resetCommonState()
            resetHumanState()
            history.push('/dashboard');
            return props.handleClose
        }
      }
          >Yes</button>
        <button onClick={props.handleClose}>No</button>
      </div>
    </div>
  );
};
 
export default ExitPopup;