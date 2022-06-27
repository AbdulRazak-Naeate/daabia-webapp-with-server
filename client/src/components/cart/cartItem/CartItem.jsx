/* eslint-disable no-unused-vars */
import React,{useState} from 'react'
import {Typography,Button,Card,CardActions,CardContent,CardMedia,MenuItem,TextField} from '@mui/material';
import useStyles from './styles';
import {useForm} from 'react-hook-form';
import { Grid } from '@material-ui/core';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemButton from '@mui/material/ListItemButton';
import Checkbox from '@mui/material/Checkbox';
import Measurement from './Measurement';
import { pink,orange } from '@mui/material/colors';
import {formarttoCurrency} from '../../../utils/Utils';

const CartItem = ({cartitem,onUpdateCartQty,onUpdateColorSize,onUpdateMeasurement,onRemoveFromCart,onUpdateSelect}) => {
    const classes = useStyles();
    const[color,setColor]=useState(cartitem.color);
    const[size,setSize]=useState(cartitem.size);
    const[measurement]=useState(cartitem.measurement)
    const [sleeve,setSleeve]=useState(measurement.sleeve);
    const[open,setOpen]=useState(true);
    const[colorSelectedList,setColorSelectedList]=useState([]);
    const [checked, setChecked] = useState(cartitem.selected);
    const [imagepath]=useState( `http://localhost:3001/server/uploads/products/${cartitem.product.image[0].filename}`)

    const label = { inputProps: { 'aria-label': 'Select item' } };

    const sleeves = [
      {
        value: 'short',
        label: 'Short',
      },
      {
        value: 'long',
        label: 'Long',
      },
    ];
    const handleClick=()=>{
      setOpen(!open)
    }
   
    // eslint-disable-next-line no-unused-vars
    const {register,getValues,formState: { errors },} = useForm();
    
    const onMeasurementValueChange = () => {
        onUpdateMeasurement(cartitem.product._id,JSON.stringify(getValues()))
    }
    
    const onSleeveChange = (event) => {
      setSleeve(event.target.value);    
      //console.log("form data "+JSON.stringify(getValues()))
      onUpdateMeasurement(cartitem.product._id,JSON.stringify(getValues()))
  }
    
     const onGridColorItemClick=(item)=>{
         setColor(item)
         setColorSelectedList(selected=>[...selected,item])
          console.log("color selected "+colorSelectedList)
         //console.log(item)
     }
     const onGridSizeItemClick=(item)=>{
      setSize(item)
      
      console.log(item)
      
 }
   
    const ColorGridList= ({list,onUpdateColorSize}) =>(
          <>
         <div className={classes.specsListWrapper} >
          <Typography variant="body2">{`Select Color`}</Typography>
 
          <div className={classes.gridSpecsList} >                        
               <div className={classes.specsGrid} > 
                {list.map((item,index)=>(
                 item!=='' ? <div key={index} className={`${classes.gridSpecsItem} ${color===item ? classes.select:classes.disSelect}`} onClick={()=>{onUpdateColorSize(cartitem.product._id,'color',item);onGridColorItemClick(item)}}>{item}</div>:''
               
                ))}
                </div>
               </div>
        </div>
  </>
    )

    const SizeGridList= ({list ,onUpdateColorSize}) =>(
      <>
     <div className={classes.specsListWrapper} >
     <Typography variant="body2">{`Select Size`}</Typography>

      <div className={classes.gridSpecsList} >                        
           <div className={classes.specsGrid} > 
            {list.map((item,index)=>(
             item!==''? <div key={index} className={`${classes.gridSpecsItem} ${size===item ? classes.select:classes.disSelect}`} onClick={()=>{onUpdateColorSize(cartitem.product._id,'size',item);onGridSizeItemClick(item)}}>{item}</div>:''
           
            ))}
            </div>
           </div>
      </div>
    </>)

  return (
    <div>
        <Card>
            <CardMedia image={imagepath} alt={cartitem.product.name} className={classes.media}/>
            <CardContent className={classes.cardContent}>
             <Typography variant="h6">{cartitem.product.name}</Typography>
             <Typography variant="body1" className={classes.price}>{`${formarttoCurrency(cartitem.line_item_sub_price,'π')}`}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
             <div className={classes.specifications}>
             {/*  <ListItemButton onClick={handleClick}>
              <Typography variant="body2">Measurement</Typography> {open ? <ExpandLess /> : <ExpandMore />}
               </ListItemButton>
            

               <Collapse in={open} timeout="auto" unmountOnExit>
               <Measurement productid={cartitem.product._id} onMeasurementValueChange={onMeasurementValueChange} measurement={measurement}register={register} onSleeveChange={onSleeveChange} sleeve={sleeve} sleeves={sleeves}/>
               </Collapse> */}
              {
                cartitem.product.size.length>0 ?  <SizeGridList type={"size"} onUpdateColorSize={onUpdateColorSize} list={cartitem.product.size}/>:''
              }
              {cartitem.product.color.length>0 ?  <ColorGridList type={"color"} onUpdateColorSize={onUpdateColorSize} list={cartitem.product.color}/>:''}
            
             </div>
              <div className={classes.buttons}>
              <Checkbox {...label}  sx={{
          color: orange[800],
          '&.Mui-checked': {
            color: orange[600],
          },
        }} checked={checked} onChange={(e)=>{setChecked(e.target.checked); console.log(e.target.checked)
                onUpdateSelect(cartitem.product._id,e.target.checked) }} />

                <Button type="button" size="small" onClick={()=>{onUpdateCartQty(cartitem.product._id,cartitem.quantity-1,cartitem.product.price)}}>-</Button>
                <Typography>{cartitem.quantity}</Typography>
                <Button type="button" size="small"  color="secondary" onClick={()=>{onUpdateCartQty(cartitem.product._id,cartitem.quantity+1,cartitem.product.price)}}>+</Button>
                   <Button type="button"   variant="contained" color="secondary" onClick={()=>{onRemoveFromCart(cartitem.product._id)}}>Remove</Button>
              </div>
           
            </CardActions>
        </Card>
      
    </div>
  )
}

export default CartItem
