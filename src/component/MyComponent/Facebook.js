import React,{useState,useEffect,useContext} from 'react'
import FacebookLogin from 'react-facebook-login'
import AuthContext from './context/auth/authContext'

export const ReactFacebookLogin=(props)=>{
    const authContext=useContext(AuthContext)
    const {register,isAuthenticated,clearErrors,error,user}=authContext
    
    const [accessToken,setAccessToken]=useState('')
    const [userInfo,setUserInfo]=useState({
        username:'',
        name:'',
        email:'',
        password:'',
        register_type:'facebook'
    })

useEffect(()=>{
    console.log(userInfo)
    register(userInfo)

    },[userInfo])

useEffect(()=>{
    
if(isAuthenticated){
        console.log("USER=",user)
        props.history.push('/home')
    }
   if(error==='Error'){
      clearErrors()
   }
},[error,isAuthenticated,props.history])


     const componentClicked=data=>{
        console.log("data=",data)
    } 

    const responseFacebook =response=>{
        console.log(response)
        const {email,name}=response
        setUserInfo({...userInfo,email,name,username:name})
    }

    return(
        <div>
            <h1>Facebook</h1>
            <FacebookLogin
                appId="945003726302552"
                autoLoad={true}
                fields="name,email,picture"
                onClick={componentClicked}
                callback={responseFacebook} />
        </div>
    )
}

export default ReactFacebookLogin