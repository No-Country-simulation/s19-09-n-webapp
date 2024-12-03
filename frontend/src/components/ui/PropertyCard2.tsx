
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Chip,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";

import {
  BathtubOutlined,
  BedOutlined,
  BalconyOutlined,
  DirectionsCarFilledOutlined,
  WaterDropOutlined,
  LocalGasStationOutlined,
  WhatsApp,
  Email,
} from "@mui/icons-material";

interface PropertyCardProps {
  price: number;
  title: string;
  location: string;
  rooms: number;
  bathrooms: number;
  balconies: number;
  garages: number;
  hasWater: boolean;
  hasGas: boolean;
  imageUrls: string[]; // Cambiamos imageUrl a imageUrls para manejar múltiples imágenes
}

export default function PropertyCard2({
  price,
  title,
  location,
  rooms,
  bathrooms,
  balconies,
  garages,
  hasWater,
  hasGas,
  imageUrls,
}: PropertyCardProps) {
  return (
    <Card sx={{ display: "flex", borderRadius: 2, maxWidth: 700 , maxHeight: 280 }}>
      {/* Carrusel a la izquierda */}
      <Box sx={{ width: 300, height: 300, overflow: "hidden"}}>
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
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <CardContent>
          <Typography variant="h5" color="primary" gutterBottom>
            ${price.toLocaleString()}
          </Typography>

          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {location}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ my: 1}}>
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

          <Stack direction="row" spacing={1}>
            <Chip icon={<WhatsApp />} label="WhatsApp" clickable color="success" />
            <Chip icon={<Email />} label="Email" clickable color="primary" />
          </Stack>
        </CardContent>
      </Box>
    </Card>
  );
}
