import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { useUser } from "@clerk/clerk-react";
const apiurl = import.meta.env.VITE_API_KEY;
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { usePayment } from "../context/PaymentContext";
import { useParams } from "react-router-dom";

const dashedLine = {
  borderTop: "2px dashed #ccc",
  margin: "12px 0",
};

const curvedCardStyle = {
  borderRadius: "20px",
  border: "1.5px solid #0096FF",
  padding: "12px 0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: 180,
  minWidth: 150,
};

const Status = ({
  amount = "1,500",
  currency = "₹", // Indian Rupee symbol
  status = "Successful",
  type = "Cash In",
  date = "08-05-2024",
  time = "06:14:26",
  txnId = "12345890",
  from = "0123456789",
  fromName = "Sara Samir",
  to = "012987654321",
  toName = "Ahmed Elsayed",
  onBackToHome = () => (window.location.href = "/"),
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [searchParams] = useSearchParams();
  const [transaction, setTransaction] = useState(null);
  const [error, setError] = useState(null);
  const { user, isLoaded } = useUser(); // Clerk user object
  const paymentMode = usePayment();
  const storedId = localStorage.getItem("userId");
  const activeuserid = useParams();
  console.log(activeuserid.activeuserid);

  useEffect(() => {
    const fetchTransaction = async () => {
      if (!isLoaded) return;

      const client_txn_id = searchParams.get("client_txn_id");
      const txn_id = searchParams.get("txn_id");
      const date = dayjs().format("DD-MM-YYYY");

      if (!client_txn_id || !txn_id) {
        setError("Missing parameters or user not logged in");
        return;
      }

      try {
        const res = await axios.post(`${apiurl}api/saveto/database`, {
          client_txn_id,
          txn_id,
          date,
          clerk_userid: activeuserid?.activeuserid,
          paymode: paymentMode,
        });

        if (res.data.success) {
          setTransaction(res.data.data);
        } else {
          setError(res.data.message || "Something went wrong");
        }
      } catch (err) {
        // Handle 409 Conflict - Transaction already exists
        if (err.response?.status === 409) {
          // If existing transaction data is returned, use it
          if (err.response.data?.data) {
            setTransaction(err.response.data.data);
            // Optional: Set a success message instead of error
            // setSuccessMessage("Your transaction has already been successfully completed!");
          } else {
            // Show friendly message for duplicate transaction
            setError(
              "Your transaction has already been successfully completed!"
            );
          }
        } else {
          setError("Failed to fetch transaction.");
        }
      }
    };

    fetchTransaction();
  }, [isLoaded]);

  console.log(transaction);

  if (error) return <div>Error: {error}</div>;
  if (!transaction) return <div>Loading...</div>;

  function maskString(str) {
    let lengthOfX = 10;
    if (!str || str.length <= 5) {
      return str;
    }

    // Extract first 5 characters
    const firstFive = str.substring(0, 5);

    // Create mask of 'X' characters using a for loop
    let mask = "";
    for (let i = 0; i < lengthOfX - 5; i++) {
      mask += "X";
    }

    // Combine and return
    return firstFive + mask;
  }

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
        id="transaction-ticket"
        sx={{
          width: isMobile ? "100%" : 450,
          border: "1px solid #ccc",
          borderRadius: 0,
          backgroundColor: "#fff",
          overflow: "hidden",
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
          className="header"
          sx={{
            position: "relative",
            mb: 2,
            pb: 1.5,
            borderBottom: "3px double #0096FF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            userSelect: "none",
          }}
        >
          {transaction.status === "success" ? (
            <CheckCircleIcon
              sx={{ color: "#0096FF", fontSize: 48, mr: 1, flexShrink: 0 }}
            />
          ) : (
            <ErrorOutlineIcon
              sx={{ color: "red", fontSize: 48, mr: 1, flexShrink: 0 }}
            />
          )}

          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: transaction.status === "success" ? "#0096FF" : "red",
            }}
          >
            {transaction.status === "success"
              ? "TRANSACTION SUCCESS"
              : "  TRANSACTION FAILED"}
          </Typography>
        </Box>

        {/* Amount section */}
        <Box
          sx={{
            textAlign: "center",
            mb: 2,
            borderBottom: "2px dashed #ddd",
            pb: 1,
            userSelect: "text",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "700",
              letterSpacing: "0.1em",
              color: "#222",
              userSelect: "text",
            }}
          >
            {currency}
            {transaction.amount}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              letterSpacing: "0.08em",
              color: "#555",
              fontWeight: "600",
              userSelect: "text",
            }}
          >
            {transaction.payment_mode.toUpperCase()}
          </Typography>
        </Box>

        {/* From and To Details */}
        {transaction.status === "success" ? (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 3,
                mb: 2,
                px: 1,
              }}
            >
              <Box className="curved-card" sx={curvedCardStyle}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: "700",
                    color: "#0096FF",
                    mb: 0.5,
                    letterSpacing: "0.1em",
                    userSelect: "none",
                  }}
                >
                  FROM
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "600",
                    userSelect: "text",
                    textTransform: "uppercase",
                  }}
                  align="center"
                >
                  {maskString(transaction.customer_name)}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#666", userSelect: "text" }}
                  align="center"
                >
                  {transaction.customer_name}
                </Typography>
              </Box>

              <Box className="curved-card" sx={curvedCardStyle}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: "700",
                    color: "#0096FF",
                    mb: 0.5,
                    letterSpacing: "0.1em",
                    userSelect: "none",
                  }}
                >
                  TO
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "600",
                    userSelect: "text",
                    textTransform: "uppercase",
                  }}
                  align="center"
                >
                  {maskString(transaction.merchant.upi_id)}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#666", userSelect: "text" }}
                  align="center"
                >
                  {transaction.merchant.name}
                </Typography>
              </Box>
            </Box>

            <Box className="dashed-line" sx={dashedLine} />
          </>
        ) : (
          ""
        )}

        {/* Transaction Details */}
        <Box sx={{ fontSize: isMobile ? 13 : 14, mb: 3, userSelect: "text" }}>
          <Typography sx={{ mb: 0.5 }}>
            <strong>Status:</strong>{" "}
            <span
              style={{
                color:
                  transaction.status.toLowerCase() === "success"
                    ? "#388e3c"
                    : "#f44336",
                fontWeight: "400",
                letterSpacing: "0.05em",
                textTransform: "capitalize",
              }}
            >
              {transaction.status}
            </span>
          </Typography>
          <Typography sx={{ mb: 0.5 }}>
            <strong>Type:</strong> {transaction.payment_mode}
          </Typography>
          <Typography sx={{ mb: 0.5 }}>
            <strong>Date:</strong> {transaction.txnAt}
          </Typography>
          <Typography sx={{ mb: 0.5 }}>
            <strong>Time:</strong> {transaction.createdAt}
          </Typography>
          <Typography sx={{ mb: 0.5 }}>
            <strong>Transaction ID:</strong> {transaction.client_txn_id}
          </Typography>
        </Box>

        <Box className="dashed-line" sx={dashedLine} />

        {/* Back To Home Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 2,
            px: 0,
          }}
        >
          <Button
            variant="contained"
            onClick={onBackToHome}
            sx={{
              backgroundColor:
                transaction.status === "success" ? "#0096FF" : "red",
              color: "#fff",
              fontWeight: "700",
              letterSpacing: "0.1em",
              borderRadius: "20px",
              px: 4,
              py: 1.5,
              minWidth: 160,
              textTransform: "uppercase",
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

export default Status;
