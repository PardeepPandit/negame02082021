import React,{Fragment, useContext} from 'react'
import YouLose from '../../YouLose'
import YouWin from '../../YouWin'
import PlayOnlineContext from '../context/playOnlineContext'
export const ResultOnline = () => {

const playOnlineContext=useContext(PlayOnlineContext)
const{winner_loser}=playOnlineContext

    return (
        <Fragment>
            {winner_loser==='winner' ? <YouWin/>:<YouLose/>}
        </Fragment>
    )
}

export default ResultOnline
