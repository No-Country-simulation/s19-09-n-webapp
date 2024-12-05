import React, { useState } from 'react';
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Container,
  FormGroup,
  FormControlLabel,
  Checkbox,
  ImageList,
  ImageListItem,
  TextareaAutosize,
} from '@mui/material';

interface Property {
  propertyType: string;
  title: string;
  address: string;
  services: string[];
  nearbyEntities: string[];
  security: string[];
  images: File[];
}

const RegisterProperty: React.FC = () => {
  const [property, setProperty] = useState<Property>({
    propertyType: '',
    title: '',
    address: '',
    services: [],
    nearbyEntities: [],
    security: [],
    images: [],
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProperty({
      ...property,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setProperty((prevProperty) => ({
      ...prevProperty,
      [name]: checked
        ? [...prevProperty[name], event.target.value]
        : prevProperty[name].filter((value) => value !== event.target.value),
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newImages = Array.from(event.target.files);
      if (newImages.length + property.images.length <= 10) {
        setProperty({ ...property, images: [...property.images, ...newImages] });
      } else {
        // Mostrar un mensaje de error al usuario si se excede el límite de imágenes
        alert('Solo puedes subir un máximo de 10 imágenes.');
      }
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aquí puedes realizar la lógica para enviar los datos del formulario,
    // como guardar la propiedad en una base de datos.
    console.log(property);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cargar Propiedad
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="propertyType-label">Tipo de Propiedad</InputLabel>
            <Select
              labelId="propertyType-label"
              id="propertyType"
              name="propertyType"
              value={property.propertyType}
              onChange={handleInputChange}
              label="Tipo de Propiedad"
              required
            >
              <MenuItem value="dormitorio">Dormitorio</MenuItem>
              <MenuItem value="homestudio">Home Studio</MenuItem>
              <MenuItem value="departamento">Departamento</MenuItem>
              <MenuItem value="casa">Casa</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Título"
            name="title"
            value={property.title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Dirección"
            name="address"
            value={property.address}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />

          <TextareaAutosize
            aria-label="Descripción de la propiedad"
            placeholder="Descripción de la propiedad"
            name="description"
            value={property.description}
            onChange={handleInputChange}
            minRows={5}
            style={{ width: '100%', marginTop: '1rem' }}
          />

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Servicios Activos
          </Typography>
          <FormGroup>
            {['luz', 'agua', 'internet', 'transporte publico', 'metro', 'taxi'].map((service) => (
              <FormControlLabel
                key={service}
                control={
                  <Checkbox
                    checked={property.services.includes(service)}
                    onChange={handleCheckboxChange}
                    name="services"
                    value={service}
                  />
                }
                label={service}
              />
            ))}
          </FormGroup>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Entidades Cercanas
          </Typography>
          <FormGroup>
            {['bancos', 'universidades', 'restaurantes', 'gimnasios', 'parques'].map((entity) => (
              <FormControlLabel
                key={entity}
                control={
                  <Checkbox
                    checked={property.nearbyEntities.includes(entity)}
                    onChange={handleCheckboxChange}
                    name="nearbyEntities"
                    value={entity}
                  />
                }
                label={entity}
              />
            ))}
          </FormGroup>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Seguridad
          </Typography>
          <FormGroup>
            {['vigilancia 24/7', 'cctv'].map((security) => (
              <FormControlLabel
                key={security}
                control={
                  <Checkbox
                    checked={property.security.includes(security)}
                    onChange={handleCheckboxChange}
                    name="security"
                    value={security}
                  />
                }
                label={security}
              />
            ))}
          </FormGroup>

          <Button variant="contained" component="label" sx={{ mt: 2 }}>
            Subir Imágenes
            <input
              type="file"
              hidden
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </Button>

          {property.images.length > 0 && (
            <ImageList cols={3} rowHeight={100} sx={{ mt: 2 }}>
              {property.images.map((image, index) => (
                <ImageListItem key={index}>
                  <img src={URL.createObjectURL(image)} alt={`Imagen ${index + 1}`} loading="lazy" />
                </ImageListItem>
              ))}
            </ImageList>
          )}

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Guardar Propiedad
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterProperty;