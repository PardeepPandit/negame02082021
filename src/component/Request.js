
import React  from 'react';
import { NavLink } from 'react-router-dom';

import {
    
  Container,
  Row,
  Col,
 
} from 'reactstrap';


import react from   "./header.css";




const Request = () => {
  
  return (
  
<div>
    
<div className=" setting ">

<header className="play">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <div className="serc_h_fr">
            <input type="text"  placeholder="Serch Neegame" />
          </div>
        </div>
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-8">
              <div classNameName="friend">

       <ul className="nav nav-tabs">
    <li className="nav-item">
      <NavLink className="nav-link " to="/playfrind">My Friends</NavLink>
    </li>
    <li className="nav-item">
   
      <NavLink className="nav-link active" to="/request">friend Request</NavLink>
    </li>
    <li className="nav-item">
     
      <NavLink className="nav-link " to="/sent">Sent Request</NavLink>
    </li>
  </ul>
              </div>
            </div>
            <div className="col-md-4">
              <div className="acount">
               <div className="user"> <img src="assets/img/usericon.png" alt="user" /> <span>Ved</span>
               <i className="fa fa-plus"></i>
               <i className="fa fa-bell-o" aria-hidden="true"></i>
               </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  {/* ------header-end----- */}

{/* ------main------ */}
<div className="main">
            <div class="container-fluid ms">
              <div class="row">
                <div class="col-md-4">
                  <div class="side_left">
                  <div class="s_top">
                        <strong>All Friend</strong>
                        <strong class="pull-right"><i class="fa fa-cog" aria-hidden="true"></i></strong>
                      </div>
                      <div class="friends">
           
          <div class="friends_all bor">
              <div class="rewuest_r">
                <img src="assets/img/usericon.png" alt="img"  />
              </div>
               <div class="friends_img">
               <p><strong><a href="">All</a></strong></p>
              </div>
              
            </div>
              <div class="friends_all bor">
              <div class="rewuest_r">
                <img src="assets/img/chat.jpg" alt="img"  />
              </div>
               <div class="friends_img">
               <p><strong><a href="">Post</a></strong></p>
              </div>
              
            </div>
              <div class="friends_all bor">
              <div class="rewuest_r">
                <img src="assets/img/edit.jpg" alt="img"  />
              </div>
               <div class="friends_img">
               <p><strong><a href="">Vedio</a></strong></p>
              </div>
              
            </div>
              <div class="friends_all bor">
              <div class="rewuest_r">
                <img src="assets/img/chat.jpg" alt="img"  />
              </div>
               <div class="friends_img">
               <p><strong><a href="">Chat</a></strong></p>
              </div>
              
            </div>
              <div class="friends_all bor">
              <div class="rewuest_r">
                <img src="assets/img/usericon.png" alt="img"  />
              </div>
               <div class="friends_img">
               <p><strong><a href="">Live</a></strong></p>
              </div>
              
            </div>
        
           
            </div>


                  </div>
                  
                </div>
                <div class="col-md-8">
                  <div class="right-containr">
                    <div class="ma_contant">
        
                    <div class="tab-content">
            <div id="home" class="container tab-pane fade ">
            <h3 className="frien_d">Online Friends</h3>
            <div class="myfriends">
              
              <div class="user_avel">
              <a href="#">
                <img src="assets/assets/img/usericon.png"  alt="av"/> <span><strong>Vedpal</strong></span> <span class="av pull-right"> Available  <span class="cri"></span></span>
                </a>
              </div>
              <div class="user_avel">
              <a href="#">
                <img src="assets/assets/img/usericon.png"  alt="av"/> <span><strong>Vedpal</strong></span> <span class="av pull-right"> Available  <span class="cri"></span></span>
                </a>
              </div>
              <div class="user_avel">
              <a href="#">
                <img src="assets/assets/img/usericon.png"  alt="av"/> <span><strong>Vedpal</strong></span> <span class="av pull-right"> Available  <span class="cri"></span></span>
                </a>
              </div>
              <div class="user_avel">
              <a href="#">
                <img src="assets/assets/img/usericon.png"  alt="av"/> <span><strong>Vedpal</strong></span> <span class="av pull-right"> Available  <span class="cri"></span></span>
                </a>
              </div>
              <div class="user_avel">
              <a href="#">
                <img src="assets/assets/img/usericon.png"  alt="av"/> <span><strong>Vedpal</strong></span> <span class="av pull-right"> Available  <span class="cri"></span></span>
                </a>
              </div>
              <div class="user_avel">
              <a href="#">
                <img src="assets/assets/img/usericon.png"  alt="av"/> <span><strong>Vedpal</strong></span> <span class="av pull-right"> Available  <span class="cri"></span></span>
                </a>
              </div>
              <div class="user_avel">
              <a href="#">
                <img src="assets/assets/img/usericon.png"  alt="av"/> <span><strong>Vedpal</strong></span> <span class="av pull-right"> Available  <span class="cri"></span></span>
                </a>
              </div>
              <div class="user_avel">
              <a href="#">
                <img src="assets/assets/img/usericon.png"  alt="av"/> <span><strong>Vedpal</strong></span> <span class="av pull-right"> Available  <span class="cri"></span></span>
                </a>
              </div>
            </div>
            </div>
            <div id="menu1" class="container tab-pane  active"><br/>
            <div id="home" class="container tab-pane active">
                  <h3 class="frien_d">Sent Request</h3>
                  <div class="myfriends">
      
      <div class="user_avel">
       <a href="#">
        <img src="assets/img/usericon.png" alt="av"/> <span><strong>Vedpal</strong></span> <span class="av pull-right r_eq"> <i class="fa fa-user-plus" aria-hidden="true"></i>  </span>
        </a>
      </div>
      <div class="user_avel">
       <a href="#">
        <img src="assets/img/usericon.png" alt="av"/> <span><strong>Vedpal</strong></span> <span class="av pull-right r_eq"> <i class="fa fa-user-plus" aria-hidden="true"></i>  </span>
        </a>
      </div>
      <div class="user_avel">
       <a href="#">
        <img src="assets/img/usericon.png" alt="av"/> <span><strong>Vedpal</strong></span> <span class="av pull-right r_eq"> <i class="fa fa-user-plus" aria-hidden="true"></i>  </span>
        </a>
      </div>
      <div class="user_avel">
       <a href="#">
        <img src="assets/img/usericon.png" alt="av"/> <span><strong>Vedpal</strong></span> <span class="av pull-right r_eq"> <i class="fa fa-user-plus" aria-hidden="true"></i>  </span>
        </a>
      </div>
      
    
      
    </div>
    
            </div>
                <div id="menu2" class="container tab-pane fade">
                  <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
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
          
  </div>
  



  );


}

export default Request;