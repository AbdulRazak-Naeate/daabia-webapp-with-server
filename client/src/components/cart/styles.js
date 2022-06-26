import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root:{
    [theme.breakpoints.down('xs')]:{
          /* marginBottom:'10vh', */

    }
  },
  toolbar: theme.mixins.toolbar,
  title: {
    marginTop: '4%',
  },
  emptyButton: {
    minWidth: '150px',
    [theme.breakpoints.down('xs')]:{
      marginBottom: '5px',
    },
    [theme.breakpoints.up('xs')]: {
      marginRight: '20px',
    },
  },
  price:{
    color:'red',
    fontWeight:500,
 },
  checkoutButton: {
    minWidth: '150px',
  },
  link:{
    textDecoration: 'none',
  },
  cardDetails:{
    display: 'flex',
    [theme.breakpoints.down('xs')]:{
      flexDirection:'column',
      width:'100%'
    },
    marginTop: '10%',
    marginBottom:20,
    width: '100%',
    justifyContent:'space-between',
    [theme.breakpoints.up('xs')]:{
      justifyContent:'space-around',

    },
    border:'0px solid'
  },
  buttons: {
    width:'50%',
    [theme.breakpoints.down('xs')]:{
      width:'100%'
    },
    display: 'flex',
    justifyContent:'space-between',
    alignItems: 'center',
    border:'0px solid'
  },
}));
