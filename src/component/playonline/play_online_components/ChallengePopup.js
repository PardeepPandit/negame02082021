import Reac,{Fragment,useContext} from 'react';
import { Link } from 'react-router-dom';
import PlayOnlineContext from '../context/playOnlineContext';
import { useTimerConsumerUpdate } from '../../MyComponent/TimerContext';
import CommonContext from '../../MyComponent/context/common/commonContext'


const ChallengePopup = () => {

        const commonContext =useContext(CommonContext)
        const {setInputText,setSeconds}=commonContext


    const playOnlineContext=useContext(PlayOnlineContext)
    const {setPopup}=playOnlineContext
    const {resetTime}=useTimerConsumerUpdate();

    return (

        <Fragment>
           
            <div className="section_card_ga section_card">
                <div className="container">
                    <div className=" row">
                    <div className="col-lg-6 mb-5 offset-md-3"><div className="logo-wrapper"><img src="assets/img/logo-01copy.png" alt="" /><h1>The Never Ending Game</h1></div></div>

                        <div className="col-md-12 ">
                            <div className=" min_top cus-padd">
                                <div className="win-container">
                                    <div className="win-wrapper">
                                        <div className="star-box">
                                            <ul className="star-list">
                                            <li><img src="assets/img/star2.png" alt="" /></li>
                                            <li><img src="assets/img/star2.png" alt="" /></li>
                                            <li><img src="assets/img/star2.png" alt="" /></li>
                                            </ul>
                                        </div>
                                            
                                        <h1><span style={{color:'white'}}>YOU HAVE BEEN CHALLENGED BY THE OPPONENT</span></h1>
                                        <h1><span style={{color:'white'}}>NOW COMPLETE A WORD</span></h1>
                                        <button onClick={()=>{
                                            setSeconds()
                                            console.log("SET INPUT TEXT 6")
                                            setInputText('')
                                            setPopup(true)}} className="play-again">OK</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </Fragment>


    );
}

export default ChallengePopup;