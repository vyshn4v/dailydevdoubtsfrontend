import './App.css'
import useColors from './assets/Colors'
import { ToastContainer } from 'react-toastify';
import User from './Routes/User'
import Admin from './Routes/Admin'
import "react-toastify/dist/ReactToastify.css";
import { Box } from '@mui/material'


function App() {
  const { bgColor, fontColor } = useColors()
  return (
    <Box sx={{
      width: '100%',
      minHeight: '100vh',
      padding:'10px',
      backgroundColor: bgColor,
      color: fontColor,
      display: 'flex',
      justifyContent: 'center',
      alignItems: "center"
    }}
    >
      <ToastContainer />
      <User />
      <Admin />
    </Box >
  )
}

export default App
