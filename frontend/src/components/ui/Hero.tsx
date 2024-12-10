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
      }}
    >
      <SearchBar />
      <Typography variant="h2" sx={{ fontWeight: "400", padding: "2rem 4rem" }}>
        Conecta con tu nuevo hogar, encuentra a tu roomie ideal
      </Typography>
      <Typography variant="h6" sx={{ padding: "2rem 4rem" }}>
        En Roomiefind encontrarás alojamiento para estudiantes: espacios seguros
        y asequibles cerca de universidades, ya sea compartidos, privados o
        temporales, en casas de familias o departamentos.
      </Typography>
    </Box>
  );
}
