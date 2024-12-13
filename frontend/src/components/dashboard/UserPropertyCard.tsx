import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Stack,
  Chip,
  IconButton,
} from "@mui/material";

import {
  BathtubOutlined,
  BedOutlined,
  BalconyOutlined,
  DirectionsCarFilledOutlined,
  WaterDropOutlined,
  PropaneOutlined,
  EditOutlined
} from "@mui/icons-material";

interface PropertyPlaceholderProps {
  price: number;
  title: string;
  location: string;
  rooms: number;
  bathrooms: number;
  balconies: number;
  garages: number;
  hasWater: boolean;
  hasGas: boolean;
  imageUrl: string;
}

interface UserPropertyCardProps {
  property: PropertyPlaceholderProps;
}

export default function UserPropertyCard({ property }: UserPropertyCardProps) {
  return (
    <Card
      sx={{
        display: "flex",
        borderRadius: 2,
        maxHeight: 200,
      }}
    >
      {/* Carrusel a la izquierda */}
      <CardMedia
        sx={{ width: 200 }}
        component="img"
        image={property.imageUrl}
        alt={property.title}
      />

      {/* Contenido a la derecha */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          textAlign: "start",
        }}
      >
        <CardContent>
          <Typography variant="h5" color="primary" gutterBottom>
            ${property.price.toLocaleString()}
          </Typography>

          <Typography variant="h6" gutterBottom>
            {property.title}
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {property.location}
          </Typography>

          <Stack direction="row" spacing={1.5} sx={{ my: 1 }}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <Typography>{property.rooms}</Typography>
              <BedOutlined />
            </Box>

            <Box display="flex" alignItems="center" gap={0.5}>
              <Typography>{property.bathrooms}</Typography>
              <BathtubOutlined />
            </Box>

            <Box display="flex" alignItems="center" gap={0.5}>
              <Typography>{property.balconies}</Typography>
              <BalconyOutlined />
            </Box>

            <Box display="flex" alignItems="center" gap={0.5}>
              <Typography>{property.garages}</Typography>
              <DirectionsCarFilledOutlined />
            </Box>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            {property.hasWater && (
              <Chip
                icon={<WaterDropOutlined />}
                label="Agua"
                variant="outlined"
                size="small"
              />
            )}
            {property.hasGas && (
              <Chip
                icon={<PropaneOutlined />}
                label="Gas"
                variant="outlined"
                size="small"
              />
            )}
          </Stack>
        </CardContent>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column-reverse", margin: 1}}>
        <IconButton color="primary"
          sx={{ aspectRatio: 1, borderRadius: 8 }}
        >
          <EditOutlined />
        </IconButton>
      </Box>
    </Card>
  );
}
