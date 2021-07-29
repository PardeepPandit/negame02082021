import React,{useReducer,useEffect} from 'react'
import axios from 'axios'
import masterReducer from '../master/masterReducer'
import MasterContext from '../master/masterContext'
import { PLAY,COUNTRY_LIST,STATE_LIST,CITY_LIST,SET_LOADING,PLAN_DETAILS,POPUP} from '../../../../type'
const MasterState=({children})=>{

const initialState={
    playing:false,
    countryList:[],
    stateList:[],
    cityList:[],
    planDetails:[],
    loading:false,
    showPopup:true
}

const [state,dispatch]=useReducer(masterReducer,initialState);


useEffect(async()=>{
    setLoading()
    const config={
        headers:{
          'APPKEY' :'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
        }
      }
    
      const res=await axios.get(process.env.REACT_APP_BASEURL+'/api/countries',config)
        //console.log("country=",res.data.data)
        dispatch({
            type:COUNTRY_LIST,
            payload:res.data.data
        })
        //setCountryList(res.data.data)
},[])

const togglePopup=()=>{
  dispatch({
    type:POPUP
  })
}

const getStateList=async(countryInfo)=>{
    const {id,name,sortname,phonecode,status}=countryInfo
    setLoading()
    const config={
        headers:{
          'APPKEY' :'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
        }
      }
    
      const res=await axios.get(process.env.REACT_APP_BASEURL+`/api/states?country_id=${id}`,config)
        //console.log("country=",res.data.data)
        dispatch({
            type:STATE_LIST,
            payload:res.data.data
        })
        //setCountryList(res.data.data)
}
const getCityList=async(stateInfo)=>{
    const {id,name,sortname,phonecode,status}=stateInfo
    setLoading()
    const config={
        headers:{
          'APPKEY' :'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
        }
      }
    
      const res=await axios.get(process.env.REACT_APP_BASEURL+`/api/cities?state_id=${id}`,config)
        //console.log("country=",res.data.data)
        dispatch({
            type:CITY_LIST,
            payload:res.data.data
        })
        //setCountryList(res.data.data)
}

const setPlaying=(info)=>{
    console.log("setPlaying function called",info)
    dispatch({
      type:PLAY,
      payload:info
    })
  }

const setLoading=()=>{
    dispatch({
        type:SET_LOADING
    })
}



const updateProfile=async(formData)=>{
    console.log("update formData=",formData)
  const config={
    headers:{
      'APPKEY' :'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
    }
  }

  const res=await axios.post(process.env.REACT_APP_BASEURL+'/api/user/update/profile',formData,config) 

  console.log("Profile update result=",res.data)


}


  const getPlanDetails=async()=>{
    const config={
      headers:{
        'APPKEY' :'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
      }
    }
  
    const res=await axios.get(process.env.REACT_APP_BASEURL+'/api/plans',config) 
  
    console.log("Response from choosePlan=",res.data)

    dispatch({
      type:PLAN_DETAILS,
      payload:res.data.data
    })
  
  }


    return(
        <MasterContext.Provider
        value={{
            playing:state.playing,
            countryList:state.countryList,
            stateList:state.stateList,
            cityList:state.cityList,
            planDetails:state.planDetails,
            loading:state.loading,
            showPopup:state.showPopup,
            getStateList,
            getCityList,
            setPlaying,
            updateProfile,
            getPlanDetails,
            togglePopup
        }}>
            {children}
        </MasterContext.Provider>
    )
}

export default MasterState