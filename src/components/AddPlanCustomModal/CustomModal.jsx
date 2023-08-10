/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Grid, TextField, Tooltip } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomModal({ button, managePlansState, state, handleSubmit }) {
  const [open, setOpen] = React.useState(false);
  const {
    totalQuestions,
    totalAnswers,
    TotalPrice,
    TotalDays
  } = state

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {button}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Add plan</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" sx={{ color: 'red' }} display={'flex'} alignItems={'center'}>
            * By adding plan you can not edit or delete
            <Tooltip sx={{ cursor: 'pointer' }} title={'By editing or deleting plans may occurs an error or confusion to our customer because they make payment for their suitable plans so if it change that effect their user experience'}>
              <HelpOutlineIcon sx={{ fontSize: '18px', marginLeft: '10px' }} />
            </Tooltip>
          </DialogContentText>
          <DialogContent>
            <Grid container gap={2}>
              <Grid item xs={12} md={5} display={'flex'} justifyContent={'center'}>
                <TextField name='name' label="Plan name" onChange={managePlansState} display={'flex'} justifyContent={'center'} />
              </Grid>
              <Grid item xs={12} md={5} display={'flex'} justifyContent={'center'}>
                <TextField name='TotoalQuestions' value={totalQuestions} onChange={managePlansState} label="Total questions per day" />
              </Grid>
              <Grid item xs={12} md={5} display={'flex'} justifyContent={'center'}>
                <TextField name='TotalAnswer' value={totalAnswers} onChange={managePlansState} label="Total answer  per day" />
              </Grid>
              <Grid item xs={12} md={5} display={'flex'} justifyContent={'center'}>
                <TextField name='TotalDays' value={TotalDays} onChange={managePlansState} label="Total days" />
              </Grid>
              <Grid item xs={12} md={5} display={'flex'} justifyContent={'center'}>
                <TextField name='TotalPrice' value={TotalPrice} onChange={managePlansState} label="Total price" />
              </Grid>
            </Grid>
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button color='error' variant='outlined' onClick={handleClose}>Close</Button>
          <Button variant='outlined' onClick={() => {
            handleSubmit()
          }}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}