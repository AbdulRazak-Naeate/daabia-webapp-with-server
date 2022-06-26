import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
function AlertDialog({open,handleClickOpen,handleClose,title,textContent,DeleteOutline}) {

  return (
    <div>
     
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
      
          <DialogContentText id="alert-dialog-description">
            {textContent}
          </DialogContentText>
             <DeleteOutline/> 
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{handleClose(false)}} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>{handleClose(true)}} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AlertDialog
