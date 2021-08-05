import React,{Fragment,useEffect,useContext} from 'react'
import spinner from './spinner2.gif'

import PlayOnlineContext from '../playonline/context/playOnlineContext'
const Spinner=()=>{   
        
        console.log('********SPINNER******')

        const playOnlineContext = useContext(PlayOnlineContext)
        const {setRoundComplete,final_result_data,round_complete}=playOnlineContext
     
return <Fragment>
        <img src={spinner} alt="Loading..." style={{width:'100px',margin:'auto',marginTop:'400px',display:'block',height:'100%'}}/> 
</Fragment>
}

export default Spinner