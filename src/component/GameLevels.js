import React, {Fragment,useContext,useEffect,useState} from 'react'
import { Link,Redirect, withRouter,useHistory } from 'react-router-dom';
import PlayBackPopup from './PlayBackPopup';
import AuthContext from './MyComponent/context/auth/authContext'
import CommonContext from './MyComponent/context/common/commonContext'
import HumanContext from './MyComponent/context/human/humanContext';
import HumanVsComputer from './HumanVsComputer';
const GameLevels = (props ) => {

    const commonContext =useContext(CommonContext)
    const {setIsActive,load_game_level,setGameStatus,loadGameLevels,human_vs_computer,resetCommonState,setGameLevel,human_vs_online,setSeconds}=commonContext
    const humanContext =useContext(HumanContext)
    const {start_match_computer,checkHintCount,startMatchComputer}=humanContext



    //const {onClick}=props.location

    const [playbackpopup,setPlayBackPopup]=useState(false)
    const [levelSelected,setLevelSelected]=useState({l_no:null,l_name:null})

const history=useHistory()
console.log("historuy=",history)

console.log("props=",props)

   useEffect(()=>{
       if(start_match_computer)
       {
             console.log("***************SET IS ACTIVE 2***************")
             setIsActive(true)  
             //setStartMatch(false)
       }      
 },[start_match_computer]) 


/*  const onClick=(levelno,l_type)=>{
    console.log("ONClick function called=",human_vs_computer)
    setGameLevel(l_type)
    checkHintCount(user.data.id)
    //setStartMatch(true) 
    
    if(human_vs_online)
    {
          //  playOnline()
    }
    else if(human_vs_computer)
    {
            console.log("Test case 1");
            (l_type==='Easy' || l_type==='Medium' || l_type==='Expert') ? setSeconds(60) : setSeconds(120)
            startMatchComputer(login_data.id,levelno)
    }            
    console.log("Test case 2")
} */

const togglePopupPlayBack=(l_no,l_name)=>{

    setGameLevel(l_name)
    setLevelSelected((pre)=>({...pre, l_no:l_no,l_name:l_name}))
    //onClick(l_no,l_name)
    setPlayBackPopup(pre=>!pre)
}

const goBack=()=>{
    resetCommonState()
    history.push('/dashboard')
}


if(start_match_computer)
{
    console.log("REDIRECTING TO MAIN=",start_match_computer)
     return <Redirect to='/human_vs_computer' />
} 
  return (
    <Fragment>
   <div class="section_card_ga section_card">
    <div className="container">
        <div className="row">
        <div className="col-md-8 offset-md-2">

        <div className="align-items choice-top">
            
            <img src="assets/img/right-arrow.png" alt="" width="70" onClick={()=>goBack()} />
            <img src="assets/img/tile-logo.png" alt="" width="150" />
            <img src="assets/img/settings.png" alt="" width="52" />
        </div>

            <img src="assets/img/challenge-yourself.jpeg" className="img-fluid" />


        {load_game_level && load_game_level.data.map((item,index)=>(
                <Fragment key={item.id}>
                    <div class="choice-box medium-box" style={{backgroundColor:item.bgcolor}}>
                    <div class="choice-left">
                    <h2>{item.level}</h2>
                    <h3>{item.des}</h3>
                    <h4>Click here for the rules  <Link to="#">Young</Link> <Link to="#">Adults</Link></h4>
                    </div>
                    <Link to='#' onClick={()=>togglePopupPlayBack(item.id,item.level)}><img src="assets/img/play2.png" alt="" width="200" /></Link>
                     
            </div>
                </Fragment>
        
        ))}



        {/* <div class="choice-box">
            <div class="choice-left">
                <h2>Easy</h2>
                <h3>Play letters only behind</h3>
                <h4>Click here for the rules <Link to="#">Young</Link> <Link to="#">Adults</Link>
                </h4>
            </div>
            {(levelNumber==="1" || levelNumber==='1,2' || levelNumber==='1,2,3' || levelNumber==='1,2,3,4') && 
            <Link to='#' onClick={()=>onClick("1","easy")}><img src="assets/img/play2.png" alt="" width="200" /></Link>}
        </div>

        <div class="choice-box medium-box">
            <div class="choice-left">
                <h2>Medium</h2>
                <h3>Play letters in front of or behind</h3>
                <h4>Click here for the rules <Link to="#">Young</Link> <Link to="#">Adults</Link>
                </h4>
            </div>
            {(levelNumber==='1,2' || levelNumber==='1,2,3' || levelNumber==='1,2,3,4')  &&
        <Link to='#' onClick={()=>onClick("2","medium")}><img src="assets/img/play2.png" alt="" width="200" /></Link>}
        </div>

        <div class="choice-box expert-box">
            <div class="choice-left">
                <h2>EXPERT</h2>
                <h3>Play letters anywhere</h3>
                <h4>Click here for the rules  <Link to="#">Young</Link> <Link to="#">Adults</Link></h4>
            </div>
            {(levelNumber==='1,2,3' || levelNumber==='1,2,3,4')  && 
    <Link to='#' onClick={()=>onClick("3",'Expert')}><img src="assets/img/play2.png" alt="" width="200" /></Link>}
        </div>

        <div class="choice-box genius-box">
            <div class="choice-left">
                <h2>GENIUS</h2>
                <h3>Anagram Level</h3>
                <h3>Play letters anywhere an re-arrange them</h3>
                <h4>Click here for the rules<Link to="#">Young</Link> <Link to="#">Adults</Link>
                </h4>
            </div>
            {(levelNumber==='1,2,3,4')  &&
    <Link to='#' onClick={()=>onClick("3",'Expert')}><img src="assets/img/play2.png" alt="" width="200" /></Link>}
        </div>*/}
                
        </div>
        </div>
         </div>
        </div>

        {playbackpopup && <PlayBackPopup  handleClose={setPlayBackPopup} levelSelected={levelSelected} />}
           
  
</Fragment>
      );


}

export default GameLevels;