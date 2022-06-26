import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css';
import thumnbail from './thumbnail-wide.png';

const ImagesContainer = ({ handleImages ,onSubmit,setOnsubmit,clearImagesonSubmit}) => {

    const [imageTagIndex, setImageTagIndex] = useState(null);
    const [ImageToLoadId, setImageToLoadId] = useState(null);
    const [productImages,setProductImages] = useState([]);
    
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
            console.log(onSubmit);
            if (onSubmit===true && productImages.length>0){//onsubmit of new product reinitiate productImages Array to [],
                 for(let i=0;i<productImages.length+1;i++){
                     productImages.pop(i);
                     console.log(productImages)
                 }
                document.getElementById(ImageToLoadId).src = thumnbail;
                setOnsubmit(false);
            }
            //push image item whiles Array length is 3 
            //else replace existing index with new image  
            productImages.length <= 2 ? productImages.push(file) : productImages.splice(indextoRemove, 1, file);
            // console.log("replaced index "+typeof(indextoRemove));

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



    useEffect(() => {
            
        
        const createProductImages = (count, option) => {
            var images = [];
            let productImagesWrapper;

            if (option === "new") {
                for (let i = 0; i < count; i++) {

                    images.push(React.createElement('img', {
                        className: 'productImg',
                        id: `product-image${i}`, key: i, src: thumnbail,
                        onClick: (e) => { onImageClicked(e) }
                    }));
                }

                productImagesWrapper = React.createElement('div',
                    { className: "imageswrapper" }, images)

            } else {
                productImagesWrapper = document.getElementById("imageswrapper");

            }
            ReactDOM.render(productImagesWrapper, document.getElementById("product-images"))
        }

        createProductImages(3, "new")
    })

    return (

        <>  
            <span>Product Image</span>
            <div id="product-images" className="productImages">

            </div>

            <input style={{display:"none"}} type="file" id="product-file" multiple onChange={onFileInputChange} />

           {/*  <div className="add-button-wrapper" style={{ marginTop: 10 }}>

            </div>
 */}


        </>
    )
}

export default ImagesContainer
