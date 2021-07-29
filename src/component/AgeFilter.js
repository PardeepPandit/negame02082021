import React from 'react'
import { Fragment } from 'react'
import UserItem from './UserItem'
export const AgeFilter = ({user_by_age}) => {
    console.log("Age Filter**=",user_by_age)
    return (
        <Fragment>
                {user_by_age && user_by_age.map((list)=>{
                  return <UserItem key={list.user_id} user={list} target="agefilter"/>
                })} 
        </Fragment>
    )
}

export default AgeFilter
