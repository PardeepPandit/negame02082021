import {useEffect,useState} from 'react'
import './App.css';
import { Route, Switch } from "react-router-dom";
import React from 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './component/Dashboard';
import Forgot from './component/Forgot';
import Login from './component/Login';
import Setting from './component/Setting';
import Register from './component/Register';
import Update from './component/Update';
import ChoosePlan from './component/ChoosePlan';
import HumanVsComputer from './component/HumanVsComputer';
import Word from './component/Word';
import Post from './component/Post';
import Notifiction from './component/Notifiction';
import ChangePassword from './component/Changepassword';


///My Import//
import { CustomHookProvider } from './component/MyComponent/CustomHook';
import { MainProvider } from './component/MyComponent/MainContext'
import { TimerProvider } from './component/MyComponent/TimerContext'
import { CharacterProvider } from './component/MyComponent/CharacterContext';
import PrivateRoute from './component/MyComponent/routing/PrivateRoute'
import ShowResult from './component/MyComponent/ShowResult'
import ResultComputer from './component/MyComponent/ResultComputer'
import Friend from './component/Friend';
import Alerts from './component/MyComponent/Alerts';
import MasterState from './component/MyComponent/context/master/MasterState'
import AuthState from './component/MyComponent/context/auth/AuthState'
import AlertState from './component/MyComponent/context/alert/AlertState'
import ReactFacebookLogin from './component/MyComponent/Facebook'
import Google from './component/MyComponent/Google'
import Profile from './component/Profile'
import Leaderboard from './component/Leaderboard'
import Country from './component/Country'
import Age from './component/Age'
import Details from './component/Details'
import HistoryWithComputer from './component/HistoryWithComputer'
import HistoryWithFriend from './component/HistoryWithFriend'
import HistoryOnline from './component/HistoryOnline'
import Hint from './component/Hint'
import Level from './component/Level'
import Computer from './component/Computer'
import FileUpload from './component/FileUpload'
import Signup from './component/Signup'
import FriendRequest from './component/FriendRequest'
import SentRequest from './component/SentRequest'
import MyFriend from './component/MyFriend'
import LeaderState from './component/MyComponent/context/leaderboard/LeaderState';

import About from './component/About'
import YouWin from './component/YouWin'
import YouLose from './component/YouLose'
import Payment from './component/Payment'
import HumanState from './component/MyComponent/context/human/HumanState'
import PayPal from './component/MyComponent/PayPal'
import PlayOnline from './component/playonline/play_online_components/PlayOnline'
import PlayOnlineState from './component/playonline/context/PlayOnlineState';
import Challenge from './component/playonline/play_online_components/Challenge'
import firebase from './firebase'
import CommonState from './component/MyComponent/context/common/CommonState';
import PageNotFound from './component/MyComponent/PageNotFound'
import GameLevels from './component/GameLevels';
import PlayBackPopup from './component/PlayBackPopup'
import EasyGameLevel from './component/EasyGameLevel';
import axios from 'axios';

