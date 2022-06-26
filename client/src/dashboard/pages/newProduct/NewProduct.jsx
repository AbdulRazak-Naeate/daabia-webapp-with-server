/* eslint-disable no-unused-vars */
import { React,useState } from 'react';
import {Link} from 'react-router-dom';
import './newProduct.css';
import QueryParams from '../../QueryParams';
import Specs from './specs/Specs'
import { post } from 'axios';
import thumbnail from './ImagesContainer/thumbnail-wide.png';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import ImageGallery from './imageGallery/ImageGallery';
export default function NewProduct() {
    
    const [productImages,setProductImages]=useState([]);
    const [digitalProductUrl, setdigitalProductUrl] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock,setStock]=useState('');
    const [active,setActive]=useState('');
    const [specification,setSpecification] = useState('none');
    const [showSpecification,setShowSpeicification]=useState(false);
    const [showDigitalProductFileInput,setShowDigitalProductFileInput] = useState(false);
    const [clearImages,setClearImages]=useState(false);

    //retrieves specs variables eg colors  ans size
    const [colors,setColors]=useState([]);
    const [sizes,setSizes]=useState([]);

    const[user]=useState(JSON.parse(localStorage.getItem('user')));
    let query=QueryParams();
    const storeid= query.get('storeId');
    const storename =query.get("storeName");
    const category =query.get("categoryId");
    
        const onSpecificationChange = (e) => {
        setSpecification(e.target.value)
        if(e.target.value==="no"){
          setShowSpeicification(false);
        }else{
          setShowSpeicification(true)
          setShowDigitalProductFileInput(false) //Specification is set SPECIFIED ,hide Digital product file input
        }
        console.log(e.target.value)
      }
      const onstockChange =(e)=>{
          setStock(e.target.value)
      }
      const onAddProductCLick =()=>{
        //  let storeid=document.getElementById("storeselect").value
         // console.log(storeid)
          //setStoreId(storeid)
        
      }    

      const clearImagesonSubmit=(images)=>{
         if (clearImages) {
           images=[];
         }
      }
      

      const clearFields = () =>{
        setName('')
        setDescription('')
        setStock(0)
        setActive('no')
        setPrice('0')

        document.getElementById("product-image0").src=thumbnail;
        document.getElementById("product-image1").src=thumbnail;
        document.getElementById("product-image2").src=thumbnail;
       setShowSpeicification(false);
       setShowDigitalProductFileInput(false);
       setProductImages([]);
       setClearImages(true);
     
      }
    
    
      const onDigitalProductUrlChange = (e) => {
        setdigitalProductUrl(e.target.value);
      }
      const onDigitalProuctInputChange = (e)=>{
            if(e.target.value==="no"){
             setShowDigitalProductFileInput(false)
            }else{
             setShowDigitalProductFileInput(true)
            }
            console.log(e.target.value)
      }
        
      const handleImages=(Images)=>{
        let tmp=[];
       Images.map((item)=>{
          tmp.push(item)
         // console.log(tmp);
          return null
       })
       //setProductImages(tmp);
    }
    
    
    
    
        //Get color and size input Values from input els, @elId is element Id 
      const getInputValues = (elId) => {
        var inputValues = [];
    
        var inputEl = document.getElementsByClassName(elId);
    
        for (var i = 0; i < inputEl.length; i++) {
             inputValues.push(inputEl[i].value);
        }
         //console.log(inputValues)
        return inputValues;
      }

      const onFormSubmit = (e) => {
       
        const form = e.currentTarget
        if (form.checkValidity() === false) {
          e.stopPropagation()
        }
        
        e.preventDefault()// Stop form default submit
        
            initiateAndCreateProduct().then((response) => {
              console.log(response.data);
             if (response.data.status===200){
              //window.location.reload();
               
                clearFields();
             }else if (response.data.status===400){ 

              Alert.error(response.data.message, {
                position: 'top-right',
                effect: 'jelly'
    
            });
           // history.go(0);
             }
            });
           
      }
     const initiateAndCreateProduct =()=>{
        
        const url = 'http://localhost:3001/api/products/';
    
        console.log(colors);
        const formData = new FormData();
        //getInput values
       // let colors = getInputValues('color-specs');
        //let sizes  = getInputValues('size-specs');
    
        for (let i = 0; i < colors.length; i++) {
           if(colors[i]!==""){
            formData.append('color', colors[i]);
           }
        }
        for (let j = 0; j < sizes.length; j++) {
          if (sizes[j]!==""){
            formData.append('size', sizes[j]);
          }
        }
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category',category);
        formData.append('description', description);
        formData.append('specification', specification);
        formData.append('digital_product_url', digitalProductUrl);//append digital
        formData.append('storeId', storeid);
        formData.append('stock',stock);
        formData.append('active',active)
        console.log(JSON.stringify(formData));
     
        //append files to image to create an a file array
      
        for (var i = 0; i <= productImages.length; i++) {
          formData.append('image', productImages[i]);
          //console.log(productImages);
        }
    
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            'auth-token':
              user.auth_token,
          },
        }
        return post(url, formData, config)
      
      };
  
   
    return (
        <div className="newProduct">
           <Alert stack={{limit: 3}} />

    <span className="addproductStoreTitle">{storename}
                </span> 
          <div className="addProductTitleContainer">
              <h1 className="addProductTitle">Add New Product </h1>
            
            
          <Link to={`/dashboard/products?storeId=${storeid}&storeName=${storename}&categoryId=${category}`}>
          <button className="ProductListButton">Products</button>
          </Link>

          </div>
          
          <div className="addProductFormContainer">
           <form className="addProductForm" onSubmit={onFormSubmit}>
               <div className="productFormTop">
                  <div className="productFormTopItem">

                <div className="addProductItem">
                <label>Name</label>
                  <input type="text" placeholder="Name" value={name} required onChange={(e)=>{setName(e.target.value)}} />
                </div>
                <div className="addProductItem">
            <label >Price</label>
             <input type="number"  placeholder="100 pi" value={price} required onChange={(e)=>{setPrice(e.target.value)}} />
         </div>

         <div className="addProductItem">
             <label>Active</label>
             <select name="active" id="active" className="active" value={active} onChange={(e)=>{setActive(e.target.value)}}>
               <option value=""></option>
               <option value="yes">Yes</option>
               <option value="no">No</option>
              </select>
            </div>
       
      </div>
         <div className="productFormTopItem">
          <div className="addProductItem">
              <label htmlFor="validationTextarea">Description</label>
        <textarea id="description" name="description" rows="4"
         placeholder="Describe the product you are selling" value={description}
         required onChange={(e)=>{setDescription(e.target.value)}}></textarea>
         </div>
          <div className="addProductItem">
             <label>Stock</label>
             <input type="number" placeholder="123" required setStock={stock} onChange={onstockChange} />
           </div>
           </div>
        <div className="productFormTopItem">
      <div className="addProductItem">
           <label htmlFor="validationCustom04">Specification</label>
          <select id="validationCustom04" value={specification} onChange={onSpecificationChange}>
             <option>no</option>
             <option>yes</option>
          </select> 
      </div>
       <div className="addProductItem">
          { !showSpecification ? <>
         <label htmlFor="validationCustom05">Digital Product</label>
           <select id="validationCustom05" onChange={onDigitalProuctInputChange}>
              <option>no</option>
              <option>yes</option>
             </select></>:''}  
          </div>

          <div className="addProductItem">
            {  showDigitalProductFileInput ?   <div className="digital_product">
               <label>Google Drive Url File</label>
               <div className="addProductItem">
               <input type="text" id="digital-product-file"placeholder="https://drive.google.com/file/d/1PzOdYqBftPID4BNvUa3T_OzEBkzUBwDT/view?usp=drivesdk" onChange={onDigitalProductUrlChange} />
               </div>
               </div> :<></>
           }
            </div>
        
         </div>
        </div>
           
             {/* <ImagesContainer handleImages={handleImages} onSubmit={onSubmit} setOnsubmit={setOnsubmit} clearImagesonSubmit={clearImagesonSubmit}/> */}
             <ImageGallery handleImages={handleImages} productImages={productImages}/>
              {showSpecification ? <Specs setColors={setColors} setSizes={setSizes}/>:<></>}
         
           
        <div className="addProductItem">
        <button className="addProductButton" type="submit" onClick={onAddProductCLick}>Create</button>

        </div>
        </form>
        </div>
       </div>         
    )
}
