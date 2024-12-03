import { Card, CardContent, CardMedia, Typography, Box, Stack, Chip } from '@mui/material'

import { 
  BathtubOutlined, 
  BedOutlined,
  BalconyOutlined,
  DirectionsCarFilledOutlined,
  WaterDropOutlined,
  LocalGasStationOutlined,
  WhatsApp,
  Email
} from '@mui/icons-material'

interface PropertyCardProps {
  price: number
  title: string
  location: string
  rooms: number
  bathrooms: number
  balconies: number
  garages: number
  hasWater: boolean
  hasGas: boolean
  imageUrl: string
}

export default function PropertyCard({
  price,
  title,
  location,
  rooms,
  bathrooms,
  balconies, 
  garages,
  hasWater,
  hasGas,
  imageUrl
}: PropertyCardProps) {
  return (
    <Card sx={{ maxWidth: 300, borderRadius: 2 }}>
      <CardMedia
        component="img"
        height="280"
        image={imageUrl}
        alt={title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography variant="h4" color="primary" gutterBottom>
          ${price.toLocaleString()}
        </Typography>
        
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {location}
        </Typography>

        <Stack direction="row" spacing={3} sx={{ my: 2 }}>
          <Box display="flex" alignItems="center" gap={0.5}>
            <BedOutlined />
            <Typography>{rooms}m</Typography>
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
            <Typography>{garages} </Typography>
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
          <Chip
            icon={<WhatsApp />}
            label="WhatsApp"
            clickable
            color="success"
          />
          <Chip
            icon={<Email />}
            label="Email"
            clickable
            color="primary"
          />
        </Stack>
      </CardContent>
    </Card>
  )
}

