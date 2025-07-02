import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { FaHome, FaHeadset, FaSync, FaNewspaper, FaCog } from 'react-icons/fa';

const BottomNav = () => {
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation showLabels>
        <BottomNavigationAction label="Home" icon={<FaHome />} />
        <BottomNavigationAction label="Support" icon={<FaHeadset />} />
        <BottomNavigationAction label="" icon={<FaSync />} />
        <BottomNavigationAction label="News" icon={<FaNewspaper />} />
        <BottomNavigationAction label="Settings" icon={<FaCog />} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;