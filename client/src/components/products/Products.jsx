import React from 'react'
import useStyles from './index.js';
import { Grid } from '@material-ui/core';
import Product from './product/Product';
import { blue, orange } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const Products = ({products,onAddToCart,onUpdateLikes,favorites}) => {
  
  const theme = createTheme({
    palette: {
      primary:{
        main:blue[500],
      /*   main:"#3f51b5", */
      },
        secondary: {
            main:orange[500],
            contrastText:'#fff'
        }
      },
});  
  const classes=useStyles();
   //console.log(products.length)
  return (
    <main className={classes.content}>
      
      <div className={classes.toolbar}>
      </div>
      <Grid container justifyContent="center" spacing={1} padding={0}>
       {products.map((product) =>(
         <Grid item key={product._id} xs={6} sm={6} md={2} lg={2}>
           <Product product={product} favorites={favorites} onAddToCart={onAddToCart} onUpdateLikes={onUpdateLikes} />
           
         </Grid>
       ))}
      </Grid>
    </main>
  )
}

export default Products
