import React, { Fragment } from 'react'
import ResultOnline from '../playonline/play_online_components/ResultOnline'
import ResultComputer from './ResultComputer'

export const ShowResult = ({resultfor}) => {
    console.log("result for=",resultfor)
    return (
        <Fragment>
            {resultfor==='computer' && <ResultComputer/>}
            {resultfor==='online' && <ResultOnline/>}
        </Fragment>
    )
}

export default React.memo(ShowResult)
