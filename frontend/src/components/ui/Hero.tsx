import { Box, Typography } from "@mui/material";
import SearchBar from "./searchBar/SearchBar";

export default function Hero() {
  return (
    <Box
      sx={{
        overflow: "hidden",
        height: "70vh",
        background: `linear-gradient(rgba(255, 255, 255, 0.99), rgba(255, 255, 255, 0.6)), URL('https://cdn-sl-a1.scape.com/sites/default/files/2024-04/hero%201%20%282%29_1.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <SearchBar />
      <Typography
        variant="h2"
        sx={{
          fontWeight: "400",
          padding: { xs: "1rem", md: "2rem 4rem" }, // Ajusta el padding según el tamaño
          fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" }, // Cambia el tamaño de fuente
        }}
      >
        Conecta con tu nuevo hogar, encuentra a tu roomie ideal
      </Typography>
      <Typography
        variant="h6"
        sx={{
          padding: { xs: "1rem", md: "2rem 4rem" }, // Ajusta el padding
          fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" }, // Cambia el tamaño de fuente
        }}
      >
        En Roomiefind encontrarás alojamiento para estudiantes: espacios seguros
        y asequibles cerca de universidades, ya sea compartidos, privados o
        temporales, en casas de familias o departamentos.
      </Typography>
    </Box>
  );
}
