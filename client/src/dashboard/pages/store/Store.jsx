import './store.css';
import { useEffect,useState } from 'react';
import {Link} from 'react-router-dom';
import { LocationSearching, MailOutline, PhoneAndroid, Publish } from '@material-ui/icons'
import {patch,post} from 'axios';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';


export default function Store() {

    
     const [store,setStore]=useState(JSON.parse(localStorage.getItem('store')));
     const [name,setName]=useState(store.name)
     const [email,setEmail]=useState(store.email)
     const [description,setDescription]=useState(store.description)
     const [phone,setPhone]=useState(store.phone)
     const [country,setCountry]=useState(store.country)
     const [state,setState]=useState(store.state)
     const [city,setCity]=useState(store.city)
     const [currency,setCurrency]=useState(store.currency)

     const [storeUpdated,setStoreUpdated]=useState(false);
     const [onStoreImageChange,setOnstoreImageChange]=useState(false);
     const [image,setImage]=useState(null);
     const [imagename]=useState(store.image[0].filename)

     function onFileInputChange(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function (e) {
            document.getElementById('store-image').src = e.target.result
            document.getElementById('store-show-img').src = e.target.result
            setOnstoreImageChange(!onStoreImageChange);
         console.log(file)
         setImage(file);
        };

        try {
            reader.readAsDataURL(file)

        } catch (error) {
            console.log({ readAsDataURLError: error })
        }
    }

     const handleUpdate=(e)=>{
        e.preventDefault();
        updateStore().then((response)=>{
            if(response.status===200){
                 setName(response.data.name)
                 setDescription(response.data.description);
                 setPhone(response.data.phone);
                 setEmail(response.data.email);
                 setCountry(response.data.country);
                 setState(response.data.state);
                 setCity(response.data.city);
                 
                 Alert.success('update successfully', {
                    position: 'top-right',
                    effect: 'stackslide'
                    
                });
                /***/if (onStoreImageChange){

                    UploadStoreImage(image).then((response) => {
                        if (response.data.status===200){
                          Alert.success('store image updated', {
                            position: 'top-right',
                            effect: 'stackslide'
                
                        }); 
                        }
                        //addToast(exampleToast(response.data.message));
                      })
                } 
                setStoreUpdated(!storeUpdated);
               
           }else{
            Alert.error('update was unsuccessful', {
                position: 'top-right',
                effect: 'jelly'
    
            });
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
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGQ4N2FkODExNzM0MTU3NmMwOGYzYjciLCJpYXQiOjE2MjQ5OTg3MDd9.d8KtF6Q2KFQrvDQNOPzVN_4S8Iaz47vH5GHSm2cI0Eg',
      }

    }
    return post(`http://localhost:3001/api/stores/updateImage/${store._id}`, formData, config)
  }

  const updateStore =()=>{
     
    const url = `http://localhost:3001/api/stores/${store._id}`;
   
    const formData=new FormData();
          formData.append("storeId",store._id);
          formData.append("name",name);
          formData.append("email",email);
          formData.append("phone",phone);
          formData.append("description",description);
          formData.append("country",country);
          formData.append("state",state);
          formData.append("city",city);
          formData.append("image",image);

    const body={
             storeId:store._id,
             name:name,
             email:email,
             phone:phone,
             description:description,
             country:country,
             state:state,
             city:city,
             currency:currency,
    }
    const config = {
        headers: {
            'Content-Type':'application/json',
            'auth-token':
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGQwNjc4YWY2NzA3ZTI1YzAyODBiNmQiLCJpYXQiOjE2MjQyNzA3NjN9.YGbjKlP3gQTGY_-3Epsik8N6QCWmtTYrOABFm7Iu2fY',
          },
         
          
    }
    return patch(url, body,config)
  
  };
    useEffect(()=>{


        const fetchStore = async () => { //get specific Store
         try {
          const res = await fetch(`http://localhost:3001/api/stores/${store._id}`);
          const data = await res.json();
          return data;
         } catch (error) {
           console.log({fetch_store_message:error})
         }
        }
        const getStore = async () => {
            try {
             const storefromServer = await fetchStore();
             console.log(storefromServer)
            if (storefromServer.length >0){
                setStore(storefromServer)
            }
        
            } catch (error) {
              console.log({message:error})
            }
           };

           getStore();
        
          
    },[store]);
  return (
    <div className="store">
        <Alert stack={{limit: 3}} />
      <div className="updateStoreTitle">
            <div className="storeTitleContainer">
                <h1 className="storeTitle">Edit Store Details</h1>
                <Link to="/dashboard/newStore">
                 <button className="storeAddButton">Create</button>
              </Link>
            </div>
            <div className="storeContainer">
                <div className="storeShow">
                    <div className="storeShowTop">
                        <img src={`http://localhost:3001/server/uploads/stores/${store.image[0].filename}` } id="store-show-img" alt="" className="storeShowImg" />
                       <div className="storeShowTopTitle">
                           <span className="storeShowstorename">{name}</span>
                           <span className="storeShowstoreTitle">{description}</span>
                       </div>
                    </div>
                    <div className="storeShowBottom">
                        <span className="storeShowTitle">Contact Details</span>
                        <div className="storeShowInfo">
                             <PhoneAndroid className="storeShowIcon"/>
                        <span className="storeShowInfoTitle">{phone}</span>
                        </div>
                        <div className="storeShowInfo">
                             <MailOutline className="storeShowIcon"/>
                        <span className="storeShowInfoTitle">{email}</span>
                        </div>
                        <div className="storeShowInfo">
                             <LocationSearching className="storeShowIcon"/>
                        <span className="storeShowInfoTitle">{`${country} , ${state} , ${city}`}</span>
                        </div>
                       </div>
                </div>
                <div className="storeUpdate"> 
                    <span className="storeUpdateTitle" >Edit</span>
                    <form  className="storeUpdateForm" onSubmit={handleUpdate}>
                    <div className="storeUpdateLeft">
                        <div className="storeUpdateItem">
                            <label>StoreName</label>
                            <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} className="storeUpdateInput"/>
                        </div> 
                        
                        <div className="storeUpdateItem">
                            <label>Email</label>
                            <input type="text" className="storeUpdateInput" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                        </div>
                        <div className="storeUpdateItem">
                            <label>Description</label>
                            <textarea rows="3" value={description}  onChange={(e)=>{setDescription(e.target.value)}} className="storeUpdateTextarea"/>
                        </div>
                       
                        <div className="storeUpdateItem">
                            <label>Phone</label>
                            <input type="text" value={phone} onChange={(e)=>{setPhone(e.target.value)}} className="storeUpdateInput"/>
                        </div>
                        <div className="storeUpdateItem">
                            <label>Country</label>
                            <input type="text" value={country} onChange={(e)=>{setCountry(e.target.value)}} className="storeUpdateInput"/>
                        </div>
                        <div className="storeUpdateItem">
                            <label>State</label>
                            <input type="text" value={state} onChange={(e)=>{setState(e.target.value)}}className="storeUpdateInput"/>
                        </div>
                        <div className="storeUpdateItem">
                            <label>City</label>
                            <input type="text" value={city} onChange={(e)=>{setCity(e.target.value)}} className="storeUpdateInput"/>
                        </div>

                        <div className="storeUpdateItem">
                            <label>Currency</label>
                            <select type="text" name="currency" value={currency} onChange={(e)=>{setCurrency(e.target.value)}} className="storeUpdateInput" required >
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

                        </div> 
                    <div className="storeUpdateRight">
                        <div className="storeUpdateUpload">
                            <img src={`http://localhost:3001/server/uploads/stores/${store.image[0].filename}`} alt="" className="storeUpdateImg" id="store-image" />
                            <label htmlFor="file"> <Publish className="storeUpdateIcon"/> </label>
                                <input type="file" id="file" onChange={onFileInputChange} style={{display:"none"}}/>
                       </div>
                       <button className="storeUpDateButton">Update</button>
                    </div>
                    </form>
                </div>
            </div>
      </div>
    </div>
  )
}


