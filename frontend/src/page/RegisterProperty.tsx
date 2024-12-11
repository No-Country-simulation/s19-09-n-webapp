import {
  Dialog,
  DialogActions,
  Grid2,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  ImageList,
  /* ImageListItem, */
  TextareaAutosize,
  DialogTitle,
  DialogContent
} from "@mui/material";
import {useForm} from "react-hook-form";

interface PropertyFormProps {
  open: boolean,
  closeDialog: () => void,
}

export default function PropertyForm({open, closeDialog}: PropertyFormProps) {
  const {register} = useForm();
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
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>Registrar Nueva Propiedad</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel id="propertyType-label">Tipo de Propiedad</InputLabel>
          <Select name="propertyType" label="Tipo de Propiedad" required>
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
                  control={<Checkbox {...register("amenidades")} value={service} />}
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
                  control={<Checkbox defaultChecked={false} name="services" value={service} />}
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
        <input type="checkbox"/>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={closeDialog}
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Guardar Propiedad
        </Button>
      </DialogActions>
    </Dialog>
  );
}

