import React,{useState,useEffect,useContext} from 'react';
import AuthContext from './MyComponent/context/auth/authContext'
import MasterContext from './MyComponent/context/master/masterContext'
import AlertContext from './MyComponent/context/alert/alertContext'
import axios from 'axios'

const Upadte = () => {
  let imgs
  const authContext=useContext(AuthContext)
  const {user}=authContext
  const alertContext=useContext(AlertContext)
  const {setAlert}=alertContext
  const masterContext=useContext(MasterContext)
  const {countryList,stateList,cityList,getStateList,getCityList,loading,updateProfile}=masterContext

  console.log("User loaded in setting",user)

  const [userImage,setUserImage]=useState()
  const [tempImage,setTempImage]=useState(()=>{
    return user && user.image_path+'/'+user.data.image
  })
  const [flag,setFlag]=useState('no')



  //console.log("USER INFO=",user)
  const [userProfile,setUserProfile]=useState({
    name:user.data.name,
    mobile:user.data.mobile,
    bio:user.data.bio,
    dob:user.data.dob,
    country:user.data.country,
    state:user.data.state,
    city:user.data.city,
    image:user.image_path+'/'+user.data.image
  })

//console.log("countyList=",countryList,"loading",loading)


/* const coundtryDetails=(country)=>{
        return countryList.name===country
} */
useEffect(()=>{
  setFlag('yes')
})

 const onChange=(e)=>{
 // console.log(e.target.name,"=",e.target.value)
  //console.log("country=",countryList.find(list=>list.name===e.target.value))
  //console.log("state=",stateList.find(list=>list.name===e.target.value))
   if(e.target.name==='country')
   {
     getStateList(countryList.find(list=>list.name===e.target.value))
  }
   if(e.target.name==='state')
   {
     getCityList(stateList.find(list=>list.name===e.target.value)) 
   }
   setUserProfile({...userProfile,[e.target.name]:e.target.value})
} 



const onSubmit=(e)=>{
  e.preventDefault();
  console.log("Profile=",userProfile)

    console.log("Before updating image=",userProfile.image)
  updateProfile({
    id:user.data.id,
    name:userProfile.name,
    mobile:userProfile.mobile,
    dob:userProfile.dob,
    country:userProfile.country,
    bio:userProfile.bio,
    state:userProfile.state,
    city:userProfile.city,
    image:userProfile.image
  })

  alert("Profile Updated",'success')

}
useEffect(async()=>{
  
  const formData = new FormData(); 
  if(user){   
  try {// Update the formData object 
    console.log("User Image*=",userImage)
    formData.append("id",user.data.id)
    formData.append("image",userImage)
    //formData.append("image",this.state.selectedFile,this.state.selectedFile.name)
  

console.log("userimage==>",userImage.name)
const config={
  headers:{
      'Content-Type': 'multipart/form-data',
    'APPKEY' :'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
  }
}


console.log("formData=",formData)

// Request made to the backend api
const res=await axios.post(process.env.REACT_APP_BASEURL+'/api/user/update/profile/image', formData,config);



  console.log("Update image responce=",res.data)
  console.log("final path=",res.data.image_path+'/'+res.data.data.image)

  imgs=(
    <img src={res.data.image_path+'/'+res.data.data.image} alt="no image found"/>
  )

  setUserProfile({...user,image:res.data.image_path+'/'+res.data.data.image})
  } catch (error) {
    console.log("Error in useEffect",error)
  }
}
else{
  console.log("User not loaded")
}

},[userImage])


const onImageChange = (event) => {
  if (event.target.files && event.target.files[0]) {
      setTempImage(URL.createObjectURL(event.target.files[0]))
  }
 }
  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    console.log("Target file=",event.target)
    setUserImage((event.target.files[0]))
    
  };
