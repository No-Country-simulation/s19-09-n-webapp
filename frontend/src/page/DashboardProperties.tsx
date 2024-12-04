import PropertyCard from "../components/Properties/PropertyCard";
import {placeholderProperties} from "../Data/Properties";
import Grid from "@mui/material/Grid2";

export default function DashboardProperties() {
  return (
        <Grid container spacing={2}>
          {placeholderProperties.map((property) => (
            <Grid
              key={property.id}
              size={{ xs: 12, sm: 6, lg: 4 }}
              sx={{ textAlign: "start" }}
            >
              <PropertyCard property={property} />
            </Grid>
          ))}
      </Grid>
  )
}
