import React from 'react'
import {Typography,MenuItem,TextField,Grid} from '@mui/material';
import useStyles from './styles';
const Measurement = ({productid,onMeasurementValueChange,measurement,register,onSleeveChange,sleeve,sleeves}) => {
    const classes= useStyles()
  return (
    <div className={classes.measurementFormWrapper}>
      {/* <Card className={classes.measurementCard} key={`card${productid}`}>  
        <CardContent style={{height:'auto',border:'0px solid'}}> */}
        {/*  <Typography variant='body1'>{`Measurement`}</Typography>
 */}
        <form>
        <div className={classes.measuregridContainer}>
        <Typography variant='body1'>{`Top(Shirt)`}</Typography>

        <Grid container direction='row' justifyContent='space-between' spacing={1}>
         <Grid item={true} xs={2} sm={2} md={2} lg={2}>
         <div className={classes.measurementInputWrapper} >
             <TextField variant="standard"  key={`input1${productid}`}  label="Back"
             onChange={onMeasurementValueChange}
              defaultValue={measurement.back}
             inputProps={register('back', {
               required: 'Please enter back',
             })}  />

           </div>
         </Grid>

          <Grid item={true} xs={2} sm={2} md={2} lg={2}>
          <div className={classes.measurementInputWrapper} >
             <TextField variant="standard" palceholder="0"className={classes.measurementInput}key={`input2${productid}`} 
              label="Chest"
              onChange={onMeasurementValueChange}
              defaultValue={measurement.chest}
              inputProps={register('chest', {
                required: 'Please enter chest',
              })}
             />

           </div>
          </Grid>
           <Grid item={true} xs={2} sm={2} md={2} lg={2}>
           <div className={classes.measurementInputWrapper} >
             <TextField variant="standard"  className={classes.measurementInput}  key={`input3${productid}`} id={`input3${productid}`}
             label="Length"
             onChange={onMeasurementValueChange}
             defaultValue={measurement.shirtLength}
             inputProps={register('shirtLength', {
               required: 'Please enter sleeve',
             })}
             />

           </div>
           </Grid>
          <Grid item={true}xs={3} sm={3} md={3} lg={3}>
          <div className={classes.measurementInputWrapper} >
             <TextField variant="standard"
          select
          fullWidth={false}
          defaultValue={sleeve}
          label="Sleeve"
          inputProps={register('sleeve', {
            required: 'Please enter sleeve',
          })}
          onChange={onSleeveChange}
        >
          {sleeves.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

           </div>
           
          </Grid>

          
          </Grid>
        </div>
        
        <div className={classes.measuregridContainer}>
          <Typography variant='body1'>{`Down(Trouser)`}</Typography>
        <Grid container direction='row' justifyContent='space-evenly' spacing={1}>
         <Grid item={true} xs={2} sm={2} md={2} lg={2}>
         <div className={classes.measurementInputWrapper} >
             <TextField variant="standard" className={classes.measurementInput} key={`input1${productid}`}  label="Length"
            onChange={onMeasurementValueChange}
             defaultValue={measurement.trouserLength}
             inputProps={register('trouserLength', {
               required: 'Please enter back',
             })}  />

           </div>
         </Grid>
         <Grid item={true} xs={2} sm={2} md={2} lg={2}>
          <div className={classes.measurementInputWrapper} >
             <TextField variant="standard" className={classes.measurementInput}key={`input2${productid}`} 
              label="Waist"
              onChange={onMeasurementValueChange}
              defaultValue={measurement.waist}
              inputProps={register('waist', {
                required: 'Please enter waist',
              })}
             />

           </div>
          </Grid>
          <Grid item={true} xs={2} sm={2} md={2} lg={2}>
          <div className={classes.measurementInputWrapper} >
             <TextField variant="standard" className={classes.measurementInput}key={`input2${productid}`} 
              label="Thigh"
              defaultValue={measurement.thigh}
              onChange={onMeasurementValueChange}
              inputProps={register('thigh', {
                required: 'Please enter thigh',
              })}
             />

           </div>
          </Grid>
           <Grid  item={true} xs={2} sm={2} md={2} lg={2}>
           <div className={classes.measurementInputWrapper} >
             <TextField variant="standard" className={classes.measurementInput} key={`input3${productid}`} id={`input3${productid}`}
             label="bust"
             defaultValue={measurement.bust}
             onChange={onMeasurementValueChange}
             inputProps={register('bust', {
               required: 'Please enter bust',
             })}
             />

           </div>
           </Grid> 
          </Grid>
        </div>
      </form>
    </div>
  )
}

export default Measurement
