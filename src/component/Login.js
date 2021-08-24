import { useContext ,useState,useEffect,Suspense} from "react"
import React,{Fragment}  from 'react';
import { NavLink,Link, Redirect } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from './MyComponent/context/auth/authContext'
import AlertContext from './MyComponent/context/alert/alertContext'
import MasterContext from './MyComponent/context/master/masterContext'
const TopAdd=React.lazy(()=>import('./MyComponent/Adds/TopAdd'))
const LeftAdd=React.lazy(()=>import('./MyComponent/Adds/LeftAdd'))
const RightAdd=React.lazy(()=>import('./MyComponent/Adds/RightAdd'))
const Footer=React.lazy(()=>import('./Footer'))

function Login(props) {

    const authContext=useContext(AuthContext)
    const {login,isAuthenticated,user,error,clearErrors}=authContext
    const alertContext=useContext(AlertContext)
    const {setAlert}=alertContext
    const masterContext=useContext(MasterContext)
    const {getPlanDetails,showPopup}=masterContext

    useEffect(()=>{
        if(isAuthenticated){
            console.log("USER=",user)
            
            props.history.push('/chooseplan')
            //getPlanDetails()
        }
       if(error==='Error'){
          clearErrors()
       }
       // eslint-disable-next-line
   },[error,isAuthenticated,props.history]) 

//console.log("Token in login=",props.token)
const [loginData,setLoginData]=useState({
    username:'',
    register_type:'email',
    password:'',
    fcm_token:props.token
})

    const {username,register_type,password}=loginData

const onChange=e=>{
console.log("onChange")
setLoginData({...loginData,[e.target.name]:e.target.value})
}
const onSubmit=e=>{
e.preventDefault()
if(username==='' || register_type===''||password===''){
    //setAlert('Please Enter All fields','danger')
}
else{
    login({
        username,
        register_type,
        password,
        fcm_token:props.token,
        is_active:"1"

    })
}

}
        
    return(
<Fragment >
<div className="login_sec">     
<div className="login-fg">
    <div className="container-fluid">
        <div className="row">
            <div className="signup-container">
                <div className="container">
                    <div className="row">
                        <Suspense fallback={<div>Loading...</div>}>
                                <TopAdd/>
                                <LeftAdd/>
                        </Suspense>
                        
            <div className="col-lg-8">
            <div className="login-wrapper">
            <h2>Login</h2>
            <div className="login-form">
            <form onSubmit={e=>onSubmit(e)}>
                        <div className="form-group form-fg">
                                <input type="text" name="username" className="input-text"value={username}  onChange={e=>onChange(e)}   placeholder="Username" required />
                        </div>
                    <div className="form-group form-fg">
                        <input type="password" name="password" className="input-text"  value={password} onChange={e=>onChange(e)} placeholder="Password" required/>                                
                    </div>

                    <NavLink to="/forgot" className="forgetpass">Forgot Password</NavLink>
                    <div className="form-group mt-2">
                        <input type="submit" className="btn-md btn-fg btn-block" value='Login'/>
                    </div>
                    
                </form>
            </div>                    
        </div>
        <div className="social-login">
            <h3>Login With:</h3>
                <ul className="login-list">
                    <li><a href="/facebook" className="facebook"><span>Facebook</span></a></li>
                    {/* <li><a href="#" className="twitter"><i className="fa fa-twitter twitter-i"></i><span>Twitter</span></a></li> */}
                    <li><a href="/google" className="google"><span>Google</span></a></li>
                </ul>
            <p>Don't have an account?* <Link to="/register" className="linkButton"> Register</Link></p>
        </div>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
            <RightAdd/>
            </Suspense>
                </div>
                </div>
            </div>
        </div>
    </div>
</div>  
  
    </div>
  <Suspense fallback={<div>Loading...</div>}>
      <Footer/>
  </Suspense>  


</Fragment>
    )

}
export default Login;