import { param } from 'jquery'
import React,{useRef,useEffect} from 'react'
import ReactDOM from "react-dom"
import { useParams } from 'react-router'

export const PayPal = ({match}) => {

    const {price}=match.params
    console.log("PRICE=",price)
  const paypal=useRef()
        useEffect(()=>{
 window.paypal.Buttons({
                        createOrder:(data,actions,err)=>{
                            return actions.order.create({
                                intent:"CAPTURE",
                                purchase_units:[
                                    {
                                        description:"Cool looking table",
                                        amount:{
                                            currency_code:"USD",
                                            value:price
                                        }
                                    }
                                ]
                            })
                        },
                        onApprove:async(data,actions)=>{
                            const order=await(actions.order.capture)();
                            console.log("Order Successful...",order);
                        },
                        onError:(err)=>{
                            console.log("Order failed=",err)
                        }
                }).render(paypal.current)
               
        },[]) 
    return (
        <div>
                <div ref={paypal}></div>        
        </div>
    )
}

export default PayPal 