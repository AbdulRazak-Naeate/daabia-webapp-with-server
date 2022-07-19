/* eslint-disable no-unused-vars */
import React,{useState,useEffect,useRef,useCallback} from 'react';
import FormInput from './CustomTextField';
import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import { Grid,Select,Button, InputLabel, Typography, MenuItem} from '@material-ui/core';
import axios from 'axios';
import {convertValueFromExponent} from '../../utils/Utils'
/* var loki = require('lokijs');
 */

const AddressForm = ({checkoutToken,next}) => {
  console.log(checkoutToken)
  const uniqueOrderNumber= ()=> {//Unique Identifier
    var result           = '';
   // var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var characters       = '0123456789';

    var charactersLength = characters.length;
    for ( var i = 0; i < 8; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    //console.log(result);
    return result;
  }
    const {register,
      handleSubmit,
      formState: { errors },
    } = useForm();   
     const mountedRef=useRef(true);
     const[isCountriesloaded,setIscountriesLoaded]=useState(false)
    const [countries,setCountries]=useState([]);
    const [country,setCountry]=useState(0);
    const [countrylabel,setCountryLabel]=useState('');
    const [states,setStates]=useState([]);
    const [state,setState]=useState('');
    const [statelabel,setStateLabel]=useState('');
    const [cities,setCities]=useState([]);
    const [city,setCity]=useState('');
    const [citylabel,setCityLabel]=useState('');
    const [orderNumber]=useState(uniqueOrderNumber());
    const [shippingFees,setShippingFees]=useState(checkoutToken ? checkoutToken.subfees :'');
   

    
  const onCountryChange =(e)=>{
    const index=e.target.value;
    const cid=countries[index].id;
    const name=countries[index].name;
    console.log(`${countries[index].name} ${countries[index].id}`)
    setCountry(index);
    setCountryLabel(name)
    getStates(cid);
    //setShippingFees(parseFloat(0.00000020))
  }
  const onStateChange=(e)=>{
    const index=e.target.value;
    const sid=states[index].id;
    const name=states[index].name;
    console.log(`${states[index].name} ${states[index].id}`)
    setState(index);
    setStateLabel(name)
    getCities(sid);
  }
  const onCityChange=(e)=>{
    const index=e.target.value;
    //const cid=cities[index].id;
    const name=cities[index].name;
    console.log(`${cities[index].name} ${cities[index].id}`)
    setCity(index);
    setCityLabel(name)
  }
 
  const getStates= async (cid)=>{
    const url=`http://localhost:3001/api/states/${cid}`;
    await axios.get(url).then((response)=>{
           console.log(response.data.states)
          setStates(response.data.states);

    })
 }
 const getCities= async (sid)=>{
  const url=`http://localhost:3001/api/cities/${sid}`;
  await axios.get(url).then((response)=>{
        console.log(response.data.cities)
        setCities(response.data.cities);

  })
}
   const getCountries =  useCallback( async() => {

      // if (!mountedRef.current) return null ;

     if (!isCountriesloaded){
      try{
        const url=`http://localhost:3001/api/countries`;
        await axios.get(url).then((response)=>
              setCountries(response.data.countries)
             
        )
         console.log(mountedRef.current)
        
        }catch(err){
            console.log(err)
        }
     }
    },[isCountriesloaded]);
  
    useEffect(()=> {
      getCountries();
      return ()=>{
        setIscountriesLoaded(true)
       // mountedRef.current=false;
      };

    },[getCountries]);
       
          
       
    
  return (
   checkoutToken ? <>
      <Typography variant="h6" gutterBottom>Shipping Address</Typography>
          <form onSubmit = {handleSubmit((data) =>{ 
            next({...data,countrylabel,statelabel,citylabel,orderNumber,shippingFees})
            }) } >
            <Grid container spacing={3}>
               <Grid item xs={12} sm={6}>    
                <FormInput name='firstName' size="small" label='First name' register={register} required={true}/>
                </Grid>
                <Grid item xs={12} sm={6}>    
                <FormInput name='lastName'   label='Last name' register={register} required={true}/>
                </Grid>
                <Grid item xs={12} sm={6}>    
                <FormInput name='email'    label='Email' register={register} required={true}/>
                </Grid>
                <Grid item xs={12} sm={6}>    
                <FormInput name='phone' label='Phone' register={register} required={true}/>
                </Grid>
                <Grid item xs={12} sm={6}>    
                <InputLabel>Shipping Country</InputLabel>
                    <Select value={country} name="country"  required fullWidth onChange={onCountryChange}>
                    {countries.map((c,index)=>(
                       <MenuItem key={c.id} value={index}>{c.name}</MenuItem>
                   ))}
                   </Select>                </Grid>
                   <Grid item xs={12} sm={6}>    
                 <FormInput name='address1'  label='Street Address' register={register} required={true}/>
                </Grid>
                 <Grid item xs={12} sm={6}>    
                 <FormInput name='address2'  label='Home Address'placeholder="Apartment,GHpost Number, suite,suite Unit" register={register} required={true}/>
                 </Grid>
                <Grid item xs={12} sm={6}>      
                <FormInput name='zip'   label='Zip/Postal code' register={register}/>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputLabel>Shipping State</InputLabel>
                    <Select value={state}  fullWidth onChange={onStateChange} required >
                    {states.map((s,index)=>(
                       <MenuItem key={s.id} value={index}>
                            {s.name}
                       </MenuItem>
                   ))}
                   </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel>Shipping City</InputLabel>
                    <Select value={city}  fullWidth onChange={onCityChange} required >
                    {cities.map((c,index)=>(
                       <MenuItem key={c.id} value={index}>
                            {c.name}
                       </MenuItem>
                   ))}
                   </Select>
                </Grid>
                {/* <Grid item xs={12} sm={6}>    
                 <FormInput name='district'  label='District'placeholder="District" register={register}/>
                 </Grid> */}
            </Grid>
            <br/>
              <div style={{display:'flex',justifyContent:'space-between' }}>
                        <Button component={Link} to="/cart" variant='outlined'>Back to Cart</Button>
                        <Button type="submit" variant="contained" color="primary">Next</Button>
            </div>
          </form>
            </>:'...loading'
  )
}

export default AddressForm
