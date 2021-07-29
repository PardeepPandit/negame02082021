import React  from 'react';
import react from   "./header.css";
import { NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Signup( {name , title }) {
    return(
<div >
<ToastContainer />

<section className="login">     
    
    <div className="container">
        <div className="row">
            <div className="col-md-8 offset-md-2">
        <div className="man">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="logo lp_top text-center">
                        <img src="assets/img/logo.png" alt="logo" />
                        <h3 className=" text-white">Login</h3>
                    </div>
                </div>
            {/* <!-- top-input--> */}
                <div className="col-md-12">
                    <div className="input-form w70">
                        <input type="text" className="form-control" placeholder="Email" />
                        
              <input id="password-field" type="password" className="form-control" name="password" value="Password" />
              <span toggle="#password-field" className="fa fa-eye field-icon toggle-password"></span>
                    
                    <div className="forgot trxt-right">
                        <NavLink exact className="text-white" tag="a" to="/forgot">Forgot Password?</NavLink>
                    </div>
                    </div>
                </div>
                {/* <!-- bottom-input--> */}
                   <div className="col-md-12">
                    <div className="input-form_l w70">
                        <a href="dashboard.html"><input type="text" className="form-control text-center border-0 f text-white btn bg-primary1" value="Login"/></a>
                       
                    </div>
                    
                    
                    <div className="or text-center">
                        <strong className="text-white bold">OR</strong>
                    </div>
                    
                </div>
                
                
                    {/* <!--  facebookbtn--> */}
                            <div className="col-md-12">
                    <div className="input-form_l w70">
                        <input type="text" className="text-center form-control border-0 f text-white facebook" value="Facebook"/>
                       
                    </div>
                    
                     <div className="input-form_l w70 pt-3">
                        <input type="text" className="text-center  form-control border-0 f text-white google" value="Google" />
                       
                    </div>
                </div>
                
                            <div className="col-md-12">
                    <div className="input-form_l w70 text-center">
                    
                     <p>New user? ckick here for  <NavLink  className="text-white s_ingup"  tag="a"  to="/update" ><b> Sign Up</b></NavLink></p>
                  
                    </div>
                  
            </div>
        </div>
    </div>
    
            </div>
        </div>
    </div> 
    </div>   
    </section>

</div>


    );

}
export default Signup;