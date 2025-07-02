import React from 'react';
import { Box, Button } from '@mui/material';
import { FaPlus, FaGift, FaShoppingCart, FaTrophy } from 'react-icons/fa';

const actions = [
  { icon: <FaPlus />, label: 'Add Money' },
  { icon: <FaGift />, label: 'Redeem Code' },
  { icon: <FaShoppingCart />, label: 'Purchase' },
  { icon: <FaTrophy />, label: 'Leaderboard' },
];

const ActionButtons = () => {
  return (
    <Box display="flex" justifyContent="space-around" py={2}>
      {actions.map(({ icon, label }) => (
        <Button
          key={label}
          startIcon={icon}
          variant="outlined"
          sx={{ display: 'flex', flexDirection: 'column', minWidth: 60 }}
        >
          {label}
        </Button>
      ))}
    </Box>
  );
};

export default ActionButtons;
