import React,{Fragment,useEffect} from 'react';
import {Link} from 'react-router-dom'
import $ from 'jquery'
const Level = ({onClick,levelCheck,setLevelCheck}) => {

  console.log("Level component called")

  useEffect(()=>{
    $(document).ready(function(){
        $("#level").click(function(){
          $("#level").hide();
          setLevelCheck(false)
        });
      });
},[levelCheck])



  return (
  
<Fragment>
<div className="level-contaienr" id='level'>
                <div className="level-wrapper">
                    <ul className="level-list">
                    <li style={{backgroundColor:"lightblue" ,color:'black',fontSize:"25px"}}>Level Payment Model</li>
                    </ul>
                </div>
            </div>
      
</Fragment>
  );
}

export default Level;