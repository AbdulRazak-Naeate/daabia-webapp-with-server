import axios from 'axios';
class Daabia {

  constructor(storeid){
    this.storeid=storeid;

  }

  /*   get() {
    
      product(){
        return ('product')
      }
  } */
  
//Products start here

  async  fetchProducts(){
    try{
       const res = await fetch(`http://localhost:3001/api/products/store/${this.storeid}`);
       const data=await res.json();
             console.log(data);
             return data.products;
    }catch(error){

    }
  }

  async  initiateAndCreateProduct(auth_token,colors,sizes,name,price,categoryId,description,specification,digitalProductUrl,storeid,stock,active,productImages){
    
    const url = 'http://localhost:3001/api/products/';

    //console.log(colors);
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
    formData.append('category',categoryId);
    formData.append('description', description);
    formData.append('specification', specification);
    formData.append('digital_product_url', digitalProductUrl);//append digital
    formData.append('storeId', storeid);
    formData.append('stock',stock);
    formData.append('active',active)
 
    //append files to image to create an a file array
  
    for (var i = 0; i <= productImages.length; i++) {
      formData.append('image', productImages[i]);
      //console.log(productImages);
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'auth-token':
          auth_token,
      },
    }
    return axios.post(url, formData, config)
  
  };

}





export default  Daabia;
