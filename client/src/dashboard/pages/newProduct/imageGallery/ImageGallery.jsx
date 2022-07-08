import React, { useState } from 'react'
import thumbnail from './thumbnail-wide.png';
import {Grid,Typography} from '@material-ui/core'
import './index.css'
const ImageGallery = ({handleImages,productImages}) => {
  
    const[imagediv]=useState(["0","1","2"]);
    const [imageTagIndex, setImageTagIndex] = useState(null);
    const [ImageToLoadId, setImageToLoadId] = useState(null);
    
    const onImageClicked = (e) => {
        const formfile = document.getElementById("product-file");
        formfile.click()
        setImageToLoadId(e.target.id) //sets id of the image

        let character = (e.target.id).toString(); //convert number to string
        //get last character of product-image# which gets cliked
        setImageTagIndex(character.charAt(13));

    }
   
  

    function  onFileInputChange(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function (e) {

            let indextoRemove = parseInt(imageTagIndex);//gets Index of  clicked image 
           
                document.getElementById(ImageToLoadId).src = thumbnail;
          
              try{
            //push image item whiles Array length is 3 
            //else replace existing index with new image  
            productImages.length <= 2 ? productImages.push(file) : productImages.splice(indextoRemove, 1, file);
            // console.log("replaced index "+typeof(indextoRemove));
              }catch(err){

                 console.log(err)
              }

            console.log(productImages.length);

            document.getElementById(ImageToLoadId).src = e.target.result

            handleImages(productImages)
        };
        try {
            reader.readAsDataURL(file)

        } catch (error) {
            console.log({ readAsDataURLError: error })
        }
    }

  return (
   <div>
      <Typography variant='h5'>Gallery</Typography>
     <Grid className="imageGallery" justifiContent='space-between' container spacing={1} padding={0} xs={4} sm={6} md={12} lg={12}>
         {
             imagediv.map((img,index)=>{
                 return(<Grid item xs={12} sm={12} md={4} lg={4}>   <img className="productImg" alt={img}key={index} id={`product-image${img}`} src={thumbnail}  onClick={ (e) => { onImageClicked(e) }}/></Grid>)
             })
         }
          <input style={{display:"none"}} type="file" id="product-file" multiple onChange={onFileInputChange} />
    </Grid>
   </div>
  )
}

export default ImageGallery
