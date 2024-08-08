import React from 'react'
import { Box, Button, Grid, Stack } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Autoplay } from 'swiper/modules'
export const Slideshow = () => {
  return (
    <Swiper
      modules={[Autoplay]}
      style={styles.slider}
      slidesPerView={3}
      speed={4000}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
      }}
      loop={true}
    >
      <SwiperSlide style={styles.slide}>
        <Box sx={styles.slideLogo} component="img" src="brands/honda-white.png" />
      </SwiperSlide>
      <SwiperSlide style={styles.slide}>
      <Box  sx={styles.slideLogo} component="img" src="brands/yamaha-white.png" />
      </SwiperSlide>s
      <SwiperSlide style={styles.slide}>
      <Box  sx={styles.slideLogo} component="img" src="brands/tvs-white.png" />
      </SwiperSlide>
      <SwiperSlide style={styles.slide}>
      <Box  sx={styles.slideLogo} component="img" src="brands/hero-white.png" />
      </SwiperSlide>
    </Swiper>
  )
}

const styles = {
    slider: {
      width:'500px',
      height:'80px',
      margin:'auto',
      '.swiper-button-prev': {
        color: 'black',
      },
      '.swiper-button-next': {
        color: 'black',
      },
    },
    slide: {
       
    },
    slideLogo: {
      width: 150,
      objectFit: 'contain',
    },
    }