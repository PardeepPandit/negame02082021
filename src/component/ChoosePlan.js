import React, {Fragment,useContext,useEffect,useState} from 'react';
import {Link} from 'react-router-dom'
import Header from './Header'
import MasterContext from './MyComponent/context/master/masterContext'
import PlanItems from './PlanItems';
import LeftAdd from './MyComponent/Adds/LeftAdd'
import RightAdd from './MyComponent/Adds/RightAdd'
//import FriendContext from './MyComponent/context/friend/friendContext'
import AuthContext from './MyComponent/context/auth/authContext'
import $ from 'jquery'
import Success from './MyComponent/Success'
import PayPal from './MyComponent/PayPal';
import Braintree from './MyComponent/Braintree'


const ChoosePlan = (props) => {
    const [active,setActive]=useState(()=>false)
    const authContext=useContext(AuthContext)
    const {user,isAuthenticated}=authContext

    const masterContext=useContext(MasterContext)
    const {planDetails,loading,showPopup,getPlanDetails}=masterContext
    const [checkout,setCheckOut]=useState(false)
    const [money,setMoney]=useState();

  useEffect(()=>{
    getPlanDetails()
  },[])

    useEffect(() => {
      console.log("Money chaned",money)
    }, [money])
    /* const friendContext =useContext(FriendContext)
    const{getUsersList}=friendContext */
 /*    useEffect(()=>{
 if (window.performance) {
        if (performance.navigation.type == 1) {
          alert( "This page is reloaded" );
        } else {
          alert( "This page is not reloaded");
        }
      }
    },[]) */

  /*   useEffect(() => {
        window.addEventListener("beforeunload", alertUser);
        return () => {
          window.removeEventListener("beforeunload", alertUser);
        };
      }, []);

      const alertUser = (e) => {
        e.preventDefault();
        e.returnValue = "";
      }; */
   
     
    console.log("hello choose plan")
  console.log("Plan details=",!loading && planDetails && planDetails)

  const onClick=()=>{
    if(isAuthenticated){
        console.log("calling getUserslist for id=",user && user.data.id)
        
        }
  }
  const activeFun=()=>{
    $(document).ready(function () {
     $(".plan-box").on('click', function () {
 if ($(this).hasClass("open")) {
     $(this).addClass("open")
         } else
         {
            $(".plan-box").removeClass("open")
             $(this).addClass("open")
         }
     })
 }) 
   console.log("active FUN")
   setActive(true)
}


  return (
    <Fragment>
        {showPopup && <Success/>}
        {/*  {checkout && <PayPal money={money}/>} */}
        <Braintree/>
          <Fragment>
            <div className="login_sec">   
        <div className="login-fg">
        <div className="container-fluid">
            <div className="row">
                <div className="signup-container">
                    <div className="container">
                        <div className="row">                               
                            
                            <LeftAdd/>
                            <div className="col-lg-8 mt-5">
                                <div className="min_top">
                                    <div className="row">                                
    
                                    <div className="col-lg-12 mb-4">
                                        <div className="myfriend-panel">
                                            <h2>Choose Plan</h2>                                        
                                        </div>
                                    </div>
                                        {planDetails.map((list)=>{
                                            return <PlanItems key={list.id} item={list} activeFun={activeFun} setCheckOut={setCheckOut} checkout={checkout} setMoney={setMoney} active={active}/>
                                        })}
                                        <div className="col-lg-12">
                                            {active && <Link to={money!='0' ? `/paypal/${money}`:'/dashboard'}> <button className="membership-btn" id="membership-btn-1" style={{backgroundColor:'green'}}>Get Membership Now*</button></Link>}
                                            {!active && <Link to='#'> <button className="membership-btn" id="membership-btn-2" style={{backgroundColor:'gray'}}>Get Membership Now</button></Link>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <RightAdd/>
                        </div>   
                                   
                    </div>
                    
                </div>
            </div>
        </div>
    </div>  
      
        </div></Fragment>
        
    
        
    </Fragment> 
      );


}

export default ChoosePlan;