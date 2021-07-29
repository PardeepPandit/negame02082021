

import React, {Component, useEffect,className, useState } from 'react';
import axios from 'axios';
import { Card } from 'reactstrap';
  

function Apiform() {
     const [user, setUser] = useState({
        name:'',
        email: '',
        password: ''
      }); 

                /* const [email,setEmail]=useState("");*
                const [name,setName]=useState("");
                const [password,setPassword]=useState("");  */

                 const { name,email, password } = user;

                const onChange = e => setUser({ ...user, [e.target.name]: e.target.value }); 
              

                const onSubmit = e => {
                    e.preventDefault();
                    if (name==='' || email === '' || password === '') {
                        alert('Invalid Credential')
                    } else {
                      saveUser(name,email,password)
                    }
                  };
                          const saveUser=async(name,email,password)=>{
                                  console.log("name=",name)
                                  const body=JSON.stringify({
                                        name,
                                        email,
                                        password
                                })
                                  const config={
                                      headers:{
                                          'Accept':'application/json',
                                          'Contant-Type':'application/json',
                                          'APPKEY' : 'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
                                      }
                                  }

                    const res=await axios.get(process.env.REACT_APP_BASEURL+'/ne_game_api/api/intro/screen',body,config)

                    console.log("Responce=", res.data)       
              
                         }

                        

        return (
          
           <div className="container">
              <div className="row">
                    <div className="col-md-8 offset-md-2 text-center" > 
                    <Card className="p-5">
                    <h1 className="pb-5">API HITT</h1>

<form onSubmit={onSubmit}>
<div className="log_in">
<input type="text" className="form-control"  name="name" value={name} onChange={onChange} placeholder="Name" /><br/><br/>
 <input type="text" className="form-control" value={email} onChange={onChange} name="email" placeholder="Email" /><br/><br/> 
    <input type="password" className="form-control"  value={password} onChange={onChange} name="password" placeholder="Password"/><br/><br/>
  
     {/* <button type="button" onClick={saveUser}>Save new User</button> */}
     <input
          type='submit'
          value='Save New User'
          className='btn btn-primary'
        />

</div>
</form>
<p></p>

                    </Card>
                 
                    </div> 
                </div>
           </div>
        
        
    
)}

    export default Apiform;
    