function App(props) {
  var counter = 1;
const [token,setToken]=useState()

 /*  const [finishStatus, setfinishStatus] = useState(false);

 console.log(window.innerHeight); 
 const onBackButtonEvent = (e) => {
    e.preventDefault();
    if (!finishStatus) {
        if (window.confirm("Do you want to go back ?")) {
            setfinishStatus(true)
            // your logic
           
            localStorage.removeItem('start_match_computer')
            window.location.href='/dashboard'
        } else {
          console.log("location pathname=",window.location.pathname)
            window.history.pushState(null, null, window.location.pathname);
            setfinishStatus(false)
        }
    }}

  useEffect(() => {
    //window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', onBackButtonEvent);
    return () => {
      window.removeEventListener('popstate', onBackButtonEvent);  
    };
  },[]);    */

 useEffect(()=>{
  console.log("Firebase")
  const messaging=firebase.messaging()
  console.log("MEssage=",messaging)
  messaging.requestPermission().then((msg)=>{
    console.log("New check firebse==",msg)
      return messaging.getToken()
  }).then((token)=>{
    console.log("Token=",token)
    setToken(token)
  }).catch((err)=>console.log("Error=",err))
})
 
/*  useEffect(()=>{

  window.addEventListener("beforeunload", (ev) => 
{  
    ev.preventDefault();
    console.log("WINDOE CLOSED=",ev.returnValue)
    localStorage.setItem("Window Closed",JSON.stringify(ev.returnValue))
    window.localStorage.clear();
     if(human_vs_computer)
    {
      console.log("User Exit")
      exitUser(JSON.parse(localStorage.getItem('login_data')).id)
    } 
    return ev.returnValue = 'Are you sure you want to close?';
}); 

},[])   */


/*  useEffect(()=>{
 window.onpopstate=e=>{
    //alert("back button pressed")
    localStorage.removeItem('start_match_computer')
    window.location.href='/dashboard'
  } 
})  */
/* let online = window.navigator.onLine
console.log("Internet=",online)
if(!online){
  window.localStorage.clear()
  return <Fragment>{<h1>Please check your internet connection</h1>}</Fragment>
}
else{ */
  return (
    <div>
      <CommonState>
      <PlayOnlineState>
      <MasterState>
      <AlertState>
      <AuthState> 
      <LeaderState>
      <MainProvider>
      <HumanState>
      <CustomHookProvider>
      <TimerProvider>
      <CharacterProvider>
      <Alerts/>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/PlayBackPopup" component={PlayBackPopup} />

            <Route exact path="/gamelevels" component={GameLevels} />
            <Route exact path="/facebook" component={ReactFacebookLogin} />
            <Route exact path="/google" component={Google} />
              <Route exact path="/dashboard" component={Dashboard} /> 
            {/* <Route exact path="/dashboard" component={(props)=> <Dashboard {...props}/>} />   */}
             <PrivateRoute exact path='/paypal/:price' component={PayPal}/>
            <Route exact path="/register" component={Register} />
            <Route exact path="/forgot" component={Forgot} />
            <Route exact path="/login" render={(props) => <Login {...props} token={token} />} /> 
            <Route exact path="/setting" component={Setting} />
            <Route exact path="/changepassword" component={ChangePassword} />
            <Route exact path="/update" component={Update} />
            <Route exact path='/showresult' component={ShowResult} />
            <Route exact path='/resultcomputer' component={ResultComputer} />
             {/* <Route exact path='/main' component={Main} />  */}
             <PrivateRoute exact path='/human_vs_computer' component={HumanVsComputer} /> 
            <Route exact path="/word" component={Word} />
            <Route exact path="/Post" component={Post} />
            <Route exact path="/notifiction" component={Notifiction} />
            <Route exact path="/friend" component={Friend} />
            <PrivateRoute exact path="/chooseplan" component={ChoosePlan} />
            <Route exact path="/hint" component={Hint} />
             {/* <Route exact path='/profile' render={(props) => (
                <Profile {...props} isAuthed={true} />
              )}/>  */}
             <Route exact path="/profile/:id/:position/:points" component={Profile} /> 
            <Route exact path="/leaderboard" component={Leaderboard} />
            <Route exact path="/country" component={Country} />
            <Route exact path="/age" component={Age} />
            <Route exact path="/level" component={Level} />
            <Route exact path="/details" component={Details} />
            <Route exact path="/historywithcomputer" component={HistoryWithComputer} />
            <Route exact path="/historywithfriend" component={HistoryWithFriend} />
            <Route exact path="/historyonline" component={HistoryOnline} />
            <Route exact path="/computer" component={Computer} />
            <Route exact path="/fileupload" component={FileUpload} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/friendrequest" component={FriendRequest} />
            <Route exact path="/sentrequest" component={SentRequest} />
            <Route exact path="/myfriend" component={MyFriend} />
            <Route exact path="/about" component={About} />
            <Route exact path="/youwin" component={YouWin} />
            <Route exact path="/youlose" component={YouLose} />
            <Route exact path="/payment" component={Payment} />
            {/* ///////////////////////////Play-Online///////////////////////////////////// */}
            <PrivateRoute exact path='/playonline' component={PlayOnline}/>
            <Route exact path='/challenge' component={Challenge}/>
          <Route component={PageNotFound}/>
          </Switch>  
      </CharacterProvider>
      </TimerProvider>
      </CustomHookProvider>
      </HumanState>
      </MainProvider>
      </LeaderState>
      </AuthState>
      </AlertState>
      </MasterState> 
      </PlayOnlineState>
      </CommonState>
    </div>
  )
           // }
}

export default App;
