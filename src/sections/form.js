import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog(props) {
    const {
        title,
        handleClose,
        handleAddOrEdit,
        open,
        children
    } = props

  return (
    <div >
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth={'sm'}
      >
        <DialogTitle id="alert-dialog-title" style={{padding:"20px", marginLeft:"20px"}}>
        {title}
        </DialogTitle>
        <DialogContent >
          <DialogContentText id="alert-dialog-description" style={{padding: "0 30px", paddingTop: "10px"}}>
           {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{padding:"20px 60px"}}>
          <Button variant="outlined" onClick={handleAddOrEdit} color='primary'>{title}</Button>
          <Button variant="outlined" color='error' onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}