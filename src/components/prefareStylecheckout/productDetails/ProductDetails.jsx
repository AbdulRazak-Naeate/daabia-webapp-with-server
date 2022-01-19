import { Card,Typography,Button, CardContent} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';

import React from 'react';
import useStyles from './styles';
import {Link } from 'react-router-dom';
import { formatWithCurrencySymbol, truncateString } from '../../../utils/Utils';


const ProductDetails = () => {
    const classes =useStyles();

  return (
    <div className={classes.root} >
       <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
         <div className={classes.contentSub}>
        <div className={classes.priceWrapper}>
        <Typography variant="h4" className={classes.price}>
              {formatWithCurrencySymbol('150','GHS')}
          </Typography>
        </div>
         
         <Typography variant="h5">
             PrefareStyle-009573
          </Typography>
         
          <Typography variant="body1">
              {/* {truncateString(product.description,200)} */}
          </Typography>
         </div>
         <div className={classes.actions}>
         <Button to="/" component={Link} variant='outlined'>Back to Home</Button>
           <Button type="submit" variant="contained" color="primary" onClick={()=>{}}>Add to  Cart <AddShoppingCart/>  
          </Button>
         </div>
        </CardContent>

       </Card>
    </div>
  )
}

export default ProductDetails
