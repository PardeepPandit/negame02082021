import React, {Fragment} from 'react'
import { Link } from 'react-router-dom';

const EasyGameLevel = (props) => {
    
  
  return (
    <Fragment>

        <div className="section_card_ga">
          <div className="container">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <div className="choice-box">
                    <div className="choice-left">
                        <h2>Easy</h2>
                        <h3>Play letters only behind</h3>
                        <h4>Click here for the rules <Link href="#">Young</Link> <Link href="#">Adults</Link></h4>
                    </div>
                   <button ><img src="assets/img/play2.png" alt="" width="200" /></button> 
                </div>
              </div>
            </div>
          </div>
        </div>
        
    </Fragment> 
      );


}

export default EasyGameLevel;