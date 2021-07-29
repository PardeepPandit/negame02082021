import React,{useState,useEffect,useContext,Fragment} from 'react';
import GoogleLogin from 'react-google-login';
import AuthContext from './context/auth/authContext'

export const Google=(props)=>{

  const authContext=useContext(AuthContext)
  const {register,login,isAuthenticated,clearErrors,error,user}=authContext
  
  const [accessToken,setAccessToken]=useState('')
  const [userInfo,setUserInfo]=useState({
      username:'',
      name:'',
      email:'',
      password:'123456',
      register_type:'google'
  })

  useEffect(()=>{
    console.log(userInfo)
    register(userInfo)
    //const {email,password,register_type}=userInfo
    //const loginData={username:email,password:password,register_type:register_type}
    //login(loginData)
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

    const [data,setData]=useState(null)
const responseGoogle = (response) => {

  console.log(response)
        const {name,email}=response.profileObj
        setUserInfo({...userInfo,email,name,username:name})

}
/* const onClick=()=>{
  fetch('https://geolocation-db.com/json/f9902210-97f0-11eb-a459-b997d30983f1').then(response=>response.json()).then(detail=>setData(detail))
  data && console.log(data.city,",",data.country_name,",",data.country_code,",",data.IPv4)
} */
return(
  <Fragment>
  <GoogleLogin
    clientId="1041925640548-ladbh20mj6sbbtt4mc94i1fn1t6fo6ap.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
  
  </Fragment>
)
}
export default Google