import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Typography, Box } from "@mui/material";
import "../App.css";
import GameCard from "./GameCard";
const apiurl = import.meta.env.VITE_API_KEY;
import games from "../ProductList/smileone.json";
import { ProgressBar } from "react-loader-spinner";

const GameGrid = () => {

  const [smileProducts, setSmileProducts] = useState([]);
  const [selectedGameNames, setSelectedGameNames] = useState([]);
  const [loading, setLoadiing] = useState(false)

  useEffect(() => {
    const handleSmileOneProducts = async () => {

      try {
        setLoadiing(true);
        const response = await axios.post(`${apiurl}get-products`);
        if (!response) {
          console.log("There is an error getting response");
        }

        setSmileProducts(response.data);
        setSelectedGameNames(response.data.slice(0, 1)); //Increase games from here
      } catch (error) {
        console.log(error.message);
      }finally{
        setLoadiing(false);
      }
    };

    handleSmileOneProducts();
  }, []);


  if(loading) return <div style={{width:"100vdw", height:"10vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
          <ProgressBar
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
  
  //Filteration OF Product Resources
  const selectedGames = games.filter((game) =>
    selectedGameNames.includes(game.name)
  );

  return (
    <Box
      sx={{
        width: "100dvw",
        padding: "18px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "start",
        gap: "20px",
        marginTop: "-10px",
      }}
    >
      {selectedGames.map((item, index) => (
        <GameCard key={index} item={item} />
      ))}
    </Box>
  );
};

export default GameGrid;
