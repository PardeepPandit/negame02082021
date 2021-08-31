import React,{Fragment} from 'react'
import {Link} from 'react-router-dom'
const WordLengthUI=({setWordLengthPopUp,onClick,setWordLength})=>{

    return(
        <Fragment>
        <div className="level-contaienr" id="challenge">
          <div className="level-wrapper">
          <img src="assets/img/right-arrow.png" onClick={()=>setWordLengthPopUp(false)} alt="backbutton" style={{width:'180px'}}/>
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
             {/* <li>
                <Link to="#" onClick={()=>setWordLength(8)}>8</Link>
              </li>
               <li>
                <Link to="#" onClick={()=>setWordLength(9)}>9</Link>
              </li>
              <li>
                <Link to="#" onClick={()=>setWordLength(10)}>10</Link>
              </li>
              <li>
                <Link to="#" onClick={()=>setWordLength(11)}>11</Link>
              </li>
              <li>
                <Link to="#" onClick={()=>setWordLength(12)}>12</Link>
              </li>
              <li>
                <Link to="#" onClick={()=>setWordLength(13)}>13</Link>
              </li>
              <li>
                <Link to="#" onClick={()=>setWordLength(14)}>14</Link>
              </li>
              <li>
                <Link to="#" onClick={()=>setWordLength(15)}>15</Link>
              </li>
              <li>
                <Link to="#" onClick={()=>setWordLength(16)}>16</Link>
              </li> */}
            </ul>
             <button onClick={()=>{
                onClick("4",'Genius')
                setWordLengthPopUp(false)}} style={{color:'black' ,width:'200px',textAlign:'center'}}>Submit</button> 
          </div>
        </div>
      </Fragment>
    )
}

export default WordLengthUI