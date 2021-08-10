import React,{Fragment,useEffect,useContext} from 'react'
import spinner from './spinner2.gif'

const Spinner=()=>{   
        
        console.log('********SPINNER******')
     
return <Fragment>
        <img src={spinner} alt="Loading..." style={{width:'100px',margin:'auto',marginTop:'400px',display:'block',height:'100%'}}/> 
</Fragment>
}

export default Spinner