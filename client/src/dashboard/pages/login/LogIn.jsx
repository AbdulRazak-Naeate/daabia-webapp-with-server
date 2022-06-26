
import './login.css'
import axios from 'axios';
import {useState,useEffect} from'react';
import { Link,useHistory } from 'react-router-dom';

function LogIn({toggleSideBar}) {
          const [email,setEmail]=useState('');
          const [password,setPassword]=useState('');
          const [error,setError]=useState(false);
          const history=useHistory();

          const onFormSubmit=(e)=>{

            e.preventDefault();
      
            LogIn().then((response)=>{
              const user = response.data;
              localStorage.setItem('_id', user._id);
              localStorage.setItem('user', JSON.stringify(user));
              localStorage.setItem('loggedin',true);

             // localStorage.setItem('auth-token',response.headers)
      
              //console.log(response.headers[2]);
               
              history.replace("/dashboard");
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
         useEffect(()=>{
          toggleSideBar(false);
         },[toggleSideBar]);
  return (
    <div className="login">
      <div className="logInLeft"></div>
      <div className="logInMiddle">
                    <div className="loginFormWrapper">
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
                       <Link to="/dashboard/signup" className="link">
                       <button className="btnSignUp">SignUp</button>
                       </Link>
                         <button className="btnLogIn">LogIn</button>

                         </div>
                    </form>
                    </div>
              
      </div>
      <div className="logInRight"></div>
    </div>
  )
}

export default LogIn
