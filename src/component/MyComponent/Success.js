import React, { Fragment,useContext,useEffect } from 'react';
import tick from './tick.gif';
import MasterContext from './context/master/masterContext'


const Success = () =>{
const masterContext=useContext(MasterContext)
    const {showPopup,togglePopup}=masterContext
   
      console.log("Success...")
 
      useEffect(()=>{
        setTimeout(()=>{
            togglePopup()
        },3000)
          
      },[])
     
    
return (
<Fragment>
<div className="tick-icon"><img className="tick" src={tick} alt="loading..." style={{width:'200px' ,margin:'auto' ,display:'block'}} /></div>
</Fragment>
)
}
export default Success