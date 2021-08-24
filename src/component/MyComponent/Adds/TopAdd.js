import React,{Fragment} from 'react'

export const TopAdd = () => {
    return (
        <Fragment>
            <div className="col-lg-8 mb-5 offset-md-2">
                    <div id="demo" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
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