import React, { Fragment,useEffect,useContext } from 'react';
import {Link} from 'react-router-dom'
import $ from 'jquery'
const Challenge = () => {

  /*   useEffect(()=>{
        $(document).ready(function(){
            $("#challenge").click(function(){
              $("#challenge").hide();
            });
          });
    },[showLevel]) */


    return (

        <Fragment>
            <div className="level-contaienr" id='challenge'>
                <div className="level-wrapper">
                <span >X</span>
                    <ul className="level-list">
                    <li><Link to="#">Check Word</Link></li>
                    <li><Link to="#">Complete Word</Link></li>
                    </ul>
                </div>
            </div>
        </Fragment>
    );
}

export default Challenge;