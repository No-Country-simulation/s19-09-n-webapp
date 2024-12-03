import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/Footer/Footer";
import { Box } from "@mui/system";



export default function RootLayout() {
  return (
    <section>
      <Navbar />
      <Box sx={{ m: 8 }}>
        <Outlet />
      </Box>
      <Footer />
    </section>
  );
}
