import React ,{useState,useEffect} from 'react'
 import{Container,Typography,Button, Grid} from '@material-ui/core';
 import useStyles from './styles';
 import CartItem from './cartItem/CartItem';
 import {Link,useHistory} from 'react-router-dom';
const Cart = ({cart, handleUpdateCartQty,handleupdateColorSize,handleupdateMeasurement,handleRemoveFromCart, handleEmptyCart,handleupdateSelection}) => {
  
    const classes= useStyles();
    const [itemsCount,setItemsCount]=useState(0);
    const [onHookFormError,setOnhookFormError]=useState(false);
    var colorSizeError=false;
    var measurementError=false;

   const history=useHistory()
   const handleCheckOut=()=>{
    checkError()
     if (!colorSizeError && !measurementError){
         history.push('/checkout')
    }else{
        
    }
   } 
   const checkError=()=>{
       const values=[]
      
       for(var i=0;i<cart.items.length;i++){
            var measurement=cart.items[i].measurement
            var objValues=Object.values(measurement)
            
         
            if (cart.items[i].product.color.length>=1 ){//if items has color specification provided by vendor add its user choice into the array 
                 values.push(cart.items[i].color)
            }
            if(cart.items[i].product.size.length>=1){//if items has size specification provided by vendor add its user choice into the array 
             values.push(cart.items[i].size)
            }
           
           
       }
        
        //check through items to see if user has choosen a specc if not value will be null else the user choice is found 
       if(values.includes('null')){  //Error null value is found user does selected some choice 
           colorSizeError=true
       }else{// no colorSizeError ,not single null value found withen the list
           colorSizeError=false
       }

       for (let i=0;i<objValues.length;i++){//if custome rdos not input measure value return colorSizeError
        if (objValues[i]===""){
            measurementError=true
            //console.log('measurement colorSizeError')
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
            <Grid container spacing={3}> 
                {cart.items.map((item,index)=>(
                    <Grid item xs={12} sm={4} key={`grid-${index}`}>
                        <CartItem cartitem={item} key={`cartitem-${index}`} onUpdateCartQty={handleUpdateCartQty} onUpdateColorSize={handleupdateColorSize} onUpdateMeasurement={handleupdateMeasurement} onRemoveFromCart={handleRemoveFromCart} onHookFormError={onHookFormError} setOnhookFormError={setOnhookFormError} onUpdateSelect={handleupdateSelection}/>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
               <Typography variant="h5">Subtotal:${cart.subtotal} </Typography>

                <div className={classes.buttons}>
                <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty Cart</Button> 
                 <Button  className={classes.checkoutButton} size="large" type="button" variant="contained" onClick={handleCheckOut} color="primary">Check Out</Button>
                </div>

            </div>
        </>
    )

    if (!cart) return 'Loading ...';

    return (
        <div>
            <Container>
                <div  className={classes.toolbar}>
                <Typography className={classes.title} variant="h4" gutterBottom>Your Shopping Cart</Typography>
                </div>
                
                {itemsCount===0 ? EmptyCart(): FilledCart()}
            </Container>
        </div>
    )
}

export default Cart
