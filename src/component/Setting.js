
import React,{useState,useEffect,useContext}  from 'react';
import {Link} from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import {useBackgroundMusicConsumer,useBackgroundMusicUpdate} from './MyComponent/CustomHook'
import AuthContext from '../component/MyComponent/context/auth/authContext'
import MasterContext from './MyComponent/context/master/masterContext'
import { Fragment } from 'react';
import Header from './Header'

const Setting = () => {

    //const authContext =useContext(AuthContext)
    //const {user,isAuthenticated}=authContext
    

   /*  useEffect(()=>{
        setPlaying(false)
    },[]) */
    const authContext=useContext(AuthContext)
    const {user,isAuthenticated}=authContext
    const masterContext=useContext(MasterContext)
    const {playing,setPlaying}=masterContext

   // console.log("New chack=",user,",and =",isAuthenticated)
    //const avail=JSON.parse(localStorage.getItem('playing'))
   /*  if(!user){
        console.log("calling toggle on logut")
            toggle()
        } */
    //console.log("avail=",avail,",user=",user)
 /*    useEffect(()=>{
        console.log("*New chack=",user,",and =",isAuthenticated)
        
    },[user]) */
    /* if(avail){
        console.log("clearing localstorage")
        localStorage.clear()
        window.location.reload(false);
    }  */
    const {keyAudio}=useBackgroundMusicConsumer()
    const {onClick,useAudio}=useBackgroundMusicUpdate()
    //console.log("url=",url)
 
     const [playin, toggle] = useAudio();   
        const onChange=()=>{
            setPlaying(!playing)
        }

    console.log("Playing*=",playing)
  
  return (
  
<Fragment>
    <Header/>
<div class=" setting ">

<div class="section_card">
    <div class="container">
        <div class=" row">
            <div class="col-md-12  card p-5">
                <header>
                    <h1 class="set_h">Setting</h1>
                    <div class="user-image">
                        <span>
                            <img class="w-100" src="assets/img/image1.jpg" alt="add"/>
                        </span>

                    </div>
                </header>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12 card p-5">
                <div class="top_sec">
                    <h3 class="h3_h">Sound</h3>
                    <div class="row">
                        <div class="col-md-7 col-7">
                            <div class="sound_li">
                                <ul>
                                   <li class="pt-2 pb-4">Sound Effect</li>
                                    <li class="pt-2 pb-4">Background Music</li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-5 col-5">
                            <div class="sound_li text-center">
                                <ul>
                                    <li class="pt-2 pb-4"> <input class="switch" type="checkbox" checked={keyAudio} onChange={onClick}/></li> 
                                    <li class="pt-2 pb-4"> <input class="switch" type="checkbox"checked={playing} onChange={onChange}/></li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
               
                <div class="top_sec">
                    <h3 class="h3_h">Profile</h3>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="sound_li">
                                <ul>
                                 <li>
                                        <div class="imag_icon">
                                            <i class="fa fa-user-circle us" aria-hidden="true"></i>
                                        </div>
                                        <div class="text"><NavLink exact to="/update"><span>Edit Profile</span></NavLink></div>
                                    </li>
                                  

                                   <Link to="/changepassword">
                                    <li>
                                        <div class="imag_icon imag_icon1">
                                            <i class=" fa fa-key us" aria-hidden="true"></i>
                                        </div>
                                        <div class="text"><span>Change Password</span></div>
                                    </li>
                                      </Link>  

                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
                {/* <!---- Profile--> */}
                <div class="top_sec">
                    <h3 class="h3_h">Additional</h3>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="sound_li">
                                <ul><a href="notification.html">
                                        <li>
                                            <div class="imag_icon">
                                                <i class="fa fa-bell us" aria-hidden="true"></i>
                                            </div>
                                            <div class="text"><NavLink to="/notifiction">Notifiction</NavLink></div>
                                        </li>
                                    </a>
                                    <a href="https://theneverendingwordgame.com/contact.php">
                                        <li>
                                            <div class="imag_icon imag_icon1">
                                                <i class=" fa fa-life-ring us" aria-hidden="true"></i>
                                            </div>
                                            <div class="text"><span>Support</span></div>
                                        </li>
                                    </a>
                                    <a href="https://theneverendingwordgame.com/about.html">
                                        <li>
                                            <div class="imag_icon imag_icon1">
                                                <i class=" fa fa-list-alt us" aria-hidden="true"></i>
                                            </div>
                                            <div class="text"><span>About Us</span></div>
                                        </li>
                                    </a>
                                    <a href="https://theneverendingwordgame.com/faq.html">
                                        <li>
                                            <div class="imag_icon imag_icon1">
                                                <i class=" fa fa-file-text-o us" aria-hidden="true"></i>
                                            </div>
                                            <div class="text"><span>Terms &amp; Comdaction</span></div>
                                        </li>
                                            </a>
                                           <a href="https://theneverendingwordgame.com/faq.html">
                                            <li>
                                                <div class="imag_icon imag_icon1">
                                                    <i class=" fa fa-user-secret us" aria-hidden="true"></i>
                                                </div>
                                                <div class="text"><span>Priacy Policy</span></div>
                                            </li>
                                             </a>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
                {/* <!---- Regional--> */}
                <div class="top_sec">
                    <h3 class="h3_h">Regional</h3>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="sound_li">
                                <ul>
                                    <a href="#">
                                        <li>
                                            <div class="imag_icon">
                                                <i class="fa fa-language us" aria-hidden="true"></i>
                                            </div>
                                            <div class="text"><span>Language</span></div>
                                        </li>
                                    </a>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>


                <div class="version text-center mt-4">
                    <p><b>App Version 1.0</b></p>
                </div>

            </div>
        </div>



    </div>
</div>


</div>

</Fragment>


  );


}

export default Setting;