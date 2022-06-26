/* eslint-disable no-unused-vars */
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {Grid,Typography} from '@mui/material';
import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish,MyLocationOutlined,AddShoppingCart,HeightOutlined,ColorLensOutlined ,PhoneAndroidOutlined} from '@material-ui/icons'
import './modal.css'
import ShoppingBagOutlined from '@mui/icons-material/ShoppingBagOutlined';
import ReactToPrint from 'react-to-print';
import React,{useRef} from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  bgcolor: 'background.paper',
  border: '2px solid cadetblue',
  borderRadius:'4px',
  boxShadow: 24,
  p: 4,
};

 export const TransacModal =  React.forwardRef((props,ref) => {

  console.log(props.tranxData)
  const componentRef = useRef();
  return (
    <div>
      
      <Modal
        open={props.openModal}
        onClose={props.handleCloseTransacModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} ref={componentRef}>
          <span id="modal-modal-title" variant="h6" component="h2">
            Processing List
          </span>
          <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}/>
          <span id="modal-modal-description" sx={{ mt: 2 }}>
            
           <Grid container justifyContent='space-between' spacing={2}>  
           {
              props.tranxData.length>0? props.tranxData.map((data,index)=>{
                return(
                    <Grid item={true} xs={12} md={6}  key={index}>
                        <div className="detailContainer">
                          <img className='media' src={`http://localhost:3001/server/uploads/products/${data.filename}`} alt='item-img' />
                        <div className="tranxdetailsContainer">
                        <div className="tranxdetailsItem">
                             <ShoppingBagOutlined className="userShowIcon"/>
                        <span  className="tranxdetailsItemTitle">{data.name}</span>
                        </div>
                        <div className="tranxdetailsItem">
                             <PermIdentity className="userShowIcon"/>
                        <span  className="tranxdetailsItemTitle">{`${data.customer.firstname} ${data.customer.lastname}`}</span>
                        </div>
                        <div className="tranxdetailsItem">
                             <PhoneAndroidOutlined className="userShowIcon"/>
                        <span className="tranxdetailsItemTitle">{data.customer.phone}</span>
                        </div>
                        <div className="tranxdetailsItem">
                             <AddShoppingCart className="userShowIcon"/>
                        <span className="tranxdetailsItemTitle">{data.quantity}</span>
                        </div>

                        <div className="tranxdetailsItem">
                             <HeightOutlined className="userShowIcon"/>
                        <span className="tranxdetailsItemTitle">{data.size}</span>
                        </div>

                        <div className="tranxdetailsItem">
                             <ColorLensOutlined className="userShowIcon"/>
                        <span className="tranxdetailsItemTitle">{data.color}</span>
                        </div>
                        <div className="tranxdetailsItem">
                             <MyLocationOutlined className="userShowIcon"/>
                        <span className="tranxdetailsItemTitle">{`${data.shippingData.country}, ${data.shippingData.state}, ${data.shippingData.city}`}</span>
                        </div>
                        </div>
                        <div className="infoRight">
                          <div className='measurementWrapper'>
                          <span>Shirt(Top)</span>

                          <div className='grid-container-wrapper'>
                          <Grid container  justifyContent='space-between' spacing={1}>
                              <Grid item={true}>
                                <div className="measurement-grid-itemWrapper">
                                <label>Back</label>
                                 {data.measurement.back}
                                </div>
                              </Grid>
                              <Grid item={true}>
                                <div className="measurement-grid-itemWrapper">
                                <label>Chest</label>
                                 {data.measurement.chest}
                                </div>
                              </Grid>
                              <Grid item={true}>
                              <div className="measurement-grid-itemWrapper">
                                 <label>Shirt Length</label>
                                 {data.measurement.shirtLength}
                                 </div>
                              </Grid>
                              <Grid item={true}>
                              <div className="measurement-grid-itemWrapper">
                                 <label>Sleeve</label>
                                 {data.measurement.sleeve}
                                 </div>
                              </Grid>
                          </Grid>
                           </div>
                           <span>Trouser(Down)</span>
                           <div className='grid-container-wrapper'>
                          <Grid container direction='row' justifyContent='space-between' spacing={1}>
                              <Grid item={true}>
                                <div className="measurement-grid-itemWrapper">
                                <label>Trouser Length</label>
                                 {data.measurement.trouserLength}
                                </div>
                              </Grid>
                              <Grid item={true}>
                                <div className="measurement-grid-itemWrapper">
                                <label>Waist</label>
                                 {data.measurement.waist}
                                </div>
                              </Grid>
                              <Grid item={true}>
                              <div className="measurement-grid-itemWrapper">
                                 <label>Thigh</label>
                                 {data.measurement.thigh}
                                 </div>
                              </Grid>
                              <Grid item={true}>
                              <div className="measurement-grid-itemWrapper">
                                 <label>Bust</label>
                                 {data.measurement.bust}
                                 </div>
                              </Grid>
                          </Grid>
                          </div>
                          </div>
                          <div>
                            <span variant='h6'>{data.date}</span>
                          </div>
                        </div>
                       </div>
                    </Grid>
                  )
               }):''
             }
           </Grid>

          </span>
        </Box>
      </Modal>
    </div>
  );
 })
