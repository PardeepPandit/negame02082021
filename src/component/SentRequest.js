import { Component } from "react"



import React  from 'react';
import react from   "./header.css";
import { NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLayoutEffect } from "react/cjs/react.production.min";


function Signup( {name , title }) {
    return(
<div >
<ToastContainer />

<div className="login_sec">     
<div className="login-fg">
    <div className="container-fluid">
        <div className="row">
            <div className="signup-container">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-6 offset-md-3">
                            <div className="logo-wrapper">
                                <img src="assets/img/logo-01copy.png" alt="" />
                                <h1>The Never Ending Game</h1>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="myfriedn-wrapper">
                                <div className="row">

                                <div className="col-lg-4">
                                    <ul className="friend-list">
                                    <li><a href="MyFriend">My Friends</a></li>
                                    <li><a href="FriendRequest">Friend Request</a></li>
                                    <li><a href="SentRequest">Sent Request</a></li>
                                    </ul>                                   
                                </div>

                                <div className="col-lg-8">
                                    <div className="myfriend-panel">
                                        <h2>Sent Request</h2>

                                        <div className="myfriend-box">
                                        <div className="myfriend">
                                            <div className="myfriend-dp">
                                                <div className="dp-box">
                                                    <div className="dp">
                                                        <img src="assets/img/dp.jpg" alt="" />
                                                    </div>

                                                    <div className="dp-name">
                                                        <h3>Kelly Sara</h3>
                                                        <h4>India</h4>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="myfriend-status requeststatus">
                                                <a href="#">Pending</a>
                                            </div>
                                            </div>

                                            
                                            <div className="myfriend">
                                            <div className="myfriend-dp">
                                                <div className="dp-box">
                                                    <div className="dp">
                                                        <img src="assets/img/dp.jpg" alt="" />
                                                    </div>

                                                    <div className="dp-name">
                                                        <h3>Amanda Rose</h3>
                                                        <h4>USA</h4>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="myfriend-status requestaccept">
                                                <a href="#">Accepted</a>
                                            </div>
                                            </div>

                                            
                                            <div className="myfriend">
                                            <div className="myfriend-dp">
                                                <div className="dp-box">
                                                    <div className="dp">
                                                        <img src="assets/img/dp.jpg" alt="" />
                                                    </div>

                                                    <div className="dp-name">
                                                        <h3>John Eric</h3>
                                                        <h4>Australia</h4>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="myfriend-status requeststatus">
                                                <a href="#">Pending</a>
                                            </div>
                                            </div>

                                            
                                            <div className="myfriend">
                                            <div className="myfriend-dp">
                                                <div className="dp-box">
                                                    <div className="dp">
                                                        <img src="assets/img/dp.jpg" alt="" />
                                                    </div>

                                                    <div className="dp-name">
                                                        <h3>Lucy Anna</h3>
                                                        <h4>Canada</h4>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="myfriend-status requestaccept">
                                                <a href="#">Accepted</a>
                                            </div>
                                            </div>

                                            
                                            <div className="myfriend">
                                            <div className="myfriend-dp">
                                                <div className="dp-box">
                                                    <div className="dp">
                                                        <img src="assets/img/dp.jpg" alt="" />
                                                    </div>

                                                    <div className="dp-name">
                                                        <h3>Natalia Lindsey	</h3>
                                                        <h4>India</h4>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="myfriend-status requestaccept">
                                                <a href="#">Accepted</a>
                                            </div>
                                            </div>

                                            

                                            
                                        </div>
                                    </div>
                                </div>

                                </div>
                            </div>
                        </div>

                    </div>                
                </div>
            </div>
        </div>
    </div>
</div>  
  
    </div>

</div>


    );

}
export default Signup;