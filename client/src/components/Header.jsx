// File: src/components/Header.jsx
import React, { use, useEffect, useState } from "react";
import {
  LuMenu,
  LuLogIn,
  LuHouse,
  LuShoppingCart,
  LuBadgeInfo,
  LuMessageSquare,
  LuLogOut,
  LuUser,
  LuChartArea,
  LuLightbulb,
  LuCode,
  LuTrophy,
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
  ListItemIcon,
  Switch,
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
import { useLocation } from "react-router-dom";

const Header = ({ pcolor }) => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const device = useDeviceType();

  const location = useLocation();
  const currentPath = location.pathname;

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
        sx={{ backgroundColor: pcolor ? pcolor : "#4a89dc" }}
      >
        <Box
          sx={{
            border: pcolor ? "1px solid #5897e8" : "1px solid #fff",
            borderRadius: "5px",
            boxShadow: pcolor
              ? ".5px .5px 8px rgba(88, 150, 232, 0.27)"
              : ".5px .5px 8px rgba(0, 0, 0, 0.06)",
            zIndex: 5,
          }}
        >
          {device === "mobile" ? (
            <IconButton onClick={toggleDrawer(true)}>
              <LuMenu size={22} color={pcolor ? "#5897e8" : "#fff"} />
            </IconButton>
          ) : (
            ""
          )}
        </Box>

        <SignedOut>
          <SignInButton mode="modal">
            <button
              className="signin-button"
              style={{ position: "absolute", right: "5%" }}
            >
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "1px solid rgb(255, 255, 255)", // Light blue border
                    // boxShadow: "0 0 10px rgb(255, 255, 255)", // Blue glow
                  },
                },
              }}
            />
          </SignedIn>
        </>

        {/* Drawer component */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: {
              background:
                "linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)",
              borderTopRightRadius: "24px",
              borderBottomRightRadius: "24px",
              width: "320px",
              color: "white",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)", // for Safari support
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          <Box
            width={320}
            role="presentation"
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            {/* Header Section */}
            <Box sx={{ p: 3, pt: 4 }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "rgba(255, 255, 255, 0.8)",
                      fontSize: "14px",
                      fontWeight: 400,
                      mb: 0.5,
                    }}
                  >
                    Welcome Back
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "white",
                      fontSize: "24px",
                      fontWeight: 700,
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {user?.fullName}
                  </Typography>
                </Box>
                <IconButton
                  onClick={toggleDrawer(false)}
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    width: 48,
                    height: 48,
                    backdropFilter: "blur(10px)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                    },
                  }}
                >
                  <LuLogOut />
                </IconButton>
              </Box>
            </Box>

            {/* Main Navigation */}
            <Box sx={{ px: 3, flex: 1 }}>
              <List sx={{ p: 0 }}>
                {drawerItems.map((item, index) => {
                  const isActive =
                    item.url === "/"
                      ? location.pathname === "/"
                      : location.pathname.startsWith(item.url);

                  return (
                    <ListItem
                      key={index}
                      onClick={() => navigate(item.url)}
                      sx={{
                        mb: 1,
                        borderRadius: "16px",
                        backgroundColor: isActive
                          ? "rgba(255, 255, 255, 0.2)"
                          : "transparent",
                        backdropFilter: isActive ? "blur(10px)" : "none",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.15)",
                          transform: "translateX(4px)",
                        },
                        py: 1.5,
                        px: 2,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 48,
                          color: "white",
                          "& .MuiSvgIcon-root": {
                            fontSize: 24,
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "12px",
                            backgroundColor: isActive
                              ? "rgba(255, 255, 255, 0.3)"
                              : "rgba(255, 255, 255, 0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backdropFilter: "blur(10px)",
                          }}
                        >
                          {item.icon}
                        </Box>
                      </ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        sx={{
                          "& .MuiTypography-root": {
                            fontSize: "16px",
                            fontWeight: 500,
                            color: "white",
                          },
                        }}
                      />
                      {isActive && (
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            backgroundColor: "#4CAF50",
                            boxShadow: "0 0 8px rgba(76, 175, 80, 0.6)",
                          }}
                        />
                      )}
                    </ListItem>
                  );
                })}
              </List>

              {/* Additional Features */}
              <Box sx={{ mt: 4 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255, 255, 255, 0.6)",
                    fontSize: "12px",
                    fontWeight: 500,
                    mb: 2,
                    px: 2,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Features
                </Typography>

                {/* Bottom Action Buttons */}
                <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                  <Box
                    onClick={() => navigate("/reseller")}
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      p: 2,
                      borderRadius: "16px",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "12px",
                        backgroundColor: "#ff6b6b",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 1,
                      }}
                    >
                      <LuCode style={{ color: "white", fontSize: 20 }} />
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "rgba(255, 255, 255, 0.8)",
                        fontSize: "10px",
                        fontWeight: 500,
                        textAlign: "center",
                      }}
                    >
                      GFS Coins
                    </Typography>
                  </Box>

                  <Box
                    onClick={() => navigate("/reports")}
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      p: 2,
                      borderRadius: "16px",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "12px",
                        backgroundColor: "#4ecdc4",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 1,
                      }}
                    >
                      <LuChartArea style={{ color: "white", fontSize: 20 }} />
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "rgba(255, 255, 255, 0.8)",
                        fontSize: "10px",
                        fontWeight: 500,
                        textAlign: "center",
                      }}
                    >
                      Reports
                    </Typography>
                  </Box>

                  <Box
                    onClick={() => navigate("/leaderboard")}
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      p: 2,
                      borderRadius: "16px",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "12px",
                        backgroundColor: "#45b7d1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 1,
                      }}
                    >
                      <LuTrophy style={{ color: "white", fontSize: 20 }} />
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "rgba(255, 255, 255, 0.8)",
                        fontSize: "10px",
                        fontWeight: 500,
                        textAlign: "center",
                      }}
                    >
                      Leaderboard
                    </Typography>
                  </Box>
                </Box>

                {/* Dark Mode Toggle */}
              </Box>
            </Box>

            {/* Footer Section */}
            <Box sx={{ px: 3, pb: 3, display: "none" }}>
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: "12px",
                  fontWeight: 500,
                  mb: 2,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Useful Links
              </Typography>

              <ListItem
                onClick={() => navigate("/account")}
                sx={{
                  borderRadius: "16px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  mb: 1,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    transform: "translateX(4px)",
                  },
                  py: 1.5,
                  px: 2,
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: "white" }}>
                  <LuUser style={{ fontSize: 20 }} />
                </ListItemIcon>
                <ListItemText
                  primary="Account"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "white",
                    },
                  }}
                />
              </ListItem>

              <ListItem
                onClick={() => navigate("/login")}
                sx={{
                  borderRadius: "16px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    transform: "translateX(4px)",
                  },
                  py: 1.5,
                  px: 2,
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: "white" }}>
                  <LuLogIn style={{ fontSize: 20 }} />
                </ListItemIcon>
                <ListItemText
                  primary="Log In"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "white",
                    },
                  }}
                />
              </ListItem>
            </Box>
          </Box>
        </Drawer>
      </Box>
    </>
  );
};

export default Header;
