import { useState } from "react";
import { Box, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form";
import { useUserStore } from "../store/userStore";
import { FormValuesRegister, signup } from "../services/authService";
import { Navigate, useNavigate } from "react-router";
import { Toast } from "../components/ui/Toast";
import registerImage from "../../public/registro.png";
import AuthLayout from "../layouts/AuthLayout";
import { SubmitButtonComponent } from "../components/Auth/SubmitButtonComponent";

const registerDescription = `Gracias por registrarte en nuestra plataforma. Ahora formas parte de una
  comunidad diseñada para ayudarte a encontrar el compañero de habitación ideal.`;

const passLoginValidations: RegisterOptions<FormValuesRegister, "password"> = {
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

const emailLoginValidations: RegisterOptions<FormValuesRegister, "email"> = {
  required: "El email es obligatorio.",
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    message: "Ingrese un correo válido.",
  },
};

const namesValidations = (
  field: "nombre" | "apellido"
): RegisterOptions<FormValuesRegister, "name"> => {
  return {
    required: {
      value: true,
      message: `El ${field} es requerido.`,
    },
    minLength: {
      value: 6,
      message: `El ${field} debe tener al menos 6 caracteres.`,
    },
    maxLength: {
      value: 20,
      message: `El ${field} debe tener menos de 20 caracteres.`,
    },
  };
};

function PageRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValuesRegister>();

  const navigate = useNavigate();
  const [showsToast, setShowsToast] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const onSubmit: SubmitHandler<FormValuesRegister> = (data) =>
    onRegister(data);

  const logUser = useUserStore((state) => state.logUser);
  const currentUser = useUserStore((state) => state.user);

  async function onRegister(registrationFields: FormValuesRegister) {
    try {
      const response = await signup(registrationFields);
      logUser(response);
      navigate("/", { replace: true });
    } catch (error: unknown) {
      if (error instanceof Error) setSubmitError(error.message);
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
          {...register("name", namesValidations("nombre"))}
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
          {...register("last_name", namesValidations("apellido"))}
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

        <Link to="/login">¿Ya tienes una cuenta? ¡Inicia sesión aquí!</Link>
        <SubmitButtonComponent
          isSubmitting={isSubmitting}
          message="Registrar Usuario"
        />
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
