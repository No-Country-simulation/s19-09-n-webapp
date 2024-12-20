import { Box, Button, Paper, Typography } from "@mui/material";

export default function Card() {
  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 3,
        overflow: "hidden",
        mt: 5,
      }}
    >
      <img src="https://via.placeholder.com/200" alt="Random" />
      <Box>
        <Typography>Nombre:</Typography>
        <Typography>Descripcion:</Typography>
        <Button variant="contained">Comprar</Button>
      </Box>
    </Paper>
  );
}
