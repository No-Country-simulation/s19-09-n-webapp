import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUserStore } from "../store/userStore";
import { signup } from "../services/authService";
import { Navigate, useNavigate } from "react-router";
import { Toast } from "../components/ui/Toast";
import registerImage from "../../public/registro.png";
import AuthLayout from "../layouts/AuthLayout";

const registerDescription = `Gracias por registrarte en nuestra plataforma. Ahora formas parte de una
  comunidad diseñada para ayudarte a encontrar el compañero de habitación ideal.`;

type FormValues = {
  email: string;
  password: string;
  name: string;
  last_name: string;
};

function PageRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const navigate = useNavigate();
  const [showsToast, setShowsToast] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const onSubmit: SubmitHandler<FormValues> = (data) => onRegister(data);

  const logUser = useUserStore((state) => state.logUser);
  const currentUser = useUserStore((state) => state.user);

  async function onRegister(registrationFields: FormValues) {
    try {
      const response = await signup(registrationFields);
      logUser(response);
      navigate("/", { replace: true });
    } catch (error: unknown) {
      if(error instanceof Error) setSubmitError(error.message);
    } finally {
      setShowsToast(true);
    }
  }

  if (currentUser.token) return <Navigate to={"/"} replace></Navigate>;

  return (
    <AuthLayout sideImageUrl={registerImage} description={registerDescription}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
        maxWidth={500}
      >
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
          <Typography variant="body2" color="error" sx={{ textAlign: "left" }}>
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
          <Typography variant="body2" color="error" sx={{ textAlign: "left" }}>
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
          <Typography variant="body2" color="error" sx={{ textAlign: "left" }}>
            {errors.password.message}
          </Typography>
        )}

        <Link to="/login">¿Ya tienes una cuenta? ¡Inicia sesión aquí!</Link>
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
          {isSubmitting ? "Por favor espere...": "Registrar usuario"}
        </Button>
        <Toast
          open={showsToast}
          setOpen={setShowsToast}
          severity={!submitError ? "success" : "error"}
          message={
            submitError
              ? submitError
              : "¡Usuario registrado! Ya puedes continuar."
          }
        />
      </Box>
    </AuthLayout>
  );
}

export default PageRegister;
