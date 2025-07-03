import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Product from "./pages/Product";
import { PaymentProvider } from "./context/PaymentContext";
import { UserProvider } from "./context/UserContext";
import Status from "./pages/Status";
import OrderHistory from "./pages/OrderHistory";
import About from "./pages/About";
import TermsAndCondition from "./pages/TermsAndCondition";
import TermsPage from "./pages/TermsPage";
import ContactForm from "./pages/ContactUs";
import PaypalSuccess from "./pages/PaypalSuccess";
import AppWrapper from "./hooks/AppWrapper";

function App() {
  return (
    <>
      <UserProvider>
        <PaymentProvider>
          {" "}
          {/* ✅ Wrap everything inside the provider */}
          <AppWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:gameName" element={<Product />} />
            <Route path="/status/:activeuserid" element={<Status />} />
            <Route path="/api/paypal/capture" element={<PaypalSuccess />} />

            <Route path="/order/:activeuserid" element={<OrderHistory />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms-and-condition" element={<TermsPage />} />
            <Route path="/contact" element={<ContactForm />} />
          </Routes>
          </AppWrapper>
        </PaymentProvider>
      </UserProvider>
    </>
  );
}

export default App;
