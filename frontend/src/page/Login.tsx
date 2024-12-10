import { Box, Button, TextField, Container, Grid2 } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { login } from "../services/authService";
import { redirect } from "react-router";
import { useState } from "react";
import { Toast } from "../components/ui/Toast";
import loginImage from "../../public/login.png";

function PageLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
      <Grid2 container>
        <Grid2
          size={6}
          sx={{
            marginRight: 8,
            objectFit: "cover",
            maxWidth: 400,
            maxHeight: 700,
            backgroundSize: "cover",
            backgroundImage: `URL('${loginImage}')`,
            display: { sm: "none", md: "block", xs: "none" },
          }}
        ></Grid2>
        <Grid2 size={{ xs: 12, md: 6 }} sx={{ textAlign: "start" }}>
          <Typography variant="h4" component="h1">
            ¡Bienvenido a{" "}
            <Box
              component="span"
              sx={{
                color: "#6F2DA8", // Color
                fontWeight: "bold", // Negrito
              }}
            >
              Roomiefind
            </Box>
            !
          </Typography>
          <Typography variant="h5" sx={{ marginTop: 1, marginBottom: 2 }}>
            Encuentra a tu compañero de cuarto ideal o accede a tu cuenta para
            gestionar tus preferencias y conexiones.
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onLogin)}
            marginTop={4}
            marginLeft={4}
          >
            <TextField
              {...register("email", {
                required: "El email es obligatorio.",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Ingrese un correo válido.",
                },
              })}
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.email}
            />
            <TextField
              {...register("password", {
                required: {
                  value: true,
                  message: "La contraseña es requerida.",
                },
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres.",
                },
                maxLength: {
                  value: 20,
                  message: "La contraseña debe tener menos de 20 caracteres.",
                },
              })}
              label="Contraseña"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.password}
            />

            {errors.password && typeof errors.password.message === "string" && (
              <Typography variant="body2" color="error">
                {errors.password.message}
              </Typography>
            )}

            <Link to="/register">
              ¿Aún no tienes una cuenta? ¡Regístrate aquí!
            </Link>
            <Button
              type="submit"
              variant="outlined"
              color="inherit"
              sx={{
                m: 6,
                backgroundColor: "#6F2DA8",
                color: "white",
                "&:hover": {
                  backgroundColor: "#6F2DA8",
                  color: "white",
                },
              }}
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
