import React from 'react'
import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from '@material-ui/icons';
import {Grid} from '@mui/material';
import './user.css'
import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import QueryParams from '../../QueryParams';
import {post,patch}from 'axios';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import Avatar from '../../assets/icons/user_96px.png';
import useStyles from './styles'
const Account = () => {
   const classes = useStyles()
  const query =QueryParams();    
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const[username,setUsername]=useState(user.name);
  const[firstname,setFirstname]=useState(user.firstname);
  const[lastname,setLastname]=useState(user.lastname);
  const[email,setEmail]=useState(user.email);
  const[phone,setPhone]=useState(user.phone);
  const[address,setAddress]=useState(user.address);
  const[country,setCountry]=useState(address.country !== 'null'? address.country :'');
  const[state,setState]=useState(address.state!== 'null'? address.state :'');
  const[city,setCity]=useState(address.city!== 'null'? address.city :'');
  const[street,setStreet]=useState(address.street!== 'null'? address.street :'');
  const[aprt_suit_num,setApt_suit_num]=useState(address.aprt_suit_num!== 'null'? address.aprt_suit_num :'');
  const[image,setImage]=useState(null)
  const [imagename,setImageName]=useState(null);
  const[onuserUpdated,setonuserUpdated]=useState(false);
  const[onImageChanged,setOnImageChanged]=useState(false)
  const history=useHistory();
  const imgonLoadError=(e)=>{
    e.target.onerror = null; e.target.src = Avatar
}

function onFileInputChange(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function (e) {
        document.getElementById('avatar').src = e.target.result;
         document.getElementById('user-image').src = e.target.result;
       
        setOnImageChanged(true);
     console.log(file)
     setImage(file);
     //use user to name uer image 
     var filename=username+'.'+file.name.split('.').pop();
     console.log(filename);
     setImageName(filename);
    };

    try {
        reader.readAsDataURL(file)

    } catch (error) {
        console.log({ readAsDataURLError: error })
    }
}

  const handleLogOut =()=>{
    localStorage.setItem('user', null);
    localStorage.setItem('loggedin',false);
    history.push('/')
  }
const handleVerifyEmail = ()=>{

    const url = `http://localhost:3001/api/email`;

  post(url,{email:user.email}).then((response)=>{
      console.log(response)
  })
}
const handleUpdate=(e)=>{
    e.preventDefault();
    editUser().then((response)=>{
        if(response.status===200){
             setUser(response.data)
             setUsername(response.data.name);
             setEmail(response.data.email);
             setFirstname(response.data.firstname);
             setLastname(response.data.lastname);
             setPhone(response.data.phone);
             setAddress(response.data.address);
             localStorage.setItem('user',JSON.stringify(response.data));
             Alert.success('user updated successfully', {
                position: 'top-right',
                effect: 'stackslide'
    
            }); ;              
            setonuserUpdated(!onuserUpdated);
            if (onImageChanged){
                UploadStoreImage(image).then((response) => {
                    if (response.data.status===200){
                      Alert.success('user image updated', {
                        position: 'top-right',
                        effect: 'stackslide'
            
                    }); 
                    }
                    //addToast(exampleToast(response.data.message));
                  })
            }
}
       

    });
}
const UploadStoreImage = (file) => {
//const url = process.env.STORE_URL;

const formData = new FormData();
  formData.append('imagename',imagename);
  formData.append('image', file);


const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
    'auth-token': user.auth_token,
  }

}
return post(`http://localhost:3001/api/user/updateImage/${user._id}`, formData, config)
}

