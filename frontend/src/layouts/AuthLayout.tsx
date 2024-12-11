import { Grid2, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";

interface AuthLayoutProps {
  children: React.ReactNode;
  sideImageUrl: string;
  description?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  sideImageUrl,
  description = "",
}) => {
  return (
    <Container sx={{ padding: 3 }}>
      <Grid2 container spacing={3}>
        <Grid2
          size={{ xs: 0, md: 6 }}
          sx={{
            backgroundPosition: "center",
            objectFit: "cover",
            backgroundSize: "cover",
            backgroundImage: `URL('${sideImageUrl}')`,
          }}
        ></Grid2>
        <Grid2
          size={{ xs: 12, md: 6 }}
          textAlign="center"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="h1">
            ¡Bienvenido a{" "}
            <Box
              component="span"
              sx={{
                color: "#6F2DA8",
                fontWeight: "bold",
              }}
            >
              Roomiefind
            </Box>
            !
          </Typography>
          <Typography
            variant="h5"
            sx={{
              marginTop: 1,
              marginBottom: 2,
              fontSize: {
                xs: "1rem",
                sm: "1.2rem",
                md: "1.5rem",
              },
            }}
          >
            {description}
          </Typography>

          {children}
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default AuthLayout;
