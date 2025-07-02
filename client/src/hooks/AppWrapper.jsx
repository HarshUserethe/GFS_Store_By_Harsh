// src/components/AppWrapper.jsx
import React, { useEffect, useState } from "react";
import '../App.css'
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  LinearProgress, 
  Container,
  Grid,
  Paper,
  Chip,
  Fade,
  Zoom
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { LuSmartphone, LuTablet, LuMonitor, LuZap, LuSettings, LuWrench } from 'react-icons/lu';
import axios from 'axios';
// Animated background keyframes
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
`;

// Styled components
const BackgroundContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  position: 'relative',
  overflow: 'hidden',
}));

const FloatingOrb = styled(Box)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  filter: 'blur(60px)',
  animation: `${pulse} 4s ease-in-out infinite`,
  '&.orb-1': {
    top: '20%',
    left: '20%',
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%)',
    animationDelay: '0s',
  },
  '&.orb-2': {
    bottom: '20%',
    right: '20%',
    width: '250px',
    height: '250px',
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
    animationDelay: '2s',
  },
  '&.orb-3': {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '200px',
    height: '200px',
    background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)',
    animationDelay: '1s',
  },
}));

const GlassCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '24px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  maxWidth: '600px',
  width: '100%',
  position: 'relative',
  zIndex: 10,
}));

const IconContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(45deg, #9333ea, #ec4899)',
    borderRadius: '16px',
    filter: 'blur(12px)',
    opacity: 0.7,
    animation: `${pulse} 2s ease-in-out infinite`,
  },
}));

const IconBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  background: 'linear-gradient(45deg, #9333ea, #ec4899)',
  padding: theme.spacing(3),
  borderRadius: '16px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const DeviceCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '16px',
  padding: theme.spacing(2),
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.2)',
    transform: 'scale(1.05)',
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #9333ea, #ec4899)',
  borderRadius: '12px',
  padding: '12px 32px',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 600,
  color: 'white',
  boxShadow: '0 4px 15px rgba(147, 51, 234, 0.4)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #7c3aed, #db2777)',
    transform: 'scale(1.05)',
    boxShadow: '0 6px 20px rgba(147, 51, 234, 0.6)',
  },
}));

const FloatingParticle = styled(Box)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  animation: `${float} 6s ease-in-out infinite`,
  '&.particle-1': {
    top: '20px',
    right: '20px',
    width: '8px',
    height: '8px',
    background: '#9333ea',
    animationDelay: '0s',
  },
  '&.particle-2': {
    bottom: '60px',
    left: '30px',
    width: '4px',
    height: '4px',
    background: '#ec4899',
    animationDelay: '2s',
  },
  '&.particle-3': {
    top: '50%',
    right: '40px',
    width: '6px',
    height: '6px',
    background: '#3b82f6',
    animationDelay: '1s',
  },
}));

const apiurl = import.meta.env.VITE_API_KEY;
// ✅ Configurable flags — turn these off later easily
// const IS_UNDER_MAINTENANCE = false;
// const RESTRICT_DESKTOP = true; // set to false when desktop is ready

const isMobileOrTablet = () => {
  const width = window.innerWidth;
  return width <= 1024;
};

const AppWrapper = ({ children }) => {
  const [isAllowed, setIsAllowed] = useState(true);
  const [IS_UNDER_MAINTENANCE, setMaintainance] = useState(false);
  const [RESTRICT_DESKTOP, setDesktop] = useState(true);

useEffect(() => {
  const fetchProjectionData = async () => {
    try {
      const response = await axios.get(`${apiurl}api/app_projection`);
      const data = response.data;
      setMaintainance(data.isMaintaince);
      setDesktop(data.isCompatible);
    } catch (error) {
      console.log("Error fetching projection:", error);
    }
  };

  fetchProjectionData();
}, []);

console.log(IS_UNDER_MAINTENANCE);
console.log(RESTRICT_DESKTOP)

  useEffect(() => {
    if (IS_UNDER_MAINTENANCE) {
      setIsAllowed(false);
      return;
    }

    if (RESTRICT_DESKTOP && !isMobileOrTablet()) {
      setIsAllowed(false);
      return;
    }

    setIsAllowed(true);

    const handleResize = () => {
      if (RESTRICT_DESKTOP && !isMobileOrTablet()) {
        setIsAllowed(false);
      } else {
        setIsAllowed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (IS_UNDER_MAINTENANCE) {
    return (
      <div style={styles.container}>
        <h2>🚧 Our site is currently under maintenance. Please check back later.</h2>
      </div>
    );
  }

  if (RESTRICT_DESKTOP && !isMobileOrTablet()) {
    return (
      <BackgroundContainer>
      {/* Animated background orbs */}
      <FloatingOrb className="orb-1" />
      <FloatingOrb className="orb-2" />
      <FloatingOrb className="orb-3" />

      <Container maxWidth="md">
        <Fade in timeout={1000}>
         
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              {/* Floating particles */}
              <FloatingParticle className="particle-1" />
              <FloatingParticle className="particle-2" />
              <FloatingParticle className="particle-3" />

              {/* Main icon */}
              <Box display="flex" justifyContent="center" mb={3}>
                <Zoom in timeout={1200}>
                  <IconContainer>
                    <IconBox>
                      <LuMonitor size={48} color="white" />
                    </IconBox>
                  </IconContainer>
                </Zoom>
              </Box>

              {/* Main heading */}
              <Box textAlign="center" mb={3}>
                <Typography 
                  variant="h3" 
                  component="h1" 
                  sx={{ 
                    color: 'white', 
                    fontWeight: '500',
                    fontSize: { xs: '2rem', md: '3rem' },
                    mb: 1,
                    fontFamily:"poppins"
                  }}
                >
                  Desktop Experience
                </Typography>
                <Typography 
                  variant="h4" 
                  component="span"
                  sx={{ 
                    background: 'linear-gradient(45deg, #9333ea, #ec4899)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: '500',
                    fontSize: { xs: '1.5rem', md: '2rem' },
                     fontFamily:"poppins"
                  }}
                >
                  Coming Soon
                </Typography>
              </Box>

              {/* Description */}
              <Typography 
                variant="h6" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textAlign: 'center', 
                  mb: 3,
                  lineHeight: 1.6,
                  fontSize: { xs: '1rem', md: '1.25rem' },
                   fontFamily:"poppins"
                }}
              >
                We're crafting an amazing desktop experience just for you. 
                In the meantime, enjoy our fully optimized mobile and tablet interface.
              </Typography>

              {/* Device recommendations */}
              <Grid container spacing={3} justifyContent="center" sx={{ mb: 3 }}>
                <Grid item xs={6} sm={4}>
                  <DeviceCard elevation={0}>
                    <LuSmartphone size={32} color="#9333ea" style={{ marginBottom: '8px' }} />
                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 400, fontFamily:"poppins"}}>
                      Mobile
                    </Typography>
                  </DeviceCard>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <DeviceCard elevation={0}>
                    <LuTablet size={32} color="#ec4899" style={{ marginBottom: '8px' }} />
                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 400, fontFamily:"poppins"}}>
                      Tablet
                    </Typography>
                  </DeviceCard>
                </Grid>
              </Grid>

              {/* Progress section */}
              <Paper 
                sx={{ 
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                  p: 3,
                  mb: 4
                }}
                elevation={0}
              >
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <LuZap size={20} color="#fbbf24" />
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 500, fontFamily:"poppins" }}>
                    Development Progress
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={65} 
                  sx={{ 
                    height: 12, 
                    borderRadius: 6,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(45deg, #9333ea, #ec4899)',
                      borderRadius: 6,
                    }
                  }} 
                />
                <Typography 
                  variant="body2" 
                  sx={{ color: 'rgba(255, 255, 255, 0.7)', mt: 1, fontFamily:"poppins" }}
                >
                  We're 65% there! Stay tuned for updates.
                </Typography>
              </Paper>


            </CardContent>
          
        </Fade>
      </Container>
    </BackgroundContainer>
    );
  }

  return <>{children}</>;
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
    textAlign: "center",
    backgroundColor: "#f5f5f5",
  },
};

export default AppWrapper;
