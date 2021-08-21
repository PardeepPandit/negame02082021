
import React, { Fragment,useContext} from 'react'
import {Link} from 'react-router-dom'
import {useMainConsumerUpdate} from './MainContext'
import HumanContext from './context/human/humanContext'
import CommonContext from './context/common/commonContext'

export const FinalResult = ({title}) => {

  const commonContext=useContext(CommonContext)
  const {resetCommonState}=commonContext

  const humanContext=useContext(HumanContext)
  const {getRandomWordFromApi,random_word,resultWord,removeLocalData,winner_counter,loser_counter,final_result_HC,changeMatchStatusHC,resetHumanState}=humanContext

  const {data}=final_result_HC || {}
    const {setHintCheck,setFinish}=useMainConsumerUpdate();

     console.log("data=",data)

    const redirect = () => {
        console.log("Rdirect function word list",random_word)
        resetCommonState()
        resetHumanState()
        removeLocalData()
       setHintCheck(true)
       setFinish(false)

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
          <h2 class="word">{winner_counter > loser_counter ? <span style={{color:"cyan",fontSize:"4rem"}}>Winner</span> : "You Lost"}</h2>
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
                          <h2 class="text-white round-text">Round</h2>
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
                    <Link to='/dashboard' className='play-again' onClick={()=>redirect()}>Next Match</Link>
                  </div>
                </div>
                </div>
                </div>

                </div>
                </div>
        </Fragment>
    )
}

export default FinalResult