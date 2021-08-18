import React,{Fragment} from 'react'
import {Link} from 'react-router-dom'
const WordLengthUI=({setWordLengthPopUp,onClick,setWordLength})=>{

    return(
        <Fragment>
        <div className="level-contaienr" id="challenge">
          <div className="level-wrapper">
            <h1 >Please Select Word Length</h1>
            <ul className="level-list">
              <li>
                <Link to="#" onClick={()=>setWordLength(5)}>5</Link>
              </li>
              <li>
                <Link to="#" onClick={()=>setWordLength(7)}>7</Link>
              </li>
              <li>
                <Link to="#" onClick={()=>setWordLength(9)}>9</Link>
              </li>
            </ul>
            <button onClick={()=>{
                onClick("4",'genius')
                setWordLengthPopUp(false)}} style={{color:'black'}}>Submit</button>
          </div>
        </div>
      </Fragment>
    )
}

export default WordLengthUI