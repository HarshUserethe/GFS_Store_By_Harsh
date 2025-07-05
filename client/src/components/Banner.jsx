// File: src/components/Banner.jsx
import React from 'react';
import { Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import BannerOne from '../assets/banner1.jpg'

const banners = [
  BannerOne,
];

const Banner = () => {
  return (
    <Box p={2}>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        spaceBetween={10}
        slidesPerView={1}
        style={{ borderRadius: 8, overflow: 'hidden' }}
      >
        {banners.map((url, index) => (
          <SwiperSlide key={index}>
            <img src={url} alt={`Banner ${index + 1}`} style={{ width: '100%', height: '100%', objectFit:"cover" }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Banner;
