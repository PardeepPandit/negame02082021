import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import {

  Container,
  Row,
  Col,
 
} from 'reactstrap';


import react from   "./header.css";


const Word = (props) => {
  
  return (
  
<h-me>
    
<header class="mt-1 to_P">
        <div class="container">

            <div class="row">
                <div class="col-md-2 col-2">
                    <div class=" text-center">
                        <img class="t_image" src="assets/img/images.jpg" alt="logo" />
                    </div>
                </div>
                <div class="col-md-8  col-8">
                    <div class=" text-center">
                       <h1 class="text-white hed">Never Ending Game</h1>
                    </div>
                </div>
                <div class="col-md-2  col-2">
                    <div class=" text-center">
                       <NavLink to="/setting"> <img class="t_image" src="assets/img/settings.png" alt="logo" /></NavLink>
                    </div>
                </div>
            {/* <!-- top-input--> */}
         
        </div>
    </div>
    </header>
    <div class="section_card pt-5">
    <div class="container">
        <div class=" row">
            <div class="col-md-8 offset-md-2 ">
               <div class=" min_top  ">
               <div class="ledt_img">
               <img class="t_image_s" src="assets/img/image1.jpg" alt="logo" />
               </div>
                <div class="ledt_img_mid">
                    <span>VS</span>
                </div>
            
                <div class="ledt_img">
                <img class="t_image_s" src="assets/img/desk.png" alt="" />
                </div>
                <div class="clear"></div>

                <div class="cup">
               <ul>
                   <li>
                       <div class="cup_icon"><i class="fa fa-trophy" aria-hidden="true"></i></div>
                   </li>
                   <li>
                       <div class="cup_icon"><i class="fa fa-trophy" aria-hidden="true"></i></div>
                   </li>

                   <li>
                       <div class="cup_icon"><i class="fa fa-trophy" aria-hidden="true"></i></div>
                   </li>
                   <li>
                       <div class="cup_icon"><i class="fa fa-trophy" aria-hidden="true"></i></div>
                   </li>
                   <li>
                       <div class="cup_icon"><i class="fa fa-trophy" aria-hidden="true"></i></div>
                   </li>
                   <div class="clear"></div>
               </ul>
               <div class="clear"></div>
                </div>

                <div class="half">
                    <div class="left_s"><a href=""><i class="fa fa-clock-o" aria-hidden="true"></i></a></div>
                    <div class="left_s"><span><b>00:00:50</b></span></div>
                    <div class="clear"></div>
                </div>

                <div class="btn_b">
                    <a  href=""><b>ROUND : 1</b></a>
                </div>
                <div class="btn_b2">
                    <a  href=""><b>AbfDc</b></a>
                </div>


                   <div class="in_put btn">
                   <div class="btn_b blue">
                    <a  href=""><b>Abdc</b></a>
                </div>
               
                <div class="btn_b time">
                    <a  href=""><b><i class="fa fa-times" aria-hidden="true"></i></b></a>
                </div>
                <div class="clear"></div>
                   </div>

               </div>
            </div>
        </div>
                
           </div> 
           </div>
      
</h-me>


  );


}

export default Word;