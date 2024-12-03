import { Box, Button, TextField, Container, Grid2 } from "@mui/material";
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useUserStore } from "../store/userStore";
import { signup } from "../services/authService";
import { redirect } from "react-router";
import { useState } from "react";
import { Toast } from "../components/ui/Toast";

function PageRegister() {
  const { register, handleSubmit } = useForm();
  const logUser = useUserStore((state) => state.logUser);
  const [showsToast, setShowsToast] = useState(false);

  function onRegister(registrationFields: object) {
    signup(registrationFields).then((user) => {
      logUser(user);
      setShowsToast(true);
      redirect("/");
    });
  }

  return (
    <Container>
      <Typography variant="h2" sx={{ marginTop: 6, marginBottom: 4 }}>
        {" "}
        ¡Bienvenido a Roomiefind!{" "}
      </Typography>
      <Typography variant="h5" sx={{ marginTop: 1, marginBottom: 2 }}>
        {" "}
        Gracias por registrarte en nuestra plataforma. Ahora formas parte de una
        comunidad diseñada para ayudarte a encontrar el compañero de habitación
        ideal.{" "}
      </Typography>

      <Grid2 container>
        <Grid2
          size={6}
          sx={{
            backgroundColor: "orange",
            display: { sm: "none", md: "block", xs: "none" },
          }}
        ></Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Box component="form" marginTop={4} marginLeft={4}>
            <Link to="/login">¿Ya tienes una cuenta? ¡Inicia sesión aquí!</Link>
            <TextField
              {...register("name")}
              label="Nombre"
              type="text"
              variant="outlined"
              fullWidth
              helperText="Ingrese su Nombre"
              margin="normal"

              /*  error={true} */
            />

            <TextField
              {...register("last_name")}
              label="Apellido"
              type="text"
              variant="outlined"
              fullWidth
              helperText="Ingrese su Apellido"
              margin="normal"

              /*  error={true} */
            />
            <TextField
              {...register("email")}
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              helperText="Ingrese Email"
              margin="normal"

              /*  error={true} */
            />
            <TextField
              {...register("password")}
              label="Contraseña"
              type="password"
              variant="outlined"
              fullWidth
              helperText="Ingrese una Contraseña"
              margin="normal"

              /*  error={true} */
            />
            <Button
              onClick={handleSubmit(onRegister)}
              variant="outlined"
              color="inherit"
              sx={{ m: 6, backgroundColor: "blue", color: "white" }}
            >
              Registrar usuario
            </Button>
            <Toast
              open={showsToast}
              setOpen={setShowsToast}
              severity="success"
              message="¡Usuario registrado! Ya puedes continuar."
            />
          </Box>
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default PageRegister
