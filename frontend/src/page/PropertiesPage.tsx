import PropertyCard from "../components/Properties/PropertyCard";
import FiltersBar from "../components/Properties/FiltersBar";
import { placeholderProperties } from "../utils/placeholderData";
import Grid from "@mui/material/Grid2";


export default function PropertiesPage() {
  return (
    <Grid container sx={{ mt: 3 }} spacing={2}>
      <Grid size={{ xs: 12, md: 4, lg: 3 }}>
        <FiltersBar></FiltersBar>
      </Grid>
      <Grid size={{ xs: 12, md: 8, lg: 9 }}>
        <Grid container spacing={2}>
          {placeholderProperties.map((property) => (
            <Grid
              key={property.title}
              size={{ xs: 12, sm: 6, lg: 4 }}
              sx={{ textAlign: "start" }}
            >
              <PropertyCard property={property} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
