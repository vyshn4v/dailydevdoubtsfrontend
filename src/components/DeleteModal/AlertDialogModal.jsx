import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Typography from '@mui/joy/Typography';
import UseColors from '../../assets/Colors';

export default function AlertDialogModal({ title, heading, handleDeleteChat }) {
  const [open, setOpen] = React.useState(false);
  const { bgColor, fontColor } = UseColors()
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="danger"
        onClick={() => setOpen(true)}
      >
        {title}
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          sx={{ bgcolor: bgColor, color: fontColor }}
          variant="outlined"
          role="alertdialog"
          aria-labelledby="alert-dialog-modal-title"
          aria-describedby="alert-dialog-modal-description"
        >
          <Typography
            sx={{ bgcolor: bgColor, color: fontColor }}
            id="alert-dialog-modal-title"
            component="h2"
            startDecorator={<WarningRoundedIcon />}
          >
            {heading}
          </Typography>
          <Divider />
          <Typography sx={{ bgcolor: bgColor, color: fontColor }} id="alert-dialog-modal-description" textColor="text.tertiary">
            Are you sure
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
            <Button variant="outlined" color="info" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="solid" color="danger" onClick={() => {
              handleDeleteChat()
              setOpen(true)
            }}>
              Yes
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}