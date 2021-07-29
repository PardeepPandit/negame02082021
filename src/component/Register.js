import React,{Fragment, useState,useContext,useEffect} from 'react';
import {Link} from 'react-router-dom'
import {usePosition} from './MyComponent/GeoLocation';
import AuthContext from './MyComponent/context/auth/authContext'
import AlertContext from './MyComponent/context/alert/alertContext'
import MasterContext from './MyComponent/context/master/masterContext'
import alertReducer from './MyComponent/context/alert/alertReducer';
import { CLEAR_ERRORS } from '../type';
import Success from '../component/MyComponent/Success'
import masterContext from './MyComponent/context/master/masterContext';


const Register = (props) =>{
    const authContext=useContext(AuthContext)
    const alertContext=useContext(AlertContext)
    const masterContext =useContext(MasterContext)
    const {showPopup}=masterContext
    const {register,error,clearErrors,isAuthenticated,user,token}=authContext
    const {setAlert}=alertContext
    const {lat, lng,err} = usePosition();
    const [active,setActive]=useState(false)
    const [registrationMsg,setRegistrationMsg]=useState(()=>null)

 /*  useEffect(()=>{
      console.log("REGISTER to LOGIN",token && token)
     if(token && token){
         console.log("USER=",user)
         props.history.push('/login')
     }
    if(error==='Error'){
       clearErrors()
    }

    // eslint-disable-next-line
},[token])   */


    const [newUser,setNewUser]=useState({
        username:'',
        email:'',
        name:'',
        mobile:'',
        dob:'',
        password:'',
        password2:'',
        register_type:'email',
        lat:lat,
        lng:lng
    })

    const {username,email,name,mobile,dob,password,password2,register_type}=newUser

    const onChange=e=>{
        setNewUser({...newUser,[e.target.name]:e.target.value})
    }

    const onSubmit=(e)=>{
        e.preventDefault()
        console.log("submiting",name, )
        if(name===''|| email==='' || dob===''|| password==='' || password2==='' ||username===''){
            setAlert('Please Enter All fields','danger')
        }
        else if(password!==password2){
            setAlert('Invalid Password','danger')
        }
        else{
           register({
            username,
            email,
            name,
            mobile,
            dob,
            password,
            register_type,
            lng,
            lat
        })

        }
        setNewUser({
            username:'',
            name:'',
            password:'',
            password2:'',
            register_type:''
        })
    }
    return(


<Fragment className="login_sec">
     {active && showPopup && <Success/>}
<form  onSubmit={e=>onSubmit(e)}>   
<div className="login-fg">
    <div className="container-fluid">
        <div className="row">
            <div className="signup-container">
                <div className="container">
                    <div className="row">

                    {/* <div className="col-lg-8 mb-5 offset-md-2">
                    <div id="demo" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                            <img src="assets/img/ad1.jpg" alt="" className="img-fluid" />
                            </div>

                            <div class="carousel-item">
                            <img src="assets/img/ad2.jpg" alt="" className="img-fluid" />
                            </div>

                            <div class="carousel-item">
                            <img src="assets/img/ad3.jpg" alt="" className="img-fluid" />
                            </div>
                        </div>
                        </div>                                        
                        
                    </div> */}

                        <div className="col-lg-12">
                            <div className="logo-wrapper">
                                <img src="assets/img/logo-01copy.png" alt="" />
                                <h1>The Never Ending Game</h1>
                            </div>
                        </div>

                        <div className="col-lg-2">
                            <img src="assets/img/ad4.jpg" alt="" className="img-fluid" />
                        </div>

                        <div className="col-lg-8">
                            <div className="login-wrapper">
                                <h2>Sing Up</h2>

                                <div className="login-form">
                                <input type="text" name="username" placeholder="Username" onChange={e=>onChange(e)} required/>
								<input type="text" name="name" placeholder="Full Name" onChange={e=>onChange(e)} required/>
								 <input type="email" name="email" placeholder="Email Address" onChange={e=>onChange(e)} required/> 
								<input type="number" name="mobile" placeholder="Mobile(Optional)" onChange={e=>onChange(e)}/>
								<input type="date" name='dob' placeholder="Date of Birth"  onChange={e=>onChange(e)}/>
								<input type="password" name="password" placeholder="Password" onChange={e=>onChange(e)} required/>
								<input type="password" name="password2" placeholder="Confirm Password" onChange={e=>onChange(e)} required/>
								<input type='submit' className='bg-info' value="Sign Up" onClick={()=>setActive(true)}/> 
                                </div>
                            </div>

                            <div className="social-login">  
                            <h2 class="login-hdng"><Link to="/login">Click Here to Login</Link></h2>
                            </div>

                        </div>

                        <div className="col-lg-2">
                        <img src="assets/img/ad5.jpg" alt="" className="img-fluid" />
                        </div>
                        

                    </div>                
                </div>
            </div>
        </div>
    </div>
</div>  
  </form> 
  
    </Fragment>

    );

}
export default Register;