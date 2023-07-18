import { Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Stack, Switch, TextField, Typography, makeStyles } from '@mui/material'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import UseColors from '../../../assets/Colors';
import { reportQuestion } from '../../../services/question';
import { toast } from 'react-toastify';

function ReportQuestion() {
  const [textFieldStatus, setTextFieldStatus] = useState(false)
  const [reason, setReason] = useState('')
  const { question_id } = useParams()
  // const classes = useStyles()
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        borderColor: 'white'
      },
    },
  };
  const handleReportSubmit = () => {
    const id = toast.loading('please wait')
    reportQuestion({ question_id, reason,role:'user' }).then((res) => {
      toast.update(id, { render: "Report send successfully", type: "success", isLoading: false, autoClose: 2000 })
    }).catch((err) => {
      console.log(err);
      toast.update(id, { render: err.response.data.message || 'Failed to send report', type: 'error', isLoading: false, autoClose: 2000 })
    })
  }
  const { fontColor } = UseColors()
  const reasons = ['question is not relavent', 'question is not informative', 'question is not related to software field']
  return (
    <>
      <Stack display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Stack marginBottom={'30px'}>
          <Typography>Report Question</Typography>
        </Stack>
        <FormControl sx={{
          m: 1, width: 300,
          ".MuiOutlinedInput-notchedOutline": {
            color: 'white',
            borderColor: "white",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            color: 'white',
            borderColor: "white",
            borderWidth: "thin",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            color: 'white',
            borderColor: "white",
            borderWidth: "thin",
          },
        }} >
          <InputLabel id="demo-multiple-name-label" sx={{ color: "white" }}>Select the reason</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            disabled={textFieldStatus}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            input={<OutlinedInput label="Select the reason" />}
            MenuProps={MenuProps}
            sx={{
              color: fontColor,
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: '#color',
                color: fontColor,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                color: fontColor,
                borderColor: 'white',
                borderWidth: '0.15rem',
              },
            }}
          >
            {!textFieldStatus && reasons.map((name) => (
              <MenuItem
                key={name}
                value={name}
              // style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography>Can't find the exact reson  <Switch onChange={() => setTextFieldStatus(!textFieldStatus)} /></Typography>
        {
          textFieldStatus &&
          <TextField
            placeholder="Specify reason"
            multiline
            rows={4}
            onChange={(e) => setReason(e.target.value)}
            maxRows={4}

            inputProps={{
              maxLength: 120
            }}
            sx={{
              minWidth: "300px",
              '& .MuiOutlinedInput-root': {
                color: fontColor,
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                }
              }
            }
            }
          />
        }
        <Button variant='contained' sx={{ width: 300, marginTop: "10px" }} onClick={handleReportSubmit}>Submit Report</Button>
      </Stack>
    </>

  )
}

export default ReportQuestion