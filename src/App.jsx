import './App.css'
import useColors from './assets/Colors'
import { ToastContainer } from 'react-toastify';
import User from './Routes/User'
import Admin from './Routes/Admin'
import "react-toastify/dist/ReactToastify.css";
import { Box } from '@mui/material'
import PlanModal from './components/PlanModal/PlanModal';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';


function App() {
  const { bgColor, fontColor } = useColors()

  return (
    <Box sx={{
      width: '100%',
      minHeight: '100vh',
      padding: '10px',
      backgroundColor: bgColor,
      color: fontColor,
      display: 'flex',
      justifyContent: 'center',
      alignItems: "center"
    }}
    >

      <ToastContainer />
      <Routes>
        <Route path='/*' element={<User />} />
        <Route path='/admin/*' element={<Admin />} />
      </Routes>
    </Box >
  )
}

export default App
