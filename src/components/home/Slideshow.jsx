import React from 'react'
import { Box, Button, Grid, Stack } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Autoplay } from 'swiper/modules'
export const Slideshow = () => {
  return (
    <Swiper
      style={styles.slider}
      spaceBetween={50}
      modules={[Autoplay]}
      slidesPerView={1}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        400: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 50,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 50,
        },
      }}
    >
      <SwiperSlide style={styles.slide}>
        <Box sx={styles.slideLogo} component="img" src="brands/nipponia-white.png" />
      </SwiperSlide>
      <SwiperSlide style={styles.slide}>
        <Box sx={styles.slideLogo} component="img" src="brands/pgo-white.png" />
      </SwiperSlide>
      <SwiperSlide style={styles.slide}>
        <Box sx={styles.slideLogo} component="img" src="brands/supertucan-white.png" />
      </SwiperSlide>
      <SwiperSlide style={styles.slide}>
        <Box sx={styles.slideLogo} component="img" src="brands/loncin-white.png" />
      </SwiperSlide>
      <SwiperSlide style={styles.slide}>
        <Box sx={styles.slideLogo} component="img" src="brands/hero-white.png" />
      </SwiperSlide>
      <SwiperSlide style={styles.slide}>
        <Box sx={styles.slideLogo} component="img" src="brands/supergato-white.png" />
      </SwiperSlide>
      <SwiperSlide style={styles.slide}>
        <Box sx={styles.slideLogo} component="img" src="brands/tvs-white.png" />
      </SwiperSlide>
    </Swiper>
  );
};

const styles = {
    slider: {
      width:{
        xs: '100%',
        sm: '100%',
        md: '100%',
        lg: '100%',
        xl: '100%',
      },
      height:'80px',
      '.swiper-button-prev': {
        color: 'black',
      },
      '.swiper-button-next': {
        color: 'black',
      },
    },

    slideLogo: {
      width: 120,
      objectFit: 'contain',
    },
    }