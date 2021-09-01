import axios from 'axios'
import React,{Fragment, useEffect} from 'react'

export const TopAdd = () => {

   // const campaignList=JSON.parse(localStorage.getItem('campaign'))


    //console.log("compaign=",campaignList)
    return (
        <Fragment>
    <div className="col-lg-8 mb-5 offset-md-2">
            <div id="demo" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">

                    {/* {campaignList && campaignList.map((item,index)=>{
                        <Fragment key={item.id}>
                            {console.log('camp=',item.header_url+item.header_file)}
                            <div className="carousel-item">
                                <img src={item.header_url+item.header_file} alt="" className="img-fluid" />
                            </div>
                        </Fragment>
                    })} */}
                     <div className="carousel-item active">
                    <img src="assets/img/ad1.jpg" alt="" className="img-fluid" />
                    </div>

                    <div className="carousel-item">
                    <img src="assets/img/ad2.jpg" alt="" className="img-fluid" />
                    </div>

                    <div className="carousel-item">
                    <img src="assets/img/ad3.jpg" alt="" className="img-fluid" />
                    </div> 
                </div>
                </div>                                        
            </div>
            <div className="col-lg-12">
                <div className="logo-wrapper">
                    <img src="assets/img/logo-01copy.png" alt="" />
                    <div className="logo_header">
                    <img src="assets/img/logo.png" alt="logo" />
                    </div>
                </div>
            </div>
                        
        </Fragment>
    )
}

export default TopAdd