/* eslint-disable no-unused-vars */
import React ,{useState,useEffect} from 'react'
 import{Container,Typography,Button, Grid} from '@mui/material';
 import useStyles from './styles';
 import CartItem from './cartItem/CartItem';
 import {Link,useHistory} from 'react-router-dom';
 import {formarttoCurrency} from '../../utils/Utils';

const Cart = ({cart, handleUpdateCartQty,handleupdateColorSize,handleupdateMeasurement,handleRemoveFromCart, handleEmptyCart,handleupdateSelection}) => {
  
    const classes= useStyles();
    const [itemsCount,setItemsCount]=useState(0);
    const [onHookFormError,setOnhookFormError]=useState(false);
    var colorSizeError=false;
    var measurementError=false;
   const history=useHistory();

   const handleCheckOut=()=>{
   try{
    checkError()
    if (!colorSizeError /* && !measurementError */){
        history.push('/checkout')
   }else{
       
   }
   }catch(err){
       console.log(err)
   }
   } 
   const checkError=()=>{
       const values=[]
      
       for(var i=0;i<cart.items.length;i++){
            var measurement=cart.items[i].measurement
            if (cart.items[i].selected===true){
                var objValues=Object.values(measurement) //get values withen ,measurement object 
            }
           
            
           console.log(cart.items[i].selected)
            if (cart.items[i].product.color.length>=1 && cart.items[i].selected===true){//if items has color specification provided by vendor add its user choice into the array 
                 values.push(cart.items[i].color)
            }
            if(cart.items[i].product.size.length>=1 && cart.items[i].selected===true){//if items has size specification provided by vendor add its user choice into the array 
             values.push(cart.items[i].size)
            }
           
           
       }
        
        //check through items  if user has choosen a specc if not value will be null else the user choice is found 
       if(values.includes('null')){  //Error null value is found user does selected some choice 
           colorSizeError=true
       }else{// no colorSizeError ,not single null value found withen the list
           colorSizeError=false
       }

       for (let i=0;i<objValues.length;i++){//if customer doeos not input measure value return measurement Error
        if (objValues[i]===""){
            measurementError=true
        }else{
            measurementError=false
        }
    }

   }
    useEffect(()=>{
           //console.log("selected List "+colorSelectedList);
 
       try{
        cart.items.length!==undefined?setItemsCount(cart.items.length):setItemsCount(cart.items.length)
       }catch(err){
           console.log(err)
       }
    },[cart,setItemsCount])
    const EmptyCart = ()=>(
        <Typography variant="subtitle1">You have no items in your shopping cart,
        <Link to="/" className={classes.link}>start adding some !</Link>
        </Typography>
    );
    const  FilledCart =()=>(
          <>
            <Grid container spacing={3} className={classes.filledcart}> 
                {cart.items.map((item,index)=>(
                    <Grid item xs={12} sm={4} md={4} lg={4} key={`grid-${index}`}>
                        <CartItem cartitem={item} key={`cartitem-${index}`} onUpdateCartQty={handleUpdateCartQty} onUpdateColorSize={handleupdateColorSize} onUpdateMeasurement={handleupdateMeasurement} onRemoveFromCart={handleRemoveFromCart} onHookFormError={onHookFormError} setOnhookFormError={setOnhookFormError} onUpdateSelect={handleupdateSelection}/>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
             <div> <Typography variant="h5" className={classes.price}>{`Subtotal: ${formarttoCurrency(cart.subtotal,'π')}`} </Typography>
              </div>
                <div className={classes.buttons}>
                <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty Cart</Button> 
                 <Button  className={classes.checkoutButton} size="large" type="button" variant="contained" onClick={handleCheckOut} color="primary">Check Out</Button>
                </div>

            </div>
        </>
    )

    if (!cart) return 'Loading ...';

    return (
        <div >
            <Container className={classes.root} >
                <div  className={classes.toolbar}>
                <Typography className={classes.title} variant="h4" gutterBottom>Your Shopping Cart</Typography>
                </div>
                
                {itemsCount===0 ? EmptyCart(): FilledCart()}
            </Container>
        </div>
    )
}

export default Cart
