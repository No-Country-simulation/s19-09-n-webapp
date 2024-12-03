
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';

interface   CarouselItem {
  imageUrl: string;
  caption?: string; // Opcional
}

const items: CarouselItem[] = [
  {
    imageUrl: 'https://via.placeholder.com/150',
    caption: 'Imagen 1',
  },
  {
    imageUrl: 'https://via.placeholder.com/150',
    caption: 'Imagen 2',
  },
  {
    imageUrl: 'https://via.placeholder.com/150',
    caption: 'Imagen 3',
  },
];

function Carouselcard() {
  return (
    <Carousel
      animation="slide" 
      navButtonsAlwaysVisible={true} // Muestra los botones de navegación siempre
      
    >
      {items.map((item, index) => (
        <Paper key={index}>
          <img src={item.imageUrl} alt={item.caption || `Imagen ${index + 1}`} />
          {item.caption && <p>{item.caption}</p>} {/* Muestra el caption si existe */}
        </Paper>
      ))}
    </Carousel>
  );
}

export default Carouselcard;