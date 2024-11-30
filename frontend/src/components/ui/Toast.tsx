import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

interface ToastProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  severity?: "error" | "info" | "success" | "warning";
  message: string;
}

export function Toast({ open, setOpen, severity = "success", message }: ToastProps) {
  return (
    <Snackbar
      open={open}
      onClose={() => setOpen(!open)}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
}
