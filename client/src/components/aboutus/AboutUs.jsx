import React from 'react';
import useStyles from './styles';
import { Typography } from '@material-ui/core';
const AboutUs = () => {
    const classes=useStyles();
  return (
    <div className={classes.root}>
     <Typography variant='h1'> Who we are</Typography>
     <Typography variant='h4'>Daabia is Ghanaian base Ecommerce website founded in 2021 ,we aimed to bring local and international Merchant together in single plartform to do business together</Typography>
    </div>
  )
}

export default AboutUs
