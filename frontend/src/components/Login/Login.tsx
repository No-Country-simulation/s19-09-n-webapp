import { Box, Button, TextField, Container, Grid2 } from "@mui/material";
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';


function PageLogin() {

  return (
    <Container>
      <Typography variant="h2" sx={{ marginTop: 6, marginBottom: 4 }}> Login </Typography>
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
              id="email"
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              helperText='Ingrese un email válido'
              margin="normal"

            /*  error={true} */

            />
            <TextField
              id="password"
              label="Contraseña"
              type="password"
              variant="outlined"
              fullWidth
              helperText='Ingrese una contraseña válida'
              margin="normal"
            /*   error={true} */
            />
            <Button variant="outlined"
            color="inherit"
              component={Link} to="/"
              sx={{ m: 6, backgroundColor: 'blue', color: "white" }}>Iniciar Sesión</Button>
          </Box>
        </Grid2>
      </Grid2>
    </Container>
  )
}
export default PageLogin;
