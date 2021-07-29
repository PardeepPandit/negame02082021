import React, { Fragment ,useContext} from 'react'
import MasterContext from './MyComponent/context/master/masterContext'
export const NoData = () => {
    const masterContext=useContext(MasterContext)
    const {showPopup,togglePopup}=masterContext
    return (

        <Fragment>
           <div className='popup'>
                <div className='popup_inner'>
                    <h1 className="win-text lose-text nodata">No Data Found</h1>
                    <button onClick={togglePopup}>close me</button>
                </div>
            </div>
        </Fragment>


    );


}

export default NoData