import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/Footer/Footer";
import { Box, Container } from "@mui/system";

export default function RootLayout() {
  return (
    <Container maxWidth="xl">
      <Navbar />
      <Box>
        <Outlet />
      </Box>
      <Footer />
    </Container>
  );
}
