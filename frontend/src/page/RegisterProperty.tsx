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
  DialogTitle,
  DialogContent,
  Box,
  Switch
} from "@mui/material";
import { useForm } from "react-hook-form";
import { propertyRegistrationValues } from "../Data/propertyRegistrationValues";

interface PropertyFormProps {
  open: boolean;
  closeDialog: () => void;
}

export default function PropertyForm({ open, closeDialog }: PropertyFormProps) {
  const { register } = useForm();
  const {
    title,
    address,
    city,
    property_type,
    // max_occupants,
    payment_by_period,
    min_rental_period,
    // rooms,
    is_services_included,
    services,
    is_furnished,
    // near_universities,
  } = propertyRegistrationValues;
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
      <DialogTitle>Nueva Propiedad</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            m: 1,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <FormControl sx={{ my: 1, width: 9 / 20 }}>
            <InputLabel>{property_type.label}</InputLabel>
            <Select
              {...register("property_type")}
              label={property_type.label}
              required
            >
              {Object.entries(property_type.values).map(([key, value]) => (
                <MenuItem key={key} value={value}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ my: 1, width: 9 / 20 }}>
            <InputLabel>{city.label}</InputLabel>
            <Select {...register("city")} label={city.label} required>
              {Object.entries(min_rental_period.values).map(([key, value]) => (
                <MenuItem key={key} value={value}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label={title.label}
            {...register("title")}
            fullWidth
            required
            sx={{ my: 1 }}
          />

          <TextField
            label={address.label}
            {...register("address")}
            fullWidth
            required
            sx={{ my: 1 }}
          />

          <FormControl fullWidth sx={{ my: 1, width: 9 / 20 }}>
            <InputLabel>{min_rental_period.label}</InputLabel>
            <Select {...register("min_rental_period")} label={min_rental_period.label} required>
              {Object.entries(min_rental_period.values).map(([key, value]) => (
                <MenuItem key={key} value={value}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <TextField
            label={payment_by_period.label}
            {...register("payment_by_period")}
            required
            sx={{ my: 1, width: 9 / 20 }}
          />

          <FormControlLabel
            {...register("is_furnished")}
              control={<Switch />}
              labelPlacement="start"
              label={is_furnished.label}
              sx={{ml: 1}}
              slotProps={{typography: {mr: 1}}}
            />

            <FormControlLabel
            {...register("is_services_included")}
              control={<Switch />}
              labelPlacement="start"
              label={is_services_included.label}
              slotProps={{typography: {mr: 1}}}
            />

          <Grid2 container columns={3} spacing={1} sx={{ my: 1,  }}>

            <Grid2 size={{ xs: 1 }}>
              <Typography
                variant="h6"
                component="span"
                gutterBottom
                sx={{ mt: 2 }}
              >
                Básicos
              </Typography>
              <FormGroup>
                {(Object.entries(services.values)).map(([key, value]) => (
                  <FormControlLabel
                    key={key}
                    control={
                      <Checkbox
                        defaultChecked={false}
                        name="services"
                        value={value}
                      />
                    }
                    label={key}
                  />
                ))}
              </FormGroup>
            </Grid2>

            <Grid2 size={{ xs: 1 }}>
              <Typography
                variant="h6"
                component="span"
                gutterBottom
                sx={{ mt: 2 }}
              >
                Amenidades
              </Typography>
              <FormGroup>
                {[
                  "Piscina",
                  "Asaderas",
                  "Estudio",
                  "Gimnasio",
                  "Sala de juegos",
                ].map((service) => (
                  <FormControlLabel
                    key={service}
                    control={
                      <Checkbox {...register("amenidades")} value={service} />
                    }
                    label={service}
                  />
                ))}
              </FormGroup>
            </Grid2>

            {/* <Grid2 size={{ xs: 1 }}>
            <Typography
              variant="h6"
              component="span"
              gutterBottom
              sx={{ mt: 2 }}
            >
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
          </Grid2> */}

            <Grid2 size={{ xs: 1 }}>
              <Typography
                variant="h6"
                component="span"
                gutterBottom
                sx={{ mt: 2 }}
              >
                Seguridad
              </Typography>
              <FormGroup>
                {["Vigilancia 24/7", "Cctv"].map((security) => (
                  <FormControlLabel
                    key={security}
                    control={<Checkbox />}
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
        </Box>
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
