import React from "react";
 
const ExitPopup = (props) => {

  return (
    <div className="popup-box">
      <div className="box">
          <h2>Hint : {props.hint ? props.hint : "Only one hint per match is allowed"} </h2>
        <button onClick={props.handleClose}>OK</button>
      </div>
    </div>
  );
};
 
export default ExitPopup;