import React,{useState,useEffect} from 'react'
import {Paper,Stepper,Step,StepLabel,Typography,CircularProgress,Divider,Button} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import axios from  'axios';

const steps =['Shipping address','Payment details'];

const CheckOut = ({cart,order,onCaptureCheckout,error,addresses,setAddresses,handleDeleteAddress}) => {

    const [activeStep,setActiveStep]=useState(0);
    const [checkoutToken,setCheckoutToken]= useState([]);
    const [shippingData,setShippingData]=useState({});
    const [address,setAddress]= useState(addresses.length>0 ? addresses[0]:{});
    const [showAddresses,setShowAddresses]=useState(addresses.length >0 ? true :false);
    const [selectedValue, setSelectedValue] = React.useState('a');

    const classes = useStyles();
    const history = useHistory();
    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const handleonRadioButtonChanged = (event,alphabets) => {
      var value=event.target.value  
      
      var index=alphabets.indexOf(value);
      var addr=addresses[index];
      setSelectedValue(event.target.value);
      setAddress(addr)
             console.log(addr);

    };
    
    useEffect(() => {
      const getToken = async (cartid)=>{
        const url = `http://localhost:3001/api/carts/generate_token`;
       
     
        return axios.patch(url,{
          cartId:cartid
        })
      
      };
        if (cart) {
          console.log(cart)
          const generateToken = async () => {
            try {
             const token = await getToken(cart._id);
             console.log(token)
              setCheckoutToken(cart);
            } catch {
              if (activeStep !== steps.length) history.push('/');
            }
          };
    
          generateToken();
        }
      }, [cart,activeStep,history]);
     const next = (data) =>{
            setShippingData(data);
            nextStep();
     };
    console.log(order)
  let Confirmation = () => (order.customer ? (
    <>
      <div>
        <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2">Order ref: {order.shipping.orderNumber}</Typography>
      </div>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
    </>
  ) : (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  ));

  if (error) {
    Confirmation = () => (
      <>
        <Typography variant="h5">Error: {error}</Typography>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
      </>
    );
  }
     const Form = () => activeStep === 0
     ?<AddressForm checkoutToken={checkoutToken}  next={next} address={address}  setAddress={setAddress} addresses={addresses} showAddresses={showAddresses} setShowAddresses={setShowAddresses} handleonRadioButtonChanged={handleonRadioButtonChanged} selectedValue={selectedValue} handleDeleteAddress={handleDeleteAddress}/>
     :<PaymentForm shippingData={shippingData}   checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep}  onCaptureCheckout={onCaptureCheckout}   />

     
  return (
     <>
     <div className={classes.toolbar}/>
      <main className={classes.layout}>
          <Paper className={classes.paper}>
        <Typography variant="h4" align="center">Checkout</Typography>
        <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step)=>(
                <Step key={step}>
                     <StepLabel>{step}</StepLabel>
                </Step>

            ))}
            
        </Stepper>
        {activeStep===steps.length? <Confirmation/>:checkoutToken&&<Form/>}
        </Paper>
      </main>
      
     </>
  )
}

export default CheckOut
