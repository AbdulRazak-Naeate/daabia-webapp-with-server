import React ,{useState} from 'react'
import {Card, CardContent, CardMedia, Typography,Button} from '@material-ui/core';
import useStyles from './styles';
import './styles.css';
const OrderItem = ({order,onReviewClick}) => {
    const classes=useStyles();
    const [imagepath]=useState(order.orderType==='normal' ? `http://localhost:3001/server/uploads/products/${order.filename}` : `http://localhost:3001/server/uploads/products/prefarestyleproducts/${order.filename}`)
const truncateString=(str, num) => {
  if(str.length>num){
    return str.slice(0,num)+"...";
  }else{
    return str;
  }
} 


  return (
    <div> 
      <Card className={classes.root}>
           <CardMedia className={classes.media} image={imagepath}> </CardMedia>
    

                <CardContent className={classes.cardContent}>
                     <div className={classes.title}>
                     <Typography noWrap={true} variant="h6" >
                            {order.name}
                        </Typography>
                     </div>
                   <div className={classes.cardContentSub}>
                   <div className={classes.contentSubdetailsWrapper}>
                   <div className={classes.orderDetails}>
                        <Typography variant="body1">
                            {`$${order.priceEach}`}
                        </Typography>
                      <Typography variant="body2">
                        Quantity :{order.quantity}  
                      </Typography>

                      <Typography variant="body2">
                       Total :{`$${order.totalPrice}`}  
                      </Typography>
                       <Typography variant="body2">
                          {`${new Date(order.date).toUTCString()}`}
                     </Typography>
                  </div>
                  <div className={classes.orderDetails2}>
                     {order.color!=='null' ?      <Typography variant="body2" className={classes.color}>
                        {order.color}  
                      </Typography>:''}
                     {order.size!=='null' ? <Typography variant="body2" className={classes.size}>
                        {order.size}  
                      </Typography>:''}
                      <Typography variant="body2">
                      </Typography>
                      <Typography variant="body2" className='orderNumber'>
                        {`#${order.orderNumber}`}  
                      </Typography>

                      <Typography variant="body2" className={order.status}>
                        {order.status}  
                      </Typography>

                  </div>
                   </div>
                   </div>   
                     { order.status==='Completed'? <Typography variant='body2' className={classes.feedback} onClick={()=>{onReviewClick(order)}}>feedback</Typography>:''}

                </CardContent>

           
      </Card>
    </div>
  )
}

export default OrderItem
