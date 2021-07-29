import React,{Fragment, useState,useContext,useEffect} from 'react';
import {Link} from 'react-router-dom'
import {usePosition} from './MyComponent/GeoLocation';
import AuthContext from '../component/MyComponent/context/auth/authContext'
import AlertContext from '../component/MyComponent/context/alert/alertContext'
import alertReducer from './MyComponent/context/alert/alertReducer';
import { CLEAR_ERRORS } from '../type';
const Register = (props) =>{
    const authContext=useContext(AuthContext)
    const alertContext=useContext(AlertContext)
    const {register,error,clearErrors,isAuthenticated,user}=authContext
    const {setAlert}=alertContext
    const {lat, lng,err} = usePosition();

 /* useEffect(()=>{
     if(isAuthenticated){
         console.log("USER=",user)
         props.history.push('/home')
     }
    if(error==='Error'){
       clearErrors()
    }

    // eslint-disable-next-line
},[error,isAuthenticated,props.history])  */


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
        <Fragment>
           <form onSubmit={e=>onSubmit(e)}>
            <div class="section_card registration-container pt-0 pb-0">
                <div class="container-fluid">
                <div class=" row">
                <div class="col-lg-8">
					<div class="registration-wrapper">
						<div class="registration-box">
							<img src="assets/img/logo-01.png" alt="" class="img-fluid d-block mx-auto" width="150" />
                                <h1 class="tneg-hdng">The Never Ending Game</h1>
									</div>
								</div>

								<div class="row">
									<div class="col-lg-9 mx-auto">
										<p class="breif">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
									</div>
								</div>
							</div>
                            <div class="col-lg-4 padd-r">
								<div class="register-container">
									<img src="assets/img/user.svg" alt="" class="img-fluid d-block mx-auto" width="100" />

							<div class="register-form">
								<input type="text" name="username" placeholder="Username" onChange={e=>onChange(e)} required/>
								<input type="text" name="name" placeholder="Full Name" onChange={e=>onChange(e)} required/>
								 <input type="email" name="email" placeholder="Email Address" onChange={e=>onChange(e)} required/> 
								<input type="number" name="mobile" placeholder="Mobile(Optional)" onChange={e=>onChange(e)}/>
								<input type="date" name='dob' placeholder="Date of Birth"  onChange={e=>onChange(e)}/>
								<input type="password" name="password" placeholder="Password" onChange={e=>onChange(e)} required/>
								<input type="password" name="password2" placeholder="Confirm Password" onChange={e=>onChange(e)} required/>
								<input type='submit' className='bg-info' value="Sign Up"/> 
								<h2 class="login-hdng"><Link to="/login">Click Here to Login</Link></h2>
									</div>
								</div>
							</div>
           </div>
       </div>
   </div>
   </form>
        </Fragment>
    )
}


export default Register;

