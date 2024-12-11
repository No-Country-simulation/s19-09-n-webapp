
import UserPropertyCard from "../components/dashboard/UserPropertyCard";
import Grid from "@mui/material/Grid2";
import properties from "../Data/properties.json";
import { Button } from "@mui/material";
import {useState} from "react";
import PropertyForm from "./RegisterProperty";

export default function DashboardProperties() {
  const [open, setOpen] = useState(false);
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  return (
    <Grid container spacing={2} sx={{ mx: 4 }}>
      <Grid size={12} direction="row-reverse" sx={{ textAlign: "end" }}>
        <Button onClick={openDialog} variant="contained">
          Publicar nueva propiedad
        </Button>
        <PropertyForm open={open} closeDialog={closeDialog} />
      </Grid>
      {properties.map((property, index) => (
        <Grid key={index} size={{ xs: 12 }}>
          <UserPropertyCard property={property} />
        </Grid>
      ))}
    </Grid>
  );
}
