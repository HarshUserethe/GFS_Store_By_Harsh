// Home.jsx

import React from "react";
import { Box } from "@mui/material";
import useDeviceType from "../hooks/useDeviceType";
import DrawerBar from "../components/desktop/DrawerBar";
import Header from "../components/Header";
import Banner from "../components/Banner";
import GameGrid from "../components/GameGrid";
import Footer from "../components/Footer";

const Home = () => {
  const device = useDeviceType();

  return (
    <>
      {device === "desktop" && <DrawerBar />}

      <Box
        sx={{
          // Push main content to the right if drawer is present
          paddingLeft: device === "desktop" ? "250px" : 0
        }}
      >
        {/* This content will scroll while drawer stays fixed */}
        <Header />
        <Banner />
        <GameGrid />
        <Footer />
      </Box>
    </>
  );
};

export default Home;
