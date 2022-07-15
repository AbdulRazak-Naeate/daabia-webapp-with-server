import React from 'react'
import {Typography,Button,Divider} from '@material-ui/core';
import Review from './Review'
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import axios from 'axios';
import {formarttoCurrency,convertValueFromExponent} from '../../utils/Utils';

const PaymentForm = ({shippingData,checkoutToken,backStep,onCaptureCheckout,nextStep}) => {
  console.log(shippingData.shippingFees);
  var handleFlutterPayment =null;
  
      try{
        const config = {
        public_key:"FLWPUBK-37d2e9fba8018282c3139e2a90c8ef76-X",
        tx_ref: Date.now(),
        amount: checkoutToken.subtotal+convertValueFromExponent(parseFloat(checkoutToken.subfees)),
        currency: 'GHS',
        payment_options: 'card,mobilemoneyghana,ussd',
        customer: {
          email: shippingData.email,
          phonenumber: shippingData.phone,
          name: shippingData.firstName + " " +shippingData.lastName,
        },
        customizations: {
          title: 'Daabia',
          description: 'Payment for items in cart',
          logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
      };
      handleFlutterPayment = new useFlutterwave(config);

      }catch(err){
        console.log(err)
      }

       const handlePayment =(orderData) =>{
              try{
                handleFlutterPayment({
                  callback: (response) => { 
                    closePaymentModal() // this will close the modal programmatically
                     console.log(response);
                     if (response.status==="success"){
                        // FwVerifyPayment(response.transactionid,orderData);
                     }else{
  
                     }
                     
                  },
                  onClose: () => {},
                });
              }catch(err){
                console.log(err)
              }

            }
    
      const handleSubmit= async (event)=>{

        event.preventDefault();
          const orderData={ //reorganize order data
                    line_items: checkoutToken.items,
                    subtotal:checkoutToken.subtotal,
                    customer: {firstname:shippingData.firstName,lastname:shippingData.lastName,phone:shippingData.phone,
                    email:shippingData.email},
                    shipping:{name:'Primary',
                    street:shippingData.address1,
                    home_address:shippingData.address2,
                    town_city:shippingData.citylabel,
                    county_state:shippingData.statelabel,
                    postal_zip_code:shippingData.zip,
                    country:shippingData.countrylabel,
                    orderNumber:shippingData.orderNumber,
                    shippingFees:convertValueFromExponent(parseFloat(checkoutToken.subfees)),
                    date:new Date().toUTCString(),
                    }
                } 
              //console.log(orderData)
               // handlePayment(orderData);
               onCaptureCheckout(checkoutToken._id,orderData);
               nextStep();
              }

        const FwVerifyPayment = (transactionid,orderData) =>{
          var url =`http://localhost:3001/api/verifypayment/${transactionid}`
         axios.get(url).then((response)=>{
           console.log("verify payment response "+response)
              if (response.body.status==="success"){
                onCaptureCheckout(checkoutToken._id,orderData);
                nextStep();
              }  
         })
          clearTimeout();

   }
  

  return (
    <>
     <Review checkoutToken={checkoutToken} fees={checkoutToken.subfees}/> 
             <Divider/>
            <Typography variant="h6" gutterBottom style={{margin:'20px 0'}}>Payment Method</Typography>
  
            <form onSubmit={(e)=>handleSubmit(e)}>
                               
                                <br/><br/>
                                <div style={{display:'flex',justifyContent:'space-between'}}>
                                <Button variant="outlined" onClick={backStep}>Back</Button>
                                <Button type="submit"variant="contained" color="primary">
                                    Pay {`${formarttoCurrency(checkoutToken.subtotal+checkoutToken.subfees,'π')}`}
                                </Button>
                                </div>
                            </form>
    </>
  )
}

export default PaymentForm
