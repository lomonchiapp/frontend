import React from 'react'
import { Box } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

export const AboutSlider = () => {
  return (
     <Box>
        <Swiper
            modules={[Navigation]}
            style={styles.slider}
            slidesPerView={1}
            speed={4000}
            autoplay={{
                delay: 0,
                disableOnInteraction: false,
            }}
            loop={true}
            >
                <SwiperSlide style={styles.slide}>
                    <Box sx={styles.slideImg} component="img" src="front.jpg" />
                </SwiperSlide>
                <SwiperSlide style={styles.slide}>
                    <Box sx={styles.slideImg} component="img" src="inside.jpg" />
                </SwiperSlide>
            </Swiper>
     </Box>
  )
}

const styles = {
    slider: {
        width:'500px',
        height:'600px',
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
    slideImg: {
        width: 500,
        height: 'auto',
        objectFit: 'contain',
    },
}