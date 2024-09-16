// ** React Imports
import React from 'react'
// ** MUI Imports
import { Box, Button, Grid, Stack } from '@mui/material'
// ** Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation, Autoplay } from 'swiper/modules'
// ** Global States
import { useSearchState } from '../../context/useSearchState'

export const BrandSlideshow = () => {
  const { setSearchText } = useSearchState()

  return (
    <Swiper
      modules={[Autoplay]}
      style={styles.slider}
      slidesPerView={4}
      speed={4000}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
      }}
      loop={true}
    >
      <SwiperSlide  style={styles.slide}>
        <Box onClick={() => {
          setSearchText('honda')
          console.log('honda')
          }} sx={styles.slideLogo} component="img" src="brands/honda.png" />
      </SwiperSlide>
      <SwiperSlide style={styles.slide}>
      <Box onClick={() => setSearchText('yamaha')} sx={styles.slideLogo} component="img" src="brands/yamaha.png" />
      </SwiperSlide>
      <SwiperSlide style={styles.slide}>
      <Box onClick={() => setSearchText('tvs')} sx={styles.slideLogo} component="img" src="brands/tvs.png" />
      </SwiperSlide>
      <SwiperSlide style={styles.slide}>
      <Box onClick={() => setSearchText('hero')} sx={styles.slideLogo} component="img" src="brands/hero.png" />
      </SwiperSlide>
      <SwiperSlide style={styles.slide}>
      <Box onClick={() => setSearchText('suzuki')} sx={styles.slideLogo} component="img" src="brands/suzuki.png" />
      </SwiperSlide>
      <SwiperSlide style={styles.slide}>
      <Box onClick={() => setSearchText('pgo')} sx={styles.slideLogo} component="img" src="brands/pgo.png" />
      </SwiperSlide>
      <SwiperSlide style={styles.slide}>
      <Box onClick={() => setSearchText('super tucan')} sx={styles.slideLogo} component="img" src="brands/supertucan.png" />
      </SwiperSlide>
      <SwiperSlide onClick={() => setSearchText('loncin')} style={styles.slide}>
      <Box sx={styles.slideLogo} component="img" src="brands/loncin.png" />
      </SwiperSlide>
    </Swiper>
  )
}

const styles = {
    slider: {
      zIndex: 399999,
      width:'700px',
      margin:'auto',
      '.swiperButtonNext': {
        color: 'black',
      },
    },
    slide: {
     zIndex: 399999,  
    },
    slideLogo: {
      width: 150,
      objectFit: 'contain',
    },
    }