import './newUser.css';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import {post} from 'axios';
import Alert from 'react-s-alert';

export default function NewUser() {
    const [user]=useState(JSON.parse(localStorage.getItem('user')));
    const [username,setUserName]=useState('');
    const [firstname,setFirstName]=useState('');
    const [lastname,setLastName]=useState('');
    const [email,setEmail]=useState('');
    const [phone,setPhone]=useState('');
   const [password,setPassword]=useState('');
    const handleSubmit=(e)=>{
       e.preventDefault();
       createNewUser(e)
    }

    const createNewUser =(event)=>{
        const form = event.currentTarget
        if (form.checkValidity() === false) {
          event.stopPropagation()
        }   
        
        event.preventDefault()
    
        createUser(user).then((response) => {
          console.log(response.data.message);
          if (response.status===200){
            Alert.success('store created', {
              position: 'top-right',
              effect: 'stackslide'
  
          }); 
          clearfields();
          }else{
            Alert.error('update was unsuccessfully', {
              position: 'top-right',
              effect: 'jelly'
  
          }); 
          }
          //addToast(exampleToast(response.data.message));
        })
    }
    const clearfields=()=>{
        setUserName('');
        setFirstName('');
        setLastName('');
        setEmail('')
        setPhone('');
        setPassword('');
    }

      const createUser =()=>{
        
        const url = 'http://localhost:3001/api/user/register';
    
       
        const formData = new FormData();
       
        formData.append('name', username);
        formData.append('firstname', firstname);
        formData.append('lastname', lastname);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('password',password);
       
     
        return post(url,  {
          username:username,
          firstname:firstname,
          lastname:lastname,
          email: email ,
          phone:phone,
          password: password,
        })
      
      };
    return (
        <div className="newUser">
            <div className="newUserTitleContainer">
            <h1 className="newUserTitle">New User</h1>
            <Link to="/dashboard/users">
              <button className="userAddButton">Users</button>
              </Link>
            </div>
            <form action="" className="newUserForm" onSubmit={handleSubmit}>
            <div className="newUserItem">
                <label>Username</label>
                <input type="text" placeholder="Abdul089" value={username} required onChange={(e)=>{setUserName(e.target.value)}}/>
            </div>
            <div className="newUserItem">
                <label>First Name</label>
                <input type="text" placeholder="Abdul Razak" value={firstname} required onChange={(e)=>{setFirstName(e.target.value)}}/>
            </div>
            <div className="newUserItem">
                <label>Last Name</label>
                <input type="text" placeholder="Abubakari" value={lastname} required onChange={(e)=>{setLastName(e.target.value)}}/>
            </div>
            <div className="newUserItem">
                <label>Email</label>
                <input type="email" placeholder="abdulrazakneate@gmail.com" value={email} required onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div className="newUserItem">
                <label>Phone</label>
                <input type="phone" placeholder="+23354625367" value={phone} required onChange={(e)=>{setPhone(e.target.value)}}/>
            </div>
            <div className="newUserItem">
                <label>Password</label>
                <input type="password" placeholder="password" value={password} required onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
         {/*   { <div className="newUserItem">
                <label>Gender</label>
               <div className="newUserGender">
               <input type="radio" name="gender" id="male" value="male"/>
                 <label for="male">Male</label>
                <input type="radio" name="gender" id="female" value="female"/>
                 <label for="f
                 emale">Female</label>
               </div>  
            </div>} */}
           <div className="newUserItem">
           <button className="newUserButton">Create</button>
           </div>
            </form>
        </div>
    )
}
