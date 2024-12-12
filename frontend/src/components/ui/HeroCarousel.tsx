import { Box, Typography } from "@mui/material";
import properties from "../../Data/properties.json";
import PropertyCard from "./PropertyCard";

interface HeroCarouselProps {
  title: string;
}

export default function HeroCarousel({ title }: HeroCarouselProps) {
  return (
    <Box sx={{ marginX: "1rem", paddingTop: "2rem", marginBottom: "2rem" }}>
      {/* Título */}
      <Box sx={{ padding: "0 1rem" }}>
        <Typography variant="h4" textAlign="center">
          {title}
        </Typography>
      </Box>

      {/* Contenedor de propiedades */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row", // Mantén las tarjetas en fila
          flexWrap: "wrap", // Permite que las tarjetas se ajusten en varias filas
          justifyContent: "center", // Centra las tarjetas horizontalmente
          gap: "1rem", // Espaciado entre tarjetas
          marginTop: "2rem",
        }}
      >
        {properties.map((property, index) => (
          <Box
            key={index}
            sx={{
              flex: "1 1 calc(100% / 5 - 1rem)", // Divide el ancho en 5 tarjetas menos el espacio del gap
              maxWidth: { xs: "100%", sm: "calc(50% - 1rem)", md: "calc(20% - 1rem)" }, // Ajusta el ancho en diferentes tamaños de pantalla
            }}
          >
            <PropertyCard
              price={property.price}
              title={property.title}
              location={property.location}
              rooms={property.rooms}
              bathrooms={property.bathrooms}
              balconies={property.balconies}
              garages={property.garages}
              hasWater={property.hasWater}
              hasGas={property.hasGas}
              imageUrl={property.imageUrl}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}