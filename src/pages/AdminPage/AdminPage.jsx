import React from 'react';
import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box';
import NavSide from '../../components/Admin/NavSide'
const AdminPage = () => {

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <NavSide />
        <Outlet />
      </Box>
    </>
  );
};
export default AdminPage;
