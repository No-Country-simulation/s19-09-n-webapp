import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Chip,
  Button,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import theme from "../../../theme/Theme";

import {
  BathtubOutlined,
  BedOutlined,
  BalconyOutlined,
  DirectionsCarFilledOutlined,
  WaterDropOutlined,
  LocalGasStationOutlined,
} from "@mui/icons-material";

interface PropertyCardProps {
  location: string;
  from: Date;
  to: Date;
  rooms: number;
  bathrooms: number;
  balconies: number;
  garages: number;
  hasWater: boolean;
  hasGas: boolean;
  imageUrls: string[]; // Cambiamos imageUrl a imageUrls para manejar múltiples imágenes
}

export default function DashboardReantailsCard({
  location,
  from,
  to,
  rooms,
  bathrooms,
  balconies,
  garages,
  hasWater,
  hasGas,
  imageUrls,
}: PropertyCardProps) {
  return (
    <Card
      sx={{
        margin: "1rem",
        display: "flex",
        alignItems: "center",
        border: 2,
        borderRadius: 2,
        borderStyle: "solid",
        borderColor: theme.palette.primary.main,
        maxWidth: 600,
        paddingRight: "1rem",
        boxShadow: (theme) => `
      0px 1px 3px ${theme.palette.primary.main}80, 
      0px 1px 1px ${theme.palette.primary.main}60, 
      0px 2px 1px -1px ${theme.palette.primary.main}50
    `,
      }}
    >
      {/* Carrusel a la izquierda */}
      <Box
        sx={{
          width: 250,
          overflow: "hidden",
        }}
      >
        <Carousel
          autoPlay={true}
          animation="slide"
          indicators={false}
          navButtonsAlwaysVisible={true}
        >
          {imageUrls.map((url, index) => (
            <Box
              key={index}
              component="img"
              src={url}
              alt={`Imagen ${index + 1}`}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ))}
        </Carousel>
      </Box>

      {/* Contenido a la derecha */}
      <Box sx={{ display: "flex", flex: 1 }}>
        <CardContent sx={{ paddingRight: 0 }}>
          <Typography
            variant="h5"
            color={theme.palette.secondary.main}
            gutterBottom
            sx={{ textAlign: "left" }}
          >
            {location}
          </Typography>

          <Box sx={{ display: "flex", flex: 1 }}>
            <Box sx={{ display: "flex", flex: 1, paddingRight: "1rem" }}>
              <Typography sx={{ paddingRight: "0.25rem" }}>Desde:</Typography>
              <Typography color="text.secondary" gutterBottom>
                {from.toLocaleDateString()}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flex: 1 }}>
              <Typography sx={{ paddingRight: "0.25rem" }}>Hasta:</Typography>
              <Typography color="text.secondary" gutterBottom>
                {to.toLocaleDateString()}
              </Typography>
            </Box>
          </Box>

          <Stack direction="row" spacing={1} sx={{ my: 1 }}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <BedOutlined />
              <Typography>{rooms}</Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={0.5}>
              <BathtubOutlined />
              <Typography>{bathrooms}</Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={0.5}>
              <BalconyOutlined />
              <Typography>{balconies}</Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={0.5}>
              <DirectionsCarFilledOutlined />
              <Typography>{garages}</Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            {hasWater && (
              <Chip
                icon={<WaterDropOutlined />}
                label="Agua"
                variant="outlined"
                size="small"
              />
            )}
            {hasGas && (
              <Chip
                icon={<LocalGasStationOutlined />}
                label="Gas"
                variant="outlined"
                size="small"
              />
            )}
          </Stack>
          <Box sx={{ textAlign: "right" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary.main,
                borderRadius: "2rem",
              }}
            >
              Finalizar renta
            </Button>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}
