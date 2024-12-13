import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUserStore } from "../store/userStore";
import { login } from "../services/authService";
import { Toast } from "../components/ui/Toast";
import loginImage from "../../public/login.png";
import AuthLayout from "../layouts/AuthLayout";

type FormValues = {
  email: string;
  password: string;
};

const loginDescription = 'Encuentra a tu compañero de cuarto ideal o accede a tu cuenta para gestionar tus preferencias y conexiones.'

function PageLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = (data) => onLogin(data);
  const logUser = useUserStore((state) => state.logUser);
  const currentUser = useUserStore((state) => state.user);
  
  const [showsToast, setShowsToast] = useState(false);

  async function onLogin(loginFields: FormValues) {
    const response = await login(loginFields);
    logUser(response);
    setShowsToast(true);
    navigate("/", { replace: true });
  }

  if (currentUser.token) return <Navigate to={"/"} replace></Navigate>;

  return (
    <AuthLayout sideImageUrl={loginImage} description={loginDescription}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          marginTop: { xs: "1rem", md: "2rem" },
          display: "flex",
          flexDirection: "column",
        }}
        maxWidth={500}
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
          <Typography variant="body2" color="error" sx={{ textAlign: "left" }}>
            {errors.password.message}
          </Typography>
        )}

        <Link to="/register">¿Aún no tienes una cuenta? ¡Regístrate aquí!</Link>
        <Button
          type="submit"
          variant="outlined"
          color="inherit"
          disabled={isSubmitting}
          sx={{
            m: 5,
            paddingY: 2,
            paddingX: { xs: 2, md: 12 },
            backgroundColor: "#6F2DA8",
            color: "white",
            "&:hover": {
              backgroundColor: "#6F2DA8",
              color: "white",
            },
            ":disabled": {
              backgroundColor: "#6F2DA890",
              cursor: "not-allowed",
              pointerEvents: "all"
            },
          }}
        >
          {isSubmitting ? "Por favor espere...": "Iniciar Sesión"}
        </Button>
        <Toast
          open={showsToast}
          setOpen={setShowsToast}
          severity="success"
          message="¡Sesión iniciada!"
        />
      </Box>
    </AuthLayout>
  );
}

export default PageLogin;
