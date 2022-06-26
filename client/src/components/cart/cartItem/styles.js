import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    height: 200,
  },
  cardContent: {
    height:80,
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardActions: {
    border:'0px solid',
    height:'auto',
    display:'flex',
    flexDirection:'column',
    justifyContent: 'space-between',
  },
  buttons: {
    width:'100%',
    display: 'flex',
    alignItems: 'center',
  },
  price:{
     color:'red',
     fontWeight:600,
  },
  specifications:{
   display:'flex',
   flexDirection:'column',
   border:'0px solid',
   width:'100%',
   marginBottom:'5px'
  },
  specsListWrapper:{
    padding:'0px 14px',
  },
  gridSpecsList:{
    width:'100%',
  },
  specsGrid:{
    border:'0px solid #afb4b0',
    width:'100%',
    padding:'5px 0px',
    display:'flex',
    justifyContent:'space-around',
  },
  gridSpecsItem:{
    cursor:'pointer',
    fontSize:12
  },
  disSelect:{
    padding:'3px 5px',
    border:'1px solid #afb4b0',
    borderRadius:'30px',
  }
 ,select:{
    padding:'3px 5px',
    border:'1px solid #ed9720',
    borderRadius:'30px',
    backgroundColor:'#ed9720',
    color:'white'
  }
  ,measurementCard:{
    height:'auto',
  },
  measurementFormWrapper:{
    border:'1px solid  #afb4b0',
    padding:'5px',
    marginBottom:'5px'

  },
  measurementForm:{
    border:'1px solid',
    borderRadius:'3px',
    padding:'10px 10px',
  },
  measurementInputWrapper:{
    display:'flex',
    flexDirection:'column'
  },
  measurementInput:{
    width:'100%',height:'25%' ,textAlign:'center'
  }
 ,
  measuregridContainer:{
    border:'1px solid  #afb4b0',
    borderRadius:'4px',
    padding:'10px 10px',
    margin:'0px 0px 5px 0px'
    
  }
}));
