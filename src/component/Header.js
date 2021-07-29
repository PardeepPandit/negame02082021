import { NavLink,Link } from 'react-router-dom';
import React, { Fragment, useState,useContext } from 'react';
import {NavbarToggler,Collapse,NavbarBrand,} from 'reactstrap';
import AuthContext from './MyComponent/context/auth/authContext'
import MasterContext from './MyComponent/context/master/masterContext'


const Header = (props) => {
   
  const authContext=useContext(AuthContext)
  const {isAuthenticated,user,logout}=authContext
  const [isOpen, setIsOpen] = useState(false);
  const masterContext=useContext(MasterContext)
  const {playing,setPlaying}=masterContext
  const [popUpMenu, setPopUpMenu] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const onLogout=()=>{
    logout();
    setPlaying(!playing)
    setTimeout(()=>{
    window.location.reload(false)
    },100)
    
  }
  function Logout(){
    //Details pages logout function changes required
    logout()
    setTimeout(()=>{
    window.location.reload(false)
    },100)  
  }


  function PopUpMenu() {
    return (
      <ul className="drop-down popmenu">
        <li>SETTINGS</li>
        <li>CHANGE PASSWORD</li>
        <li><Link to='/leaderboard'>LEADERBOARD</Link> </li>
        <li><Link to='/historywithcomputer'>HISTORY</Link></li>
        <li>BUY HINT</li>
        <li><Link to="/login" onClick={Logout}>LOGOUT</Link></li>
      </ul>
    );
  }

    const authLink=(
      <Fragment>
         {/*  <li>Welcome {user && user.name}</li> */}
          <li>
            <Link to='#' onClick={() => setPopUpMenu(!popUpMenu)}><i class="fa fa-user" aria-hidden="true"></i></Link>
            </li>
          <li><NavLink to="/setting"><i class="fa fa-cog" aria-hidden="true"></i></NavLink></li>
          <li>
            <Link to='/login' onClick={onLogout}>
            <i class="fa fa-sign-out" aria-hidden="true"></i>
            </Link>
          </li>
          
          
      </Fragment>
    )
    const guestLink=(
      <Fragment>
          <li><Link to='/register'>Sign up</Link></li>
          {/* <li><Link to='/login'className="login" >Login</Link></li> */}
      </Fragment>
    )





    return (
      <Fragment>
        <header>
    <div className="container">
    <div className="row">
    <div className="col-md-4">
    <NavbarBrand href="/">
<div className="logo_header">
<img src="assets/img/logo.png" alt="logo" />
</div>
</NavbarBrand>
<div className="btn_nv">
<NavbarToggler className="na_v_btn" onClick={toggle} />
</div>
    </div>
   
    <div className="col-md-8">
 
     <Collapse className="col_apse flex-box" isOpen={isOpen} navbar> 
     <strong className="usename">{user && user.data.name}</strong> 
<nav className="nav_gaction">
  <ul className="cus-sign">
      {isAuthenticated ? authLink : guestLink}
    
    <div className="clear"></div>
  </ul>
</nav>
 </Collapse> 
</div>

    </div>
    </div>
    
    </header>
    
    {popUpMenu && PopUpMenu()}
    </Fragment>

    
    )
  }
export default Header;