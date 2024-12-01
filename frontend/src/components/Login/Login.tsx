import {
  Box,
  Button,
  TextField,
  Container,
  Grid2,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import { login } from "../../services/authService";
import { redirect } from "react-router";
import { useState } from "react";
import { Toast } from "../ui/Toast";

function PageLogin() {
  const { register, handleSubmit } = useForm();
  const logUser = useUserStore((state) => state.logUser);
  const [showsToast, setShowsToast] = useState(false);

  function onLogin(loginFields: object) {
    login(loginFields).then((user) => {
      logUser(user);
      setShowsToast(true);
      redirect("/");
    });
  }

  return (
    <Container>
      <Typography variant="h2" sx={{ marginTop: 6, marginBottom: 4 }}>
        ¡Bienvenido a Roomiefind!
      </Typography>
      <Typography variant="h5" sx={{ marginTop: 1, marginBottom: 2 }}>
        {" "}
        Encuentra a tu compañero de cuarto ideal o accede a tu cuenta para
        gestionar tus preferencias y conexiones.{" "}
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
            <Link to="/register">
              ¿Aún no tienes una cuenta? ¡Regístrate aquí!
            </Link>
            <TextField
              {...register("email")}
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              helperText="Ingrese un correo válido"
              margin="normal"

              /*  error={true} */
            />
            <TextField
              {...register("password")}
              label="Contraseña"
              type="password"
              variant="outlined"
              fullWidth
              helperText="Ingrese una contraseña válida"
              margin="normal"
              /*   error={true} */
            />
            <Button
              onClick={handleSubmit(onLogin)}
              variant="outlined"
              color="inherit"
              sx={{ m: 6, backgroundColor: "blue", color: "white" }}
            >
              Iniciar Sesión
            </Button>
            <Toast
              open={showsToast}
              setOpen={setShowsToast}
              severity="success"
              message="¡Sesión iniciada!"
            />
          </Box>
        </Grid2>
      </Grid2>
    </Container>
  );
}
export default PageLogin;
