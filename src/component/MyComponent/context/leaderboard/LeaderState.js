import React,{useReducer,useContext} from 'react'
import axios from 'axios'
import LeaderContext from './leaderContext'
import leaderReducer from './leaderReducer'
import AuthContext from '../auth/authContext'
import AlertContext from '../alert/alertContext'
import {LOAD_LEADERBOARD_RANK_SUCCESS,
    LOAD_LEADERBOARD_RANK_FAIL,
    SET_LOADING,
    SET_ALERT,
    LOAD_HINTS_SUCCESS,
    LOAD_HINTS_FAIL,
    LOAD_TOP_COUNTRY_SUCCESS,
    LOAD_TOP_COUNTRY_FAIL,
    AGE_30_0_SUCCESS,
  AGE_0_15_SUCCESS,
AGE_15_30_SUCCESS} from '../../../../type'

const LeaderState=({children})=>{
    const initialState={
        rankList:null,
        top_country:null,
        user_by_age30:null,
        user_by_age15:null,
        user_by_age0:null,
        hints:null,
        error:null,
        loading:true
    }
        const authContext=useContext(AuthContext)
        const {user}=authContext
        const alertContext=useContext(AlertContext)
        const {setAlert}=alertContext


        const [state,dispatch]=useReducer(leaderReducer,initialState)


        const loadRank=async(id)=>{
            const config={
                headers:{
                  'Content-Type':'application/json',
                  'APPKEY' : 'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
                }
              }
              console.log("Request for Ranklist id=",id)
            setLoading()
              try {
                   const res=await axios.get(process.env.REACT_APP_BASEURL+`/api/leaderboard?id=${id}&level=1`,config)
            
                console.log("Responce from Rank=",res.data)
                if(JSON.stringify(res.data.status)==='200'){
                  dispatch({
                      type:LOAD_LEADERBOARD_RANK_SUCCESS,
                      payload:res.data
                  })
              }
              console.log("rank status------>",JSON.stringify(res.data.status)==='400')
                if(JSON.stringify(res.data.status)==='400'){
                  console.log("Responce rankloader=",res.data.status)
                  dispatch({
                      type:LOAD_LEADERBOARD_RANK_SUCCESS,
                      payload:res.data.error_message
                  })
              }
               // setAlert('RANK LOADED SUCCESS','success')
              } catch (error) {
                  dispatch({
                      type:LOAD_LEADERBOARD_RANK_FAIL,
                      payload:error
                  })
                  //setAlert('RANK LOADING FAIL','danger')
              }
               
        }


        const userHints=async(id)=>{
            const config={
                headers:{
                  'Content-Type':'application/json',
                  'APPKEY' : 'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
                }
              }
            setLoading()
              try {
                   const res=await axios.get(process.env.REACT_APP_BASEURL+`/api/userHints?user_id=${id}`,config)
            
                console.log("Responce from userHints*********=",res.data.count)

                dispatch({
                    type:LOAD_HINTS_SUCCESS,
                    payload:res.data.count
                })
                //setAlert('HINT LOADED SUCCESS','success')
              } catch (error) {
                  dispatch({
                      type:LOAD_HINTS_FAIL,
                      payload:error
                  })
                  //setAlert('HINT LOADING FAIL','danger')
              }
               
        }

        const topCountry=async(id)=>{
            const config={
                headers:{
                  'Content-Type':'application/json',
                  'APPKEY' : 'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
                }
              }
            console.log("TOP country ID=",id)
              setLoading()
                const res=await axios.get(process.env.REACT_APP_BASEURL+`/api/countryLeaderBoard?id=${id}`,config)
            
                console.log("Responce from CountryRank**=",res.data)
                dispatch({
                    type:LOAD_TOP_COUNTRY_SUCCESS,
                    payload:res.data.data
                })
                //setAlert("TOP COUNTRY LOADED",'success')
        }

        const filterByAge=async(id,from,to,agetype)=>{
            const config={
                headers:{
                  'Content-Type':'application/json',
                  'APPKEY' : 'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
                }
              }
            console.log("Filter by age ID=",id,",",from,",",to)
              setLoading()
        const res=await axios.get(process.env.REACT_APP_BASEURL+`/api/ageLeaderBoard?id=${id}&from=${from}&to=${to}`,config)
            
                console.log("Responce from AgeFilter**=",res.data)
               agetype==='elder' &&  dispatch({
                    type:AGE_30_0_SUCCESS,
                    payload:res.data.data
                })
               agetype==='adult' &&  dispatch({
                    type:AGE_15_30_SUCCESS,
                    payload:res.data.data
                })
               agetype==='teen' &&  dispatch({
                    type:AGE_0_15_SUCCESS,
                    payload:res.data.data
                })


                //setAlert("Filter by Age",'success')
        }



const setLoading=()=>{
    dispatch({
        type:SET_LOADING,
    })
}
    return(
        <LeaderContext.Provider
        value={{
            rankList:state.rankList,
            loading:state.loading,
            error:state.error,
            hints:state.hints,
            top_country:state.top_country,
            user_by_age30:state.user_by_age30,
            user_by_age15:state.user_by_age15,
            user_by_age0:state.user_by_age0,
            loadRank,
            setLoading,
            userHints,
            topCountry,
            filterByAge
        }}>
            {children}
        </LeaderContext.Provider>
    )
}


export default LeaderState