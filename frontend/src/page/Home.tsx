import Hero from "../components/ui/Hero";
import ProvinceGrid from "../components/Buscador-img/ProvinceGrid";
import ReviewCards from "../components/ui/ReviewCards";
import { Box } from "@mui/system";
import ExamplePage from "../components/ui/ExamplePage";
import { Grid2, Typography } from "@mui/material";
import properties from "../Data/properties.json";
import PropertyCard from "../components/ui/PropertyCard";

function PageHome() {
  return (
    <div>
      <Box>
        <Hero />
      </Box>
      <Box sx={{ my: 3 }}>
        <Typography variant="h4">
          Publicaciones recientes (prox: titulo y carrusel en mismo cont)
        </Typography>
        {/*      <Typography variant="h6" sx={{ padding: "2rem 4rem" }}>
          La solución confiable para encontrar y compartir hogares..
        </Typography> */}

        <Grid2 container spacing={2} sx={{ justifyContent: "center" }}>
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
        </Grid2>
      </Box>
      <Box
        sx={{
          minHeight: "507px",
          my: 3,
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <ExamplePage />
      </Box>
      <Box sx={{ m: 3 }}>
        <Typography
          variant="h2"
          sx={{ fontWeight: "400", padding: "2rem 4rem" }}
        >
          Conecta con tu nuevo hogar
        </Typography>
        <Grid2 container spacing={2} sx={{ justifyContent: "center" }}>
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
        </Grid2>
      </Box>

      <Box sx={{ m: 3 }}>
        <ReviewCards />
      </Box>

      <Box sx={{ m: 3 }}>
        <ProvinceGrid />
      </Box>
    </div>
  );
}

export default PageHome;
