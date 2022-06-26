import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root:{
    color: "darkgray",
    "&.Mui-selected": {
      color: "#ed9720"
    },
    
    topIconBadge:{
      width: 15,
      height: 15,
      position: 'absolute',
      top:-5,
      right: 0,
      backgroundColor: 'red',
      color: 'white',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 10,
  },
     /* Styles applied to the root element if selected. */
  selected: {},
 },
}));
