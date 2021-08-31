import { Fragment,useContext } from "react"

import CommonContext from "../common/commonContext"
const ChallengePopUpHC=({setChallenge})=>{
 
    const commonContext=useContext(CommonContext)
    const {setIsActive,setSeconds}=commonContext
    return(
        <Fragment>
            <div className="chllenge-box">
                <img src="assets/img/smile.png" width="120" />
            <h1>YOU HAVE BEEN CHALLENGED BY THE COMPUTER, NOW COMPLETE A WORD</h1>
            <button onClick={()=>{
                setIsActive(true)
                setSeconds(120)
                setChallenge(true)}}>OK</button></div>
        </Fragment>
    )
}

export default ChallengePopUpHC