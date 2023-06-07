
import { Outlet } from 'react-router-dom'
import { Box, Toolbar } from '@mui/material'
import Navbar from '../components/Navbar'

const Root = () => {
  return (
    <>
      <Navbar/>
       <Box component="main" sx={{ p: 3 }}>
        <Toolbar/>
        <Outlet/> 
      </Box>
      
    </>
  )
}

export default Root