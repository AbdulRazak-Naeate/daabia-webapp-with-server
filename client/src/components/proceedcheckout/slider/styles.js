import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
   
   slider:{
      width:'100%',
      border:'0px solid',

    [theme.breakpoints.up(620)]:{
      display:'none',
     
     }
   },
   sliderItem:{
    height:'330px',width:'100%'
   }
  
}))