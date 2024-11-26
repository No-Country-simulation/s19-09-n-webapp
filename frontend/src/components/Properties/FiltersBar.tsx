import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Rating from "@mui/material/Rating";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import {
  MdApartment,
  MdEmojiObjects,
  MdHome,
  MdHomeWork,
  MdLocationOn,
  MdWeekend,
} from "react-icons/md";

export default function FiltersBar() {
  return (
    <Container sx={{ height: 800, bgcolor: "pink" }}>
      <Typography variant="h6" sx={{ textAlign: "start", pt: 3 }}>
        Filtrar por:
      </Typography>
      <FormControl fullWidth sx={{ my: 2 }}>
        <InputLabel id="category-label">
          <MdHomeWork /> Categoría
        </InputLabel>
        <Select labelId="category-label" id="category-select" label="Age">
          <MenuItem value="">
            <em>Todas</em>
          </MenuItem>
          <MenuItem value="house">
            <MdHome />
            Casa
          </MenuItem>
          <MenuItem value="apartment">
            <MdApartment />
            Departamento
          </MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{}}>
        <InputLabel id="category-label">
          <MdLocationOn />
          Ciudad
        </InputLabel>
        <Select labelId="category-label" id="category-select" label="Age">
          <MenuItem value="">
            <em>Todas</em>
          </MenuItem>
          <MenuItem value="buenosAires">Buenos Aires</MenuItem>
          <MenuItem value="cordoba">Córdoba</MenuItem>
          <MenuItem value="rosario">Rosario</MenuItem>
        </Select>
      </FormControl>

      <Box
        sx={{
          mt: 1,
          width: "100%",
          textAlign: "start",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormLabel sx={{ display: "" }}>
          <MdEmojiObjects style={{ marginRight: 4 }} />
          Con Servicios:
        </FormLabel>
        <Switch />
      </Box>

      <Box
        sx={{
          width: "100%",
          textAlign: "start",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormLabel sx={{ display: "" }}>
          <MdWeekend style={{ marginRight: 4 }} />
          Amueblado:
        </FormLabel>
        <Switch />
      </Box>

      <FormControl component="fieldset" sx={{ mt: 0.5, textAlign: "start", width: "100%" }}>
        <FormLabel>Calificación mínima:</FormLabel>
        <Rating
          name="rating"
          onChange={(_event, newValue) => {
            console.log(newValue);
          }}
          defaultValue={0}
        />
      </FormControl>
      <Button variant="contained" fullWidth sx={{ my: 2 }}>
        Buscar
      </Button>
      <Button variant="outlined" color="error" fullWidth sx={{ my: 2 }}>
        Reestablecer filtros
      </Button>
    </Container>
  );
}
