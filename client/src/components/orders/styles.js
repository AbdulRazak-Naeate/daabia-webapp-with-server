import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    marginTop:10,
    marginBottom:20,
    padding:'0% 25%',
    [theme.breakpoints.down(620)]:{
      padding:'1%',
    },
  },
  title: {
    marginTop: '4%',
  },
  link: {
    textDecoration: 'none',
  },
  commentsTitle:{
    display:'flex',
    justifyContent:'space-between',
   
  }, 
   ordercard:{
      border:'0px solid',
      display:'flex',
      height:'80px',
      width:'24%',
      marginLeft:'1%'     
   },
   media:{
    height:80,
    width:'100%', 
  },
}));
