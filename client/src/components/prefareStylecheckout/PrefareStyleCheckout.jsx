import React,{useState} from 'react';
import{Grid} from '@mui/material';
import ImageView from './imageview/ImageView';
import ProductDetails from './productDetails/ProductDetails';
import useStyles from './styles';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import axios from 'axios';
import { randNumber } from '../../utils/Utils';

const PrefareStyleCheckout = ({onAddToCart}) => {
    const classes=useStyles();
    const [productImages,setProductImages]=useState([]);
    const [loadedImage,setLoadedImages]=useState([]);

    const [productname]= useState("PrefareStyle-"+randNumber(5));
    const[product]=useState({name:productname,price:'150',description:''})
    const onImageClicked = (e) => {
        const formfile = document.getElementById("product-file");
        formfile.click();
    }
    

   function  onFileInputChange(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function (e) {       
      
       setProductImages([file]);

        console.log(productImages);
        setLoadedImages( e.target.result)

        document.getElementById('imgpreview').style.backgroundImage = e.target.result
    };
    try {
        reader.readAsDataURL(file)

    } catch (error) {
        console.log({ readAsDataURLError: error })
    }
}
   
const initiateAndCreateProduct =()=>{
  
  const url = 'http://localhost:3001/api/products/prefstyle';

  //console.log(colors);
  const formData = new FormData();
  //getInput values
 // let colors = getInputValues('color-specs');
  //let sizes  = getInputValues('size-specs');

 /*  for (let i = 0; i < colors.length; i++) {
     if(colors[i]!==""){
      formData.append('color', colors[i]);
     }
  } */
 /*  for (let j = 0; j < sizes.length; j++) {
    if (sizes[j]!==""){
      formData.append('size', sizes[j]);
    }
  } */
  formData.append('name',productname);
  formData.append('price', "150");
  formData.append('category',"null");
  formData.append('description', "null");
  formData.append('specification', "none");
  formData.append('digital_product_url', 'null');//append digital
  formData.append('storeId', 'null');
  formData.append('stock','0');
  formData.append('active','0');
  formData.append('product_type','special');
  console.log(JSON.stringify(formData));

  //append files to image to create an a file array

  for (var i = 0; i <= productImages.length; i++) {
    formData.append('image', productImages[i]);
    console.log(productImages);
  }

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
     /*  'auth-token': user.auth_token, */
    },
  }
  return axios.post(url, formData, config)

};
    const handleMakeOrder=()=>{
      if (loadedImage.length > 0){
        initiateAndCreateProduct().then((response) => {
          console.log(response.data);
         if (response.data.status===200){
          //window.location.reload();
          onAddToCart(response.data.product,1);
            //clearFields();
         }else if (response.data.status===400){ 
  
          Alert.error(response.data.message, {
            position: 'top-left',
            effect: 'jelly'
  
        });
       // history.go(0);
         }
        }); 
      }else{
        Alert.error('Please click on the style image to upload your design ', {
          position: 'top-right',
          effect: 'jelly'

      });
      }
      
    }
      const handleImages=(Images)=>{
        let tmp=[];
       Images.map((item)=>{
          tmp.push(item)
         // console.log(tmp);
          return null
       })
    }
  return (
    <div className={classes.content}> 
           <Alert stack={{limit: 3}} />
        <Grid container justifyContent="center" spacing={1}>
        
        <Grid item={true} xs={12} sm={12} md={5} lg={5}>
        <ImageView  loadedImage={loadedImage} onImageClicked={onImageClicked} onFileInputChange={onFileInputChange}className={classes.imageView}/> 
       
        </Grid>
        <Grid item={true} xs={12} sm={12} md={5} lg={4}> 
        <ProductDetails product={product}  handleMakeOrder={handleMakeOrder}/>
         {/*   <ProductDetails product={product} onAddToCart={onAddToCart}/>
           */}
        </Grid>
         
         </Grid>
         

         </div>
  )
}

export default PrefareStyleCheckout
