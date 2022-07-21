import { Grid,Typography,Card,CardContent,Radio,RadioGroup,FormControlLabel,Button} from '@mui/material'
import React from 'react';
import {Link} from 'react-router-dom';

const Addresses = ({addresses,setAddresses,showAddresses, setShowAddresses,address,setAddress,next,orderNumber,shippingFees}) => {
    console.log(address)
    const [value, setValue] = React.useState(0);

    const handleChange = (event) => {
        console.log(event.target.value);
        
        setAddress(addresses[event.target.value])
        setValue(event.target.value);
    };
  
  return (
    <div className=''>
       { addresses.length>0 ? <Grid container xs={12} sm={12} md={12} lg={12}justifyContent='space-between'>
          <RadioGroup style={{display:'flex',flexDirection:'row', width:'100%'}}
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        
          { addresses.map((address,index)=>{
            return <Grid item xs={12} sm={12} md={12} lg={12} >
                 <Card style={{padding:'5px 10px',margin:'15px'}}>
                    <CardContent>
      
                    <Grid container xs={12} sm={12} md={12} lg={12}>
                      <Grid item xs={2} sm={2} md={2} lg={2} justifyContent='space-evenly' alignItems='center'>
                      <FormControlLabel style={{margin:'48% 5%'}} value={index}control={<Radio />} label={''} />
                      </Grid>
                      <Grid item xs={10} sm={10} md={10} lg={10} alignItems='center'>
                      <Grid container xs={12} sm={12} md={12} lg={12} justifyContent='space-between' >
                        <Grid item xs={3} sm={3} md={3} lg={3} justifyContent='space-between' >
                            <Typography variant='body1'>Name : </Typography> 
                        </Grid >
                        <Grid item xs={9} sm={9} md={9} lg={9}  >
                             <Typography variant='body1'>{`${address.firstName}  ${address.lastName}`}</Typography> 
                        </Grid>
                     </Grid>
                     
                     <Grid container xs={12} sm={12} md={12} lg={12} justifyContent='space-between' >
                        <Grid item xs={3} sm={3} md={3} lg={3} justifyContent='space-between' >
                            <Typography variant='body1'>Email : </Typography> 
                        </Grid >
                        <Grid item xs={9} sm={9} md={9} lg={9}  >
                             <Typography variant='body1'>{address.email}</Typography> 
                        </Grid>
                     </Grid>
                     <Grid container xs={12} sm={12} md={12} lg={12} justifyContent='space-between' >
                        <Grid item xs={3} sm={3} md={3} lg={3} justifyContent='space-between' >
                            <Typography variant='body1'>Phone : </Typography> 
                        </Grid >
                        <Grid item xs={9} sm={9} md={9} lg={9}  >
                             <Typography variant='body1'>{address.phone}</Typography> 
                        </Grid>
                     </Grid>
                     <Grid container xs={12} sm={12} md={12} lg={12} justifyContent='space-between' >
                        <Grid item xs={3} sm={3} md={3} lg={3} justifyContent='space-between' >
                            <Typography variant='body1'>Address1 : </Typography> 
                        </Grid >
                        <Grid item xs={9} sm={9} md={9} lg={9}  >
                             <Typography variant='body1'>{address.address1}</Typography> 
                        </Grid>
                     </Grid>
                     <Grid container xs={12} sm={12} md={12} lg={12} justifyContent='space-between' >
                        <Grid item xs={3} sm={3} md={3} lg={3} justifyContent='space-between' >
                            <Typography variant='body1'>City : </Typography> 
                        </Grid >
                        <Grid item xs={9} sm={9} md={9} lg={9}  >
                             <Typography variant='body1'>{address.citylabel}</Typography> 
                        </Grid>
                     </Grid>
                     
                      </Grid>
                      
                    </Grid>
                      
                    </CardContent>
                </Card>
              
            </Grid>

            
          })}
          <div style={{display:'flex',justifyContent:'flex-end',width:'100%',margin:'20px', }}>
          <Button onClick={()=>{setShowAddresses(!showAddresses)}} variant='outlined'>Add</Button>
          </div>
      </RadioGroup>

      <div style={{display:'flex',justifyContent:'space-between' ,width:'100%' }}>
                        <Button component={Link} to="/cart" variant='outlined'>Back to Cart</Button>
                        <Button type="button" onClick={()=>{ next({...address,orderNumber,shippingFees})}} variant="contained" color="primary">Next</Button>
            </div>
       </Grid> :''
       }
    </div>
  )
}

export default Addresses
