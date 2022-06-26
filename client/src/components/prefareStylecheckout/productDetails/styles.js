import {makeStyles} from '@material-ui/core/styles';

export default  makeStyles((theme)=>({
    root:{ 
       justifyContent:'flex-start',
        alignItems:'start' ,
        [theme.breakpoints.down(620)]:{
            padding:'4px',
           },
    },
    card:{
       height:440,
       [theme.breakpoints.down(620)]:{
        height:340,
        width:'100%'
       },
    },
    cardContent:{
     height:'100%',
     display:'flex',
     flexDirection:'column',
     justifyContent:'space-between'
    },
    detailsWrapper:{
      backgroundColor:'blue',
      display:'flex',
      flexDirection:'column',
      justifyContent:'flex-start',

    },
    title:{
        color:'#fff'
    },
    description:{
       color:'#fff'
    },
    priceWrapper:{
    }
    ,price:{
        color:'red'
    },
    actions:{
        display:'flex',justifyContent:'space-between' 
    }

}))