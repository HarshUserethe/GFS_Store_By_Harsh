  const express = require('express');
  const app = express();
  const axios = require('axios');
  const cors = require('cors');
  const dontenv = require('dotenv');
  const  welcomeRoute = require('./routes/welcome.js');
  const getProducts = require('./routes/smileOne/getProducts.js');
  const getProductList = require('./routes/smileOne/getProductList.js');
  const validate = require('./routes/smileOne/validate.js');
  const getRole = require('./routes/smileOne/getRole.js');
  const createProduct = require('./routes/smileOne/createProduct.js');
  const { createOrder, verifyPayment } = require('./controller/paymentController.js');
  const { createOrderUPI } = require('./controller/upigateway.js');
  const { checkOrderStatusAndSave } = require('./controller/orderStatus.js');
  const connectDB = require('./config/db.js');
 const fetchProducts = require('./routes/smileOne/smileProductList.js');
const fetchGamesList = require('./routes/smileOne/getSmileGameList.js');
const { saveTransactionToDatabase } = require('./controller/transactionController.js');
const { getOrderHistory } = require('./controller/orderHistory.js');
const getRoleController = require('./routes/smileOne/validatePlayer.js');
const { createPayPalPayment, capturePayPalPayment} = require('./controller/paypal.js');
const savePayPalTransactionToDatabase = require('./controller/savePaypalTransaction.js');
const { AppProjection } = require('./routes/global/appProjection.js');




  //Cors
  const allowedOrigins = ['http://localhost:5173', 'http://192.168.29.66:5173'];
  const corsOptions = {
      origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      }
    };
    
    // Apply CORS with options
    app.use(cors(corsOptions));


  //Config
  dontenv.config();
  connectDB();

  //Environmental Verables
  const PORT = process.env.PORT;

  //Middlewares
  app.use(express.json());

  app.get('/', welcomeRoute)

  app.post('/get-products', getProducts);
  app.post('/get-products-list/:game', getProductList);
  app.get('/validate/role', getRole)
  app.post('/create-order', createProduct)
  // Create Razorpay order (protected route)
  // app.post('/create-order', createOrder);
  // app.post('/verify-payment', verifyPayment);


  //UPI GATEWAY ------>
  app.post('/create-order-upi', createOrderUPI);
  app.post('/check-order-status', checkOrderStatusAndSave)



  //fetch DATA ---->
  app.get('/fetch-products/smileone/mlbb', fetchProducts);
  app.get('/fetch-products/smileone/games', fetchGamesList);
  app.post('/fetch/order/history', getOrderHistory)

  //storedata
  app.post('/api/saveto/database', saveTransactionToDatabase);
  app.post('/api/paypal/save', savePayPalTransactionToDatabase);
  app.post('/api/getrole', getRoleController)

  app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === 'production' ? undefined : err.message
  });
});


app.post("/api/paypal", createPayPalPayment);
app.get("/api/paypal/capture", capturePayPalPayment);

app.get("/api/app_projection", AppProjection)

  app.listen(PORT || 3000, () => {
      console.log("Server Started At",`${PORT}`)
  })