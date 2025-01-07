import { useState } from "react";
import { Box, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router";
import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form";
import { useUserStore } from "../store/userStore";
import { FormValuesLogin, login } from "../services/authService";
import { Toast } from "../components/ui/Toast";
import loginImage from "../../public/login.png";
import AuthLayout from "../layouts/AuthLayout";
import { SubmitButtonComponent } from "../components/Auth/SubmitButtonComponent";

const passLoginValidations: RegisterOptions<FormValuesLogin, "password"> = {
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
};

const emailLoginValidations: RegisterOptions<FormValuesLogin, "email"> = {
  required: "El email es obligatorio.",
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    message: "Ingrese un correo válido.",
  },
};

const loginDescription =
  "Encuentra a tu compañero de cuarto ideal o accede a tu cuenta para gestionar tus preferencias y conexiones.";

function PageLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValuesLogin>();
  const navigate = useNavigate();
  const [apiErrorMsg, setApiErrorMsg] = useState("");

  const onSubmit: SubmitHandler<FormValuesLogin> = (data) => onLogin(data);
  const logUser = useUserStore((state) => state.logUser);
  const currentUser = useUserStore((state) => state.user);

  const [showsToast, setShowsToast] = useState(false);

  async function onLogin(loginFields: FormValuesLogin) {
    try {
      const response = await login(loginFields);
      logUser(response);
      navigate("/", { replace: true });
    } catch (error:unknown) {
      if(error instanceof Error) setApiErrorMsg(error.message);
    } finally {
      setShowsToast(true);
    }
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
          {...register("email", emailLoginValidations)}
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.email}
        />
        <TextField
          {...register("password", passLoginValidations)}
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
        <SubmitButtonComponent isSubmitting={isSubmitting} message="Iniciar Sesión"/>
        <Toast
          open={showsToast}
          setOpen={setShowsToast}
          severity={apiErrorMsg ? "error" : "success"}
          message={apiErrorMsg ? apiErrorMsg : "¡Sesión iniciada!"}
        />
      </Box>
    </AuthLayout>
  );
}

export default PageLogin;
