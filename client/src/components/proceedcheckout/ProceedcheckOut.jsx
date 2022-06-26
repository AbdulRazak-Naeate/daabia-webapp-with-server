import React,{useState,useEffect,useRef} from 'react'
import useStyles from './styles';
import ImageView from './imageview/ImageView';
import ProductDetails from './productDetails/ProductDetails';
import QueryParams from '../../QueryParams';
import axios from 'axios'
import Grid from '@mui/material/Grid';
import Slider from './slider/Slider_';
import CommentItem from '../comments/commentitem/CommentItem';

const ProceedcheckOut = ({onAddToCart}) => {
    const query =QueryParams()
    const classes = useStyles();
    const[storeid]=useState(query.get('storeId'));
    const[productid]=useState(query.get('productId'));
    const[product,setProduct]=useState([]);
    const[images,setImages]=useState([]);
    const[comments,setComments]=useState([])
    const isMountedRef =useRef(true)
    const [isproductLoaded,setIsproductLoaded]=useState(false)
    const [isCommentsLoaded,seIsCommentsLoaded]=useState(false)

/* const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
})); */
  const CommentList =()=>{
    return(
           <div className={classes.commentList} >
             {
               comments.map((comment,index)=>{
                
                return (<CommentItem comment={comment} key={index}/>)
               
             })
            }
           </div>
    
           
    )
  }

    useEffect(()=>{
     isMountedRef.current=false


        const getProduct = async ()=>{
           
             fetchProduct().then((response) => {
              console.log(response.data);
               if (response.status===200){
                   
                 try{
                     
                   setProduct(response.data.product)
                   setImages(response.data.product.image)
                  
                 }catch(err){
                   console.log(err)
                 }
               }
               //addToast(exampleToast(response.data.message));
             })
           
         }
         
         
           
         
           const fetchProduct =()=>{
         
             const url = `http://localhost:3001/api/products/${productid}`;
             
             return axios.get(url)
           
           };

           
     const handlegetComments = async() =>{
      loadCommentsFromServer().then((response)=>{
        if(response.status===200){
          setComments(response.data.comments)
        }
      })
  }
   const loadCommentsFromServer= async ()=>{
     const url=`http://localhost:3001/api/comments/${storeid}/${productid}`;
    return axios.get(url)
   }

   
      if (productid){
       if (!isproductLoaded){getProduct();}
       if (!isCommentsLoaded){handlegetComments();}
       }
     return()=>{
       setIsproductLoaded(true)
     }
       
    },[isCommentsLoaded, isproductLoaded, productid, storeid])
  return (
   <div className={classes.content}> { product ?
    <Grid container justifyContent="center" spacing={1}>
    
    <Grid item={true} xs={12} sm={12} md={6} lg={6}>
    <ImageView images={images} className={classes.imageView}/> 
    <Slider images={images} />
    </Grid>
    <Grid item={true} xs={12} sm={12} md={5} lg={4}>
       <ProductDetails product={product} onAddToCart={onAddToCart}/>
      
    </Grid>
     
     </Grid>
     
     : ''}
    <div className={classes.commentListContainer}>
      { comments ? <CommentList/> :''} 

    </div>
      
     
     </div>
  )
}
export default ProceedcheckOut
