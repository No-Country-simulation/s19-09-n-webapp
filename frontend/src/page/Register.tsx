import { Box, Button, TextField, Container, Grid2 } from "@mui/material";
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useUserStore } from "../store/userStore";
import { signup } from "../services/authService";
import { redirect } from "react-router";
import { useState } from "react";
import { Toast } from "../components/ui/Toast";
import registerImage from "../../public/registro.png";

function PageRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
      <Typography variant="h4" component="h1">
        ¡Bienvenido a{' '}
        <Box
          component="span"
          sx={{
            color: '#6F2DA8',
            fontWeight: 'bold',
          }}
        >
          Roomiefind
        </Box>
        !
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
            marginRight: 8,
            objectFit: "cover",
            maxWidth: 350,
            maxHeight: 700,
            backgroundSize: "cover",
            backgroundImage: `URL('${registerImage}')`,
            display: { sm: "none", md: "block", xs: "none" },
          }}
        ></Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Box component="form"
           marginTop={4} 
           marginLeft={4} 
           onSubmit={handleSubmit(onRegister)}>
            <TextField
              {...register("name", {
                required: {
                  value: true,
                  message: "El nombre es requerida.",
                },
                minLength: {
                  value: 6,
                  message: "El nombre debe tener al menos 6 caracteres.",
                },
                maxLength: {
                  value: 20,
                  message: "El nombre debe tener menos de 20 caracteres.",
                },
              })}
              label="Nombre"
              type="text"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.name}
              
            />
             {errors.name && typeof errors.name.message === "string" && (
              <Typography variant="body2" color="error">
                {errors.name.message}
              </Typography>
            )}

            <TextField
              {...register("last_name", {
                required: {
                  value: true,
                  message: "El apellido es requerida.",
                },
                minLength: {
                  value: 6,
                  message: "El apellido debe tener al menos 6 caracteres.",
                },
                maxLength: {
                  value: 20,
                  message: "El apellido debe tener menos de 20 caracteres.",
                },
              })}
              label="Apellido"
              type="text"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.last_name}
             
            />
             {errors.last_name && typeof errors.last_name.message === "string" && (
              <Typography variant="body2" color="error">
                {errors.last_name.message}
              </Typography>
            )}

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

            <Link to="/login">¿Ya tienes una cuenta? ¡Inicia sesión aquí!</Link>
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

export default PageRegister;
