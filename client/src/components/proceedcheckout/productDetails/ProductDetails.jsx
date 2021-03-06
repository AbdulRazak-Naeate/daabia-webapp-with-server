import { Card,Typography,Button, CardContent} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';

import React from 'react';
import useStyles from './styles';
import {Link } from 'react-router-dom';
import { formarttoCurrency, truncateString } from '../../../utils/Utils';
import { EditorState , convertFromRaw} from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html'

const ProductDetails = ({product,onAddToCart}) => {
    const classes =useStyles();
    console.log(product)
  return (
    <div className={classes.root} >
      {
        product !== undefined ?  <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
         <div className={classes.contentSub}>
        <div className={classes.priceWrapper}>
        <Typography variant="h4" className={classes.price}>
              {formarttoCurrency(product.price,'π')}
          </Typography>
        </div>
         
         <Typography variant="h5">
              {product.name}
          </Typography>
         
          <div dangerouslySetInnerHTML={{ __html: product.description }} />
         </div>
         <div className={classes.actions}>
         <Button to="/" component={Link} variant='outlined'>Back to Home</Button>
           <Button type="submit" variant="contained" color="primary" onClick={()=>{onAddToCart(product,1)}}>Add to  Cart <AddShoppingCart/>  
          </Button>
         </div>
        </CardContent>

       </Card>:''
      }
    </div>
  )
}

export default ProductDetails
