import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!captchaValue) {
      alert('Please complete the CAPTCHA');
      return;
    }
    // Handle form submission logic here
    console.log('Form data:', formData);
    console.log('CAPTCHA value:', captchaValue);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        maxWidth: 400,
        margin: '0 auto',
        padding: 2,
        backgroundColor: '#313131',
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Habla con Nosotros
      </Typography>
      <TextField
      sx={styles.textfield}
        label="Nombre Completo"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
      sx={styles.textfield}
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
      sx={styles.textfield}
        label="Escribe tu mensaje"
        name="message"
        value={formData.message}
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
        required
      />
      <ReCAPTCHA
        sitekey="YOUR_RECAPTCHA_SITE_KEY"
        onChange={handleCaptchaChange}
      />
      <Button sx={styles.submitButton} type="submit" variant="contained">
        Enviar
      </Button>
    </Box>
  );
}
const styles = {
    textfield:{
        color:"white",
        backgroundColor:"#565656",
        borderRadius:3,
        '& .MuiInputBase-input':{
            color:"white",
        },
        '& .MuiInputLabel-root':{
            color:"white",
        },
    },
    submitButton:{
        backgroundColor:"#E11018",
        color:"white",
        '&:hover':{
            backgroundColor:"#ef3137",
        }
    }
}