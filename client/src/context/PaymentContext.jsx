// src/context/PaymentContext.jsx
import React, { createContext, useContext, useState } from 'react';

const PaymentContext = createContext();

export const usePayment = () => useContext(PaymentContext);

export const PaymentProvider = ({ children }) => {
  const [paymentMode, setPaymentMode] = useState(null);

  return (
    <PaymentContext.Provider value={{ paymentMode, setPaymentMode }}>
      {children}
    </PaymentContext.Provider>
  );
};
