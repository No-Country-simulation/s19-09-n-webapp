import { Box, Typography } from "@mui/material";
import SearchBar from "./searchBar/SearchBar";

export default function Hero() {
  return (
    <Box
      sx={{
        marginBottom: "2rem",
        overflow: "hidden",
        height: "70vh",
        background: `linear-gradient(rgba(255, 255, 255, 0.99), rgba(255, 255, 255, 0.6)), URL('https://cdn-sl-a1.scape.com/sites/default/files/2024-04/hero%201%20%282%29_1.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        /*  color: theme.palette.secondary.main, */
      }}
    >
      <SearchBar />
      <Typography
        /* variant="h2" */
        sx={{
          fontWeight: "400",
          paddingX: { md: "8rem", lg: "14rem" },
          margin: { xs: "1rem", md: "auto auto" },
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3.8rem" },
        }}
      >
        Conecta con tu nuevo hogar, encuentra a tu roomie ideal
      </Typography>
      <Typography
        variant="h6"
        sx={{
          margin: {
            xs: "1rem",
            sm: "auto 2rem auto 2rem",
            md: "2rem 4rem 5rem 4rem",
          },
          fontSize: { xs: "0.9rem", sm: "1.2rem", md: "1.5rem" },
          letterSpacing: "1.1px",
        }}
      >
        En Roomiefind encontrarás alojamiento para estudiantes: espacios seguros
        y asequibles cerca de universidades, ya sea compartidos, privados o
        temporales, en casas de familias o departamentos.
      </Typography>
    </Box>
  );
}
