import React,{ Fragment,useContext,useState}  from 'react'
import HumanContext from './context/human/humanContext'

export const Trophy = ({round}) => {
    const humanContext =useContext(HumanContext)
    const {result_history}=humanContext
    return (
        <Fragment>
            <div class="cup">
                <h2 style={{ color: 'white' }}></h2>
                <ul>
                    <li>
                    <div className="cup_icon">{(round === 1 ? <img className="icon_g" src={process.env.PUBLIC_URL + '/assets/img/blank.png'} alt="trofi*"/> : (result_history[0]=== "loser" ? <img class="icon_g" src={process.env.PUBLIC_URL + 'assets/img/red.png'} alt="trofi"/> : <img className="icon_g" src={process.env.PUBLIC_URL + 'assets/img/green.png'} alt="trofi"/>))}</div>
                    </li>
                    <li>
                    <div className="cup_icon">{(round <=2 ? <img className="icon_g" src={process.env.PUBLIC_URL + '/assets/img/blank.png'} alt="trofi"/> : (result_history[1] === "loser" ? <img class="icon_g" src={process.env.PUBLIC_URL + 'assets/img/red.png'} alt="trofi"/> : <img className="icon_g" src={process.env.PUBLIC_URL + 'assets/img/green.png'} alt="trofi"/>))}</div>
                    </li>
                    <li>
                    <div className="cup_icon">{(round <=3 ? <img className="icon_g" src={process.env.PUBLIC_URL + '/assets/img/blank.png'} alt="trofi"/> : (result_history[2] === "loser" ? <img class="icon_g" src={process.env.PUBLIC_URL + 'assets/img/red.png'} alt="trofi"/> : <img className="icon_g" src={process.env.PUBLIC_URL + 'assets/img/green.png'} alt="trofi"/>))}</div>
                    </li>
                    <li>
                    <div className="cup_icon">{(round <=4 ? <img className="icon_g" src={process.env.PUBLIC_URL + '/assets/img/blank.png'} alt="trofi"/> : (result_history[3] === "loser" ? <img class="icon_g" src={process.env.PUBLIC_URL + 'assets/img/red.png'} alt="trofi"/> : <img className="icon_g" src={process.env.PUBLIC_URL + 'assets/img/green.png'} alt="trofi"/>))}</div>
                    </li>
                    <li>
                    <div className="cup_icon">{(round <=5 ? <img className="icon_g" src={process.env.PUBLIC_URL + '/assets/img/blank.png'} alt="trofi"/> : (result_history[4] === "loser" ? <img class="icon_g" src={process.env.PUBLIC_URL + 'assets/img/red.png'} alt="trofi"/> : <img className="icon_g" src={process.env.PUBLIC_URL + 'assets/img/green.png'} alt="trofi"/>))}</div>
                    </li>      
                    <div class="clear"></div>
                </ul>
                <div class="clear"></div>
            </div>
        </Fragment>
    )
}

export default Trophy
