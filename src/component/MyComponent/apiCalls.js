import React from 'react'
import axios from 'axios'
export const getClientToken=async()=>
{
    const config={
        headers:{
            "Content-Type":"applicatoin/json"
        }
    }
   const res=await axios.get('http://localhost:5000/api/generate/token',config)
console.log(res)
   return res
}


export const makePayment=async(data)=>
{
    console.log("make paymet-",data)

    const config={
        headers:{
            "Content-Type":"applicatoin/json"
        }
    }
    const body=JSON.stringify(data)
    console.log("body=",body)
   const res=await axios.post('http://localhost:5000/api/process/payment',body,config)
    console.log(res)
   return res



  /*  return fetch('http://localhost:5000/api/process/payment',{
       method:"POST",
       headers:{
           "Content-Type":"application/json",
           Accept:"application/json"
       },
       body:JSON.stringify(data)
    
   }).then(response=>console.log("Res==",response.json()))
   .catch(err=>console.log(err)) */
}