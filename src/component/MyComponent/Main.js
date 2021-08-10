import React, { useState, useEffect, Fragment,useContext } from 'react'
import Vscomputer from '../Vscomputer'
import AuthContext from './context/auth/authContext'

export const Main =() => {

  //const {level}=match.params

  const authContext=useContext(AuthContext)
  const {login_data}=authContext
  const {level}=login_data
  //console.log("Level in main=",level)

   useEffect(() => {
    window.addEventListener('beforeunload', alertUser)
    return () => {
      window.removeEventListener('beforeunload', alertUser)
 
    }
  }, [])

  
  const alertUser = e => {
    e.preventDefault()
    e.returnValue = ''
  } 
  
  return (
    <Fragment>
      {/* {JSON.stringify(wordList)} */}
    <Vscomputer level={level}/>
    </Fragment>

  )
}
export default Main