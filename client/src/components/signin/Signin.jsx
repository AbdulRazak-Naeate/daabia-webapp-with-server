/* eslint-disable no-unused-vars */
import './signin.css'
import axios from 'axios';
import {useState} from'react';
import { useHistory } from 'react-router-dom';
import {Typography,Button}  from '@mui/material';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function Signin({handleCloseModal,handleSwitchForm}) {
          const [email,setEmail]=useState('');
          const [password,setPassword]=useState('');
          const [error,setError]=useState(false);
          const history=useHistory();

          const provider = new GoogleAuthProvider();

          provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
          const auth = getAuth();
          const onLogInwithgoogle = async () => {
           
            signInWithPopup(auth, provider)
            .then((result) => {
              // This gives you a Google Access Token. You can use it to access the Google API.
              const credential = GoogleAuthProvider.credentialFromResult(result);
              const token = credential.accessToken;
              // The signed-in user info.
              const user = result.user;
           
              SignUp(user).then((response) => {
  
                console.log(response.data);
               if (response.data.status===200){
                const user = response.data;
                localStorage.setItem('_id', user._id);
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('loggedin', true);
        
                //localStorage.setItem('auth-token',response.headers)
                replacePermanentId(user);

                console.log(response.headers);
                handleCloseModal();
                //history.replace("/account");
               }
              }).catch((error)=>{
                 console.log(error.request)
              });              // ...
            }).catch((error) => {
              // Handle Errors here.
              const errorCode = error.code;
              const errorMessage = error.message;
              // The email of the user's account used.
              const email = error.email;
              // The AuthCredential type that was used.
              const credential = GoogleAuthProvider.credentialFromError(error);
              // ...
            });
          }

          const SignUp =(user)=>{

            const url = 'http://localhost:3001/api/user/register';
            let fullname=user.displayName;
            const nameArr=fullname.split(" ");
            console.log(nameArr)
           return axios.post(url,  {
              username:nameArr[0],
              firstname:nameArr[0],
              lastname:nameArr[1],
              email: user.email ,
              phone:"+2330000000000",
              password:"000000",
              fromGoogle:true
            })
          
          };
          /* 
          const checkuserByEmail = async (email,user) =>{
            const url = `http://localhost:3001/api/user`;
           
           return await post(url).then((res)=>{
             if (res.status===400){//user not signup yet create account for the user
            
             }else{
              
                const user = res.data.user;
                localStorage.setItem('_id', user._id);
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('loggedin',true);  
                handleCloseModal();
               history.push("/account");
              }
              
             }
          
           )}; */

          const onFormSubmit=(e)=>{

            e.preventDefault();
      
            LogIn().then((response)=>{
              const user = response.data;
              localStorage.setItem('_id', user._id);
              localStorage.setItem('user', JSON.stringify(user));
              localStorage.setItem('loggedin',true);
              
              replacePermanentId(user);
             // localStorage.setItem('auth-token',response.headers)
      
              //console.log(response.headers[2]);
               
              handleCloseModal();
             history.push("/account");
            }).catch((error) =>{
               setError(true);
              console.log(error)
            });
            
          }
         
      
        const LogIn = () =>{
          
          const url ='http://localhost:3001/api/user/login';
      
          return  axios.post(url, {
           email: email ,
           password: password,
         });
          
         };
       const replacePermanentId= (user)=>{
        var tempid=localStorage.getItem('temp_id');
        console.log("tempid " + user._id)
        if (tempid!==""){
         var url=`http://localhost:3001/api/carts/updateuserid/${tempid}`
          axios.patch(url,{userId:user._id}).then((response)=>{
            console.log(response)
          })
          var orderurl=`http://localhost:3001/api/orders/updateuserid/${tempid}`
          axios.patch(orderurl,{userId:user._id}).then((response)=>{
            console.log(response)
          })
       }
       }
        
  return (
    <div className="loginContainer">
           <div className="FormWrapper">
                  <div className="logInTitle">
                    <h1 className="title">LogIn</h1>
                  </div>
                    <form  className="loginForm" onSubmit={onFormSubmit}>
                        <div className="loginItem">
                            <label>UserName/Email</label>
                            <input type="text"  className="loginInput" required onChange={(e)=>{setEmail(e.target.value)}}/>
                        </div>
                       
                        <div className="loginItem">
                            <label>Password</label>
                            <input type="password"  className="loginInput" required onChange={(e)=>{setPassword(e.target.value)}}/>
                        </div>
                        <div className="loginItem">
                        <label className="error">{!error?'':'email or password incorrect'}</label>
                        </div>
                         <div className="signUpLoginItem">
                         <Button type="submit" fullWidth variant="contained" color="primary" >LogIn</Button>
                      {/*  <Link to="/signup" className="link">
                       <button className="btnSignUp">SignUp</button>
                       </Link>
 */}                  </div>  
               <div className="signUpLoginItem">
               
      <Button fullWidth variant="contained" id='googleButton' color="warning" onClick={()=>{onLogInwithgoogle()}} >LogIn With Google</Button>
   
                 </div>      
                  <div className="signUpLoginItem">
                    <Typography variant="body2" color="primary" align="center" className="log" onClick={()=>{handleSwitchForm(false)}}>SignUp</Typography>
                 </div>
               
                    </form>
                    </div>
              
    </div>
  )
}

export default Signin
