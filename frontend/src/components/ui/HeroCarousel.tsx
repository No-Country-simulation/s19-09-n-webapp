import { Box, Typography, Grid2 } from "@mui/material";
import properties from "../../Data/properties.json";
import PropertyCard from "./PropertyCard";

interface HeroCarouselProps {
  title: string;
}

export default function HeroCarousel({ title }: HeroCarouselProps) {
  return (
    <Box sx={{ marginX: "1rem", paddingTop: "2rem", marginBottom: "2rem" }}>
      <Box sx={{ padding: "0 1rem" }}>
        <Typography variant="h4">{title}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "2rem 0",
        }}
      >
        {properties.map((property, index) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
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
          </Grid2>
        ))}
      </Box>
    </Box>
  );
}
