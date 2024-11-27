import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// Asegúrate de tener react-router-dom instalado

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Mi App
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
