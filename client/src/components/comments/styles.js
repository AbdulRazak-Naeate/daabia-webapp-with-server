import { makeStyles } from '@material-ui/core/styles';

 export default makeStyles((theme)=>({
   root:{
       marginTop:20,
       marginBottom:20,
   },
    commentList:{
      display:'flex',
      flexDirection:'column',
      marginBottom:'20px',
      backgroundColor:'whitesmoke',
      padding:'5px 5px',
      [theme.breakpoints.down(620)]:{
        padding:'0px',
        margin:'0px',
    },
      borderRadius:'4px'
      
    },commentItem:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        backgroundColor:'snow',
        padding:'2px 3px',
        margin:'2px 3px',
        [theme.breakpoints.down(620)]:{
            padding:'0px',
            margin:'0px',
        }
        
    },
    commentsItemPrimary:{
        display:'flex',
        justifyContent:'flex-end',
        backgroundColor:'snow',
        padding:'2px 3px'
    },
    commentsItemSecondary:{
        display:'flex',
        justifyContent:'flex-end',
      
    },
    
    userContainer:{
        width:'12%',
        border:'0px solid'
    },
    text:{
        width:'86%',
        color:'darkgray',
        border:'0px solid',
    },
    inputactions:{
        display:'flex',
        justifyContent:'space-between'
    },
    textinput:{
        width:'80%'
    },
    btnsend:{
        width:'26%'
    }
}))