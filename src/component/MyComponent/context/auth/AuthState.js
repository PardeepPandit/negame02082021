import React,{useReducer,useContext,useEffect} from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import AlertContext from '../alert/alertContext'
import MasterContext from '../master/masterContext'
import axios from 'axios'
import{
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  LOAD_OTHER_USER_SUCCESS,
  LOAD_OTHER_USER_FAIL,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  SET_ALERT,
  PLAY,
  SET_LOADING
} from '../../../../type'; 

const AuthState=({children})=>{
  const initialState={
    token:localStorage.getItem('id'),
    isAuthenticated:localStorage.getItem('id'),
    loading:false,
    user:null,
    otherUser:null,
    error:null,
    login_data:JSON.parse(localStorage.getItem('login_data'))
    //playing:false
  };
  const alertContext=useContext(AlertContext)
  const {setAlert}=alertContext
  const [state,dispatch]=useReducer(authReducer,initialState);

  const masterContext=useContext(MasterContext)
  const {playing,setPlaying}=masterContext
  console.log("Auth state called$$$$$$")

useEffect(()=>{
  console.log("LOGIN DATA LOCAL STORAGE//////////////////=",state.login_data)
  if(localStorage.getItem("id"))
{
  console.log("loading user me=",localStorage.getItem("id"))
    loadUser(localStorage.getItem("id"),'me')
}
},[])

//Register User
const register=async formData=>{
  setLoading()
  const config={
    headers:{
      'Content-Type':'application/json',
      'APPKEY' : 'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
    }
  }
  console.log("formdata=",formData)
  try{
    const res=await axios.post(process.env.REACT_APP_BASEURL+'/api/user/register',formData,config)

    console.log("Register Responce=",res.data)

    if(res.data.status===200)
    {
      dispatch({type:REGISTER_SUCCESS,
    payload:res.data
    });   
    setAlert('User Registration Successful','success')
    //alert("Registration Successful...")
    }

    if(res.data.status===400)
    {
      console.log("names=",Object.getOwnPropertyNames(res.data.error_message))
      const propertyName=Object.getOwnPropertyNames(res.data.error_message)
      //console.log("prop=",res.data.error_message.username)
      dispatch({type:REGISTER_FAIL,
    payload:res.data
    });  
    setAlert('User Already Exits','danger')
    
    }

      
    
  }catch(err){
    console.log("Error=",err)
        dispatch({
      type:REGISTER_FAIL,
      payload:err.response.data
    });   
  }
}

const loadUser=async(id,who)=>{

  setLoading()
  console.log("load user executing id=",id)
  const config={
    headers:{
      'Content-Type':'application/json',
      'APPKEY' : 'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
    }
  }
  console.log("User ID=",id)
  try{
    const res=await axios.get(process.env.REACT_APP_BASEURL+`/api/user/profile?id=${id}`,config)

    console.log("Responce from loadUser=",res.data)
   
    if(res.data.status===400){
      dispatch({
        type:who==='me' ? USER_LOADED_FAIL : LOAD_OTHER_USER_FAIL
      }); 
      setAlert(`User Loading Fail`,'danger')
    }

    if(res.data.status===200)
    {
      console.log("user loaded=",res.data)
      dispatch({
        type:who==='me' ? USER_LOADED_SUCCESS : LOAD_OTHER_USER_SUCCESS,
        payload:res.data
      })
     //setAlert(`User Loading Successful ${res.data.data.id}`,'success') 
  }  

    
  }catch(err){
    console.log("Error=",err)
      dispatch({
      type:LOGIN_FAIL,
      payload:err
    }); 
  } 
    
}




//Login User
const login=async(formData)=>{
  
  setLoading()
  const config={
    headers:{
      'Content-Type':'application/json',
      'APPKEY' : 'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
    }
  }
  console.log("formdata for login=",formData)
  console.log("base_url=",process.env.REACT_APP_BASEURL+'/api/user/login')
  try{
    const res=await axios.post(process.env.REACT_APP_BASEURL+'/api/user/login',formData,config)

    console.log("Responce from login=",res.data)

    if(res.data.status===400){
      dispatch({
        type:LOGIN_FAIL,
        payload:res.data
      }); 
      
      if(res.data.error_message==="Your account is inactive!"){
        setAlert(res.data.error_message,'danger',3000)
      }
      else{
        setAlert("Something Wrong!","danger")
      }
    }

    if(res.data.status===200)
    {
      localStorage.setItem('login_data',JSON.stringify(res.data.data))
      dispatch({type:LOGIN_SUCCESS,
        payload:res.data
        });
        loadUser(res.data.data.id,'me')
     //setAlert(`User Login Successful ${res.data.data.id}`,'success') 
    }  

    
  }catch(err){
    console.log("Error=",err)
      dispatch({
      type:LOGIN_FAIL,
      payload:err
    }); 
  } 
  
}

const setLoading=()=>{
  dispatch({
    type:SET_LOADING,
  })
}
//Logout
const logout=()=>{
  //setPlaying(!playing)
  console.log("Logout")
  dispatch({type:LOGOUT})
  
}
//Clear Errors
const clearErrors=()=>{
  dispatch({type:CLEAR_ERRORS})
}
  return (
    <AuthContext.Provider
    value={{
      token:state.token,
      isAuthenticated:state.isAuthenticated,
      loading:state.loading,
      user:state.user,
      otherUser:state.otherUser,
      error:state.error,
      login_data:state.login_data,
      register,
      login,
      logout,
      clearErrors,
      loadUser
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthState;