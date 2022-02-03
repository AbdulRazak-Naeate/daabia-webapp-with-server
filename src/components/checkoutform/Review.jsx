import React,{useState} from 'react'
import {Typography,ListItem} from '@material-ui/core';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import useStyles from './styles';
import { formatWithCurrencySymbol } from '../../utils/Utils';

const Review = ({checkoutToken,fees}) => {
    console.log(fees)
    const[checkoutCart]=useState(checkoutToken);
    const[items]=useState(checkoutToken.items);
    const[refresh,setRefresh]=useState(false);
    const [open, setOpen] = React.useState(true);
    const classes= useStyles()
  const handleClick = () => {
    setOpen(!open);
  };

  const ListItemSecondaryContent= ({item})=>{
    return(<div className={classes.secondaryItemContent}>
      <div className={classes.measuremenItem}><span>Back</span><span>{item.measurement.back}</span></div> 
      <div className={classes.measuremenItem}><span>Chest</span><span>{item.measurement.chest}</span></div> 
      <div className={classes.measuremenItem}><span>Length</span><span>{item.measurement.shirtLength}</span></div> 
      <div className={classes.measuremenItem}><span>Sleeve</span><span>{item.measurement.sleeve}</span></div> 
      <div className={classes.measuremenItem}><span>Trouser length</span><span>{item.measurement.trouserLength}</span></div> 
      <div className={classes.measuremenItem}><span>Waist</span><span>{item.measurement.waist}</span></div> 
      <div className={classes.measuremenItem}><span>Thigh</span><span>{item.measurement.thigh}</span></div> 
      <div className={classes.measuremenItem}><span>Bust</span><span>{item.measurement.bust}</span></div> 

      {/* Chest:${item.measurement.chest} Length:${item.measurement.shirtLength} Sleeve:${item.measurement.sleeve} Trouser Length:${item.measurement.trouserLength} Waist:${item.measurement.waist} Thigh:${item.measurement.thigh} Bust:${item.measurement.bust} */}
    </div>)
  }
    return (
      <>
      <Typography variant="h6" >Order Summary</Typography>
     {checkoutToken!==undefined? <List 
      sx={{ width: '100%', bgcolor: 'background.paper',border:'0px solid' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      /* subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Nested List Items
        </ListSubheader>
      } */
    >
      {items.map((item,index)=>(
        <>
        {
          item.selected === true ? <>
          <ListItemButton className={classes.listItemButton} onClick={()=>{handleClick()}}  key={index}>
           <ListItem key={item.product._id}>
           <ListItemText  primary={item.product.name} secondary={`Quantity ${item.quantity}  ${item.color!=='null'? ' , '+item.color+' , '+item.size:''}`} />   
             <Typography variant="body2">{`$${item.line_item_sub_price}`}</Typography>
  
           </ListItem>
          {open ? <ExpandLess key={index} /> : <ExpandMore key={index} />}
        </ListItemButton>

        
        <Collapse in={open} timeout="auto" unmountOnExit className={classes.collapse} index={index} >
          <List component="div" disablePadding  className={classes.list}>
            <ListItemButton sx={{ pl: 4 }} key={`lstb${index}`}>
              {/* <ListItemIcon>
                <StarBorder />
              </ListItemIcon> */}
              <ListItemText  key={`listItem${index}`}secondary={<ListItemSecondaryContent key={`secondaryitem${index}`} item={item}/>} />
            </ListItemButton>
          </List>
        </Collapse>
          </>:''
        }
        </>
      ))}
        <ListItem style={{padding:'10px 0'}}>
            <ListItemText primary="shipping"/>
            <Typography variant="subtitle1">{`${formatWithCurrencySymbol(fees,'GHS')}`}</Typography>
          </ListItem>
        <ListItem style={{padding:'10px 0'}}>
            <ListItemText primary="total"/>
            <Typography variant="subtitle1">{`${formatWithCurrencySymbol(checkoutCart.subtotal+fees,'GHS')}`}</Typography>
          </ListItem>
    </List>:setRefresh(!refresh)
      }
    </> 
  )
}

export default Review
