import { Container, Grid2, Box, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import registerImage from "../../public/registro.png";


export default function DashboardData() {
  return (
    <Container>
      <Grid2 container >               
        <Grid2 size={{ xs: 8}}>
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
            <Grid2 size={{ xs: 12 }}>
              <Button variant="contained"
                color="inherit"
                component={Link} to="/"
                sx={{ m: 6, backgroundColor: 'green', color: "white" }}>Guardar</Button>
              <Button variant="outlined"
                color="inherit"
                component={Link} to="/"
                sx={{ m: 6, backgroundColor: 'red', color: "white" }}>Cancelar</Button>
            </Grid2>
          </Box>
        </Grid2>
      </Grid2>
    </Container>
  )
}
