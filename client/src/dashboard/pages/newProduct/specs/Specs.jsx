import React,{useState} from 'react';
import './specs.css';
import {Button,Grid} from '@mui/material'
const MesurementItem = ({key,itemval,index,name,onUpdateColors})=>{
  const [val,setValue]=useState(itemval);
 return( <input type="text" className={`specsmeasurementItem ${name}`} placeholder="" value={val} key={index} onChange={(e)=>{setValue(e.target.value);onUpdateColors(name)}}  id={`${name}${index}`}/>)
}

const SizeMesurementItem = ({itemval,index,name,onUpdateSizes})=>{
  const [sval,setsValue]=useState(itemval);
return( <input type="text" className={`specsmeasurementItem ${name}`} placeholder="" value={sval} key={index} onChange={(e)=>{setsValue(e.target.value);onUpdateSizes(name)}}  id={`${name}${index}`}/>)
}
const Specs = ({setColors,setSizes}) => {
    const[mcolors,setmColors] = useState([""]); //initiliaze color inputs 
    const[msizes,setmSizes]   = useState([""]); //initilaize size inputs
    
  
const removeLastIndex = (values) => {
    let arr=[...values];
     arr.pop(values.length-1);
     console.log(values);
  return arr;
}

const getValues =(classname)=>{
    let values =[];
  let elems =  document.getElementsByClassName(classname);
     for(let i=0;i<elems.length;i++){
           if (elems[i].value!==""){
              values.push(elems[i].value)
              console.log(elems[i].value)
           }
         
       
     }
     return values;
}
const onUpdateColors =(name)=>{
    setColors(getValues(name));
    setmColors(getValues(name));
 }
 const onUpdateSizes =(name)=>{
  setSizes(getValues(name));
  setmSizes(getValues(name));
}
  return  (
    <Grid className='spec' justifyContent='center' contianer spacing={1}>
                      <Grid item sx={12} sm={12} md={12} lg={12} className='specsformIte'>
                           <label>Color Specifications</label>
                           <small>Type in all Product colors you have in stock For example White ,black or blue </small>
                         
                            <Grid container justifyContent='flex-start' spacing={1} padding={0}>
                            {   
                             mcolors.map((color,index)=>{
                               return( <Grid item sx={4} sm={4} md={3} lg={3}><MesurementItem itemval={color} index={index} name='color' key={`color-spec-${index}`} onUpdateColors={onUpdateColors}/></Grid>)
                             })
                          }
                            </Grid>
                      
                          <div className='actions'>
                          <Button variant="btn-outlined" id='action-btn-size-remove' size='small' onClick={()=>{setmColors([...removeLastIndex(mcolors)])}}>-</Button> 
                           <Button variant="btn-outlined" id='action-btn-color-add' size='small' onClick={()=>{setmColors([...mcolors,""])}}>+</Button>
                          </div>
                   </Grid>

                        <Grid item sx={4} sm={4} md={4} lg={12}  className='specsformIte'>
                           <label>Size Specifications</label>
                           <small>Type in Product  sizes For example 34 for shoes , 5 inch for phones</small>
                         
                           <Grid container justifyContent='flex-start' spacing={2} padding={0}>
                          {   
                             msizes.map((size,index)=>{
                               return( <Grid item sx={6} sm={6} md={3} lg={3}>
                                <SizeMesurementItem key={`size-spec${index}`} itemval={size} index={index} name='size' onUpdateSizes={onUpdateSizes}/>
                               </Grid>)
                             })
                          }
                          </Grid>
                        
                         <div className='actions'>
                          <Button variant="btn-outlined" id='action-btn-size-remove' size='small' onClick={()=>{setmSizes([...removeLastIndex(msizes)])}}>-</Button> 
                           <Button variant="btn-outlined" id="action-btn-size-add" size='small' onClick={()=>{setmSizes([...msizes,""])}}>+</Button>
                          </div>
                        </Grid>
    </Grid>
  )
}

export default Specs



