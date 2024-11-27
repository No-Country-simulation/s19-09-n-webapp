import React from 'react';
import { Grid2, Card, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const provinces = [
  { name: 'Santa Fe', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/01_Ciudad_Universitaria_de_la_UNL.jpg/800px-01_Ciudad_Universitaria_de_la_UNL.jpg' },
  { name: 'Córdoba', image: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Patiocolonialcordoba.jpg' },
  { name: 'Buenos Aires', image: 'https://upload.wikimedia.org/wikipedia/commons/1/12/UBA-Facultad-Derecho.jpg' },
  { name: 'Mendoza', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/UNCUECO_23.JPG/800px-UNCUECO_23.JPG' },
  { name: 'Salta', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/UNSa_Predio_-_vista_a%C3%A9rea_2023.jpg/1024px-UNSa_Predio_-_vista_a%C3%A9rea_2023.jpg' },
  { name: 'Tucumán', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Universidad_Nacional_de_Tucum%C3%A1n.JPG/800px-Universidad_Nacional_de_Tucum%C3%A1n.JPG' },
  { name: 'Jujuy', image: 'https://noticias.unju.edu.ar/noticias/serv/notis/4692rectorado.jpg' },
  { name: 'Chaco', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Fachada_Rectorado_UNNE_2023.jpg/800px-Fachada_Rectorado_UNNE_2023.jpg' },
  { name: 'Misiones', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Ingenieria-Universidad-Nacional-de-Misiones-Obera-3.JPG/800px-Ingenieria-Universidad-Nacional-de-Misiones-Obera-3.JPG' },
  { name: 'La Rioja', image: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Rectorado_%28University_Headquarters%29_of_Universidad_de_La_Rioja_in_Logro%C3%B1o.jpg' },
  { name: 'San Juan', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpSnVasanV4yyARKKG_0GUAwFGflF4aWmiKg&s' },
  { name: 'San Luis', image: 'https://noticias.unsl.edu.ar/wp-content/uploads/2024/04/20231113-Fachada-UNSL-primavera-13.jpg' }
];

const ProvinceGrid: React.FC = () => {
  const navigate = useNavigate();

  const handleImageClick = (province: string) => {
    navigate(`universities/${province.toLowerCase()}`);
  };

  return (
    <Grid2 container spacing={2}>
      {provinces.map((province) => (
        <Grid2 size ={{ xs:12, sm:6 ,md:4, lg:3 ,xl:2}} key={province.name}>
          <Card
            onClick={() => handleImageClick(province.name)}
            sx={{
              cursor: 'pointer',
              '&:hover': { transform: 'scale(1.05)', transition: '0.3s' }
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={province.image}
              alt={province.name}
            />
            <Typography variant="h6" textAlign="center">
              {province.name}
            </Typography>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default ProvinceGrid;
