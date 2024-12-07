
import UserPropertyCard from "../components/dashboard/UserPropertyCard";
import Grid from "@mui/material/Grid2";
import properties from "../Data/properties.json";
import { Button } from "@mui/material";

export default function DashboardProperties() {
  return (
    <Grid container spacing={2} sx={{ mx: 4 }}>
      <Grid size={12} direction="row-reverse" sx={{ textAlign: "end" }}>
        <Button variant="contained">Publicar nueva propiedad</Button>
      </Grid>
      {properties.map((property, index) => (
        <Grid key={index} size={{ xs: 12 }}>
          <UserPropertyCard property={property} />
        </Grid>
      ))}
    </Grid>
  );
}
