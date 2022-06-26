import {makeStyles}from '@material-ui/core/styles';

export default makeStyles((theme)=>({
  root:{
      maxWidth:'100%',
  },
  media:{
      height:'32vh',
      paddingTop: '56.25%',

  },
  icon: {
    color: 'orange',
  },
  price:{
    position:'absolute',color:'red',margin:'2px 5px'
  },
  cardActions:{
      display:'flex',
      justifyContent:'flex-end',
  },
  cardContent:{
      height:'100px',
      border:'0px solid',
      padding:4,
  },
  cardContentSub:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
},
description:{
    height:'40px',
    border:'0px solid ',
}, 
}));