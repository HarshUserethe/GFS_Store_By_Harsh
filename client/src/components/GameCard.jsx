import React from "react";
import { useNavigate } from "react-router-dom";

function GameCard({ item }) {
  const navigate = useNavigate();

  const handleReidrection = async (params) => {
    try {
      navigate(`/product/${params}`);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div
      style={{
        position: "relative",
        width: "110px", // Reduced width
        height: "180px", // Reduced height
        backgroundColor: "#1a1a2e",
        borderRadius: "8px", // Slightly smaller border radius
        overflow: "hidden",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Game Image */}
      <div
        style={{
          position: "relative",
          height: "100px", // Reduced height
          width: "100%",
          overflow: "hidden",
        }}
      >
        <img
          src={item.logoUrl}
          alt={item.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        {/* Overlay gradient */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(to top, #1a1a2e, transparent)",
            opacity: 0.7,
          }}
        ></div>
      </div>

      {/* Game Logo */}
      <div
        style={{
          position: "absolute",
          top: "45px", // Adjusted position
          left: "50%",
          transform: "translateX(-50%)",
          width: "40px", // Smaller logo
          height: "40px", // Smaller logo
          borderRadius: "8px", // Smaller border radius
          overflow: "hidden",
          border: "2px solid white",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        <img
          src={item.logoUrl}
          alt="Game Logo"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Game Title */}
      <div
        style={{
          marginTop: "30px", // Adjusted margin
          padding: "0 8px", // Smaller padding
          textAlign: "center",
        }}
      >
        <h3
          style={{
            fontSize: "12px", // Smaller font
            fontWeight: "bold",
            color: "white",
            margin: "0",
            position: "relative",
            top: "-5px",
          }}
        >
          {item.title}
        </h3>
      </div>

      {/* Top Up Button */}
      <div
        style={{
          marginTop: "6px", // Smaller margin
          padding: "0 8px", // Smaller padding
          marginBottom: "8px", // Smaller margin
        }}
      >
        <button
          onClick={() => handleReidrection(item.name)}
          style={{
            width: "100%",
            padding: "6px 0", // Smaller padding
            backgroundColor: "#ffc107",
            color: "#1a1a2e",
            fontSize: "10px", // Smaller font
            fontWeight: "bold",
            borderRadius: "4px", // Smaller border radius
            border: "none",
            cursor: "pointer",
            position: "relative",
            top: "-2px",
          }}
        >
          TOP UP
        </button>
      </div>
    </div>
  );
}

export default GameCard;
// You can also export the row component: export { CardRow };
