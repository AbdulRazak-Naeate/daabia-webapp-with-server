import React from 'react';
import { TextField, Grid} from '@material-ui/core';

const FormInput = ({ name, label,placeholder,size,margin,required,register}) => {

return (
   <Grid item xs={12} sm={12}>
       <TextField
         {...register(name)}
            fullWidth
            label={label}
            placeholder={placeholder}
            required={required}
            />
   </Grid>
 );
 }

export default FormInput;