import Hero from "../components/ui/Hero";
import ProvinceGrid from "../components/Buscador-img/ProvinceGrid";
import ReviewCards from "../components/ui/ReviewCards";
import { Box } from "@mui/system";
import ExamplePage from "../components/ui/ExamplePage";
import HeroCarousel from "../components/ui/HeroCarousel";

function PageHome() {
  return (
    <Box sx={{}}>
      <Hero />

      <HeroCarousel title="Publicaciones recientes" />

      {/*       <Box sx={{ my: 3 }}>
        <Typography variant="h4">Publicaciones recientes</Typography>
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
      </Box> */}
      <Box
        sx={{
          minHeight: "507px",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <ExamplePage />
      </Box>
      <HeroCarousel title="Publicaciones más visitadas" />

      {/*  <Box sx={{ m: 3 }}>
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
      </Box> */}

      <Box sx={{ paddingTop: "2rem", marginBottom: "2rem" }}>
        <ReviewCards />
      </Box>

      <Box sx={{ paddingTop: "2rem", marginBottom: "4rem" }}>
        <ProvinceGrid />
      </Box>
    </Box>
  );
}

export default PageHome;
