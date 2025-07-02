import React from "react";
import {
  Box,
  List,
  ListItemText,
  Avatar,
  Typography,
  Divider,
} from "@mui/material";
import {
  LuMenu,
  LuLogIn,
  LuHouse,
  LuShoppingCart,
  LuBadgeInfo,
  LuMessageSquare,
  LuUser,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

const DrawerBar = () => {
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();

  const drawerItems = [
    { name: "Home", url: "/", icon: <LuHouse size={20} /> },
    ...(isSignedIn
      ? [
          {
            name: "Order",
            url: `/order/${user?.id}`,
            icon: <LuShoppingCart size={20} />,
          },
        ]
      : []),
    { name: "About", url: "/about", icon: <LuBadgeInfo size={20} /> },
    { name: "Contact", url: "/contact", icon: <LuMessageSquare size={20} /> },
  ];

  return (
    <Box
      sx={{
        width: "250px",
        height: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1300,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderTopRightRadius: "10px",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          padding: "32px 24px",

          backdropFilter: "blur(10px)",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "white",
            fontWeight: 400,
            textAlign: "left",
          }}
        ></Typography>
      </Box>

      {/* Navigation Items */}
      <Box
        sx={{
          flex: 1,
          padding: "24px 16px",
          overflow: "auto",
        }}
      >
        {drawerItems.map((item, index) => (
          <Box
            key={index}
            onClick={() => navigate(item.url)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "16px 20px",
              marginBottom: "8px",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              color: "rgba(255, 255, 255, 0.8)",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                color: "white",
                transform: "translateX(8px)",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                "&::before": {
                  width: "100%",
                },
              },
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "0%",
                background:
                  "linear-gradient(90deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
                transition: "width 0.3s ease",
                zIndex: -1,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                transition: "all 0.3s ease",
              }}
            >
              {item.icon}
            </Box>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                fontSize: "0.95rem",
                letterSpacing: "0.25px",
              }}
            >
              {item.name}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          padding: "24px",
        }}
      >
         <Box sx={{marginBottom:"10px"}}>
                  <Typography align="center" sx={{ fontSize: ".8rem", color: "#dfdfdf", cursor:"pointer" }}>
                    Terms & Condition
                  </Typography>{" "}
                  <Typography
                    align="center"
                    sx={{ fontSize: ".7rem", color: "#dfdfdf" }}
                  >
                    GFS 2025
                  </Typography>{" "}
                </Box>
      </Box>
    </Box>
  );
};

export default DrawerBar;
