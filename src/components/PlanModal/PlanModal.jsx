/* eslint-disable react/prop-types */
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function PlanModal({ open,handleClose,handlenaviagateToPlans }) {


    return (
        <div>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Update plan
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        It seems like you dont have a plan or expired current plan please update your plan from plan section
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' color='info' onClick={handleClose}>cancel</Button>
                    <Button variant='outlined' color='info' onClick={handlenaviagateToPlans} >
                        Update Plan
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}