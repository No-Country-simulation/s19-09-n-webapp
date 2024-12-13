import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Box,
  Typography,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControl,
  FormControlLabel,
  Checkbox,
  Button,
  Switch,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { propertyRegistrationValues } from "../Data/propertyRegistrationValues";
import { postProperty, postPropertyImg } from "../services/propertiesService";

interface PropertyFormProps {
  toggleToast: (state: boolean) => void;
  token: string;
  open: boolean;
  closeDialog: () => void;
}

export default function PropertyForm({
  toggleToast,
  open,
  closeDialog,
  token,
}: PropertyFormProps) {
  const { register: registerFields, watch, getValues: getFields } = useForm();
  const {
    register: registerImg,
    getValues: getImg,
    watch: watchImg,
  } = useForm();
  const {
    title,
    address,
    city,
    property_type,
    min_rental_period,
    payment_by_period,
    spaces,
    is_furnished,
    is_services_included,
    services,
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

  async function onSubmit() {
    const fields = getFields();
    const img = getImg();
    console.log(fields);
    console.log(img);
    const newProperty = await postProperty(fields, token);
    const id = newProperty.id;
    await postPropertyImg(token, img, id);
    closeDialog();
    toggleToast(true);
  }

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
              {...registerFields("property_type")}
              label={property_type.label}
              required
              defaultValue=""
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
            <Select
              {...registerFields("city")}
              label={city.label}
              required
              defaultValue=""
            >
              {Object.entries(min_rental_period.values).map(([key, value]) => (
                <MenuItem key={key} value={value}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label={title.label}
            {...registerFields("title")}
            fullWidth
            required
            sx={{ my: 1 }}
          />

          <TextField
            label={address.label}
            {...registerFields("address")}
            fullWidth
            required
            sx={{ my: 1 }}
          />

          <FormControl fullWidth sx={{ my: 1, width: 9 / 20 }}>
            <InputLabel>{min_rental_period.label}</InputLabel>
            <Select
              {...registerFields("min_rental_period")}
              label={min_rental_period.label}
              required
              defaultValue=""
            >
              {Object.entries(min_rental_period.values).map(([key, value]) => (
                <MenuItem key={key} value={value}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label={payment_by_period.label}
            {...registerFields("payment_by_period")}
            required
            sx={{ my: 1, width: 9 / 20 }}
          />

          <Box sx={{ my: 3, width: "100%" }}>
            <Typography
              variant="h6"
              component="p"
              sx={{ mb: 1, width: "100%" }}
            >
              {spaces.label}
            </Typography>

            <FormGroup row>
              <FormControl
                size="small"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 1,
                  alignItems: "center",
                  mr: 2,
                }}
              >
                <Select {...registerFields("rooms")} required defaultValue="">
                  {Object.entries(spaces.space.room.values).map(
                    ([key, value]) => (
                      <MenuItem key={key} value={value}>
                        {key}
                      </MenuItem>
                    )
                  )}
                </Select>
                <Typography>{spaces.space.room.label}</Typography>
              </FormControl>

              <FormControl
                size="small"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 1,
                  alignItems: "center",
                  mr: 2,
                }}
              >
                <Select
                  {...registerFields("bathrooms")}
                  required
                  defaultValue=""
                >
                  {Object.entries(spaces.space.bathroom.values).map(
                    ([key, value]) => (
                      <MenuItem key={key} value={value}>
                        {key}
                      </MenuItem>
                    )
                  )}
                </Select>
                <Typography>{spaces.space.bathroom.label}</Typography>
              </FormControl>

              {Object.entries(spaces.space.nonEssential).map(([key, value]) => (
                <FormControlLabel
                  key={key}
                  control={
                    <Checkbox
                      {...registerFields("nonEssential")}
                      value={value}
                    />
                  }
                  label={key}
                  slotProps={{ typography: { ml: -0.5 } }}
                />
              ))}
            </FormGroup>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
              mb: 1,
            }}
          >
            <FormControlLabel
              {...registerFields("is_furnished")}
              control={<Switch />}
              labelPlacement="start"
              label={is_furnished.label}
              slotProps={{ typography: { mr: 1 } }}
            />

            <FormControlLabel
              {...registerFields("is_services_included")}
              control={<Switch />}
              labelPlacement="start"
              label={is_services_included.label}
              sx={{ mr: 3 }}
              slotProps={{ typography: { mr: 1 } }}
            />
          </Box>

          <Box
            sx={{
              mt: 1,
              mb: 2,
              width: "100%",
              display:
                watch("is_services_included") === true ? "normal" : "none",
            }}
          >
            <Typography
              variant="h6"
              component="p"
              sx={{ mb: 1, width: "100%" }}
            >
              {services.label}
            </Typography>

            <FormGroup row>
              {Object.entries(services.values).map(([key, value]) => (
                <FormControlLabel
                  key={key}
                  control={
                    <Checkbox {...registerFields("services")} value={value} />
                  }
                  label={key}
                  slotProps={{ typography: { ml: -0.5 } }}
                />
              ))}
            </FormGroup>
          </Box>

          <Button variant="text" component="label" sx={{ mt: 2 }}>
            Cargar fotografía
            <input
              {...registerImg("file")}
              type="file"
              hidden
              accept="image/*"
              /* onChange={handleImageChange} */
            />
          </Button>

          <ImageList cols={3} rowHeight={100} sx={{ mt: 2 }}>
            {watchImg("file") && (
              <ImageListItem>
                <img
                  src={URL.createObjectURL(watchImg("file"))}
                  loading="lazy"
                />
              </ImageListItem>
            )}
          </ImageList>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={closeDialog}
          type="button"
          variant="outlined"
          color="error"
          sx={{ margin: 2 }}
        >
          Cancelar
        </Button>
        <Button
          onClick={onSubmit}
          type="button"
          variant="contained"
          color="primary"
          sx={{ margin: 2 }}
        >
          Guardar Propiedad
        </Button>
      </DialogActions>
    </Dialog>
  );
}
