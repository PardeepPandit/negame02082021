import React,{useEffect,useContext} from "react";
import { useHistory } from 'react-router-dom'
import CommonContext from './MyComponent/context/common/commonContext'
import HumanContext from "./MyComponent/context/human/humanContext";

const WarningPopup = (props) => {

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
        <h3>PLEASE USE ALL THE LETTERS ALREADY PLACED</h3>
        <button onClick={()=>{
            props.setWarning(false)
            return props.handleClose
        }
      }
          >Ok</button>
      </div>
    </div>
  );
};
 
export default WarningPopup;