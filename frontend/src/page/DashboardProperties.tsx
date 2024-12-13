
import UserPropertyCard from "../components/dashboard/UserPropertyCard";
import Grid from "@mui/material/Grid2";
import properties from "../Data/properties.json";
import { Button } from "@mui/material";
import {useState} from "react";
import PropertyForm from "./RegisterProperty";
import { useUserStore } from "../store/userStore";
import {useNavigate } from "react-router";
import { Toast } from "../components/ui/Toast";

export default function DashboardProperties() {
  const user = useUserStore(state => state.user)
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showsToast, setShowsToast] = useState(false);

  if(!user.token) return navigate("/login", { replace: true });
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  return (
    <>
      <Grid container spacing={2} sx={{ mx: 4 }}>
        <Grid size={12} sx={{ textAlign: "end" }}>
          <Button onClick={openDialog} variant="contained">
            Publicar nueva propiedad
          </Button>
          <PropertyForm
          toggleToast={setShowsToast}
            token={user.token}
            open={open}
            closeDialog={closeDialog}
          />
        </Grid>
        {properties.map((property, index) => (
          <Grid key={index} size={{ xs: 12 }}>
            <UserPropertyCard property={property} />
          </Grid>
        ))}
      </Grid>
      <Toast
        open={showsToast}
        setOpen={setShowsToast}
        severity="success"
        message="¡Propiedad registrada!"
      />
    </>
  );
}
