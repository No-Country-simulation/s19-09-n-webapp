import { Box, Button, TextField, Container, Grid2 } from "@mui/material";
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

function PageRegister() {
  return (
    <Container>
      <Typography variant="h2" sx={{ marginTop: 6, marginBottom: 4 }}> ¡Bienvenido a Roomiefind! </Typography>
      <Typography variant="h5" sx={{ marginTop: 1, marginBottom: 2 }}> Gracias por registrarte en nuestra plataforma. Ahora formas parte de una comunidad diseñada para ayudarte a encontrar el compañero de habitación ideal. </Typography>

      <Grid2 container >
        <Grid2 size={6}
          sx={{ backgroundColor: 'orange', display: { sm: 'none', md: 'block', xs: 'none' } }}
        >

        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}
        >
          <Box component="form" marginTop={4}
            marginLeft={4}>
            <TextField
              id="nombre"
              label="Nombre"
              type="text"
              variant="outlined"
              fullWidth
              helperText='Ingrese su Nombre'
              margin="normal"

            /*  error={true} */

            />
            <TextField
              id="Apellido"
              label="Apellido"
              type="text"
              variant="outlined"
              fullWidth
              helperText='Ingrese su Apellido'
              margin="normal"

            /*  error={true} */

            />
            <TextField
              id="email"
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              helperText='Ingrese Email'
              margin="normal"

            /*  error={true} */

            />
            <TextField
              id="password"
              label="Contraseña"
              type="password"
              variant="outlined"
              fullWidth
              helperText='Ingrese una Contraseña'
              margin="normal"

            /*  error={true} */
            />
            <Button variant="outlined"
              color="inherit"
              component={Link} to="/"
              sx={{ m: 6, backgroundColor: 'blue', color: "white" }}>Registrar usuario</Button>
          </Box>
        </Grid2>
      </Grid2>
    </Container>
  )
}

export default PageRegister
