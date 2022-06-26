import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from '@material-ui/icons';
import CheckIcon from '@mui/icons-material/Check';

import {Button} from '@mui/material';
import './user.css'
import {useState} from 'react';
import {Link} from 'react-router-dom';
import QueryParams from '../../QueryParams';
import {post,patch}from 'axios';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import Avatar from '../../../assets/icons/user_96px.png';

export default function User() {
    const query =QueryParams();    
    const [user,setUser] = useState(JSON.parse(query.get('user')));
    const[username,setUsername]=useState(user.name);
    const[firstname,setFirstname]=useState(user.firstname);
    const[lastname,setLastname]=useState(user.lastname);
    const[email,setEmail]=useState(user.email);
    const[phone,setPhone]=useState(user.phone);
    const[location,setLocation]=useState(user.location);
    const[image,setImage]=useState(null)
    const [imagename,setImageName]=useState(null);
    const[onuserUpdated,setonuserUpdated]=useState(false);
    const[onImageChanged,setOnImageChanged]=useState(false)
     
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
                 setLocation(response.data.location);
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
 
    const body={
             userId:user._id,
             username:username,
             email:email,
             firstname:firstname,
             lastname:lastname,
             phone:phone,
             location:location,
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
        <div className="user">
          <Alert stack={{limit: 3}} />

            <div className="userTitleContainer">
                <h1 className="userTitle">Edit User</h1>
              <Link to="/dashboard/newUser">
              <button className="userAddButton">Create</button>
              </Link>
            </div>
            <div className="userContainer">
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
                       {user.confirmed ? <CheckIcon style={{marginLeft:10}} color="success"/> :  <Button style={{marginLeft:10}}  variant='outlined' size="small" color='primary'  onClick={handleVerifyEmail}>verify</Button>}
                          </div>  
                        </div>
                        <div className="userShowInfo">
                             <LocationSearching className="userShowIcon"/>
                        <span className="userShowInfoTitle">{location}</span>
                        </div>
                       </div>
                </div>
                <div className="userUpdate"> 
                    <span className="userUpdateTitle">Edit</span>
                    <form  className="userUpdateForm" onSubmit={handleUpdate}>
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
                            <label>Location</label>
                            <input type="text" placeholder="Tamale ,Northern Region" className="userUpdateInput" onChange={(e)=>{setLocation(e.target.value)}} value={location}/>
                        </div>

                        </div> 
                    <div className="userUpdateRight">
                        <div className="userUpdateUpload">
                            <img src={`http://localhost:3001/server/uploads/users/${user.image[0].filename}`} onError={imgonLoadError} alt=""  id="user-image"className="userUpdateImg" />
                            <label htmlFor="file"> <Publish className="userUpdateIcon"/> </label>
                                <input type="file" onChange={onFileInputChange} id="file" style={{display:"none"}}/>
                       </div>
                       <button className="userUpDateButton">Update</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
