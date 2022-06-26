import * as React from 'react'
import {useHistory} from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import OrderIcon from '@mui/icons-material/ShoppingBagOutlined';
import CartIcon from '@mui/icons-material/ShoppingBasketOutlined';
import AccountIcon from '@mui/icons-material/Person';
import Badge from '@mui/material/Badge';
import Paper from '@mui/material/Paper';
import useStyles from './styles';


const BottomNav = ({onBottomNavChange, totalItems,orderItems}) => {
     const[value,setValue]=React.useState(0)
     const classes =useStyles();
     const history=useHistory();
     
   React.useEffect(()=>{
    const handleBottomNavPosition = () =>{
      if(history.location.pathname==='/cart'){
         setValue(1)
        }else if(history.location.pathname==='/orders'){
          setValue(2)
        
       }else if(history.location.pathname==='/account'){
         setValue(3)
       }
   }
 
   handleBottomNavPosition();
   })
  return (
   
       <Paper className="bottomnav" sx={{ position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
    <BottomNavigation className={classes.root}
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        onBottomNavChange(newValue)
      }}
    >
      <BottomNavigationAction  className={classes.root} label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction  className={classes.root} label="Cart" icon={<Badge badgeContent={totalItems} color="secondary"><CartIcon /></Badge>}> 
      </BottomNavigationAction>
      <BottomNavigationAction className={classes.root} label="Order" icon={<Badge badgeContent={orderItems}  color="secondary" ><OrderIcon /></Badge>  } />

      <BottomNavigationAction className={classes.root} label="Account" icon={<AccountIcon />} />
    </BottomNavigation>
    </Paper>
  )
}

export default BottomNav
