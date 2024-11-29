import {
  Box,
  Button,
  TextField,
  Container,
  Grid2,
  Snackbar,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { useUserStore } from "../../store/userStore";
import { login } from "../../services/authService";
import { redirect } from "react-router";
// import { useState } from "react";

function PageLogin() {
  const { register, handleSubmit } = useForm();
  const logUser = useUserStore((state) => state.logUser);
  // const [showsToast, setShowsToast] = useState(false);

  function onLogin(loginFields: object) {
    login(loginFields).then((user) => {
      logUser(user);
      Alert;
      redirect("/");
    });
  }

  return (
    <Container>
      <Alert severity="success">This is a success Alert.</Alert>
      <Typography variant="h2" sx={{ marginTop: 6, marginBottom: 4 }}>
        {" "}
        Iniciar sesión{" "}
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
            <Snackbar
              open={true}
              autoHideDuration={2000}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              message="This Snackbar will be dismissed in 5 seconds."
            >
              <Alert severity="success" variant="filled">
                ¡Sesión iniciada!
              </Alert>
            </Snackbar>
          </Box>
        </Grid2>
      </Grid2>
    </Container>
  );
}
export default PageLogin;
