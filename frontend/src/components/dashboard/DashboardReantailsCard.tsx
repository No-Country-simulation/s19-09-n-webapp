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
import theme from "../../theme/Theme";

import {
  BathtubOutlined,
  BedOutlined,
  BalconyOutlined,
  DirectionsCarFilledOutlined,
  WaterDropOutlined,
  LocalGasStationOutlined,
} from "@mui/icons-material";

interface RentailsPlaceholderProps {
  location: string;
  /*   from: Date;
  to: Date; */
  rooms: number;
  bathrooms: number;
  balconies: number;
  garages: number;
  hasWater: boolean;
  hasGas: boolean;
  imageUrl: string; // Cambiamos imageUrl a imageUrls para manejar múltiples imágenes
}

interface UserRentailsCardProps {
  property: RentailsPlaceholderProps;
}

export default function DashboardReantailsCard({
  property,
}: UserRentailsCardProps) {
  return (
    <Card
      sx={{
        margin: "1rem 0rem",
        display: "flex",
        alignItems: "center",
        borderRadius: 2,
        paddingRight: "1rem",
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
          autoPlay={false}
          animation="slide"
          indicators={false}
          navButtonsAlwaysVisible={true}
        >
          {/* Mostrar la única imagen proporcionada */}
          <Box
            component="img"
            src={property.imageUrl}
            alt={`Imagen de ${property.location}`}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Carousel>
      </Box>
      {/*   Contenido a la derecha */}
      <Box sx={{ display: "flex", flex: 1, width: "100%" }}>
        <CardContent sx={{ paddingRight: "1rem", width: "100%" }}>
          <Typography
            variant="h5"
            color={theme.palette.secondary.main}
            gutterBottom
            sx={{ textAlign: "left" }}
          >
            {property.location}
          </Typography>

          <Box sx={{ display: "flex", flex: 1, maxWidth: "350px" }}>
            <Box
              sx={{
                display: "flex",
                flex: 1,
                boxSizing: "border-box",
                paddingRight: "1rem",
              }}
            >
              <Typography sx={{ paddingRight: "0.25rem" }}>Desde:</Typography>
              <Typography color="text.secondary" gutterBottom>
                {/* from.toLocaleDateString() */}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flex: 1 }}>
              <Typography sx={{ paddingRight: "0.25rem" }}>Hasta:</Typography>
              <Typography color="text.secondary" gutterBottom>
                {/* to.toLocaleDateString() */}
              </Typography>
            </Box>
          </Box>

          <Stack direction="row" spacing={1} sx={{ my: 1 }}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <BedOutlined />
              <Typography>{property.rooms}</Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={0.5}>
              <BathtubOutlined />
              <Typography>{property.bathrooms}</Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={0.5}>
              <BalconyOutlined />
              <Typography>{property.balconies}</Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={0.5}>
              <DirectionsCarFilledOutlined />
              <Typography>{property.garages}</Typography>
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

/* export default function DashboardReantailsCard({
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
        margin: "1rem 0rem",
        display: "flex",
        alignItems: "center",
        borderRadius: 2,
        paddingRight: "1rem",
      }}
    >
      //Carrusel a la izquierda
      <Box
        sx={{
          width: 250,
          overflow: "hidden",
        }}
      >
        <Carousel
          autoPlay={false}
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
      // Contenido a la derecha
      <Box sx={{ display: "flex", flex: 1, width: "100%" }}>
        <CardContent sx={{ paddingRight: "1rem", width: "100%" }}>
          <Typography
            variant="h5"
            color={theme.palette.secondary.main}
            gutterBottom
            sx={{ textAlign: "left" }}
          >
            {location}
          </Typography>

          <Box sx={{ display: "flex", flex: 1, maxWidth: "350px" }}>
            <Box
              sx={{
                display: "flex",
                flex: 1,
                boxSizing: "border-box",
                paddingRight: "1rem",
              }}
            >
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
 */
