import React,{useEffect,useContext, Fragment} from 'react'
import { Redirect, Route } from 'react-router-dom'
import AuthContext from '../context/auth/authContext'
import PlayOnlineContext from '../../playonline/context/playOnlineContext'
import ShowResult from '../ShowResult'
import FinalResultOnline from '../../playonline/play_online_components/FinalResultOnline'
import HumanContext from '../../MyComponent/context/human/humanContext'

console.log("PrivateRoute.js render 1");


const PrivateRoute = ({ component: Component,...rest}) => {
  const authContext=useContext(AuthContext)
  const {isAuthenticated,loading}=authContext
  const humanContext =useContext(HumanContext)
  const {current_winner_loser_HC,loading_HC}=humanContext

  const playOnlineContext=useContext(PlayOnlineContext)
  const {winner_loser,onlineUser,round_complete,final_result_loser_counter,final_result_winner_counter,final_result_data}=playOnlineContext

    //console.log("loser=",loser.name,",",loser.out,",*",isAuthenticated,",",loading)
    return (<Route {...rest} render={props => 
      !isAuthenticated && !loading ? 
      <Fragment><Redirect to='/login'/></Fragment> :
      
      current_winner_loser_HC && !loading_HC ? 
        <ShowResult resultfor='computer'/> :
       winner_loser ? <ShowResult resultfor='online'/> :
       (final_result_winner_counter === 3 || final_result_loser_counter === 3) && !round_complete ?  <FinalResultOnline/> :
        <Fragment><Component {...props} /></Fragment>} />)
    }

export default PrivateRoute