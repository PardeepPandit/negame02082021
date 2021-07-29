
import axios from 'axios';
import React,{useState,useContext,useEffect} from 'react';
import { Component } from "react";
import { NavLink } from 'react-router-dom';
import { SET_ALERT } from '../type';
import AlertContext from '../component/MyComponent/context/alert/alertContext'



const Forgot = () => {

        const alertContext=useContext(AlertContext)
        const {setAlert}=alertContext

        const [email,setEmail]=useState('')
        useEffect(() => {
            setEmail('')
        }, [])

    const onChange=(e)=>{

        setEmail(e.target.value)
        console.log("email=",email)
        
    }

    const onSubmit=async(e)=>{
        e.preventDefault()
            const config={
            headers:{
                'Content-Type':'application/json',
                'APPKEY' : 'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
            }
        }
        const body={
            "email":email
        }
        const res=await axios.post(process.env.REACT_APP_BASEURL+'/api/user/forgot/password',body,config)

        console.log("Forgot responce=",res.data)
        if(res.data.status===200){
            setAlert(`${res.data.success_message}`,'success')
        }
    }


    return(
        <div>
      <div className="login_sec">     
<div className="login-fg">
    <div className="container-fluid">
        <div className="row">
            <div className="col-xl-8 col-lg-7 col-md-12 bg_image" >
                <div className="ovre_lay"></div>
                <div className="info">
                    <h1>Never Ending Game </h1>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
            </div>
            <div className="col-xl-4 col-lg-5 col-md-12 login">
                <div className="login-section">
                    <div className="logo clearfix">
                    <NavLink to="/signup">
                            NEE GAME
                        </NavLink>
                    </div>
                    <h3>Reset  account</h3>
                    <div className="form-container">
                        <form onSubmit={e=>onSubmit(e)}>
                            <div className="form-group form-fg">
                                <input type="email" name="email" className="input-text"  onChange={e=>onChange(e)} placeholder="Email Address"/>
                                
                                <i className="fa fa-envelope"></i>
                            </div>
        
                            <div className="form-group mt-2">
                                <input type="submit" className="btn-md btn-fg btn-block" placeholder='Submit'/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>  
  
    </div>

        </div>
    )
}
export default Forgot;