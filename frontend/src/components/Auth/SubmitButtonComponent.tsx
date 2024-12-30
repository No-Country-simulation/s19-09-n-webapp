import { Button } from "@mui/material";

export const SubmitButtonComponent = ({
  isSubmitting, message = "Button"
}: {
  isSubmitting: boolean;
  message?: string;
}) => {
  return (
    <Button
      type="submit"
      variant="outlined"
      color="inherit"
      disabled={isSubmitting}
      sx={{
        m: 5,
        paddingY: 2,
        paddingX: { xs: 2, md: 12 },
        backgroundColor: "#6F2DA8",
        color: "white",
        "&:hover": {
          backgroundColor: "#6F2DA8",
          color: "white",
        },
        ":disabled": {
          backgroundColor: "#6F2DA890",
          cursor: "not-allowed",
          pointerEvents: "all",
        },
      }}
    >
      {isSubmitting ? "Por favor espere..." : message}
    </Button>
  );
};
