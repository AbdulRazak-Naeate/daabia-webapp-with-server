import {makeStyles} from '@material-ui/core/styles';

 export default makeStyles((theme)=>({
     collapse:{
        width:'100%',
        border:'0px solid red',
     },
     list:{
         width:'100%',
         border:'0px solid',
     },
     listItemButton:{
        width:'100%',
        border:'0px solid',
    },
    secondaryItemContent:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        border:'0px solid',
        width:'130%',
        marginLeft:'5px',
    },
    secondaryItemIitle:{
      color:'#000',
      fontWeight:500,
    },
    measuremenItem:{
      display:'flex',
      flexDirection:'column',
      justifyContent:'space-between',
      alignItems:'center',
      border:'0px solid darkgray',
      padding:'2px'



  }
}));