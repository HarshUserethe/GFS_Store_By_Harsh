import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useUser } from "@clerk/clerk-react";
import { Box, Typography, Button, useMediaQuery, useTheme } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { usePayment } from "../context/PaymentContext";
import { useParams, useSearchParams } from "react-router-dom";
import '../../public/styles/product.css';

const apiurl = import.meta.env.VITE_API_KEY;

const dashedLine = {
  borderTop: "2px dashed #ccc",
  margin: "12px 0",
};

const curvedCardStyle = {
  borderRadius: "20px",
  border: "1.5px solid #0096FF	",
  padding: "12px 0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: 180,
  minWidth: 150,
};

const PaypalSuccess = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [searchParams] = useSearchParams();
  const [payload, setPayload] = useState(null);
  const [transaction, setTransaction] = useState(null);
  const [error, setError] = useState(null);
  const { user, isLoaded } = useUser();
  const paymentMode = usePayment();
  const { activeuserid } = useParams();

  // Extract query params
  useEffect(() => {
    const queryData = {
      clerk_userid: searchParams.get("clerk_userid") || "",
      redirect_url: searchParams.get("redirect_url") || "",
      productName: searchParams.get("productName") || "",
      customer_name: searchParams.get("customer_name") || "",
      customer_email: searchParams.get("customer_email") || "",
      customer_mobile: searchParams.get("customer_mobile") || "",
      amount: searchParams.get("amount") || "",
      token: searchParams.get("token") || "",
      PayerID: searchParams.get("PayerID") || "",
    };

    setPayload(queryData);
    console.log("Captured Query Parameters:", queryData);
  }, [searchParams]);

  // Save transaction logic (trigger once payload is loaded)
 useEffect(() => {
   if (payload && payload.token) {
     const saveTransaction = async () => {
       try {
         const now = dayjs(); // current time

         const response = await axios.post(`${apiurl}api/paypal/save`, {
           userId: payload.clerk_userid,
           payment_mode: "PayPal",
           status: "success",
           client_txn_id: payload.token,
           txnAt: now.format("YYYY-MM-DD"),              // ✅ DATE ONLY
           createdAt: now.toISOString(),                 // ✅ ISO STRING with time
           amount: payload.amount,
           email: payload.customer_email,
           name: payload.customer_name,
           productName: payload.productName,
           mobile: payload.customer_mobile,
         });

         setTransaction(response.data);
       } catch (err) {
         console.error("Transaction save failed:", err);
         setError("Failed to save transaction");
       }
     };

     saveTransaction();
   }
 }, [payload]);


  if (error) return <div>Error: {error}</div>;
  if (!payload) return <div>Loading transaction data...</div>;

  const isSuccess = payload.token.length > 0;

  const maskString = (str) => {
    if (!str || str.length <= 5) return str;
    return str.substring(0, 5) + "X".repeat(str.length - 5);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#fafafa",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 1,
        fontFamily: "'Courier New', Courier, monospace",
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          width: isMobile ? "100%" : 450,
          border: "1px solid #ccc",
          borderRadius: 0,
          backgroundColor: "#fff",
          pt: 3,
          pb: 1,
          px: 3,
          color: "#333",
          letterSpacing: "0.03em",
          maxWidth: "100%",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            position: "relative",
            mb: 2,
            pb: 1.5,
            borderBottom: "3px double #0096FF	",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            userSelect: "none",
          }}
        >
          {isSuccess ? (
            <CheckCircleIcon sx={{ color: "#0096FF	", fontSize: 48, mr: 1 }} />
          ) : (
            <ErrorOutlineIcon sx={{ color: "red", fontSize: 48, mr: 1 }} />
          )}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: isSuccess ? "#0096FF	" : "red",
            }}
          >
            {isSuccess ? "TRANSACTION SUCCESS" : "TRANSACTION FAILED"}
          </Typography>
        </Box>

        {/* Amount */}
        <Box sx={{ textAlign: "center", mb: 2, borderBottom: "2px dashed #ddd", pb: 1 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, letterSpacing: "0.1em" }}>
            ₹{payload.amount}
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#555" }}>
            Paypal
          </Typography>
        </Box>

        {/* From and To */}
        {isSuccess && (
          <>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mb: 2 }}>
              <Box sx={curvedCardStyle}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: "#0096FF	", mb: 0.5 }}>
                  FROM
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600, fontSize:".8rem" }} align="center">
                  {maskString(payload.customer_name)}
                </Typography>
                <Typography variant="caption" sx={{ color: "#666" }} align="center">
                  {payload.customer_name}
                </Typography>
              </Box>

              <Box sx={curvedCardStyle}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: "#0096FF	", mb: 0.5 }}>
                  TO
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600, fontSize:".8rem" }} align="center">
                  Merchant UPI ID
                </Typography>
                <Typography variant="caption" sx={{ color: "#666" }} align="center">
                  Gosu Family Store
                </Typography>
              </Box>
            </Box>
            <Box sx={dashedLine} />
          </>
        )}

        {/* Transaction Info */}
        <Box sx={{ fontSize: isMobile ? 13 : 14, mb: 3 }}>
          <Typography sx={{ mb: 0.5 }}>
            <strong>Status:</strong>{" "}
            <span style={{ color: isSuccess ? "#388e3c" : "#f44336", textTransform: "capitalize" }}>
              {isSuccess ? "Success" : "Failed"}
            </span>
          </Typography>
          <Typography sx={{ mb: 0.5 }}>
            <strong>Type:</strong> PayPal
          </Typography>
          <Typography sx={{ mb: 0.5 }}>
            <strong>Date:</strong> {dayjs().format("DD-MM-YYYY")}
          </Typography>
          <Typography sx={{ mb: 0.5 }}>
            <strong>Time:</strong> {dayjs().format("HH:mm:ss")}
          </Typography>
          <Typography sx={{ mb: 0.5 }}>
            <strong>Transaction ID:</strong> {payload.token}
          </Typography>
        </Box>

        <Box sx={dashedLine} />

        {/* Back Button */}
        <Box sx={{ display: "flex", justifyContent: "center", pb: 2 }}>
          <Button
            variant="contained"
            onClick={() => (window.location.href = "/")}
            sx={{
              color: "#fff",
              fontWeight: "700",
              letterSpacing: "0.1em",
              borderRadius: "20px",
              px: 4,
              py: 1.5,
              minWidth: 160,
              textTransform: "uppercase",
              backgroundColor: "#0096FF	",
              "&:hover": {
                backgroundColor: "#388e3c",
              },
            }}
          >
            Back To Home
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PaypalSuccess;
