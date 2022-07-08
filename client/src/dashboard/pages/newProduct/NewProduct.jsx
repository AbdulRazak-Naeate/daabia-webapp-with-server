/* eslint-disable no-unused-vars */
import { React,useState } from 'react';
import {Link} from 'react-router-dom';
import './newProduct.css';
import QueryParams from '../../QueryParams';
import Specs from './specs/Specs'
import { Grid } from '@material-ui/core';
import thumbnail from './ImagesContainer/thumbnail-wide.png';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import ImageGallery from './imageGallery/ImageGallery';
import TextEditor from './textEditor/TextEditor'
export default function NewProduct({store,onFormSubmit}) {
    
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
    const [htmlcontent,setHtmlContent]=useState('')
    //retrieves specs variables eg colors  ans size
    const [colors,setColors]=useState([]);
    const [sizes,setSizes]=useState([]);

    const[user]=useState(JSON.parse(localStorage.getItem('user')));
    let query=QueryParams();
   
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
    const getEditorContent = (htmltoContent)=>{
          setHtmlContent(htmltoContent);
          console.log(htmltoContent)
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

     /*  const onFormSubmit = (e) => {
       
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
        formData.append('category',store.categoryId);
        formData.append('description', description);
        formData.append('specification', specification);
        formData.append('digital_product_url', digitalProductUrl);//append digital
        formData.append('storeId', store._id);
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
      
      }; */
  
   
    return (
        <div className="newProduct">
           <Alert stack={{limit: 3}} />
          <div className='storeCurrencyLabel'>
           <span className="addproductStoreTitle" >{store.name}</span>
            <span>{` Local currency: ${store.currency}`}</span>
           </div>
          <div className="addProductTitleContainer">
              <h1 className="addProductTitle">Add New Product </h1>
            
            
          <Link to={`/dashboard/products?storeId=${store._id}&storeName=${store.name}&categoryId=${store.categoryId}`}>
          <button className="ProductListButton">Products</button>
          </Link>

          </div>
          
          <div className="addProductFormContainer">
           <form className="addProductForm" onSubmit={(e)=>{onFormSubmit(e,clearFields,Alert,colors,sizes,name,price,store.categoryId,description,specification,digitalProductUrl,store._id,stock,active,productImages)}}>
           <Grid container justifyContent="space-between"  xs={12} sm={12} md={12} lg={12} spacing={1} padding={0}>
           <Grid item justifyContent="space-between" spacing={1} padding={0} xs={12} sm={12} md={6} lg={6}>
       
            <Grid item key={'product-name'} xs={12} sm={12} md={12} lg={12}>
           <div className="addProductItem">
                <label>Name</label>
                  <input type="text" placeholder="Name" value={name} required onChange={(e)=>{setName(e.target.value)}} />
                </div>
           
             </Grid>
             
               <Grid item key={'product-description'} xs={12} sm={12} md={12} lg={12}>
             <div className="addProductItem">
              <label htmlFor="validationTextarea">Description</label>
              <TextEditor getEditorContent={getEditorContent}/>
              <Grid item key={'product-gallery'} xs={6} sm={6} md={12} lg={12}>
           {/* <ImagesContainer handleImages={handleImages} onSubmit={onSubmit} setOnsubmit={setOnsubmit} clearImagesonSubmit={clearImagesonSubmit}/> */}
             <ImageGallery handleImages={handleImages} productImages={productImages}/>
             
         
           
          </Grid>
        {/* <textarea id="description" name="description" rows="4"
         placeholder="Describe the product you are selling" value={description}
         required onChange={(e)=>{setDescription(e.target.value)}}></textarea> */
         }
         </div>
       
        </Grid>

         </Grid>

         <Grid item justifyContent="space-between" xs={12} sm={12} md={4} lg={4} spacing={1} padding={0}>
         
             <Grid item key={'product-price'} xs={12} sm={12} md={10} lg={10}>
             <div className="addProductItem">
            <label >Price</label>
             <input type="number"  placeholder="100 pi" value={price} required onChange={(e)=>{setPrice(e.target.value)}} />
         </div>
           
          </Grid>
          <Grid item key={'product-status'} xs={12} sm={12} md={10} lg={10}>
          
           <div className="addProductItem">
             <label>Active</label>
             <select name="active" id="active" className="active" value={active} onChange={(e)=>{setActive(e.target.value)}}>
               <option value=""></option>
               <option value="yes">Yes</option>
               <option value="no">No</option>
              </select>
            </div>
             </Grid>

           
             <Grid item key={'product-stock'} xs={12} sm={12} md={10} lg={10}>
          <div className="addProductItem">
             <label>Stock</label>
             <input type="number" placeholder="123" required onChange={onstockChange} />
           </div>
           
             </Grid>
             <Grid item key={'product-sec'} xs={12} sm={12} md={6} lg={6}>
          
            <div className="addProductItem">
           <label htmlFor="validationCustom04">Specification</label>
          <select id="validationCustom04" value={specification} onChange={onSpecificationChange}>
             <option>no</option>
             <option>yes</option>
          </select> 
      </div>
             </Grid>
  
             <Grid item key={'product-notif'} xs={6} sm={6} md={10} lg={10}>
          
           <div className="addProductItem">
          { !showSpecification ? <>
         <label htmlFor="validationCustom05">Digital Product</label>
           <select id="validationCustom05" onChange={onDigitalProuctInputChange}>
              <option>no</option>
              <option>yes</option>
             </select></>:''} 
          </div>

             </Grid>
             <Grid item key={'product-specs'} xs={6} sm={6} md={10} lg={10}>
               <div className="addProductItem">
                 {showSpecification ? <Specs setColors={setColors} setSizes={setSizes}/>:<></>}
             </div>
             </Grid>

             <Grid item key={'product-digital_url'} xs={6} sm={6} md={10} lg={10}>
          <div className="addProductItem">
            {  showDigitalProductFileInput ?   <div className="digital_product">
               <label>Google Drive Url File</label>
               <div className="addProductItem">
               <input type="text" id="digital-product-file"placeholder="https://drive.google.com/file/d/1PzOdYqBftPID4BNvUa3T_OzEBkzUBwDT/view?usp=drivesdk" onChange={onDigitalProductUrlChange} />
               </div>
               </div> :<></>
           }
            </div>
           
             </Grid>

             {/* <Grid item key={'product-na'} xs={6} sm={6} md={6} lg={12}>
         
             </Grid> */}
          </Grid> 
          
            </Grid>
       
{/* 
             <div className="productFormTop">
                  <div className="productFormTopItem">

               
             

         
       
      </div>
         <div className="productFormTopItem">
       
          
           </div>
        <div className="productFormTopItem">
     
       

          
        
         </div>
        </div> */}
           
            
           
        <div className="addProductItem">
        <button className="addProductButton" type="submit" onClick={onAddProductCLick}>Create</button>

        </div>
        </form>
        </div>
       </div>         
    )
}
