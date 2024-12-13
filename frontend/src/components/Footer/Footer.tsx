import { Container, Grid2, Typography, Box } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#201e1e ",
        padding: "4rem",
        paddingBottom: "0",
        color: "white",
      }}
    >
      <Container>
        <Grid2 container spacing={6} justifyContent="center">
          {/* Columna 1: Acerca de */}
          <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
            <Typography variant="h6" gutterBottom>
              Acerca de
            </Typography>
            <Typography variant="body2">Quiénes somos</Typography>
          </Grid2>

          {/* Columna 2: Ayuda */}
          <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
            <Typography variant="h6" gutterBottom>
              Ayuda
            </Typography>
            <Typography variant="body2">Buscar inmuebles</Typography>
            <Typography variant="body2">Publicar inmuebles</Typography>
            <Typography variant="body2">Configuracion de mi cuenta</Typography>
          </Grid2>

          {/* Columna 3: Otros sitios */}
          <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
            <Typography variant="h6" gutterBottom>
              Otros sitios
            </Typography>
            <Typography variant="body2"> Mi inmueble</Typography>
          </Grid2>

          {/* Columna 4: Redes sociales */}
          <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
            <Typography variant="h6" gutterBottom>
              Redes sociales
            </Typography>
            <Typography variant="body2">Facebook</Typography>
            <Typography variant="body2">Twitter</Typography>
            <Typography variant="body2">Instagram</Typography>
          </Grid2>

          {/* Columna 5: Mi cuenta */}
          <Grid2 size={{ xs: 12, sm: 8, md: 2 }}>
            <Typography variant="h6" gutterBottom>
              Mi cuenta
            </Typography>
            <Typography variant="body2">Iniciar sesión</Typography>
            <Typography variant="body2">Registrarse</Typography>
            <Typography variant="body2">Configuración</Typography>
          </Grid2>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
          <Typography variant="body2" align="center" p={5}>
            Copyright 2024 Roomiefind todos los derechos reservados.No country
            Grupo s19-09-n-webapp
          </Typography>
        </Grid2>
      </Container>
    </Box>
  );
}

export default Footer;
