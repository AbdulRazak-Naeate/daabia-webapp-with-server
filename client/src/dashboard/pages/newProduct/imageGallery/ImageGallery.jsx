import React, { useState } from 'react'
import thumbnail from './thumbnail-wide.png';
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
    <div className="imageGallery">
         {
             imagediv.map((img,index)=>{
                 return(<img className="productImg" alt={img}key={index} id={`product-image${img}`} src={thumbnail}  onClick={ (e) => { onImageClicked(e) }}/>)
             })
         }
          <input style={{display:"none"}} type="file" id="product-file" multiple onChange={onFileInputChange} />
    </div>
  )
}

export default ImageGallery
