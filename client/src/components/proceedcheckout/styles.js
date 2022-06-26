import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    title: {
      marginTop: '4%',
    },
   content:{
      height:'auto',
       marginTop:'40px',
       display:'flex',
       flexDirection:'column',
       justifyContent:'space-between',
       alignItems:'start',
       [theme.breakpoints.down(620)]:{
        marginTop:'0px',
       },
       marginBottom:20,
   },
   slider:{
    [theme.breakpoints.up(620)]:{
      display:'none',
     },
     [theme.breakpoints.down(620)]:{
      display:'block',
      marginTop:'0px',

     }
   },
   commentListContainer:{
     margin:'2% 20%',
     border:'0px solid',
     [theme.breakpoints.down(620)]:{
      margin:'0%',
     },
   },
   commentList:{
    display:'flex',
    flexDirection:'column',
    marginTop:20,
    marginBottom:20,
    backgroundColor:'whitesmoke',
    padding:'5px 5px',
    borderRadius:'4px',
    border:'0px solid',
    width:'84%',
    [theme.breakpoints.down(620)]:{
      width:'100%',
     },

    
  }
   
  
}))