import Box from '@mui/material/Box';
import {Modal,Typography} from '@mui/material';
import React,{useState} from 'react';
import SignIn from '../signin/Signin';
import SignUp from '../signup/SignUp';
import {Link} from 'react-router-dom';
import useStyles from './styles'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '98%',
  bgcolor: 'background.paper',
  border: '2px solid cadetblue',
  borderRadius:'4px',
  boxShadow: 24,
  p: 4,
  padding:0,
};


 export const RModal =  React.forwardRef((props,ref) => {
   const[isLoggedInForm,setIsLoggedInForm]=useState(true);
   const classes= useStyles();
   const handleSwitchForm =(option)=>{
     setIsLoggedInForm(option)
   }
   function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://localhost:3000/">
          {`${process.env.REACT_APP_WEBSITE_NAME}.com`}
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  return (
    <div>
      
      <Modal
        open={props.openModal}
        onClose={props.handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={classes.root} ref={ref}>
         {
           isLoggedInForm ===true ?  <SignIn handleCloseModal={props.handleCloseModal} handleSwitchForm={handleSwitchForm}/> : <SignUp handleCloseModal={props.handleCloseModal} handleSwitchForm={handleSwitchForm}/>
         }
         <Copyright/>
        </Box>
      </Modal>
    </div>
  );
 })
