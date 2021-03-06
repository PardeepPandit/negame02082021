
import React, { Fragment,useContext} from 'react'

import {Link} from 'react-router-dom'

import CommonContext from  '../../MyComponent/context/common/commonContext'
import PlayOnlineContext from '../context/playOnlineContext'


export const FinalResultOnline = ({title}) => {

  const commonContext=useContext(CommonContext)
  const {setInputText,setIsActive,setSeconds,resetCommonState }=commonContext

  const playOnlineContext=useContext(PlayOnlineContext)
  const {final_result_winner_counter,final_result_data,resetStateHHForMatch,setRoundResult,finalResultCounter,onlineMatchFinish}=playOnlineContext

    const {data}=final_result_data || {}

    

    const onClick=()=>{
          resetStateHHForMatch(true)
          resetCommonState()
          localStorage.removeItem('current_status')
          finalResultCounter(null)
          setRoundResult(null)
          setInputText('')
          setIsActive(false)
          setSeconds(60)
          //searchUserOnline('opponent_not_found')
    }


    return (
        <Fragment>
            <div class="mod_contany section_card section_card_ga text-center">
<div class="container">
  <div class="over_lay"></div>
  <div class="round_match">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="top-middl_lost text-center">
          <h2 style={{color:"White",fontSize:"4rem"}} className="bg-info">Final Result</h2>
          <h2 class="word">{final_result_winner_counter ===3 ? <span style={{color:"cyan",fontSize:"4rem"}}>You Win</span> : "You Lost"}</h2>
          <div class="clear"></div>
          </div>
          </div>
          </div>
          <div class="row">
            <div class="col-md-10 offset-md-1">
              <div class="trofi">



                  {data && data.rounds.map((item)=>{
                      return <Fragment key={item.id}> 
                    {item.status==='0' ? <img src="assets/img/red.png" alt="img"/> :<img src="assets/img/green.png" alt="img"/>}
                  </Fragment>})}

                    <div class="clear"></div></div>
                    </div>
                    </div>

                    <div class="row">
                    <div class="col-md-8 offset-2">
                    <div class="row">
                      <div class="col-md-6">
                         <div class="round1">
                          <h2 class="text-white round-text">Round</h2>
                          {data && data.rounds.map((item,index)=>(<Fragment key={item.id}> <p><strong class="text-white">Round {index+1}</strong></p></Fragment>))}

                        </div> 
                      </div>
                        <div class="col-md-6">
                            <div class="round1">
                              <h2 class="text-white round-text">Status</h2>


                              {data && data.rounds.map((item,index)=>(<Fragment key={item.id}>
                                <p><strong class="text-white">{item.status==='0' ? 'Lost' : "Win"}</strong></p>
                              </Fragment>))}
                            </div>
                          </div>
                        </div>
                        </div>
                        </div>
          <div class="row">
            <div class="col-md-12">
            <div className="new_mtch_btn">
                   {/* <a href="#" style={{"font-size": "26px;"}}> New Match</a> */}
                   {/* <button className='btn btn-info next_r' onClick={redirect}>Next Match</button> */}
                    <Link to='/dashboard'  onClick={()=>onClick()} className='play-again'>New Match-HH</Link>
                 
                  </div>
                </div>
                </div>
                </div>

                </div>
                </div>
        </Fragment>
    )
}

export default FinalResultOnline