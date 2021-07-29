import React,{ Fragment,useState}  from 'react'
import { useMainConsumer } from '../MyComponent/MainContext'

export const Trophy = ({round}) => {
    const {roundList1,roundList2,roundList3,roundList4,roundList5}=useMainConsumer()
    return (
        <Fragment>
            <div class="cup">
                                    <h2 style={{ color: 'white' }}></h2>
                                    <ul>

                                        <li>
                                        <div className="cup_icon">{(round === 1 ? <img className="icon_g" src={process.env.PUBLIC_URL + '/assets/img/blank.png'} alt="trofi*"/> : (roundList1.r1_loser === "You" ? <img class="icon_g" src={process.env.PUBLIC_URL + 'assets/img/red.png'} alt="trofi"/> : <img className="icon_g" src={process.env.PUBLIC_URL + 'assets/img/green.png'} alt="trofi"/>))}</div>
                                        </li>
                                        <li>
                                        <div className="cup_icon">{(round <=2 ? <img className="icon_g" src={process.env.PUBLIC_URL + '/assets/img/blank.png'} alt="trofi"/> : (roundList2.r2_loser === "You" ? <img class="icon_g" src={process.env.PUBLIC_URL + 'assets/img/red.png'} alt="trofi"/> : <img className="icon_g" src={process.env.PUBLIC_URL + 'assets/img/green.png'} alt="trofi"/>))}</div>
                                        </li>
                                        <li>
                                        <div className="cup_icon">{(round <=3 ? <img className="icon_g" src={process.env.PUBLIC_URL + '/assets/img/blank.png'} alt="trofi"/> : (roundList3.r3_loser === "You" ? <img class="icon_g" src={process.env.PUBLIC_URL + 'assets/img/red.png'} alt="trofi"/> : <img className="icon_g" src={process.env.PUBLIC_URL + 'assets/img/green.png'} alt="trofi"/>))}</div>
                                        </li>
                                        <li>
                                        <div className="cup_icon">{(round <=4 ? <img className="icon_g" src={process.env.PUBLIC_URL + '/assets/img/blank.png'} alt="trofi"/> : (roundList4.r4_loser === "You" ? <img class="icon_g" src={process.env.PUBLIC_URL + 'assets/img/red.png'} alt="trofi"/> : <img className="icon_g" src={process.env.PUBLIC_URL + 'assets/img/green.png'} alt="trofi"/>))}</div>
                                        </li>
                                        <li>
                                        <div className="cup_icon">{(round <=5 ? <img className="icon_g" src={process.env.PUBLIC_URL + '/assets/img/blank.png'} alt="trofi"/> : (roundList5.r5_loser === "You" ? <img class="icon_g" src={process.env.PUBLIC_URL + 'assets/img/red.png'} alt="trofi"/> : <img className="icon_g" src={process.env.PUBLIC_URL + 'assets/img/green.png'} alt="trofi"/>))}</div>
                                        </li>      
                                        <div class="clear"></div>
                                    </ul>
                                    <div class="clear"></div>
                                </div>
        </Fragment>
    )
}

export default Trophy
