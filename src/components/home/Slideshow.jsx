import React from 'react'
import { Box, Button, Grid, Stack } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
export const Slideshow = () => {
  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      className='mySwiper'
    >
      <SwiperSlide>
        <Box sx={styles.slide}>
          <h1>Slide 1</h1>
          <p>Slide 1 content</p>
          <Button variant="contained" color="secondary">
            Learn More
          </Button>
        </Box>
      </SwiperSlide>
      <SwiperSlide>
        <Box sx={styles.slide}>
          <h1>Slide 2</h1>
          <p>Slide 2 content</p>
          <Button variant="contained" color="secondary">
            Learn More
          </Button>
        </Box>
      </SwiperSlide>
      <SwiperSlide>
        <Box sx={styles.slide}>
          <h1>Slide 3</h1>
          <p>Slide 3 content</p>
          <Button variant="contained" color="secondary">
            Learn More
          </Button>
        </Box>
      </SwiperSlide>
    </Swiper>
  )
}

const styles = {
    slide: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
        h1: {
        fontSize: '3rem',
        },
        p: {
        fontSize: '1.5rem',
        },
    },
    }