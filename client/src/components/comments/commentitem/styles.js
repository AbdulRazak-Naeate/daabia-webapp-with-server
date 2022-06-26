import { makeStyles } from '@material-ui/core/styles';

 export default makeStyles((theme)=>({
   root:{
       marginTop:20,

   },
   commentItem:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        backgroundColor:'snow',
        padding:'2px 3px',
        margin:'2px 3px',
        
    },
    commentsItemPrimary:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-end',
        backgroundColor:'snow',
        padding:'2px 3px'
    },
    commentsItemSecondary:{
        display:'flex',
        justifyContent:'flex-end',
      
    },
    
    userContainer:{
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'left',
        border:'0px solid'
        
    },
    iconContainer:{
        border:'1px solid darkgray',padding:'2px',borderRadius:'90px' ,width:'30px',height:'30px'
    },
    username:{
        fontSize:'12px',
        marginLeft:'10px',
        marginTop:'10px',

    },
    text:{
        width:'86%',
        color:'darkgray',
        border:'0px solid',
        marginLeft:'10%',
    },
    inputactions:{
        display:'flex',
        justifyContent:'space-between'
    },
}))