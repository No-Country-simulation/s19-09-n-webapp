import {
  Grid2,
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
  /* ImageListItem, */
  TextareaAutosize,
} from "@mui/material";

const RegisterProperty: React.FC = () => {
  /* const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newImages = Array.from(event.target.files);
      if (newImages.length + property.images.length <= 10) {
        setProperty({ ...property, images: [...property.images, ...newImages] });
      } else {
        // Mostrar un mensaje de error al usuario si se excede el límite de imágenes
        alert('Solo puedes subir un máximo de 10 imágenes.');
      }
    }
  }; */

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cargar Propiedad
        </Typography>
        <form>
          <FormControl fullWidth margin="normal">
            <InputLabel id="propertyType-label">Tipo de Propiedad</InputLabel>
            <Select
              labelId="propertyType-label"
              id="propertyType"
              name="propertyType"
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
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Dirección"
            name="address"
            fullWidth
            margin="normal"
            required
          />

          <TextareaAutosize
            /* label="Descripción de la propiedad" */
            placeholder="Descripción"
            minRows={5}
            style={{ width: "100%", marginTop: "1rem" }}
          />

          <Grid2 container spacing={1}>
            <Grid2 size={{ xs: 12, sm: 9, md: 6 }}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Amenidades
              </Typography>
              <FormGroup>
                {[
                  "Piscina",
                  "Asaderas",
                  "Sala de Eventos",
                  "Co-work",
                  "Gimnasio",
                  "Sala de Juegos",
                ].map((service) => (
                  <FormControlLabel
                    key={service}
                    control={<Checkbox name="services" value={service} />}
                    label={service}
                  />
                ))}
              </FormGroup>
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Servicios Activos
              </Typography>
              <FormGroup>
                {[
                  "luz",
                  "agua",
                  "internet",
                  "transporte publico",
                  "metro",
                  "taxi",
                ].map((service) => (
                  <FormControlLabel
                    key={service}
                    control={<Checkbox name="services" value={service} />}
                    label={service}
                  />
                ))}
              </FormGroup>
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Entidades Cercanas
              </Typography>
              <FormGroup>
                {[
                  "bancos",
                  "universidades",
                  "restaurantes",
                  "gimnasios",
                  "parques",
                ].map((entity) => (
                  <FormControlLabel
                    key={entity}
                    control={<Checkbox name="nearbyEntities" value={entity} />}
                    label={entity}
                  />
                ))}
              </FormGroup>
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Seguridad
              </Typography>
              <FormGroup>
                {["vigilancia 24/7", "cctv"].map((security) => (
                  <FormControlLabel
                    key={security}
                    control={<Checkbox name="security" value={security} />}
                    label={security}
                  />
                ))}
              </FormGroup>
            </Grid2>
          </Grid2>

          <Button variant="contained" component="label" sx={{ mt: 2 }}>
            Subir Imágenes
            <input
              type="file"
              hidden
              accept="image/*"
              multiple
              /* onChange={handleImageChange} */
            />
          </Button>

          <ImageList cols={3} rowHeight={100} sx={{ mt: 2 }}>
            <img src="" alt="" />
            {/* {property.images.map((image, index) => (
              <ImageListItem key={index}>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Imagen ${index + 1}`}
                  loading="lazy"
                />
              </ImageListItem>
            ))} */}
          </ImageList>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Guardar Propiedad
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterProperty;
