import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
} from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import UserButton from "./UserButton";
import { useNavigate } from "react-router";
import logo from "../../../public/navBarLogo.png";
import MenuIcon from "@mui/icons-material/Menu";

import ModalProperties from "./ModalProperties";
import { useEffect, useState } from "react";

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
  "&:hover": {
    color: "#666",
  },
});

const HomeButton = styled(Link)({
  fontWeight: "bold",
  fontSize: "24px",
  color: "#6F2DA8",
});
const mdBreakpoint = 900;
export default function Navbar() {
  const navigate = useNavigate();

  const [showOptions, setShowOptions] = useState<boolean>(false);

  const handleShowOptions = () => {
    setShowOptions((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      const isMdOrLarger = window.innerWidth >= mdBreakpoint;
      setShowOptions(isMdOrLarger);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <StyledAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            height: showOptions ? { xs: "15rem", md: "unset" } : "unset",
            justifyContent: "space-between",
            padding: "21px 0",
            display: "flex",
            alignItems: { xs: "flex-start", md: "unset" },
          }}
        >
          {/* Logo section */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <HomeButton to="/" sx={{ textDecoration: "none" }}>
              RoomieFind{" "}
            </HomeButton>
            <img src={logo} alt="RoomieFind" />
          </Box>

          {/* Navigation section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column-reverse", md: "row" },
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                height: showOptions ? { xs: "10rem", md: "unset" } : "0px",
                overflow: { xs: "hidden", md: "unset" },
                position: { xs: "absolute", md: "unset" },
                left: "0",
                top: "5rem",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                width: "100%",
                gap: 1,
              }}
            >
              <Button
                variant="contained"
                onClick={() => navigate("/properties")}
                sx={{ color: "white" }}
              >
                Ver propiedades
              </Button>
              <NavLink to="login">Publicar mi propiedad</NavLink>
              <NavLink to="#">
                <ModalProperties />
              </NavLink>
              <UserButton></UserButton>
            </Box>
            <IconButton
              onClick={handleShowOptions}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
}
