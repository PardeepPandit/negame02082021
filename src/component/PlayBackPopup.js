import React,{ Fragment,useContext,useState,useEffect } from "react";
import { Redirect, useHistory } from 'react-router-dom'
import AuthContext from './MyComponent/context/auth/authContext'
import CommonContext from './MyComponent/context/common/commonContext'
import HumanContext from "./MyComponent/context/human/humanContext";
import PlayOnlineContext from "./playonline/context/playOnlineContext";
import WordLengthUI from './MyComponent/LevelUI/WordLengthUI'



const PlayBackPopup = ({levelSelected,handleClose,playOnline,setStartMatch}) => {

  const commonContext =useContext(CommonContext)
  const {setInputText,game_type,setSeconds,game_level,setIsActive}=commonContext
  
  const humanContext=useContext(HumanContext)
  const {checkHintCount,startMatchComputer,setWordLength}= humanContext

  const authContext=useContext(AuthContext)
  const {user,login_data}=authContext

  const playOnlineContext =useContext(PlayOnlineContext)
  const {searchUserOnline,onlineUser,online_match_finish}=playOnlineContext

  const history=useHistory()
  const {l_no,l_name,}=levelSelected
  const [wordLengthPopUp,setWordLengthPopUp]=useState(false)





  const onClick=(levelno,l_type)=>{
    console.log("ONClick function called=",game_type,",",levelno,",",l_type)
    //setGameLevel(l_type)
    checkHintCount(user && user.data.id)
    //setStartMatch(true) 
    
    if(game_type==='human_vs_online')
    {
          playOnline()
    }
    else if(game_type==='human_vs_computer')
    {
        console.log("Test case 1");
        (l_type==='Easy' || l_type==='Medium' || l_type==='Expert') ? setSeconds(60) : setSeconds(120)
        startMatchComputer(login_data.id,levelno)
    }            
    console.log("Test case 2")
}

   



  console.log("new prtops=",l_no,",",l_name)
  return (
    <Fragment>
    <div className="" style={{position: 'fixed', top: '0', width: '100%', backgroundImage: 'url(assets/img/bluebg.jpg)', height: '100%'}}>
      <div class="align-items choice-top start-logo mb-4">
            <img src="assets/img/tile-logo.png" alt="" class="img-fluid" width="300" />
      </div>

        <div className="buttons-box">
        <div className="left-button" onClick={()=>{
           // resetCommonState()
            //resetHumanState()
                history.push('/gamelevels');
                return handleClose()
                }
                }>
            <img src="assets/img/blue-arrow.png" alt="" width="100" />
            <h4>Back</h4>
        </div>

        <div className="left-button right-button" onClick={()=>{

            if(game_level==='Genius')
            {
              setWordLengthPopUp(true)
            }
            else
            {
              onClick(l_no,l_name)
              return handleClose()
            }
                }}>
        <img src="assets/img/blue-arrow.png" alt="" width="100" />
            <h4>Play</h4>
          </div>
    </div>
</div>
{wordLengthPopUp && <WordLengthUI setWordLengthPopUp={setWordLengthPopUp} onClick={onClick} setWordLength={setWordLength}/>}
   </Fragment>
  );
};
 
export default PlayBackPopup;