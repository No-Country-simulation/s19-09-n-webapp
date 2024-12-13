import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { useUserStore } from "../../store/userStore";
import { useNavigate } from "react-router";
import { Toast } from "./Toast";

const NavLink = styled(Button)({
  textTransform: "none",
  color: "#333",
  fontWeight: "bold",
  textDecoration: "none",
  fontSize: "14px",
  marginLeft: "24px",
  "&:hover": {
    color: "#666",
  },
});

type RedirectAction = "login" | "register" | "dashboard" | "";

export default function UserButton() {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();
  const logoutUser = useUserStore((state) => state.logoutUser);
  const { name } = useUserStore((state) => state.user);
  const [showsToast, setShowsToast] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = (redirect: RedirectAction) => {
    setAnchor(null);
    if (redirect === "") {
      logoutUser();
      setShowsToast(true);
    }
    navigate(`/${redirect}`);
  };

  return (
    <>
      <NavLink onClick={handleClick} sx={{ ml: 2 }}>
        {name
          ? name.search(" ") === -1
            ? name
            : name.slice(0, name.search(" "))
          : "Ingresar"}
        <MdExpandMore style={{ marginLeft: 2 }} />
      </NavLink>
      <Menu
        anchorEl={anchor}
        open={!!anchor}
        onClose={() => setAnchor(null)}
      >
        <UserButtonContents name={name} handleClose={handleClose} />
      </Menu>
      <Toast
        open={showsToast}
        setOpen={setShowsToast}
        severity="success"
        message="¡Terminaste la sesión!"
      />
    </>
  );
}

interface UserButtonContentsProps {
  name: string;
  handleClose: (redirect: RedirectAction) => void;
}

export function UserButtonContents({
  name,
  handleClose,
}: UserButtonContentsProps) {
  if (name) {
    return (
      <>
        <MenuItem onClick={() => handleClose("dashboard")}>Dashboard</MenuItem>
        <MenuItem onClick={() => handleClose("")}>Cerrar sesión</MenuItem>
      </>
    );
  }
  return (
    <>
      <MenuItem onClick={() => handleClose("login")}>Iniciar sesión</MenuItem>
      <MenuItem onClick={() => handleClose("register")}>Registro</MenuItem>
    </>
  );
}
