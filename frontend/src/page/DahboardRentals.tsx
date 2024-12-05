import { Box } from "@mui/material";
import DashboardReantailsCard from "../components/ui/dashboardReantails/DashboardReantailsCard";

export default function DahboardRentals() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <DashboardReantailsCard
        location="Belgrano 318"
        from={new Date("2024-01-01")}
        to={new Date("2024-12-31")}
        rooms={3}
        bathrooms={2}
        balconies={1}
        garages={1}
        hasWater={true}
        hasGas={true}
        imageUrls={[
          "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        ]}
      />
      <DashboardReantailsCard
        location="Belgrano 318"
        from={new Date("2024-01-01")}
        to={new Date("2024-12-31")}
        rooms={3}
        bathrooms={2}
        balconies={1}
        garages={1}
        hasWater={true}
        hasGas={true}
        imageUrls={[
          "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        ]}
      />
      <DashboardReantailsCard
        location="Belgrano 318"
        from={new Date("2024-01-01")}
        to={new Date("2024-12-31")}
        rooms={3}
        bathrooms={2}
        balconies={1}
        garages={1}
        hasWater={true}
        hasGas={true}
        imageUrls={[
          "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        ]}
      />
    </Box>
  );
}
