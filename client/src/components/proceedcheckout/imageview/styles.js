import {makeStyles} from '@material-ui/core/styles'

export default makeStyles((theme)=>({
    root:{
        maxWidth:'100%',
        margin:'0px 20px 20px 0px',
        
    },
    container:{
        [theme.breakpoints.up(620)]:{
            display:'block',
           },
           [theme.breakpoints.down(620)]:{
            display:'none',
           }
    },
    thumbnailContainer:{
        flex:'1',
       },
    thumbnailList:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-around',
        border:'0px solid'
    },
    mediaThumbnail:{
        height:100,
        width:100,
       
    },
    disSelect:{
        border:'0px solid',
       
      }
     ,select:{
        border:'2px solid cornflowerblue',
      },
    previewContainer:{
        flex:'5',
        margin:'0px 40px'
    },
    mediaPreview:{
        height:440,
        maxWidth:"100%",
        border:'0px solid'
        
    },
    viewcontainer:{
        display:'flex',
        border:'0px solid',
        marginLeft:'0%',
        justifyContent:'space-between',
       
         
    }
    ,
}))