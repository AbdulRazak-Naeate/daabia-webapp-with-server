import React,{useState} from 'react'
import { Select, Grid,MenuItem} from '@mui/material';

const CustomSelectField = ({ name, label, required,register}) => {
    const [value,setValue]=useState('');
    const handleChange = (event) => {
        setValue(event.target.value);
      };
  return (
    <Grid item xs={2} sm={2}>
        
    <Select {...register(name)} fullWidth label={label} required 
    labelId="select-sleeve-label"
    id="select-sleeve"
    value={value}
    onChange={handleChange}
    >
    <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value='short'>Short</MenuItem>
          <MenuItem value='long'>Long</MenuItem>
        </Select>
</Grid>
  )
}

export default CustomSelectField
