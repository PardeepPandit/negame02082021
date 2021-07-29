import  React,{ Fragment ,useContext} from "react";
import Header from './Header'
//import FriendContext from './MyComponent/context/friend/friendContext'
function FriendRequest() {
    /* const friendContext=useContext(FriendContext)
    const {usersList}=friendContext */

    return(
<Fragment >
<Header/>
<div className="login_sec">     
<div className="login-fg">
    <div className="container-fluid">
        <div className="row">
            <div className="signup-container">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-6 offset-md-3">
                            <div className="logo-wrapper">
                                <img src="assets/img/logo-01copy.png" alt="" />
                                <h1>The Never Ending Game</h1>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="myfriedn-wrapper">
                                <div className="row">

                                <div className="col-lg-4">
                                    <ul className="friend-list">
                                    <li><a href="MyFriend">My Friends</a></li>
                                    <li><a href="FriendRequest">Friend Request</a></li>
                                    <li><a href="SentRequest">Sent Request</a></li>
                                    </ul>                                   
                                </div>

                                <div className="col-lg-8">
                                    <div className="myfriend-panel">
                                        <h2>Friend Request</h2>

                                        <div className="myfriend-box">
                                        <div className="myfriend">
                                            <div className="myfriend-dp">
                                                <div className="dp-box">
                                                    <div className="dp">
                                                        <img src="assets/img/dp.jpg" alt="" />
                                                    </div>

                                                    <div className="dp-name">
                                                        <h3>Kelly Sara</h3>
                                                        <h4>India</h4>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="myfriend-status sendrequest">
                                                <a href="#">+</a>
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
        </div>
    </div>
</div>  
  
    </div>

</Fragment>


    );

}
export default FriendRequest;