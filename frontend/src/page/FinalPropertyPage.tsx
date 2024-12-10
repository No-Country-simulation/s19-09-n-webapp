import { 
  Box, 
  Typography, 
  Grid2, 
  Button, 
  Paper, 
  Divider 
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/Footer/Footer';

// Interfaz para los datos de la propiedad
interface Propiedad {
  titulo: string;
  direccion: string;
  precio: number;
  expensas: number;
  imagenes: string[];
  descripcion: string;
  servicios: string[];
  requisitos: string[];
  caracteristicas: string[];
  ubicacion: {
    lat: number;
    lng: number;
  };
}

const propiedad: Propiedad = {
  titulo: 'Alquiler 1250 Piso 5',
  direccion: 'Departamento en Alquiler - Belgrano - Capital Federal',
  precio: 120000,
  expensas: 15000,
  imagenes: [
    'https://via.placeholder.com/600x400?text=Imagen+1',
    'https://via.placeholder.com/600x400?text=Imagen+2',
    'https://via.placeholder.com/600x400?text=Imagen+3',
  ],
  descripcion: 'DUEÑO ALQUILA AMPLIO DEPARTAMENTO DE 3 AMBIENTES AL CONTRAFRENTE CON LINDO BALCÓN. Muy buena circulación, silencioso y luminoso con vista abierta. Baño y cocina hechos a nuevo.',
  servicios: ['Agua', 'Luz', 'Gas', 'Buen estado', 'Orientación Norte', 'Acepta mascotas'],
  requisitos: [
    'Mes de alquiler y mes de depósito en garantía: $300.000',
    'El sellado del contrato y honorarios de la inmobiliaria: $300.000 + IVA',
    'Garantía propietaria (excluyente) o seguro de caución (cuya suma sea igual o mayor a $400.000 o mayor a 4 veces el precio de alquiler).',
    'Garantía de GBA o CABA.',
  ],
  caracteristicas: [
    'Ubicado en piso 5 al contrafrente',
    'Piso de porcelanato',
    'Red en balcón',
    'Ventanas de aluminio',
    'Aire Acondicionado',
    'El edificio cuenta con SUM',
  ],
  ubicacion: {
    lat: -34.575, // Reemplaza con la latitud real
    lng: -58.45,  // Reemplaza con la longitud real
  },
};

function PropiedadPage() {
  return (
    <Box>
      {/* Navbar (puedes reemplazar esto con tu propia implementación) */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2 }}>
        <Navbar/>
      </Box>

      <Grid2 container spacing={2} p={2}>
        {/* Carousel de imágenes */}
        <Grid2 item xs={12} md={6}>
          <Carousel>
            {propiedad.imagenes.map((imagen, index) => (
              <Paper key={index}>
                <img src={imagen} alt={`Imagen ${index + 1}`} style={{ width: '100%' }} />
              </Paper>
            ))}
          </Carousel>
        </Grid2>

        {/* Información de la propiedad */}
        <Grid2 item xs={12} md={6}>
          <Typography variant="h4">{propiedad.titulo}</Typography>
          <Typography variant="subtitle1">{propiedad.direccion}</Typography>
          <Typography variant="h6" color="primary">
            ${propiedad.precio} + {propiedad.expensas} expensas
          </Typography>
          <Divider />
          <Typography variant="body1">{propiedad.descripcion}</Typography>
          <Typography variant="h6">Servicios:</Typography>
          <ul>
            {propiedad.servicios.map((servicio, index) => (
              <li key={index}>{servicio}</li>
            ))}
          </ul>
        </Grid2>

        {/* Mapa y requisitos */}
        <Grid2 item xs={12} md={6}>
          {/* Reemplaza esto con tu componente de mapa */}
          <Paper sx={{ height: 300 }}>
            <Typography variant="h6">Mapa - Ubicación: {propiedad.ubicacion.lat}, {propiedad.ubicacion.lng}</Typography>
          </Paper>
        </Grid2>

        <Grid2 item xs={12} md={6}>
          <Typography variant="h6">Requisitos para arrendar:</Typography>
          <ul>
            {propiedad.requisitos.map((requisito, index) => (
              <li key={index}>{requisito}</li>
            ))}
          </ul>
          <Box mt={2}>
            <Button variant="contained" color="primary">
              Contactar
            </Button>
            <Button variant="outlined" color="error" sx={{ ml: 2 }}>
              Cerrar
            </Button>
          </Box>
        </Grid2>

        {/* Caracteristicas */}
        <Grid2 item xs={12}>
          <Typography variant="h6">Características:</Typography>
          <ul>
            {propiedad.caracteristicas.map((caracteristica, index) => (
              <li key={index}>{caracteristica}</li>
            ))}
          </ul>
        </Grid2>
      </Grid2>

      {/* Pie de página (puedes reemplazar esto con tu propia implementación) */}
      <Box sx={{ bgcolor: 'grey.300', p: 2, mt: 2 }}>
        <Footer/>
      </Box>
    </Box>
  );
}

export default PropiedadPage;