const fetchImage=(event)=>{
  handleChange(event)
  onImageChange(event)
}
/* const onFlag=()=>{
  setFlag(false)
} */
    return(
        <div>        
        <section classNameName="profile">
        <div className="container">
  <div className="profile-header">
    
    <div class="file-upload">
      
      {/* {flag==='yes' && <img src={tempImage} alt='no image oops'/>}//1 */}
      {/* {user && flag==='no' && <img src={user.image_path+'/'+user.data.image} alt='Image not found'/>}//1 */}
     {user && <img src={user.image_path+'/'+user.data.image} alt='Image not found'/>}{/* //0 */}
          <div className="editbox">
              <img src="assets/img/draw.svg"  alt="pencil" /> 
          </div> 
          {/* <input type="file" name="somename" onChange={fetchImage}/> */}{/* //1 */}
          <input type="file" name="somename" onChange={handleChange}/>{/* //0 */}
      </div>

    <div className="profile-nav-info">
      <h3 className="user-name">{user && user.data.name}</h3>
      <div className="address">
        <p id="state" className="state">{user && user.data.city},</p>
        <p id="state" className="state">{user && user.data.state},</p>
        <span id="country" className="country">{user && user.data.country}</span>
      </div>

    </div>
    {/* <div className="profile-option">
      <div className="notification">
        <i className="fa fa-bell"></i>
        <span className="alert-message">3</span>
      </div>
    </div> */}
  </div>

  <div className="main-bd">
    <div className="left-side">
    <div className="row">
     <div className="col-md-4">
     <div className="profile-side text-center">
        <p className="user-mail"><i className="fa fa-envelope"></i>{user && user.data.email}</p>
        <p className="user-mail"><i className="fa fa-phone"></i>{user && user.data.mobile}</p>
        <p className="user-mail"><i className="fa fa-calendar"></i>Dob:{user && user.data.dob}</p>
        <div className="user-bio"><i className="fa fa-info-circle"></i>{user && user.data.bio}</div>
      </div>

     </div>
     <div className="col-md-8">
         <div className="update_form">
             <form onSubmit={e=>onSubmit(e)}>
               <div className="row">

                 <div className="col-lg-6">
                   <div className="edit-box">
                     <input type="text" name='name' placeholder="Enter Name*" value={userProfile.name} onChange={e=>onChange(e)}/>
                   </div>
                 </div>

                 <div className="col-lg-6">
                   <div className="edit-box">
                     <input type="number" name='mobile' placeholder="Contact No." value={userProfile.mobile} onChange={e=>onChange(e)}/>
                   </div>
                 </div>                 

                 <div className="col-lg-12">
                   <div className="edit-box">
                     <textarea placeholder="Bio" name='bio' value={userProfile.bio} onChange={e=>onChange(e)} ></textarea>
                   </div>
                 </div>

                 <div className="col-lg-6">
                   <div className="edit-box">
                     <input type="date" name='dob' placeholder="Date of Birth" value={userProfile.dob} onChange={e=>onChange(e)}/>
                   </div>
                 </div>

                 <div className="col-lg-6">
                   <div className="edit-box">
                     <select name='country' value={userProfile.country} onChange={e=>onChange(e)}>
                        <option>Select Country</option> 
                      {!loading &&  countryList.map((list)=>{
                       return <option key={list.id}>{list.name}</option>})} 
                     </select>
                   </div>
                 </div>

                 <div className="col-lg-6">
                   <div className="edit-box">
                   <select name='state' value={userProfile.state} onChange={e=>onChange(e)}>
                       <option>Select State</option>
                      {!loading && stateList &&  stateList.map((list)=>{
                       return <option key={list.id}>{list.name}</option>})} 
                     </select>
                   </div>
                 </div>

                 <div className="col-lg-6">
                   <div className="edit-box">
                   <select name='city' value={userProfile.city} onChange={e=>onChange(e)}>
                       <option>Select city</option>
                      {!loading && cityList  && cityList.map((list)=>{
                       return <option key={list.id}>{list.name}</option>})} 
                     </select>
                   </div>
                 </div>

                 <div className="col-lg-12">
                   <div className="edit-box">
                       <input type='submit' value='Update Profile' />
                   </div>
                 </div>
               </div>           
             </form>
         </div>
     </div>

</div>

    </div>
  </div>
</div>
        </section>
        </div>
    )
}

export default Upadte;