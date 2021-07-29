import React,{useState,useEffect} from 'react'
import { getClientToken, makePayment } from './apiCalls'
import DropIn from "braintree-web-drop-in-react"
export const Braintree = () => {
    const [flag,setFlag]=useState(false)   
    const [value,setValue]=useState({
                clientToken:null,
                success:'',
                error:'',
                instance:''
        })
useEffect(() => {
   
   getToken()
    
}, [])
const {clientToken,success,error,instance}=value
const getToken=()=>{
    getClientToken().then(response=>{
        if(response.data.err){
            setValue({...value,error:response.data.err})
        }
        else{
            setValue({...value,clientToken:response.data.clientToken})
        }
        console.log("New Response=",response.data.clientToken)
    })
}

console.log("values==",value)

const onPurchase=()=>{
    instance.requestPaymentMethod().
    then(data=>{
        let nonce=data.nonce
        let paymentData={
            payment_method_nonce:nonce,
            amount:"10.00"
        }
    
        console.log("paymentData=",paymentData)
     makePayment(paymentData).then(response=>{
         console.log("RESPONSE=",response)
        if(response.err)
        {
            setValue({...value,error:response.err})
        }
        else{
            setValue({...value,error:'',success:response.success})
        }
    }).catch(err=>setValue({...value,error:err,success:''}))
    }
    )
}

    return (
        <div>
            {/* <button onClick={()=>setFlag(true)}>Braintree</button> */}
            {clientToken && (
                <div>
                <DropIn
                options={{ authorization: clientToken }}
                onInstance={(instance) =>setValue({...value,instance:instance})}
              />
              <button onClick={()=>onPurchase()}>Buy</button>
              </div>
            )}
            {!clientToken && <h1>Loading...</h1>}
        </div>
    )
}

export default Braintree
