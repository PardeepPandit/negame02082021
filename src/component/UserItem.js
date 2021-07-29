import React from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Useritem=({user:{players_name,user_id,position,total_points},target})=> {
    
   console.log("Target=",target)
   return(
      <div >
           {target==='ranklist'&& 
            <Fragment>
                  <strong>{position}</strong> <strong>{players_name}</strong> <strong>{total_points}</strong>
                  <div>
                  <Link to={`/profile/${user_id}/${position}/${total_points}`} className="btn btn-dark" alrt="no imge">View Profile</Link>
                  </div>
            </Fragment> }
            {target==='rank_list_empty' && 
            <Fragment>
               <h1>No Data Found!</h1>
            </Fragment>}
            {target==='topcountry' && 
            <Fragment>
               <div className="top-panel">
                  <h2>{position}</h2>
                  <div className="top-names">
                     <h3>{players_name}</h3>
                     <h3>{total_points}</h3>
                  </div>
                  <div>
                  <Link to={`/profile/${user_id}/${position}/${total_points}`} className="btn btn-dark" alrt="no imge">View Profile</Link>
                  </div>
               </div>
            </Fragment>
            } 
            {target==='agefilter' &&
            <Fragment>
                  <div className="col-lg-12">
                        <div className="top-panel">
                           <h2>{position}</h2>
                           <div className="top-names">
                           <h3>{players_name}</h3>
                           <h3>{total_points}</h3>
                           </div>
                        </div>
                  </div>
             </Fragment>
            }
      </div>
    )
  
}

export default Useritem