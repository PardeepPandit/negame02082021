import React from 'react';

const Payment = () => {

    return (

        <h-me>
           
            <div className="section_card_ga section_card">
                <div className="container">
                    <div className=" row">
                    <div className="col-lg-6 mb-5 offset-md-3"><div className="logo-wrapper"><img src="assets/img/logo-01copy.png" alt="" /><h1>The Never Ending Game</h1></div></div>

                        <div className="col-md-12 ">
                            <div className=" min_top cus-padd">
                                <div className="row">
                                <div className="col-lg-6">
                                    <div className="payment-container">
                                        <div className="payment-wrapper">
                                        <h1>Billing Details</h1>
                                        <label>
                                                <span>Full Name</span>
                                                <input type="" />
                                            </label>
                                            
                                            <label>
                                                <span>Email Address</span>
                                                <input type="" />
                                            </label>

                                            <label>
                                                <span>Country</span>
                                                <input type="" />
                                            </label>

                                            <div className="zod-box">
                                                <label>
                                                    <span>State / City</span>
                                                    <input type="" />
                                                </label>

                                                <label>
                                                    <span>Zip Code</span>
                                                    <input type="" />
                                                </label>
                                            </div>
                                            
                                        </div>



                                        <div className="payment-wrapper">
                                             <h1>Payment</h1>
                                        <label>
                                                <span>Card Number</span>
                                                <input type="" maxlength="16" />
                                         </label>

                                         <label>
                                                <span>Name on Card</span>
                                                <input type="" />
                                         </label>

                                            <div className="zod-box">
                                                <div className="zod-box sub-zod">
                                                    <label>
                                                        <span>Expire Date</span>
                                                        <input type="" placeholder="Month" />
                                                    </label>
                                                    <label>
                                                    <span>&nbsp;</span>
                                                        <input type="" placeholder="Year" />
                                                    </label>
                                                </div>

                                                <label className="ml-5">
                                                    <span>Security Code</span>
                                                    <input type="password" maxlength="3" />
                                                </label>
                                            </div>                                            
                                        </div>


                                        <a href="#" className="order-btn">Place Order</a>

                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="order-summary">
                                        <h3>Order Summary</h3>
                                        <div className="order-wrapper">
                                            <div className="order-zod">
                                            <div className="order-left">
                                                <h4>My first item</h4>
                                            </div>
                                            <div className="cost-right">
                                                <h4>$4.00</h4>
                                            </div>
                                            </div>

                                            <div className="order-zod">
                                            <div className="order-left">
                                                <h4>My first item</h4>
                                            </div>
                                            <div className="cost-right">
                                                <h4>$4.00</h4>
                                            </div>
                                            </div>

                                            <div className="order-zod">
                                            <div className="order-left">
                                                <h4>My first item</h4>
                                            </div>
                                            <div className="cost-right">
                                                <h4>$4.00</h4>
                                            </div>
                                            </div>

                                            <div className="order-total">
                                                <h5>Sub total: <span>$12.00</span></h5>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </h-me>


    );


}

export default Payment;