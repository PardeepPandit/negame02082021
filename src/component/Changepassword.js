import React,{useState,useContext,useEffect} from 'react'
import AuthContext from '../component/MyComponent/context/auth/authContext'
import AlertContext from '../component/MyComponent/context/alert/alertContext'
import axios from 'axios'

const ChangePassword = () => {

    const [resetPassword,setResetPassword]=useState({
        old_password:'',
        password:'',
        confirmPassword:''
    })

    const authContext=useContext(AuthContext)
    const {user}=authContext
    const alertContext=useContext(AlertContext)
    const {setAlert}=alertContext


        const onChange=(e)=>{
            setResetPassword({...resetPassword,[e.target.name]:e.target.value})
        }
    const onSubmit=async(e)=>{
        e.preventDefault()

        const config={
            headers:{
                'Content-Type':'application/json',
                'APPKEY' : 'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
            }
        }
            if(resetPassword.password!==resetPassword.confirmPassword){
                    setAlert('Password not matched','danger')
            }
         
        
        const body={
            "id":user && user.email,
            "old_password":resetPassword.old_password,
            "password":resetPassword.password
        }
        try{
            const res=await axios.post(process.env.REACT_APP_BASEURL+'/api/user/forgot/password',body,config)

            console.log("ChangePassword responce=",res.data)
                if(res.data.status===200){
                     setAlert('Password Changed','success')
                }  
                if(res.data.status===400){
                     setAlert(`${res.data.error_message}`,'danger')
                }  
        }
        catch(error){
                setAlert('Somthing Wrong','danger')
        }
        
    }


    return(
        <div>
              <div class="man change-pass">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="logo lp_top text-center">
                        <img src="assets/img/logo.png" alt="logo" />
                     <p class="chan_ge"><b>Change Password</b></p>
                     
                     <form onSubmit={e=>onSubmit(e)}>
                     <div class="input-form w70 pt-3">
                         
                        <input type="password" name='old_password'  onChange={e=>onChange(e)} class="form-control" placeholder="Old Password  " />
                          <input type="password" name='password' onChange={e=>onChange(e)} class="form-control" placeholder="Enter New password" />
                        <input type="password" name='confirmPassword' onChange={e=>onChange(e)} class="form-control" placeholder="Conform Password" />
                        
                        </div>
                        <div class="input-form_l res w70 update">
                        <input type="submit" class="form-control text-center border-0 f text-white " value="Reset" />
                       
                        </div>
                    </form>
                        
                </div>
             
                   
            </div>
        </div>
        </div>
        </div>
      
        </div>
    )
}
export default ChangePassword;