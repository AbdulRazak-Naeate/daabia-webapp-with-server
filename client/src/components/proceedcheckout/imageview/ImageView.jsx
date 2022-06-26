import React,{useState} from 'react'
import useStyle from './styles';
import {Card,CardMedia} from '@material-ui/core';

const ImageView = ({images}) => {
    const classes=useStyle();
    const[imageIndex,setImageIndex]=useState(0);
    const[selected,setselected]=useState(0)
   const onThumbNailCLick=(index)=>{
     setselected(index)
     setImageIndex(index)
     
   }

  const FilledProduct =()=>(
     <div className={classes.viewcontainer}>
     <div className={classes.thumbnailContainer}>
           <div className={classes.thumbnailList}>
            {
              images.map((img,index)=>(
                <Card className={classes.root} key={index}>
                <CardMedia className={`${classes.mediaThumbnail} ${selected===index? classes.select:classes.disSelect} `} onClick={()=>{onThumbNailCLick(index)}}  image={`http://localhost:3001/server/uploads/products/${img.filename}`} title={img.filename}/>
                </Card>
              ))
            }
           </div>
     </div>

     <div className={classes.previewContainer}>
           <Card>
            <CardMedia className={classes.mediaPreview} id="img-preview"  image={`http://localhost:3001/server/uploads/products/${images[imageIndex].filename}`} title={images[imageIndex].name}/>
            </Card>
     </div>
     
   </div>
  )


 
  return (
    <div className={classes.container}>{
       images.length>0?  <FilledProduct/>:'loading ...'
      }
   </div>
  )
}

export default ImageView
