// File: src/components/Header.jsx
import React, { use, useEffect, useState } from "react";
import {
  LuMenu,
  LuLogIn,
  LuHouse,
  LuShoppingCart,
  LuBadgeInfo,
  LuMessageSquare,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import "../App.css";
import BrandLogo from "../assets/GFSLOGO.png";
import { useUserId } from "../context/UserContext";
import useDeviceType from "../hooks/useDeviceType";

const Header = ({pcolor}) => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const device = useDeviceType();

 

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

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

  const { setCurrentUser, currentUser } = useUserId();

  useEffect(() => {
    setCurrentUser(user?.id);
  }, [isSignedIn]);

  return (
<>
      <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      sx={{backgroundColor: pcolor ? pcolor : "#4a89dc"}}
    >
      <Box
        sx={{
          border: pcolor ? "1px solid #5897e8" : "1px solid #fff",
          borderRadius: "5px",
          boxShadow: pcolor ? ".5px .5px 8px rgba(88, 150, 232, 0.27)" : ".5px .5px 8px rgba(0, 0, 0, 0.06)",
          zIndex:5
        }}
      >
        {device === "mobile" ? (
          <IconButton onClick={toggleDrawer(true)}>
            <LuMenu size={22} color={pcolor ? "#5897e8" : "#fff"} />
          </IconButton>
        ) : ""}
      </Box>



      <SignedOut>
        <SignInButton mode="modal">
          <button className="signin-button" style={{position:"absolute", right:"5%"}}>Sign In</button>
        </SignInButton>
      </SignedOut>
      <>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </>

      {/* Drawer component */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#fff", // or any other styles
            borderTopRightRadius: "20px",
            borderBottomRightRadius: "20px",
            width: "250px",
          },
        }}
      >
        <Box
          width={250}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <div style={{ paddingTop: "20px", paddingLeft: "20px" }}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ width: "30vw", height: "10vw" }}
            >
              <img
                src={BrandLogo}
                alt="Gosu Family Store"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </Box>
          </div>
          <List sx={{ paddingLeft: "35px", paddingTop: "30px" }}>
            {drawerItems.map((text, index) => (
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  justifyContent: "start",
                  marginBottom: "10px",
                }}
                onClick={() => navigate(text.url)}
                button
                key={index}
              >
                <List sx={{ position: "relative", top: "2px" }}>
                  {text.icon}
                </List>
                <ListItemText
                  sx={{ textTransform: "capitalize", fontSize: "1rem" }}
                  primary={text.name}
                />
              </Box>
            ))}
          </List>
        </Box>
        <Box sx={{ position: "relative", top: "105vw" }}>
          <Typography onClick={() => navigate("/terms-and-condition")} align="center" sx={{ fontSize: ".9rem", color: "gray" }}>
            Terms & Condition
          </Typography>{" "}
          <Typography
            align="center"
            sx={{ fontSize: ".8rem", color: "#dfdfdf" }}
          >
            GFS 2025
          </Typography>{" "}
        </Box>
      </Drawer>

    </Box>
</>
  );
};

export default Header;
