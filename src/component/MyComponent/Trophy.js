import React,{ Fragment,useContext,useState}  from 'react'
import HumanContext from './context/human/humanContext'

export const Trophy = ({round}) => {
    const humanContext =useContext(HumanContext)
    const {result_history}=humanContext
    return (
        <Fragment>
                

                    <div class="tropy">
                    {(round === 1 ? <img className="img-fluid" src={process.env.PUBLIC_URL + '/assets/img/blank-2.png'} alt="trofi*" width="70" /> : (result_history[0]=== "loser" ? <img class="img-fluid" src={process.env.PUBLIC_URL + 'assets/img/red-cup.png'} alt="trofi" width="70" /> : <img className="img-fluid" src={process.env.PUBLIC_URL + 'assets/img/green-cup.png'} alt="trofi" width="70" />))}
                    </div>

                    <div class="tropy">
                    {(round <=2 ? <img className="img-fluid" src={process.env.PUBLIC_URL + '/assets/img/blank-2.png'} alt="trofi" width="70" /> : (result_history[1] === "loser" ? <img class="img-fluid" src={process.env.PUBLIC_URL + 'assets/img/red-cup.png'} alt="trofi" width="70" /> : <img className="img-fluid" src={process.env.PUBLIC_URL + 'assets/img/green-cup.png'} alt="trofi" width="70" />))}
                    </div>

                    <div class="tropy">
                    {(round <=3 ? <img className="img-fluid" src={process.env.PUBLIC_URL + '/assets/img/blank-2.png'} alt="trofi" width="70" /> : (result_history[2] === "loser" ? <img class="img-fluid" src={process.env.PUBLIC_URL + 'assets/img/red-cup.png'} alt="trofi" width="70" /> : <img className="img-fluid" src={process.env.PUBLIC_URL + 'assets/img/green-cup.png'} alt="trofi" width="70" />))}
                    </div>

                    <div class="tropy">
                    {(round <=4 ? <img className="img-fluid" src={process.env.PUBLIC_URL + '/assets/img/blank-2.png'} alt="trofi" width="70" /> : (result_history[3] === "loser" ? <img class="img-fluid" src={process.env.PUBLIC_URL + 'assets/img/red-cup.png'} alt="trofi" width="70" /> : <img className="img-fluid" src={process.env.PUBLIC_URL + 'assets/img/green-cup.png'} alt="trofi" width="70" />))}
                    </div>

                    <div class="tropy">
                    {(round <=5 ? <img className="img-fluid" src={process.env.PUBLIC_URL + '/assets/img/blank-2.png'} alt="trofi" width="70" /> : (result_history[4] === "loser" ? <img class="img-fluid" src={process.env.PUBLIC_URL + 'assets/img/red-cup.png'} alt="trofi" width="70" /> : <img className="img-fluid" src={process.env.PUBLIC_URL + 'assets/img/green-cup.png'} alt="trofi" width="70" />))}
                    </div>
                    <div class="clear"></div>
            
                <div class="clear"></div>
        </Fragment>
    )
}

export default Trophy
