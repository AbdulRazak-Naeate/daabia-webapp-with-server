import React,{useState} from 'react';
import './specs.css';
import {Button} from '@mui/material'
const MesurementItem = ({itemval,index,name,onUpdateColors})=>{
  const [val,setValue]=useState(itemval);
 return( <input type="text" className={`measurementItem ${name}`} placeholder="" value={val} key={index} onChange={(e)=>{setValue(e.target.value);onUpdateColors(name)}}  id={`${name}${index}`}/>)
}

const SizeMesurementItem = ({itemval,index,name,onUpdateSizes})=>{
  const [sval,setsValue]=useState(itemval);
return( <input type="text" className={`measurementItem ${name}`} placeholder="" value={sval} key={index} onChange={(e)=>{setsValue(e.target.value);onUpdateSizes(name)}}  id={`${name}${index}`}/>)
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
    <div className='specs'>
        <div className='specsformItem'>
                           <label>Color Specifications</label>
                           <small>Type in all Product colors you have in stock For example White ,black or blue </small>
                          <div className="measurementWrapper">
                        
                          {   
                             mcolors.map((color,index)=>{
                               return( <MesurementItem itemval={color} index={index} name='color' onUpdateColors={onUpdateColors}/>)
                             })
                          }
                        
                          </div>  
                          <div className='actions'>
                          <Button variant="btn-outlined" id='action-btn-size-remove' size='small' onClick={()=>{setmColors([...removeLastIndex(mcolors)])}}>-</Button> 
                           <Button variant="btn-outlined" id='action-btn-color-add' size='small' onClick={()=>{setmColors([...mcolors,""])}}>+</Button>
                          </div>
           </div>

                        <div className='specsformItem'>
                           <label>Size Specifications</label>
                           <small>Type in Product  sizes For example 34 for shoes , 5 inch for phones</small>
                           <div className="measurementWrapper">
                        
                          {   
                             msizes.map((size,index)=>{
                               return( <SizeMesurementItem itemval={size} index={index} name='size' onUpdateSizes={onUpdateSizes}/>)
                             })
                          }
                        
                          </div>  
                          <div className='actions'>
                          <Button variant="btn-outlined" id='action-btn-size-remove' size='small' onClick={()=>{setmSizes([...removeLastIndex(msizes)])}}>-</Button> 
                           <Button variant="btn-outlined" id="action-btn-size-add" size='small' onClick={()=>{setmSizes([...msizes,""])}}>+</Button>
                          </div>
                        </div>
    </div>
  )
}

export default Specs



