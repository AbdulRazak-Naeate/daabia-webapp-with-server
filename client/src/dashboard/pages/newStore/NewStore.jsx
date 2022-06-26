import { useState } from 'react';
import {Link} from 'react-router-dom'
import './newstore.css'
import {Publish} from '@material-ui/icons';
import {post} from 'axios';
import thumbnail from '../../../assets/icons/thumbnail-wide.png';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';

export default function NewStore({stores,setStores}) {
    const [storeImage, setStoreImage] = useState({});
    const user = JSON.parse(localStorage.getItem('user'));
   
    const [storeName, setStoreName] = useState('');
    const [email, setEmail] = useState('');
    const [country,setCountry]=useState('');
    const [state, setState] = useState('');
    const [city,setCity]=useState('');
    const [description, setDescription] = useState('');
    const [phone, setPhone] = useState('');
    const [category, setCategory] = useState('');
    const [currency,setCurrency] = useState('');
   // const [ghPostGps, setGhPostGps] = useState('');
    const clearfields =()=>{
      setStoreName('');
      setDescription('')
      setPhone('');
      setEmail('');
      setCountry('');
      setState('');
      setCity('');
      setCategory('');
      setCurrency('');
      document.getElementById("storeimg").src=thumbnail;

    }
    const handleSubmit = (event) => {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.stopPropagation()
      }   
      
      event.preventDefault()
  
      UploadImageAndCreateStore(storeImage, user).then((response) => {
        console.log(response.data.store);
        if (response.status===200){
           localStorage.setItem('stores', JSON.stringify(response.data.stores));
          setStores(response.data.stores)

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
  
    //Handle on formInput valu change change 
    const onFileChange = (e) => {
      setStoreImage(e.target.files);
  
      var file = e.target.files[0]
       var fr= new FileReader();
           fr.onload=(e)=>{
              document.getElementById('storeimg').src=e.target.result
      
           }
          try {
            fr.readAsDataURL(file)
          } catch (error) {
            
          }
    }
    
    
    const UploadImageAndCreateStore = (files, user) => {
      //const url = process.env.STORE_URL;
  
      const formData = new FormData();
      formData.append('name', storeName);
      formData.append('description', description);
      formData.append('country', country);
      formData.append('state', state);
      formData.append('city', city);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('userId', user._id);
      formData.append('categoryId', category);
      formData.append('currency', currency);
  
      for (var i = 0; i <= files.length; i++) {
        formData.append('image', files[i]);
      }
      formData.append('validStatus', "VALID");
  
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'auth-token': user.auth_token,
        }
  
      }
      return post('http://localhost:3001/api/stores/', formData, config)
    }
  return (
    <div className="newstore">
              <Alert stack={{limit: 3}} />

             <div className="addnewStoreTitleContainer">
                 <h1 className="addNewStoreTitle">Add New Store</h1>
                 <Link to="/dashboard/stores">
                 <button className="storeListButton">Stores</button>
              </Link>
             </div>
            <form action="" className="newStoreForm" onSubmit={handleSubmit}>
                 <div className="newStoreFormContainer">
               <div className="newStoreFormLeft">
               <div className="newStoreFormItem">
                    <label>Name</label>
                    <input type="text" name="name" placeholder="Naeate Computers" value={storeName} onChange={(e)=>{setStoreName(e.target.value)}} required/>
                </div>
                <div className="newStoreFormItem">
                    <label>Description</label>
                    <textarea type="text" name="description" rows="5" placeholder="What are the products are you selling " value={description} onChange={(e)=>{setDescription(e.target.value)}} required/>
                </div>
                <div className="newStoreFormItem">
                    <label>Store Category</label>
                    <select type="text" name="category" value={category} onChange={(e)=>{setCategory(e.target.value)}} required >
                    <option value="none" required></option>
                <option value="1001">Clothen</option>
                <option value="1002">Home & Appliances</option>
                <option value="1003">Phones & Telephone</option>
                <option value="1004">Electronics</option>
                <option value="1005">Computer & Office</option>
                <option value="1006">Beauty</option>
                <option value="1007">Hair</option>
                <option value="1008">Automobile & Accessory</option>
                <option value="1009">Food</option>
                    </select>
                </div>  
                <div className="newStoreFormItem">
                    <label>Store Phone</label>
                    <input type="phone" maximum={13} name="email" placeholder="" value={phone} onChange={(e)=>{setPhone(e.target.value)}}/>
                </div>
                <div className="newStoreFormItem">
                    <label>Store Email</label>
                    <input type="email" name="email" required placeholder=""value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                </div>
                <div className="newStoreFormItem">
                    <label>Country</label>
                    <input type="text" name="country" placeholder="Ghana" required value={country} onChange={(e)=>{setCountry(e.target.value)}}/>
                </div>
                <div className="newStoreFormItem">
                    <label>State/Region</label>
                    <input type="text" name="state" required placeholder="" value={state} onChange={(e)=>{setState(e.target.value)}}/>
                </div>
                <div className="newStoreFormItem">
                    <label>city</label>
                    <input type="text" name="city" required placeholder="" value={city} onChange={(e)=>{setCity(e.target.value)}}/>
                </div>
                <div className="newStoreFormItem">
                    <label>currency</label>
                    <select type="text" name="currency" value={currency} onChange={(e)=>{setCurrency(e.target.value)}} required >
                    <option value="none" required></option>
                <option value="USD">USD Dollar $</option>
                <option value="GHS">Ghana ¢</option>
                <option value="EUR">Euro €</option>
                <option value="CAD">Canada $</option>
                <option value="GBP">UK £</option>
                <option value="JPY">Japanese Yen £</option>
                <option value="CNY">Chenese Yuan £</option>
                    </select>
                </div>
               <div className="newStoreUpload">
                            <img src={thumbnail} alt="" className="newStoreUploadImg"  id="storeimg"/>
                            <label htmlFor="file"> <Publish className="newStoreUploadIcon"/>{/* Click to upload store logo */}</label>
                                <input type="file" id="file" style={{display:"none"}}  onChange={onFileChange}/>
                       </div>
                     <div className="newStoreFormItem">
                     <button className="newStoreUploadButton">Create Store</button>
                     </div>

               </div>
               <div className="newStoreFormRight">
                    
               </div>
               </div> 
                  
            </form>
       
    </div>
  )
}