const editUser =()=>{
 
const url = `http://localhost:3001/api/user/${user._id}`;
     let _address={
       country:country,
       state:state,
       city:city,
       street:street,
       aprt_suit_num:aprt_suit_num
     }
const body={
         userId:user._id,
         username:username,
         email:email,
         firstname:firstname,
         lastname:lastname,
         phone:phone,
         address:_address,
         imagename:imagename
}
const config = {
    headers: {
        'auth-token':
          user.auth_token,
      },
}
return patch(url, body,config)

};
  return (
    <div className={classes.root}>
                    <Alert stack={{limit: 3}} />

      <form  className="userUpdateForm" onSubmit={handleUpdate}>

      <Grid container justifyContent='space-around' spacing={0}> 

        <Grid item={true} xs={12} sm={4} md={4} lg={4}>
                <div className="userShow">
                    <div className="userShowTop">
                        <img src={`http://localhost:3001/server/uploads/users/${user.image[0].filename}`}  id="avatar"  onError={imgonLoadError} alt="" className="userShowImg" />
                        
                       <div className="userShowTopTitle">
                           <span className="userShowUsername">{username}</span>  <span className="active"></span>
                           <span className="userShowUserTitle">{username}</span>
                       </div>
                    
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Account Details</span>
                        <div className="userShowInfo">
                             <PermIdentity className="userShowIcon"/>
                        <span className="userShowInfoTitle">{`${firstname} ${lastname}`}</span>
                        </div>
                        <div className="userShowInfo">
                             <CalendarToday className="userShowIcon"/>
                        <span className="userShowInfoTitle">12.43.1996</span>
                        </div>
                        <span className="userShowTitle">Contact Details</span>
                        <div className="userShowInfo">
                             <PhoneAndroid className="userShowIcon"/>
                        <span className="userShowInfoTitle">{phone}</span>
                        </div>
                        <div className="userShowInfo ">
                         <MailOutline className="userShowIcon"/>
                         <div className="emailverify">
                          <span className="userShowInfoTitle">{email}</span>
                       {/* {confirmed ? <CheckIcon style={{marginLeft:10}} color="success"/> :  <Button style={{marginLeft:10}}  variant='outlined' size="small" color='primary'  onClick={handleVerifyEmail}>verify</Button>} */}
                          </div>  
                        </div>
                        <div className="userShowInfo">
                             <LocationSearching className="userShowIcon"/>
                        <span className="userShowInfoTitle">{country}</span>
                        </div>
                        <div className="userShowInfo">
                        <span className="userShowInfoTitle">{state}</span>
                        </div>
                        <div className="userShowInfo">
                        <span className="userShowInfoTitle">{city}</span>
                        </div>
                        <div className="userShowInfo">
                        <span className="userShowInfoTitle">{street}</span>
                        </div>
                        <div className="userShowInfo">
                        <span className="userShowInfoTitle">{aprt_suit_num}</span>
                        </div>
                        <span className="userShowTitle log" onClick={handleLogOut}>Log Out</span>
                       </div>
                </div>
                </Grid>
                <Grid item={true} xs={12} sm={4} md={4} lg={4}>

                <div className="userUpdateWrapper"> 
                    <span className="userUpdateTitle">Edit</span>
                  
                  <div className="userUpdateLeft">
                        {/* <div className="userUpdateItem">
                            <label>UserName</label>
                            <input type="text" placeholder="mardiaabu33" className="userUpdateInput" onChange={(e)=>{setUsername(e.target.value)}} value={username}/>
                        </div> */}
                        <div className="userUpdateItem">
                            <label>First Name</label> 
                            <input type="text" placeholder="Mardia Abubakari" className="userUpdateInput" onChange={(e)=>{setFirstname(e.target.value)}} value={firstname}/>
                        </div>
                        <div className="userUpdateItem">
                            <label>Last Name</label> 
                            <input type="text" placeholder="Mardia Abubakari" className="userUpdateInput" onChange={(e)=>{setLastname(e.target.value)}} value={lastname}/>
                        </div>
                        <div className="userUpdateItem">
                            <label>Email</label>
                            <input type="text" placeholder="mardiaabu33@gmail.com" className="userUpdateInput" onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
                        </div>
                        <div className="userUpdateItem">
                            <label>Phone</label>
                            <input type="text" placeholder="+23358473829" className="userUpdateInput" onChange={(e)=>{setPhone(e.target.value)}} value={phone}/>
                        </div>
                        <div className="userUpdateItem">
                            <label>Country</label>
                            <input type="text" placeholder="Ghana" className="userUpdateInput" onChange={(e)=>{setCountry(e.target.value)}} value={country}/>
                        </div>
                        <div className="userUpdateItem">
                            <label>State</label>
                            <input type="text" placeholder="Northern" className="userUpdateInput" onChange={(e)=>{setState(e.target.value)}} value={state}/>
                        </div>
                        <div className="userUpdateItem">
                            <label>City</label>
                            <input type="text" placeholder="Tamale" className="userUpdateInput" onChange={(e)=>{setCity(e.target.value)}} value={city}/>
                        </div>
                        <div className="userUpdateItem">
                            <label>Street</label>
                            <input type="text" placeholder="Nusng naa st" className="userUpdateInput" onChange={(e)=>{setStreet(e.target.value)}} value={street}/>
                        </div>
                        <div className="userUpdateItem">
                            <label>Apartment / Suit / GHPost Number</label>
                            <input type="text" placeholder="NT-888-4423,HN E343" className="userUpdateInput" onChange={(e)=>{setApt_suit_num(e.target.value)}} value={aprt_suit_num}/>
                        </div>
                        </div> 
                        </div>
                        </Grid>
               <Grid item={true} xs={12} sm={4} md={4} lg={2}>
                    <div className="userUpdateUploadWrapper">
                        <div className="userUpdateUpload">
                            <img src={`http://localhost:3001/server/uploads/users/${user.image[0].filename}`} onError={imgonLoadError} alt=""  id="user-image"className="userUpdateImg" />
                            <label htmlFor="file"> <Publish className="userUpdateIcon"/> </label>
                                <input type="file" onChange={onFileInputChange} id="file" style={{display:"none"}}/>
                       </div>
                       <button className="userUpDateButton">Update</button>
                    </div>
                        </Grid>
              </Grid> 
             </form>
    </div>
  )
}

export default Account
