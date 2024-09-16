import { Typography, Box } from "@mui/material"
export const AboutInfo = () => {
  return (
    <Box sx={styles.container}>
    <p style={styles.text}>
        En Oriental Ramírez, nos dedicamos a ofrecer soluciones financieras
        accesibles y personalizadas para nuestros clientes en la República
        Dominicana. Fundados con el propósito de apoyar a los emprendedores y
        trabajadores locales, nos especializamos en motopréstamos, facilitando
        la adquisición de motocicletas para quienes las necesitan para su
        actividad económica y transporte diario.
      </p>
      <p style={styles.text}>
        Con sucursales en La Altagracia, Boca Chica, Bonao, San Pedro de Macorís
        y Santo Domingo, estamos comprometidos a brindar un servicio cercano y
        eficiente, adaptado a las necesidades de cada comunidad. Nuestro enfoque
        está en proporcionar financiamiento que impulse el desarrollo económico
        local y mejore la calidad de vida de nuestros clientes.
      </p>
      <p style={styles.text}>
        En Oriental Ramírez, nuestro equipo está dedicado a ofrecer un servicio
        al cliente excepcional y soluciones financieras que fomenten el
        crecimiento y éxito de nuestros clientes.
      </p>
      <Typography variant="h5">Tu éxito es nuestro compromiso.</Typography>
      </Box>
  )
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "480px",
    alignItems: "start",
    justifyContent: "center",
  },
  text: {
    color: "black",
    fontSize: "1rem",
    marginBottom: "10px",
  },
}
  
