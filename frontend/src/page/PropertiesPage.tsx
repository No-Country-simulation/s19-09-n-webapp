import PropertyCard from "../components/Properties/PropertyCard";
import FiltersBar from "../components/Properties/FiltersBar";
import Grid from "@mui/material/Grid2";
import { useProperties } from "../hooks/useProperties";

export default function PropertiesPage() {
  const {propertiesQuery} = useProperties();

  return (
    <Grid container sx={{ mt: 3 }} spacing={2}>
      <Grid size={{ xs: 12, md: 4, lg: 3 }}>
        <FiltersBar/>
      </Grid>
      <Grid size={{ xs: 12, md: 8, lg: 9 }}>
        <Grid container spacing={2}>
          {propertiesQuery.isLoading ? <p>Loading</p>: propertiesQuery.data?.map((property) => (
            <Grid
              key={property.id}
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
