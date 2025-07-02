import { Box } from '@mui/material';
import React, { useState } from 'react';
import { usePayment } from '../context/PaymentContext';
import { LuWallet } from 'react-icons/lu';

const PaymentMode = ({ mode }) => {
  const [selectedIndex, setSelectedIndex] = useState(null); // use index instead of boolean
  const { paymentMode, setPaymentMode } = usePayment();
  
  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
    <div style={{display:"flex", justifyContent:"start", alignItems:"center", gap:"5px"}}>
            <LuWallet size={18} color='#1976d2' /> <h2 style={{ fontWeight: "500", fontSize: "1.1rem" }}>Payment mode</h2>

    </div>
      {mode.map((item, index) => {
        const isSelected = paymentMode === item.mode;

        return (
          <Box
            key={index}
            onClick={() => setPaymentMode(item.mode)}
            sx={{
              width: "100%",
              height: "90px",
              backgroundColor: isSelected ? "#fffcf6" : "#fff",
              borderRadius: "10px",
              border: `2px solid ${isSelected ? "#fb8c00" : "#dfdfdf"}`,
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {item.logo ? (
              <img
                style={{ width: "55%", height: "100%", objectFit: "contain" }}
                src={item.logo}
                alt={item.mode || "payment mode"}
              />
            ) : (
              <span>{item.mode}</span>
            )}
          </Box>
        );
      })}
    </div>
  );
};

export default PaymentMode;
