import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  InputAdornment,
  MenuItem,
  Container,
  Divider,
  CircularProgress,
  Fade,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Email,
  Phone,
  LocationOn,
  Send,
  Person,
  Message,
  Schedule,
  Business,
} from "@mui/icons-material";
import "../App.css";
import Header from "../components/Header";
import Underlay from "../components/Underlay";

const styles = {
  top:"10vw"
}

const countryCodes = [
  { code: "+91", label: "India" },
  { code: "+1", label: "USA" },
  { code: "+44", label: "UK" },
  { code: "+33", label: "France" },
  { code: "+49", label: "Germany" },
  { code: "+81", label: "Japan" },
];

export default function ContactForm() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    countryCode: "+91",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      console.log("Form Submitted:", formData);
      setIsSubmitting(false);
      setSubmitted(true);

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          mobile: "",
          countryCode: "+91",
          message: "",
        });
        setSubmitted(false);
      }, 2000);
    }, 1500);
  };

  return (
    <>
      <Underlay styles={styles} />
      <Header />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "transparent",
          py: { xs: 3, md: 8 },
          px: 2,
          position:"absolute"
        }}
      >
        <Container maxWidth="xl" >
          {/* Header Section */}
          <Box
            textAlign="center"
            mb={{ xs: 6, md: 8 }}
            maxWidth="800px"
            mx="auto"
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 600,
                mb: 3,
                fontSize: { xs: "1.8rem", md: "3.75rem" },
                lineHeight: 1.1,
               color:"#fff"
              }}
            >
              Contact Us
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                fontSize: { xs: ".9rem", md: "1.25rem" },
                lineHeight: 1.6,
                fontWeight: 400,
                color:"#fff"
              }}
            >
              Get in touch with our team. We're here to help you with all your
              gaming needs and provide expert support for your queries.
            </Typography>
          </Box>

          {/* Main Content */}
          <Grid
            container
            spacing={{ xs: 4, md: 8 }}
            alignItems="flex-start"
            maxWidth="1400px"
            mx="auto"
          >
            {/* Left Side - Contact Information */}
            <Grid item xs={12} md={5} >
              <Box>
                {/* Logo Section */}
                <Box mb={5} >
                  <Typography
                    variant="h4"
                    fontWeight={600}
                    gutterBottom
                    sx={{
                     color:"#fff",
                      fontSize:"1.8rem",
                      textAlign:"center",
                      
                    }}
                  >
                    Get In Touch
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#fff",
                      lineHeight: 1.7,
                      fontSize: ".9rem",
                      
                      padding:"10px",
                      borderRadius:"10px",
                    
                    }}
                    align="center"
                  >
                    Turn the game on with Gosu Family Store. Contact us for a
                    one-stop solution to all your game problems.
                  </Typography>
                </Box>

                {/* Contact Details */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <Box display="flex" alignItems="flex-start" gap={3}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: "#dbeafe",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Email sx={{ color: "#1e40af", fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        sx={{ color: "#1e293b", mb: 0.5, fontSize:"1.1rem" }}
                      >
                        Email Address
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "#1e40af", fontSize: ".9rem" }}
                      >
                        askgosufamilystore@gmail.com
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#64748b", mt: 0.5 }}
                      >
                        We'll respond within 24 hours
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex" alignItems="flex-start" gap={3}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: "#dbeafe",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Phone sx={{ color: "#1e40af", fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        sx={{ color: "#1e293b", mb: 0.5, fontSize:"1.1rem" }}
                      >
                        Phone Number
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "#1e40af", fontSize: ".9rem" }}
                      >
                        +91 9512792875
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#64748b", mt: 0.5 }}
                      >
                        Sunday OFF <br/> Saturday - 10 AM to 03 PM.
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex" alignItems="flex-start" gap={3}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: "#dbeafe",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <LocationOn sx={{ color: "#1e40af", fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        sx={{ color: "#1e293b", mb: 0.5, fontSize:"1.1rem" }}
                      >
                        Office Address
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "#64748b", fontSize: ".9rem" }}
                      >
                        123 Gaming Street
                        <br />
                        Tech City, TC 12345
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex" alignItems="flex-start" gap={3}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: "#dbeafe",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Business sx={{ color: "#1e40af", fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        sx={{ color: "#1e293b", mb: 0.5, fontSize:"1.1rem" }}
                      >
                        Business Hours
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "#64748b", fontSize: ".9rem" }}
                      >
                        Contact Via Email: Anytime
                        <br />
                        Phone: 10:00 AM to 03:00 PM
                        <br />
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* Right Side - Contact Form */}
            {/* <Grid item xs={12} md={7}>
            <Box sx={{ bgcolor: 'white', p: { xs: 4, md: 6 }, borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <Typography variant="h4" fontWeight={600} gutterBottom sx={{ color: '#1e293b', mb: 2 }}>
                Send us a Message
              </Typography>
              <Typography variant="body1" sx={{ color: '#64748b', mb: 4, fontSize: '1..9rem' }}>
                Fill out the form below and we'll get back to you as soon as possible.
              </Typography>

              <Divider sx={{ mb: 4, borderColor: '#e2e8f0' }} />

              {submitted ? (
                <Fade in={submitted}>
                  <Box
                    textAlign="center"
                    py={6}
                    sx={{
                      bgcolor: '#f0fdf4',
                      borderRadius: '12px',
                      border: '1px solid #bbf7d0',
                    }}
                  >
                    <Typography variant="h5" sx={{ color: '#16a34a', fontWeight: 600, mb: 2 }}>
                      Message Sent Successfully!
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#65a30d' }}>
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </Typography>
                  </Box>
                </Fade>
              ) : (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ color: '#374151', mb: 1, fontWeight: 500 }}>
                      Full Name *
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Enter your full name"
                      variant="outlined"
                      value={formData.name}
                      onChange={handleChange('name')}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person sx={{ color: '#6b7280' }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          bgcolor: '#f9fafb',
                          '& fieldset': {
                            borderColor: '#d1d5db',
                          },
                          '&:hover fieldset': {
                            borderColor: '#1e40af',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#1e40af',
                            borderWidth: 2,
                          },
                        },
                      }}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ color: '#374151', mb: 1, fontWeight: 500 }}>
                      Email Address *
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Enter your email address"
                      type="email"
                      variant="outlined"
                      value={formData.email}
                      onChange={handleChange('email')}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email sx={{ color: '#6b7280' }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          bgcolor: '#f9fafb',
                          '& fieldset': {
                            borderColor: '#d1d5db',
                          },
                          '&:hover fieldset': {
                            borderColor: '#1e40af',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#1e40af',
                            borderWidth: 2,
                          },
                        },
                      }}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ color: '#374151', mb: 1, fontWeight: 500 }}>
                      Mobile Number *
                    </Typography>
                    <Box display="flex" gap={1}>
                      <TextField
                        select
                        value={formData.countryCode}
                        onChange={handleChange('countryCode')}
                        sx={{
                          width: 120,
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            bgcolor: '#f9fafb',
                            '& fieldset': {
                              borderColor: '#d1d5db',
                            },
                            '&:hover fieldset': {
                              borderColor: '#1e40af',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#1e40af',
                              borderWidth: 2,
                            },
                          },
                        }}
                      >
                        {countryCodes.map((option, index) => (
                          <MenuItem key={index} value={option.code}>
                            {option.code}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        fullWidth
                        placeholder="Enter your mobile number"
                        variant="outlined"
                        value={formData.mobile}
                        onChange={handleChange('mobile')}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Phone sx={{ color: '#6b7280' }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            bgcolor: '#f9fafb',
                            '& fieldset': {
                              borderColor: '#d1d5db',
                            },
                            '&:hover fieldset': {
                              borderColor: '#1e40af',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#1e40af',
                              borderWidth: 2,
                            },
                          },
                        }}
                        required
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ color: '#374151', mb: 1, fontWeight: 500 }}>
                      Message *
                    </Typography>
                    <TextField
                     
                      fullWidth
                      multiline
                      rows={4}
                      placeholder="Tell us how we can help you..."
                      variant="outlined"
                      value={formData.message}
                      onChange={handleChange('message')}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                            <Message sx={{ color: '#6b7280' }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          bgcolor: '#f9fafb',
                          '& fieldset': {
                            borderColor: '#d1d5db',
                          },
                          '&:hover fieldset': {
                            borderColor: '#1e40af',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#1e40af',
                            borderWidth: 2,
                          },
                        },
                        width:"70vw"
                      }}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      startIcon={
                        isSubmitting ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <Send />
                        )
                      }
                      sx={{
                        py: 2,
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: '1..9rem',
                        textTransform: 'none',
                        bgcolor: '#1e40af',
                        '&:hover': {
                          bgcolor: '#1e3a8a',
                          transform: 'translateY(-1px)',
                        },
                        '&:disabled': {
                          bgcolor: '#9ca3af',
                        },
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          boxShadow: 'none',
                          bgcolor: '#1e3a8a',
                        },
                      }}
                    >
                      {isSubmitting ? 'Sending Message...' : 'Send Message'}
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Box>
          </Grid> */}
          </Grid>

          {/* Bottom Section */}
          <Box
            mt={{ xs: 6, md: 10 }}
            textAlign="center"
            maxWidth="800px"
            mx="auto"
          >
            <Box
              sx={{
                bgcolor: "white",
                p: 4,
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
              }}
            >
              <Typography
                variant="h5"
                fontWeight={600}
                gutterBottom
                sx={{ color: "#1e293b", fontSize:"1.2rem"  }}
              >
                Need Immediate Assistance?
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#64748b", mb: 3, fontSize: "1..9rem" }}
              >
                For urgent matters, don't hesitate to reach out to us directly
                via phone or email.
              </Typography>
              <Box
                display="flex"
                justifyContent="center"
                gap={3}
                flexWrap="wrap"
              >
                <Typography
                  variant="body1"
                  sx={{ color: "#1e40af", fontWeight: 600 }}
                >
                  📞 +91 9512792875

                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#1e40af", fontWeight: 600 }}
                >
                  ✉️ askgosufamilystore@gmail.com
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
