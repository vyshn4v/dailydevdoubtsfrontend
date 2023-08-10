import { Box, Button, Typography } from '@mui/material'
import UseColors from '../../assets/Colors'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  const { bgColor } = UseColors()
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: bgColor,
      }}
    >
      <Typography variant="h1" style={{ color: 'white' }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: 'white' }}>
        The page you’re looking for doesn’t exist.
      </Typography>
      <Button variant="contained" onClick={() => navigate('/')}>Back Home</Button>  
    </Box>
  )
}

export default NotFound