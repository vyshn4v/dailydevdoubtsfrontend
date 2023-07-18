import React from 'react'
import LinearProgress from '@mui/material/LinearProgress';
import { Container, Typography } from '@mui/material'
function Loading() {
  return (
    <Container sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: 'center'
      }}>
        <Typography sx={{
        }}>
          Loading<LinearProgress />
        </Typography>

      </Container>
  )
}

export default Loading