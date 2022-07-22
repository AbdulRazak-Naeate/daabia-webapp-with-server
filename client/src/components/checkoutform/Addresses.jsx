import { Grid,Typography,Card,CardContent,Radio,Button} from '@mui/material'
import {DeleteOutlined} from '@material-ui/icons';
import React from 'react';
import {Link} from 'react-router-dom';

const Addresses = ({addresses,showAddresses, setShowAddresses,address,next,orderNumber,shippingFees ,handleonRadioButtonChanged, selectedValue,handleDeleteAddress}) => {
  
    const [alphabets]=React.useState(['a','b','c','d','e','f','g','h','i']);
  return (
    <div className=''>
       { addresses.length>0 ? <Grid container xs={12} sm={12} md={12} lg={12}justifyContent='space-between'>
        
     
          { addresses.map((address,index)=>{
            return <Grid item xs={12} sm={12} md={12} lg={12} >
                 <Card style={{padding:'5px 10px',margin:'15px'}}>
                    <CardContent>
      
                    <Grid container xs={12} sm={12} md={12} lg={12}>
                      <Grid item xs={2} sm={2} md={2} lg={2} justifyContent='space-evenly' alignItems='center'>
                    <Radio  style={{margin:'48% 5%'}}
                       checked={selectedValue === `${alphabets[index]}`}
                       onChange={(e)=>{handleonRadioButtonChanged(e,alphabets)}}
                       value={`${alphabets[index]}`}
                       name="radio-buttons"
                      inputProps={{ 'aria-label': `${alphabets[index]}`}}/> 

                      </Grid>
                      <Grid item xs={9} sm={9} md={9} lg={9} alignItems='center'>
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
                     <Grid item xs={1} sm={1} md={1} lg={1} justifyContent='flex-end' flexDirection='column'alignItems={'flex-end'} >
                    <DeleteOutlined color='primary'  onClick={()=>{handleDeleteAddress(address)}} /> 
                       </Grid>
                    

                      </Grid>
                    </CardContent>
                </Card>
              
            </Grid>

            
          })}
          <div style={{display:'flex',justifyContent:'flex-end',width:'100%',margin:'20px', }}>
          <Button onClick={()=>{setShowAddresses(!showAddresses)}} variant='outlined'>Add</Button>
          </div>
    {/*   </RadioGroup> */}

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
