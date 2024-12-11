import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import UserButton from "./UserButton";
import { useNavigate } from "react-router";
import logo from "../../../public/logo_roomieFind.png";

import ModalProperties from "./ModalProperties";

// Styled components
const StyledAppBar = styled(AppBar)({
  backgroundColor: "#fff",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
});

const NavLink = styled(Link)({
  color: "#6F2DA8",
  fontWeight: "bold",
  textDecoration: "none",
  fontSize: "14px",
  marginLeft: "24px",
  "&:hover": {
    color: "#666",
  },
});

const HomeButton = styled(Link)({
  fontWeight: "bold",
  fontSize: "24px",
  color: "#6F2DA8",
});

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <StyledAppBar position="static">
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between", padding: "21px 0" }}>
          {/* Logo section */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <HomeButton to="/" sx={{ textDecoration: "none" }}>
              RoomieFind{" "}
            </HomeButton>
            <img src={logo} alt="RoomieFind" />
          </Box>

          {/* Navigation section */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="contained"
              onClick={() => navigate("/properties")}
              sx={{ ml: 4, color: "white" }}
            >
              Ver propiedades
            </Button>
            <NavLink to="login">Publicar mi propiedad</NavLink>
            <NavLink to="#">
              <ModalProperties />
            </NavLink>
            <UserButton></UserButton>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
}
