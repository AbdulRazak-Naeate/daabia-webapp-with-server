import React,{useEffect, useState} from 'react'
import useStyle from './styles';
import {Card,CardMedia} from '@material-ui/core';
import CaptanImage from './captan_thumb_nail.png';

const ImageView = ({onImageClicked,loadedImage,onFileInputChange}) => {

    const classes=useStyle();
    

  const FilledProduct =()=>(
     <div className={classes.viewcontainer}>
     <div className={classes.thumbnailContainer}>
           <div className={classes.thumbnailList}>
            {/* {
              images.map((img,index)=>(
                <Card className={classes.root} key={index}>
                <CardMedia className={`${classes.mediaThumbnail} ${selected===index? classes.select:classes.disSelect} `} onClick={()=>{onThumbNailCLick(index)}}  image={CaptanImage} title='prafaredtyleExample'/>
                </Card>
              ))
            } */}
           </div>
     </div>

     <div className={classes.previewContainer}>
           <Card>
            <CardMedia className={classes.mediaPreview} id="imgpreview" onClick={(e)=>{onImageClicked()}}  image={loadedImage.length > 0 ? loadedImage : CaptanImage} title="captanImage example"/>
            </Card>
     </div>
     
   </div>
  )

  return (
    <div className={classes.container}>{
    <FilledProduct/>
      }
       <input style={{display:"none"}} type="file" id="product-file" multiple onChange={onFileInputChange} />

   </div>
  )
}

export default ImageView
