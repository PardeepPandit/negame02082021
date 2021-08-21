import React, { Fragment,useContext,useEffect } from 'react';
import tick from './tick7.gif';
import MasterContext from './context/master/masterContext'


const Success = () =>{
const masterContext=useContext(MasterContext)
    const {showPopup,togglePopup}=masterContext
   
      console.log("Success...")
 
      useEffect(()=>{
        setTimeout(()=>{
            togglePopup()
        },2000)
          
      },[])
     
    
return (
<Fragment>
<div className="tick-icon"><img className="tick" src={tick} alt="loading..." style={{width:'500px' ,margin:'auto' ,display:'block'}} /></div>
</Fragment>
)
}
export default Success