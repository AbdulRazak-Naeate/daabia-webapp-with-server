import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  root: {
    width: '50%',
    [theme.breakpoints.up('xs')]:{
        top: '50%',
        width: '35%',
      }, [theme.breakpoints.down('xs')]:{
        top: '50%',
        width: '98%',
      },

    
  }
}))