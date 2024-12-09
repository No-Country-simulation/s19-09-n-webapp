import styled from "@emotion/styled";
import { Box, Button, Paper, Typography } from "@mui/material";


export default function Card() {

    const img = styled("img")({
      width: 200,
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
    })

  return (
    <Paper 
      sx={{ 
        display: 'flex',
        alignItems: 'center',
        gap: 3, 
        overflow: 'hidden',
        mt:5,
      }} 
    >
      <img src="https://via.placeholder.com/200" alt="Random" />
      <Box>
        <Typography>Nombre:</Typography>
        <Typography>Descripcion:</Typography>
        <Button variant="contained">Comprar</Button>

      </Box>
    </Paper>
  )
}

