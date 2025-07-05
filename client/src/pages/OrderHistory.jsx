import React, { useEffect, useState } from "react";
import axios from "axios";
const apiurl = import.meta.env.VITE_API_KEY;
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import '../../public/styles/global.css';
import {
  Box,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  Collapse,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import {
  FilterList as FilterIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";
import { LuHistory } from "react-icons/lu";
import { ProgressBar } from "react-loader-spinner";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const {activeuserid} = useParams();

    const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));



  // Filter orders based on selected date range
  const filteredOrders = orders.filter((order) => {
    if (!startDate && !endDate) return true;
    const orderDate = new Date(order.date);

    if (startDate && endDate) {
      return orderDate >= startDate && orderDate <= endDate;
    } else if (startDate) {
      return orderDate >= startDate;
    } else if (endDate) {
      return orderDate <= endDate;
    }

    return true;
  });

  const toggleOrderDetails = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "success";
      case "close":
        return "warning";
      case "failure":
        return "error";
        case "created":
          return "primary"
        case "scanning":
          return "secondary"
      default:
        return "default";
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const resetFilter = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const fetchOrderHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${apiurl}fetch/order/history`, { userId: activeuserid });
      setOrders(response.data.data);
    } catch (err) {
      console.error("Error fetching order history:", err);
      setError("Failed to fetch order history.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeuserid) {
      fetchOrderHistory();
    }
  }, [activeuserid]);

  

  if (loading) return <div style={{width:"100dvw", height:"100dvh", display:"flex", justifyContent:"center", alignItems:"center"}}><ProgressBar /></div>;
  if (error) return <p>{error}</p>;

const formatedDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};


  return (
    <div className="order-history" style={{backgroundColor:"#f8fafc"}}>
    <Header />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 500,
            fontSize: "1.1rem",
            textAlign: "left",
            gap: "5px",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <LuHistory size={18} /> My Orders
        </Typography>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 500, fontSize: ".8rem", textAlign: "left" }}
        >
          Summary of your recent and past orders.
        </Typography>

        <Divider></Divider>
        {/* Date Filter */}
        <Box sx={{ mb: 3 }}>
          {/* <Button
            startIcon={<FilterIcon />}
            endIcon={
              isFilterOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
            }
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            variant="outlined"
            size="small"
            sx={{ mb: 1 }}
          >
            Filter by date
          </Button> */}

          {/* <Collapse in={isFilterOpen}>
            <Paper elevation={0} variant="outlined" sx={{ p: 3, mt: 1 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="From"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth size="small" />
                    )}
                    components={{
                      OpenPickerIcon: CalendarIcon,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="To"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth size="small" />
                    )}
                    components={{
                      OpenPickerIcon: CalendarIcon,
                    }}
                  />
                </Grid>
              </Grid>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button onClick={resetFilter} sx={{ mr: 1 }} size="small">
                  Reset
                </Button>
                <Button
                  onClick={() => setIsFilterOpen(false)}
                  variant="contained"
                  size="small"
                >
                  Apply
                </Button>
              </Box>
            </Paper>
          </Collapse> */}
        </Box>

        {/* Orders List */}
        <Stack spacing={2}>
          {filteredOrders.length === 0 ? (
            <Paper elevation={0} sx={{ p: 4, textAlign: "center" }}>
              <Typography color="text.secondary">
                No orders found for the selected date range.
              </Typography>
            </Paper>
          ) : (
            filteredOrders.map((order) => (
              <Card key={order._id} variant="outlined">
                {/* Order Header */}
                <CardHeader
                  sx={{
                    cursor: "pointer",
                    backgroundColor: "rgba(0, 0, 0, 0.02)",
                    "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
                  }}
                  onClick={() => toggleOrderDetails(order._id)}
                  title={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        component="span"
                        sx={{ mr: 1, fontWeight: 500, fontSize: ".9rem" }}
                      >
                        ID: {order._id}
                      </Typography>

                      {/* <Chip>getStatusColor("Delivered")</Chip> */}
                    </Box>
                  }
                  // subheader={formatDate(order.date)}
                  action={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        variant="subtitle1"
                        sx={{ mr: 1, fontWeight: 500, fontSize: ".9rem" }}
                      >
                        ₹{order?.amount?.toFixed(2)}
                      </Typography>
                      <IconButton aria-label="expand row" size="small">
                        {expandedOrderId === order._id ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </Box>
                  }
                />
                <Box
                  sx={{
                    paddingBottom: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "-10px",
                  }}
                >
                  <Box
                    sx={{
                      width: "90%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: ".8rem", color: "gray" }}>
                      Date: {formatedDate(order?.txnAt)}
                    </Typography>
                    <Chip
                      label={order?.status}
                      color={getStatusColor(order?.status)}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: {
                          xs: "0.65rem", // extra small devices
                          sm: "0.7rem", // small to medium devices
                        },
                        px: 1,
                        py: 1.5, // horizontal padding
                        mt: { xs: 0.5, sm: 0 }, // small top margin for mobile
                        alignSelf: { xs: "flex-start", sm: "center" }, // align better in column layout
                        width: "35vw",
                        whiteSpace: "nowrap",
                        opacity: "90%",
                      }}
                    />
                  </Box>
                </Box>
                {/* Order Details (expandable) */}
                <Collapse
                  in={expandedOrderId === order._id}
                  timeout="auto"
                  unmountOnExit
                >
                  <CardContent>
                    {/* Transaction Info */}
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        mb: 2,
                        backgroundColor: "rgba(0, 0, 0, 0.02)",
                      }}
                    >
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            component="span"
                            sx={{ fontSize: ".8rem" }}
                          >
                            Payment Mode:
                          </Typography>
                          <Typography
                            variant="body2"
                            component="span"
                            sx={{ ml: 1, fontWeight: 500, fontSize: ".8rem" }}
                          >
                            {order?.payment_mode}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            component="span"
                            sx={{ fontSize: ".8rem" }}
                          >
                            Transaction ID:
                          </Typography>
                          <Typography
                            variant="body2"
                            component="span"
                            sx={{ ml: 1, fontWeight: 500, fontSize: ".8rem" }}
                          >
                            {order?.client_txn_id}
                          </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            component="span"
                            sx={{ fontSize: ".8rem" }}
                          >
                            Product Name:
                          </Typography>
                          <Typography
                            variant="body2"
                            component="span"
                            sx={{ ml: 1, fontWeight: 500, fontSize: ".8rem" }}
                          >
                           {order?.p_info}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  </CardContent>
                </Collapse>
              </Card>
            ))
          )}
        </Stack>
      </Container>
    </LocalizationProvider>
    </div>
  );
};

export default OrderHistory;
