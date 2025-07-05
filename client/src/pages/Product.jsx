import React, { useEffect, useState, useMemo } from "react";
import Header from "../components/Header";
import "../../public/styles/product.css";
import { useParams } from "react-router-dom";
import axios from "axios";
const apiurl = import.meta.env.VITE_API_KEY;
const clienturl = import.meta.env.VITE_CLIENT_DOMAIN;
import debounce from "lodash/debounce";
import { Button } from "@mui/material";
import { LuBadgeCent, LuBadgeCheck, LuInfo, LuCircleX } from "react-icons/lu";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { SignIn } from "@clerk/react-router";
import { MagnifyingGlass } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import PaymentMode from "../components/PaymentMode";
import { usePayment } from "../context/PaymentContext";
import HowToPurchaseImage from '../assets/how_to_purchase.png'

const Product = () => {
  const paymentMethod = [
    {
      id: "01",
      mode: "UPI",
      logo: "https://res.cloudinary.com/da6pzcqcw/image/upload/v1747496525/UPI-Logo_sc7vl6.png",
    },
    {
      id: "02",
      mode: "Google Pay",
      logo: "https://res.cloudinary.com/da6pzcqcw/image/upload/v1747495717/Google-Pay-logo_dwp6po.png",
    },
    {
      id: "03",
      mode: "PhonePe",
      logo: "https://res.cloudinary.com/da6pzcqcw/image/upload/v1747495718/PhonePe-Logo_if1qkf.png",
    },
    {
      id: "04",
      mode: "Paytm",
      logo: "https://res.cloudinary.com/da6pzcqcw/image/upload/v1747496756/Paytm-Logo_u9t1pv.png",
    },
    {
      id: "05",
      mode: "Binance",
      logo: "https://res.cloudinary.com/da6pzcqcw/image/upload/v1747495717/Binance-Logo_nl4y2f.jpg",
    },
    {
      id: "06",
      mode: "PayPal",
      logo: "https://res.cloudinary.com/da6pzcqcw/image/upload/v1747496756/Paypal-Logo-2022_oseanq.png",
    },
  ];

  const paymentOptions = ["UPI", "Google Pay", "Paytm", "PhonePe"];

  const paymentModeData = useMemo(() => paymentMethod, []);
  const { gameName } = useParams();
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showHowToPurchaseModal, setShowHowToPurchaseModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Diamonds");
  const [formData, setFormData] = useState({
    userId: "",
    zoneId: "",
    mobile: "",
    productId: "",
    gameName: gameName,
    email: "",
    customerName: "",
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState("");
  const { paymentMode } = usePayment();
  const [showValidateButton, setShowValidateButton] = useState(false);
  const [smileUsername, setSmileUsername] = useState("");
  const [isVerified, setisVerified] = useState(false);
  var txnId = "";
  const [isValidating, setIsValidating] = useState(false);

  const { isSignedIn, user, isLoaded } = useUser();

  const notify = () =>
    toast.error("Please fill all required fields.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const location = useLocation();
  const currentPath = location.pathname + location.search;
  const [customProducts, setCustomProducts] = useState([]);
  const handleSmileMlbbProductList = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${apiurl}fetch-products/smileone/mlbb`);
      if (response.data.length > 0) {
        setCustomProducts(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    handleSmileMlbbProductList();
  }, []);

  useEffect(() => {
    const handleSmileProductList = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post(
          `${apiurl}get-products-list/${gameName}`
        );
        if (!response) {
          console.log("There is an error getting response");
        }
        setProductList(response.data.data.product);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    handleSmileProductList();
  }, [gameName]);

  if (isLoading)
    return (
      <div
        style={{
          width: "100vdw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MagnifyingGlass
          visible={true}
          height="60"
          width="60"
          ariaLabel="magnifying-glass-loading"
          wrapperStyle={{}}
          wrapperClass="magnifying-glass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
      </div>
    );

  // Filtered products based on selected tab
  const filteredProducts = customProducts.filter((prd) => {
    return (
      productList.some((p) => p.id === prd.id) && prd.category === selectedTab
    );
  });

 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedFormData);

    // Check if all required fields are filled
    if (
      updatedFormData.userId?.trim() &&
      updatedFormData.zoneId?.trim() &&
      updatedFormData.mobile?.trim()
    ) {
      setShowValidateButton(true);
    } else {
      setShowValidateButton(false);
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setFormData({
      ...formData,
      productId: product.id,
      email: user?.primaryEmailAddress?.emailAddress,
      customerName: user?.firstName + " " + user?.lastName,
    });
  };

  const handlePaymentGateway = async () => {
    console.log(selectedProduct.dis_price);
    try {
      setIsLoading(true);

      // Create order on backend
      const orderResponse = await axios.post(
        `${import.meta.env.VITE_API_KEY}create-order`,
        {
          amount: Number(selectedProduct.dis_price),
          currency: "INR",
        }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Your Razorpay Key ID
        amount: orderResponse.data.amount,
        currency: orderResponse.data.currency,
        name: "Gosu Family Store",
        description: selectedProduct.spu,
        order_id: orderResponse.data.id,
        handler: async (response) => {
          try {
            // Verify payment on backend
            await axios.post(`${import.meta.env.VITE_API_KEY}verify-payment`, {
              ...response,
              productName: selectedProduct.spu,
              productPrice: selectedProduct.dis_price,
              user: user,
            });

            alert("Payment Successful!");
          } catch (error) {
            alert("Payment Verification Failed");
            console.error(error);
          }
        },
        prefill: {
          name: user.fullName,
          email: user.email,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment initiation failed", error);
      alert("Payment initiation failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProduct = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(`${apiurl}create-order`, formData);

      if (!response || !response.data) {
        console.error("No data received in response");
        return;
      }

      console.log(response);
    } catch (error) {
      console.error("Error creating product:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getFormattedDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const yyyy = today.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  const handleUPIGateway = async () => {
    const data = {
      amount: selectedProduct.dis_price,
      productName: selectedProduct.spu,
      fullName: formData.customerName,
      email: formData.email,
      mobile: formData.mobile,
      redirect_url: `${clienturl}status/${user?.id}`,
      clerk_userid: user?.id,
    };

    // Clear any previous errors
    setError(null);

    try {
      const response = await axios.post(`${apiurl}create-order-upi`, data);
      txnId = response.data.txnId;

      if (response.data?.payment_url) {
        window.location.href = response.data.payment_url;
      } else {
        setError("Payment URL not received from server");
      }
    } catch (err) {
      console.error("Payment initiation failed:", err);

      // Dynamic error extraction - prioritize server message
      const errorMessage =
        err.response?.data?.message || // Server's specific error message
        err.response?.data?.error || // Alternative server error field
        err.response?.statusText || // HTTP status text
        err.message || // Axios error message
        "An unexpected error occurred"; // Fallback

      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  //UPI Gateway Order Status
  const checkStatus = async () => {
    const txnDate = getFormattedDate();

    const payload = {
      client_txn_id: txnId,
      paymentOption: paymentMode,
    };

    try {
      const response = await axios.post(`${apiurl}check-order-status`, payload);
      if (response.data.success) {
        const orderResponse = await handleCreateProduct();
        console.log("Transaction details:", response.data);
        console.log("Create Order", orderResponse);
      } else {
        console.warn("Transaction check failed:", response.data.message);
      }
    } catch (err) {
      console.error("Status check error:", err);
    }
  };

  //PAYPAL PAY --->
  const handlePayPalPayments = async () => {
  
    const data = {
      amount: selectedProduct.dis_price,
      productName: selectedProduct.spu,
      receiverEmail: formData.email,
      user: {
        _id: user?.id,
        fullName: formData.customerName,
        email: formData.email,
        location: formData.location || "",
        mobile: formData.mobile || ""
      },
    };

    try {
      setIsLoading(true);
      const res = await axios.post(`${apiurl}api/paypal`, data);
      console.log(res);
      window.location.href = res.data.approvalLink;
      console.log(data);
    } catch (err) {
      const errMsg =
        err.response?.data?.error || "Something went wrong. Try again.";
      console.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Move this to the top!

    try {
      if (
        formData.userId.length === 0 ||
        formData.zoneId.length === 0 ||
        formData.productId.length === 0 ||
        formData.mobile.length === 0
      ) {
        notify();
        return;
      }

      if (paymentOptions.includes(paymentMode)) {
        await handleUPIGateway(); //DONE
        await checkStatus(); //DONE except DB SAVED!
        await handleCreateProduct(); 
      } else if (paymentMode === "Binance") {
        toast.error("Binance Method Currently Unavailable");
      } else if (paymentMode === "PayPal") {
        await handlePayPalPayments();
        await handleCreateProduct(); 
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Sign in with Google clicked");
    setShowLoginModal(false);
  };

  const FormValidation = () => {
    if (
      !formData?.productId?.length ||
      !paymentMode?.length ||
      !formData?.userId?.length ||
      !formData?.zoneId?.length ||
      !formData?.mobile?.length
    ) {
      toast.error("You can't leave required fields empty.");
      return false;
    }
    return true;
  };

  const handleValidatePlayer = async () => {
    const isValid = FormValidation();
    if (!isValid) return; // Stop execution if form is invalid
    try {
      setIsValidating(true);
      const res = await axios.post(`${apiurl}api/getrole`, formData);
      console.log("Response from server:", res.data);
      const username = res.data.username;

      if (
        res.data.message === "USER ID não existe" ||
        res.data.status === "20004" ||
        res.data.status === "20003" ||
        res.data.message === "USER ID ou Zone ID não existe"
      ) {
        toast.error("Username Not Found!");
        return;
      }

      if (username.length > 0) {
        setSmileUsername(username);
        setisVerified(true);
        // toast.success("Player Verified Successfully!");
        setIsValidating(false);
      } else {
        setSmileUsername("Username Not Found!");
        setisVerified(false);
        toast.error("Username Not Found!");
        setIsValidating(false);
      }

      // handle success (e.g., set result in state)
    } catch (err) {
      console.error("Validation failed:", err.response?.data || err.message);
      setIsValidating(false);
    } finally {
      setIsValidating(false);
    }
  };

 
  return (
    <div className="product-page">
      <div
        style={{
          position: "fixed",
          width: "100%",
          backgroundColor: "transparent",
          display: isVerified ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "99",
        }}
      >
        <div
          style={{
            borderRadius: "12px",
            padding: "16px 20px",
            width: "100%",
            maxWidth: "400px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            flexDirection: "column",
            gap: "6px",
            background:
              "linear-gradient(135deg, rgba(34, 197, 94, 0.95) 0%, rgba(16, 185, 129, 0.95) 100%)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "15px",
              fontWeight: "600",
            }}
          >
            <LuBadgeCheck size={18} />
            <span>Player Verified</span>
            <span
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                color: "#fff",
                fontSize: "1rem",
                display: "none",
              }}
            >
              <LuCircleX />
            </span>
          </div>

          <div
            style={{
              fontSize: "13px",
              fontWeight: "500",
              opacity: "0.9",
              background: "rgba(255, 255, 255, 0.2)",
              padding: "4px 10px",
              borderRadius: "12px",
            }}
          >
            @{smileUsername}
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        limit={2}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Header />

      {/* Top Banner */}
      <div className="banner-container">
        <div
          style={{
            backgroundColor: "#000",
            width: "100%",
            height: "100%",
            position: "absolute",
            opacity: "30%",
          }}
        ></div>
        <img
          src="https://cdn.prod.website-files.com/65956e2711516206d2d1258f/66afcf00279b215f08df85ca_mlbb2.webp"
          alt="Mobile Legends Banner"
          className="banner-image"
        />
        <div className="banner-details">
          <div className="game-icon">
            <img
              src="https://play-lh.googleusercontent.com/ovqnOQDL8SPTocGIfDpZCJrsRfr4063AXkoG4xOTf7SPj6FPxmPEA5ChsFf9bOCB4bI=w600-h300-pc0xffffff-pd"
              alt="Game Icon"
            />
          </div>
          <div>
            <h1 className="game-title">Mobile Legends: Bang Bang</h1>
            <div className="badge-container">
              <Badge text="24/7 Chat Support" />
              <Badge text="Safe Payment" />
              <Badge text="Official Store" />
              <Badge text="Service Guarantee" />
              <Badge text="Instant Delivery" />
            </div>
          </div>
        </div>
      </div>

      {/* How to Purchase Button */}
      <div className="purchase-btn-container">
        <button
          className="purchase-btn"
          onClick={() => setShowHowToPurchaseModal(true)}
        >
          How to Purchase
        </button>
      </div>

      {/* Order Information */}
      <form onSubmit={handleFormSubmit}>
        <div className="order-info">
          <h2 className="section-title">
            <LuInfo size={20} color="#1976d2" />
            Order Information
          </h2>
          <input
            type="number"
            name="userId"
            placeholder="User ID"
            className="input-field"
            value={formData.userId}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="zoneId"
            placeholder="Zone ID"
            className="input-field"
            value={formData.zoneId}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="mobile"
            placeholder="Mobile Number"
            className="input-field"
            value={formData.mobile}
            onChange={handleInputChange}
          />

          <span
            style={{
              color: "red",
              fontSize: "14px",
              textAlign: "center",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          ></span>
        </div>

        {/* Category Tabs */}
        <div className="tab-container">
          <Tab
            text="Diamonds"
            selected={selectedTab === "Diamonds"}
            onClick={() => setSelectedTab("Diamonds")}
          />
          <Tab
            text="Weekly Diamond Pass"
            selected={selectedTab === "Weekly Diamond Pass"}
            onClick={() => setSelectedTab("Weekly Diamond Pass")}
          />
          <Tab
            text="2x First Recharge Bonus"
            selected={selectedTab === "2x First Recharge Bonus"}
            onClick={() => setSelectedTab("2x First Recharge Bonus")}
          />
          <Tab
            text="Twilight Pass"
            selected={selectedTab === "Twilight Pass"}
            onClick={() => setSelectedTab("Twilight Pass")}
          />
        </div>

        {/* Product Cards */}
        <div className="product-grid">
          {filteredProducts.map((item) => (
            <ProductCard
              key={item.id}
              url={item.logoUrl}
              amount={item.title}
              price={item.dis_price}
              original={item.price}
              selected={selectedProduct && selectedProduct.id === item.id}
              onClick={() => handleProductSelect(item)}
            />
          ))}
        </div>

        <>
          <PaymentMode mode={paymentModeData} />
        </>

        {/* Bottom Bar */}
        <div className="bottom-bar">
          <div className="bottom-price">
            ₹{selectedProduct ? selectedProduct.dis_price : "0"}
          </div>

          <>
            <div>
              <SignedOut>
                <SignInButton mode="modal" redirect={currentPath}>
                  <button className="signin-button">Please signin first</button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                {isVerified ? (
                  <button
                    type="button"
                    className="bottom-button"
                    onClick={handleFormSubmit}
                  >
                    Purchase
                  </button>
                ) : (
                  <button
                    type="button"
                    className="bottom-button"
                    onClick={handleValidatePlayer}
                  >
                    {isValidating ? "Please Wait ..." : "Validate"}
                  </button>
                )}
                {/* <button
                type="button"
                className="bottom-button"
                onClick={handleFormSubmit}
              >
                Purchase
              </button> */}
              </SignedIn>
            </div>
          </>
        </div>
      </form>

      {/* How to Purchase Modal */}
      {showHowToPurchaseModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>How to Purchase</h2>
              <button
                className="close-button"
                onClick={() => setShowHowToPurchaseModal(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <img
                src={HowToPurchaseImage}
                alt="How to Purchase"
                className="how-to-purchase-image"
              />
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Sign In</h2>
              <button
                className="close-button"
                onClick={() => setShowLoginModal(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <button
                className="google-signin-button"
                onClick={handleGoogleSignIn}
              >
                <img
                  src="/path-to-google-icon.png"
                  alt="Google"
                  className="google-icon"
                />
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Badge = ({ text }) => <span className="badge">{text}</span>;

const Tab = ({ text, selected, onClick }) => (
  <button
    className={`tab ${selected ? "tab-selected" : ""}`}
    onClick={onClick}
    type="button"
    
  >
    {text}
  </button>
);

const ProductCard = ({
  amount,
  price,
  original,
  logoUrl,
  selected,
  onClick,
}) => (
  <div
    className={`product-card ${selected ? "selected-product" : ""}`}
    onClick={onClick}
  >
    <img
      src="https://thumbs.dreamstime.com/b/pile-blue-gems-diamonds-different-shapes-luxury-treasure-sparkles-vector-illustration-317923968.jpg"
      alt="Diamond Icon"
      className="diamond-icon"
    />
    <div className="product-amount">{amount}</div>
    <div className="product-price">₹{price}</div>
    <div className="product-original">₹{original}</div>
  </div>
);

export default Product;
