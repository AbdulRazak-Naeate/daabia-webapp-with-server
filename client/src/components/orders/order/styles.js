import {makeStyles} from '@material-ui/core/styles'

export default makeStyles(()=>({
    root:{
      display:'flex',
      flexDirection:'row',
      maxWidth:'100%',
      height:'180px',
      marginTop:10
    
    },
    title:{
      height:'40px',
      width:'100%',
      border:'0px solid'
    },
  
    media:{
        height:180,
        width:'28%',        
        
    },
    cardActions:{
        display:'flex',
        justifyContent:'flex-end',
    },
    cardContent:{
        height:'100%',
        width:'70%',
        border:'0px solid',
        padding: '4px !important',
    },
    cardContentSub:{
      display:'flex',
      width:'100%',
      flexDirection:'row',
      justifyContent:'space-between',
      padding:'0px',
      border:"0px solid green"
    },
    contentSubdetailsWrapper:{
      display:'flex',
      justifyContent:'space-between',
      width:'100%',
      border:'0px solid #ee2222'
    },
    orderDetails:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        width:'68%',
        alignItems:'left',
        border:'0px solid #ee4322',
    },
    orderDetails2:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        width:'30%',
        height:'105px',
        alignItems:'left',
        border:'0px solid #ee4322'
    },
    feedback:{
      border:'1px solid',
     /*  backgroundColor:'#fff0f1',
      color:'#d95087', */
      backgroundColor:'#ebf1fe',
      color:'#2a7ade',
      textAlign:'center',
      width:'25%',
      margin:'2px 0px',
      cursor:'pointer'

      
    },
    color:{
      padding:'2px 2px',
      height:'20%',
      textAlign:'center',
      borderRadius:'30px',
    backgroundColor:'goldenrod',
    color:'white'
      },
      size:{
        padding:'2px 2px',
        height:'20%',
        textAlign:'center',
        borderRadius:'30px',
        backgroundColor:'goldenrod',
        color:'white'
      },
  approved:{
    backgroundColor: '#e5faf2',
    textAlign:'center',
    color:'#3bb077' ,
  },
 declined:{
    backgroundColor:' #fff0f1',
    color:'#d95087',
    textAlign:'center',

  },
  pending:{
    backgroundColor:'#ebf1fe',
    color:'#2a7ade',
    textAlign:'center',
  }
}))