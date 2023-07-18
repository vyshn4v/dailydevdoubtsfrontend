import React, { useEffect, useState } from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import Typography from '@mui/joy/Typography';
import UseColors from '../../assets/Colors';
import { ModalClose } from '@mui/joy';
import { Avatar, Box, Chip, CircularProgress, Fab, Grid, InputLabel, MenuItem, OutlinedInput, Select, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
export default function ModalDialogBox({ handleClear, groupProfile, handleImage, open, setOpen, handleGroupTitle, handleSearchUserState, handleGroupMembers, handleSearchUser, users, selectedUsers, handleCreateGroup }) {
  const theme = useTheme();
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const { _id } = useSelector(state => state.user.user)
  const { fontColor, bgColor, cardBg } = UseColors()
  return (
    <React.Fragment>
      <Modal open={open} onClose={() => setOpen(false)} sx={{
        bgcolor: bgColor
      }}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ bgcolor: bgColor, display: 'flex', justifyContent: 'center', alignItems: 'center' }} layout={'fullscreen'}
        >
          <ModalClose onClick={handleClear} />
          <Typography id="basic-modal-dialog-title" component="h2" sx={{ color: fontColor }}>
            Create new Group
          </Typography>
          <Typography id="basic-modal-dialog-description" textColor="text.tertiary" sx={{ color: fontColor }}>
            Enter the details of group
          </Typography>
          <Stack sx={{ m: 1, position: 'relative' }}>
            <Avatar
              src={groupProfile && URL.createObjectURL(groupProfile)}
              sx={{ width: "100px", height: "100px" }}
            />
            {
              loading &&
              <CircularProgress size={100} thickness={1} sx={{ position: 'absolute' }} />
            }
          </Stack>
          <Stack  >
            <label htmlFor="upload-photo">
              <input
                style={{ display: 'none' }}
                id="upload-photo"
                onChange={handleImage}
                name="image"
                type="file"
              />

              <Fab
                sx={{
                  width: '200px',
                  marginTop: '30px'
                }}

                color='secondary'
                size="small"
                component="span"
                aria-label="add"
                variant="extended"
              >
                Upload photo
              </Fab>
            </label>
          </Stack>
          <Stack minWidth={'300px'}>


            <Stack spacing={2}>
              <FormControl>
                <FormLabel sx={{ color: fontColor }}>Name</FormLabel>
                <Input autoFocus required onChange={handleGroupTitle} />
              </FormControl>
              <FormControl>
                <FormLabel sx={{ color: 'white' }}>Search for user</FormLabel>
                <Input autoFocus type='text' onChange={handleSearchUserState} />
                <Button sx={{ mt: '10px' }} onClick={handleSearchUser}>Submit</Button>
              </FormControl>
              <FormControl sx={{ m: 1, width: 300, color: fontColor }}>
                <InputLabel id="demo-multiple-chip-label" sx={{ color: fontColor }}>Select users</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  value={selectedUsers}
                  onChange={handleGroupMembers}
                  defaultOpen
                  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                  sx={{
                    bgcolor: cardBg,
                    color: fontColor
                  }}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value, index) => (
                        <Chip key={index} label={value?.name} sx={{
                          bgcolor: cardBg,
                          color: fontColor
                        }} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {users ? users?.filter((user) => user._id != _id)?.map(({ name, email, _id }, index) => (
                    <MenuItem
                      key={index}
                      value={{ name, _id }}
                      style={getStyles(name, selectedUsers, theme)}
                    >
                      <Stack justifyContent={'center'}>
                        <Typography >{name}</Typography>
                        <Typography fontSize={12}>{email}</Typography>
                      </Stack>

                    </MenuItem>
                  ))
                    :
                    <MenuItem
                      value={{ name, _id }}
                      style={getStyles(name, selectedUsers, theme)}
                    >
                      Please search for user
                    </MenuItem>
                  }
                </Select>
              </FormControl>
              <Button onClick={handleCreateGroup}>Submit</Button>
            </Stack>
          </Stack>
        </ModalDialog>
      </Modal>
    </React.Fragment >
  );
}