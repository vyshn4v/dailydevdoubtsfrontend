import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, OutlinedInput, Select } from '@mui/material'
import React from 'react'
import UseColors from '../../assets/Colors';

// eslint-disable-next-line react/prop-types
function Filter({ menu, handleChange, handleCloseProps, data }) {
    const { cardBg, fontColor, bgColor, } = UseColors()
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
            handleCloseProps && handleCloseProps(event)
        }
    };
    return (
        <>
            <Button disableRipple sx={{ position: 'unset' }} variant='contained' onClick={handleClickOpen}>Filter</Button>
            <Dialog sx={{
                "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
                    bgcolor: bgColor,
                    color: fontColor,
                }
            }} disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Filter</DialogTitle>
                <DialogContent sx={{ minWidth: "250px", }} >
                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: "center" }}>
                        {
                            Object?.keys(menu).map((key, index) => (
                                <FormControl key={index + 'hiwow'} sx={{ m: 1, minWidth: 120, color: "white", }}>
                                    <InputLabel sx={{ color: "white", }} htmlFor="demo-dialog-native">{key}</InputLabel>

                                    <Select
                                        native
                                        value={data?.[key]}
                                        onChange={handleChange}
                                        sx={{

                                            color: 'white',
                                            "::selection": {
                                                color: 'white'
                                            },
                                            '.MuiOutlinedInput-notchedOutline': {
                                                borderColor: cardBg,
                                                color: "white",
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: cardBg,
                                                color: "white",
                                            },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: cardBg,
                                                color: "white",
                                            },
                                            '.MuiSvgIcon-root ': {
                                                fill: fontColor + "!important",
                                                color: "white",

                                            }
                                        }}
                                        dropdow
                                        input={<OutlinedInput label="Age" id="demo-dialog-native" />}
                                    >
                                        <option aria-label="None" value="" defaultValue='please select' />
                                        {
                                            // eslint-disable-next-line react/prop-types
                                            menu?.[key]?.map((data, index) => (
                                                // eslint-disable-next-line react/prop-types
                                                <option key={index} value={data?.value}>{data?.key}</option>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            ))
                        }
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button name='Cancel' onClick={handleClose}>Cancel</Button>
                    <Button name='Ok' onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog >
        </>
    )
}

export default Filter