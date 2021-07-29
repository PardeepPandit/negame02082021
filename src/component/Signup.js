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

                        <div className="col-lg-8 mx-auto">
                            <div className="login-wrapper">
                                <h2>Login</h2>

                                <div className="login-form">
                                <input type="" placeholder="Username" />
                                <input type="password" placeholder="Password" />
                                <a href="#" className="forgetpass">Forgot Password</a>
                                    <button>Login</button>
                                </div>
                            </div>

                            <div className="social-login">
                                <h3>Login With:</h3>

                                <ul className="login-list">
                                    <li><a href="#">facebook</a></li>
                                    <li><a href="#">Google</a></li>
                                </ul>

                                <a href="#" className="forgetpass createacount">Create Account / Register</a>
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