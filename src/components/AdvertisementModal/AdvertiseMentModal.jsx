import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {  Grid, Input, TextField, Typography } from '@mui/material';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// eslint-disable-next-line react/prop-types
function AdvertiseMentModal({ button, managePlansState, manageExpiryDate, state, handleSubmit }) {
    const [open, setOpen] = React.useState(false);
    const {
        // eslint-disable-next-line react/prop-types
        image, label, expiryDate, websiteUrl
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
                <DialogTitle>Add Advertisement</DialogTitle>
                <DialogContent>
                    <DialogContent>
                        <Grid container gap={2}>
                            <Grid item xs={12} md={12} display={'flex'} justifyContent={'center'}>
                                <img height={200} width={200} src={image && URL.createObjectURL(image)} alt="ads" />
                            </Grid>
                            <Grid item xs={12} md={12} display={'flex'} justifyContent={'center'}>
                                <Input aria-label='' name={'image'} type='file' onChange={managePlansState} display={'flex'} justifyContent={'center'} />
                            </Grid>
                            <Grid item xs={12} md={12} display={'flex'} justifyContent={'center'}>
                                <TextField fullWidth name='label' value={label} onChange={managePlansState} label="Enter the label for advertise" />
                            </Grid>
                            <Grid item xs={12} md={12} display={'flex'} justifyContent={'center'}>
                                <TextField fullWidth name='product_link' value={websiteUrl} onChange={managePlansState} label="Enter the product website url" />
                            </Grid>
                            <Grid item xs={12} md={12} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                                <Typography>
                                    select expired date
                                </Typography>
                                <Calendar minDate={new Date()} value={expiryDate} onChange={manageExpiryDate} />
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

export default AdvertiseMentModal