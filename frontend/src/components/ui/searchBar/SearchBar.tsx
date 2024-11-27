import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HouseIcon from "@mui/icons-material/House";
import BedIcon from "@mui/icons-material/Bed";
import SearchIcon from "@mui/icons-material/Search";
<<<<<<< HEAD
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button } from "@mui/material";
=======
import { Button, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
>>>>>>> frontend
/* import Button from "@mui/material"; */

function SearchBar() {
  const theme = useTheme();

  return (
    <Box
      component="form"
      sx={{
        position: "relative",
        display: "flex",
        margin: "4rem 2rem 2rem 2rem",
        padding: "1rem 1rem",
        border: "2px",
        borderStyle: "solid",
        borderColor: theme.palette.primary.main,
        borderRadius: "8px",
        gap: "8px",
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="alojamiento">Tipo de alojamiento</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="alojamiento"
          /*     value={}
            label={}
            onChange={} */
        >
          <MenuItem value={1}>
            <BedIcon
              sx={{
                fontSize: "medium",
                color: theme.palette.primary.main,
                paddingRight: "4px",
              }}
            />
            Habitación
          </MenuItem>
          <MenuItem value={2}>
            <ApartmentIcon
              sx={{
                fontSize: "medium",
                color: theme.palette.primary.main,
                paddingRight: "4px",
              }}
            />
            Departamento
          </MenuItem>
          <MenuItem value={3}>
            <HouseIcon
              sx={{
                fontSize: "medium",
                color: theme.palette.primary.main,
                paddingRight: "4px",
              }}
            />
            Casa
          </MenuItem>
          <MenuItem value={4}>Todos</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="Ubicacion">Ubicación</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="Ubicacion"
          /*     value={}
            label={}
            onChange={} */
        >
          <MenuItem value={1}>Buenos Aires</MenuItem>
          <MenuItem value={2}>Capital</MenuItem>
          <MenuItem value={3}>Córdoba</MenuItem>
          <MenuItem value={4}>Santiago de Chile</MenuItem>
          <MenuItem value={5}>México D.F.</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="Ubicacion">Universidad (logica)</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="Ubicacion"
          /*     value={}
            label={}
            onChange={} */
        >
          <MenuItem value={1}>Buenos Aires</MenuItem>
          <MenuItem value={2}>Capital</MenuItem>
          <MenuItem value={3}>Córdoba</MenuItem>
          <MenuItem value={4}>Santiago de Chile</MenuItem>
          <MenuItem value={5}>México D.F.</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="Ubicacion">Estadía</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="Ubicacion"
          /*     value={}
            label={}
            onChange={} */
        >
          <MenuItem value={1}>Hasta 30 días</MenuItem>
          <MenuItem value={2}>Más de 30 días</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained">
        <SearchIcon />
      </Button>
      <Button type="submit" variant="contained">
        <LocationOnIcon />
      </Button>
    </Box>
  );
}
export default SearchBar;
