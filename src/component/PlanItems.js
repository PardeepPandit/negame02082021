import React,{ Fragment,useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import $ from 'jquery'
import PayPal from './MyComponent/PayPal'
export const PlanItems = ({item,activeFun,setCheckOut,checkout,setMoney,active}) => {
    //const [checkout,setCheckOut]=useState(false)
  /*     useEffect(()=>{
           $(document).ready(function () {
            $(".plan-box").on('click', function () {
        if ($(this).hasClass("open")) {
                    $(this).removeClass("open")
                } else
                {
                   $(".plan-box").removeClass("open")
                    $(this).addClass("open")
                }
            })
        }) 
    },[checkout])   */
  
    /* const onClick=()=>{
       
        console.log("onClick")
        activeFun()
        setCheckOut(true)
    } */
/*  useEffect(()=>{
    setTimeout(()=>{
            setCheckOut(false)
    },5000)
},[])  */

const setDetails=(flag,money)=>{
    console.log("SET detail called",money)
 
        setCheckOut(flag)
        setMoney(money)
        activeFun()
}

    const divColor=active
    console.log("PlanItems==",item)
    return (
        <Fragment>
            
          <div className="col-lg-4" >
            <div className="plan-box" onClick={()=>setDetails(true,item.price)} >
                <div> 
                    <h2>{item.title}</h2>
                    <h3>{item.type}</h3>
                    <h3>{item.price} {item.duration}</h3>
                </div>
            </div>
            </div>
          {/* {checkout? (<Fragment><PayPal/>{setTimeout(()=>{setCheckOut(false)},5000) }</Fragment> ):(<Fragment><div className="col-lg-4">
            <div className="plan-box" onClick={onClick}>
                <div > 
                    <h2>{item.title}</h2>
                    <h3>{item.type}</h3>
                    <h3>{item.price} {item.duration}</h3>
                </div>
            </div>
            </div></Fragment>)} */}
       
            
        </Fragment>
    )
}

export default PlanItems