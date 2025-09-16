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
  Business,
  WhatsApp,
  Mail,
} from "@mui/icons-material";
import "../App.css";
import Header from "../components/Header";
import Underlay from "../components/Underlay";

const styles = {
  top: "10vw",
};

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
          px: { xs: 2, md: 2 }, // Consistent padding
          position: "absolute",
          width: "100%", // Ensure full width
          overflowX: "hidden", // Prevent horizontal overflow
          boxSizing: "border-box", // Include padding in width calculation
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            px: { xs: 1, sm: 2, md: 3 }, // Responsive padding
            width: "100%",
            maxWidth: "100%",
          }}
        >
          {/* Header Section */}
          <Box
            textAlign="center"
            mb={{ xs: 4, md: 8 }}
            sx={{
              maxWidth: "100%", // Ensure it doesn't exceed container
              mx: "auto",
              px: { xs: 1, sm: 2 }, // Additional responsive padding
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 600,
                mb: 2,
                fontSize: { xs: "1.8rem", sm: "2.2rem", md: "3.75rem" },
                lineHeight: 1.1,
                color: "#fff",
                wordBreak: "break-word", // Prevent text overflow
              }}
            >
              Contact Us
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                fontSize: { xs: ".9rem", sm: "1rem", md: "1.25rem" },
                lineHeight: 1.6,
                fontWeight: 400,
                color: "#fff",
                px: { xs: 1, sm: 2 }, // Additional padding for mobile
              }}
            >
              Get in touch with our team. We're here to help you with all your
              gaming needs and provide expert support for your queries.
            </Typography>
          </Box>

          {/* Main Content */}
          <Grid
            container
            spacing={{ xs: 2, sm: 4, md: 8 }}
            alignItems="flex-start"
            sx={{
              maxWidth: "100%", // Prevent overflow
              mx: "auto",
            }}
          >
            {/* Left Side - Contact Information */}
            <Grid
              item
              xs={12}
              md={5}
              sx={{
                width: "100%", // Ensure full width
                maxWidth: "100%", // Prevent overflow
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  overflowX: "hidden", // Prevent horizontal overflow
                }}
              >
                {/* Logo Section */}
                <Box
                  mb={5}
                  sx={{
                    marginTop: { xs: "2vw", sm: "0", md: "-5vw" },
                    px: { xs: 1, sm: 0 }, // Mobile padding
                  }}
                >
                  <Typography
                    variant="h4"
                    fontWeight={600}
                    gutterBottom
                    sx={{
                      color: "#fff",
                      fontSize: { xs: "1.5rem", sm: "1.8rem" },
                      textAlign: "center",
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
                      padding: { xs: "8px", sm: "10px" },
                      borderRadius: "10px",
                      textAlign: "center",
                    }}
                  >
                    Contact us for a one-stop solution to all your game
                    problems.
                  </Typography>
                </Box>

                {/* Contact Details */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: { xs: 3, sm: 4 },
                    width: "100%",
                    maxWidth: "100%",
                  }}
                >
                  <Box
                    display="flex"
                    alignItems="flex-start"
                    gap={{ xs: 2, sm: 3 }}
                    sx={{
                      marginTop: { xs: "5vw", sm: "8vw", md: "10vw" },
                      width: "100%",
                      maxWidth: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: 40, sm: 48 },
                        height: { xs: 40, sm: 48 },
                        bgcolor: "#dbeafe",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <a
                        href="mailto:askgosufamilystore@gmail.com"
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        <Email
                          sx={{
                            color: "#1e40af",
                            fontSize: { xs: 20, sm: 24 },
                          }}
                        />
                      </a>
                    </Box>
                    <Box
                      sx={{
                        flex: 1,
                        minWidth: 0, // Allow text to wrap
                        maxWidth: "100%",
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        sx={{
                          color: "#1e293b",
                          mb: 0.5,
                          fontSize: { xs: "1rem", sm: "1.1rem" },
                          wordBreak: "break-word",
                        }}
                      >
                        Email Address
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#1e40af",
                          fontSize: ".9rem",
                          wordBreak: "break-all", // Allow email to break
                        }}
                      >
                        <a
                          href="mailto:askgosufamilystore@gmail.com"
                          style={{ color: "inherit", textDecoration: "none" }}
                        >
                          askgosufamilystore@gmail.com
                        </a>
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#64748b", mt: 0.5 }}
                      >
                        We'll respond within 24 hours
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    display="flex"
                    alignItems="flex-start"
                    gap={{ xs: 2, sm: 3 }}
                    sx={{
                      width: "100%",
                      maxWidth: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: 40, sm: 48 },
                        height: { xs: 40, sm: 48 },
                        bgcolor: "#dbeafe",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <a
                        href="https://wa.me/919512792875"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        <WhatsApp
                          sx={{
                            color: "#1e40af",
                            fontSize: { xs: 20, sm: 24 },
                          }}
                        />
                      </a>
                    </Box>
                    <Box
                      sx={{
                        flex: 1,
                        minWidth: 0,
                        maxWidth: "100%",
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        sx={{
                          color: "#1e293b",
                          mb: 0.5,
                          fontSize: { xs: "1rem", sm: "1.1rem" },
                        }}
                      >
                        Phone Number
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "#1e40af", fontSize: ".9rem" }}
                      >
                        <a
                          href="https://wa.me/919512792875"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "inherit", textDecoration: "none" }}
                        >
                          +91 9512792875
                        </a>
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#64748b", mt: 0.5 }}
                      >
                        Saturday - 10 AM to 03 PM <br /> Sunday OFF
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    display="flex"
                    alignItems="flex-start"
                    gap={{ xs: 2, sm: 3 }}
                    sx={{
                      width: "100%",
                      maxWidth: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: 40, sm: 48 },
                        height: { xs: 40, sm: 48 },
                        bgcolor: "#dbeafe",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <LocationOn
                        sx={{ color: "#1e40af", fontSize: { xs: 20, sm: 24 } }}
                      />
                    </Box>
                    <Box
                      sx={{
                        flex: 1,
                        minWidth: 0,
                        maxWidth: "100%",
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        sx={{
                          color: "#1e293b",
                          mb: 0.5,
                          fontSize: { xs: "1rem", sm: "1.1rem" },
                        }}
                      >
                        Office Address
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "#64748b", fontSize: ".9rem" }}
                      >
                        123 Gaming Street
                        <br />
                        Tech City, India
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    display="flex"
                    alignItems="flex-start"
                    gap={{ xs: 2, sm: 3 }}
                    sx={{
                      width: "100%",
                      maxWidth: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: 40, sm: 48 },
                        height: { xs: 40, sm: 48 },
                        bgcolor: "#dbeafe",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Business
                        sx={{ color: "#1e40af", fontSize: { xs: 20, sm: 24 } }}
                      />
                    </Box>
                    <Box
                      sx={{
                        flex: 1,
                        minWidth: 0,
                        maxWidth: "100%",
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        sx={{
                          color: "#1e293b",
                          mb: 0.5,
                          fontSize: { xs: "1rem", sm: "1.1rem" },
                        }}
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
          </Grid>

          {/* Bottom Section */}
          <Box
            mt={{ xs: 4, sm: 6, md: 10 }}
            textAlign="center"
            sx={{
              maxWidth: "100%",
              mx: "auto",
              px: { xs: 1, sm: 2 }, // Mobile padding
            }}
          >
            <Box
              sx={{
                bgcolor: "white",
                p: { xs: 3, sm: 4 },
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                width: "100%",
                maxWidth: "100%",
                boxSizing: "border-box",
              }}
            >
              <Typography
                variant="h5"
                fontWeight={600}
                gutterBottom
                sx={{
                  color: "#1e293b",
                  fontSize: { xs: "1.1rem", sm: "1.2rem" },
                }}
              >
                Need Immediate Assistance?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#64748b",
                  mb: 3,
                  fontSize: "1rem",
                  px: { xs: 1, sm: 0 }, // Mobile text padding
                }}
              >
                For urgent matters, don't hesitate to reach out to us directly
                via email.
              </Typography>
              <Box
                display="flex"
                justifyContent="center"
                gap={{ xs: 2, sm: 3 }}
                flexWrap="wrap"
                sx={{
                  alignItems: "center",
                  px: { xs: 1, sm: 0 },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "#1e40af",
                    fontWeight: 600,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                    fontSize: { xs: ".9rem", sm: "1rem" },
                    wordBreak: "break-all", // Allow email to break on mobile
                    textAlign: "center",
                  }}
                >
                  <Mail sx={{ flexShrink: 0 }} />
                  <a
                    href="mailto:askgosufamilystore@gmail.com"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    askgosufamilystore@gmail.com
                  </a>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
