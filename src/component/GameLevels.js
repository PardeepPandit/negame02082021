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

/*  useEffect(() => {
    window.addEventListener('beforeunload', onRefresh)
    return () => {
      window.removeEventListener('beforeunload', onRefresh)
 
    }
  }, [])
  const onRefresh = e => {
    e.preventDefault()
    console.log("Refreshing game page")
    window.location.reload(loadGameLevels())
  }  */

 /*  if (window.performance)
  {
    console.log("window.performance=",window.performance)
    if (performance.navigation.type === 1)
    {
      alert( "This page is reloaded" );
    } 
  } */
  
  useEffect(()=>{
    if (performance.navigation.type === 1)
    {
        loadGameLevels()
        console.log("Back to dashboard from gamelevels")
        //resetCommonState()
       // history.push('/dashboard')
    } 

  },[window.performance])
  
console.log("historuy=",history)

console.log("props=",props)

   useEffect(()=>{
       if(start_match_computer)
       {
             console.log("***************SET IS ACTIVE 2***************")
             setIsActive(true) 
            // setPlayBackPopup(false)
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
            <Link  to='/setting'><img src="assets/img/settings.png" alt="" width="52"/></Link>
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
        </div>
        </div>
         </div>
        </div>

        {playbackpopup && <PlayBackPopup  handleClose={setPlayBackPopup} levelSelected={levelSelected} />}
           
  
</Fragment>
      );


}

export default GameLevels;