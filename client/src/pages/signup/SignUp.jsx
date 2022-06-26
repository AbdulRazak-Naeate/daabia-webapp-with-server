import {useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import './signup.css';
import {post} from 'axios';

export default function SignUp() {
  const [username,setUsername]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [phone,setPhone]=useState('');
  const [repeatPassword,setRepeatPassword]=useState('');
  const history=useHistory();
  const onFormSubmit =(e)=>{
    
    e.preventDefault()// Stop form default submit
    if( password===repeatPassword ) {
 
      SignUp().then((response) => {

      console.log(response.data);
     if (response.data.status===200){
      const user = response.data;
      localStorage.setItem('_id', user._id);
      localStorage.setItem('user', JSON.stringify(user));
      //localStorage.setItem('auth-token',response.headers)

      console.log(response.headers);
       
      history.replace("/dashboard");
     }
    }).catch((error)=>{
       console.log(error.request)
    });
  }
}

  const SignUp =()=>{
        
    const url = 'http://localhost:3001/api/user/register';

   
    const formData = new FormData();
   
    formData.append('name', username);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('password', repeatPassword);
   
 
    return post(url,  {
      name:username,
      fullname:'null',
      email: email ,
      phone:'null',
      location:'null',
      password: password,
    })
  
  };

  return (
    <div className="signup">
      <div className="signupLeft"></div>
      <div className="signupMiddle">
                    <div className="signupFormWrapper">
                  <div className="signupTitle">
                    <h1 className="title">Signup</h1>
                  </div>
                    <form  className="signupForm" onSubmit={onFormSubmit}>
                      
                        <div className="signupItem">
                            <label>UserName</label>
                            <input type="text"  className="signupInput" required value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                        </div>

                        <div className="signupItem">
                            <label>Email</label>
                            <input type="text"  className="signupInput" required  value={email}  onChange={(e)=>{setEmail(e.target.value)}}/>
                        </div>
                        <div className="signupItem">
                            <label>Phone</label>
                            <input type="text"  className="signupInput" required  value={phone}  onChange={(e)=>{setPhone(e.target.value)}}/>
                        </div>

                        <div className="signupItem">
                            <label>Password</label>
                            <input type="password"  className="signupInput" required  value={password}  onChange={(e)=>{setPassword(e.target.value)}}/>
                        </div>
                        <div className="signupItem">
                            <label>Repeat Password</label>
                            <input type="password"  className="signupInput" required  value={repeatPassword}  onChange={(e)=>{setRepeatPassword(e.target.value)}}/>
                        </div>
                         <div className="signUpsignupItem">
                         <button className="btnsignup" >Signup</button>
                       <Link to="/login" className="link">
                       <button className="btnSignUp">Login</button>
                       </Link>

                         </div>
                    </form>
                    </div>
              
      </div>
      <div className="signupRight"></div>
    </div>
  )
}
