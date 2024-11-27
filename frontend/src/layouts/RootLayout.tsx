import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/Footer/Footer";



export default function RootLayout() {
  return (
    <section>
      <Navbar />
      <Outlet/>
      <Footer /> 
      
    </section>
  );
}