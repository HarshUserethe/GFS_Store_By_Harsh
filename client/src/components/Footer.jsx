import React from 'react';
import { Box, Typography, Grid, Link, Stack } from '@mui/material';
import { Facebook, Instagram, Twitter, YouTube } from '@mui/icons-material';
import BrandLogoFooter from '../assets/GFSLOGO.png';
import '../App.css';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#000', color: '#fff', p: 4 }}>
      <Grid container spacing={4}>
        {/* Logo and Socials */}
        <Grid item xs={12} md={4}>
          <Stack direction="row" alignItems="center" spacing={1}>

            <Box sx={{width:400}}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>GOSU FAMILY</Typography>
              <Typography variant="caption" sx={{ letterSpacing: 2 }}>STORE OFFICIAL</Typography>
            </Box>
          </Stack>

          <Typography sx={{ mt: 2, mb: 1 }}>Follow us on:-</Typography>
          <Stack direction="row" spacing={2}>
            <Facebook />
            <Instagram />
            <Twitter />
            <YouTube />
          </Stack>
        </Grid>

        {/* Links Section */}
        <Grid item xs={6} md={2}>
          <Stack spacing={1}>
            <Link href="/contact" underline="hover" color="inherit"  variant="caption">Support</Link>
            <Link href="/contact" underline="hover" color="inherit"  variant="caption">Contact us</Link>
            <Link href="/about" underline="hover" color="inherit"  variant="caption">About us</Link>
          </Stack>
        </Grid>
        <Grid item xs={6} md={2}>
          <Stack spacing={1}>
            <Link href="/terms-and-condition" underline="hover" color="inherit"  variant="caption">Terms of service</Link>
            <Link href="/terms-and-condition" underline="hover" color="inherit"  variant="caption">Privacy Policy</Link>
            <Link href="/terms-and-condition" underline="hover" color="inherit"  variant="caption">Refund And Cancellation</Link>
          </Stack>
        </Grid>

        {/* Payments */}
    <Grid item xs={12} md={4}>
  <Typography sx={{ mb: 1 }}>Payment method supported</Typography>
  <Box
    display="grid"
    gridTemplateColumns="repeat(3, 1fr)"
    gap={2}
    justifyItems="center"
  >
    {[
      {
        src: "https://res.cloudinary.com/da6pzcqcw/image/upload/v1747495717/Binance-Logo_nl4y2f.jpg",
        alt: "Binance",
      },
      {
        src: "https://res.cloudinary.com/da6pzcqcw/image/upload/v1747495718/PhonePe-Logo_if1qkf.png",
        alt: "PhonePe",
      },
      {
        src: "https://res.cloudinary.com/da6pzcqcw/image/upload/v1747496756/Paytm-Logo_u9t1pv.png",
        alt: "Paytm",
      },
      {
        src: "https://res.cloudinary.com/da6pzcqcw/image/upload/v1747496525/UPI-Logo_sc7vl6.png",
        alt: "UPI",
      },
      {
        src: "https://res.cloudinary.com/da6pzcqcw/image/upload/v1747495717/Google-Pay-logo_dwp6po.png",
        alt: "GooglePay",
      },
      {
        src: "https://res.cloudinary.com/da6pzcqcw/image/upload/v1747496756/Paypal-Logo-2022_oseanq.png",
        alt: "PayPal",
      },
    ].map((logo, index) => (
      <Box
        key={index}
        component="img"
        src={logo.src}
        alt={logo.alt}
        sx={{
          width: { xs: 80, sm: 100 },
          height: { xs: 32, sm: 40 },
          objectFit: "cover",
          backgroundColor: "#fff",
          padding: 1,
          borderRadius: 1,
        }}
      />
    ))}
  </Box>
</Grid>

      </Grid>
    </Box>
  );
};

export default Footer;
