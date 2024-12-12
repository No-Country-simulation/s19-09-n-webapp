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
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button } from "@mui/material";

/* import Button from "@mui/material"; */

function SearchBar() {
	const theme = useTheme();

	return (
		<form action="" >
			<Box
				component="form"
				sx={{
					position: "relative",
					display: "flex",
					flexDirection: { xs: "column", md: "row" },
					margin: "4rem 2rem 2rem 2rem",
					padding: "1rem 1rem",
					border: "2px",
					borderStyle: "solid",
					borderColor: theme.palette.primary.main,
					borderRadius: "8px",
					gap: "8px",
				}}>
				<FormControl fullWidth>
					<InputLabel id="alojamiento">Tipo de alojamiento</InputLabel>
					<Select
						labelId="alojamiento"
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
					<InputLabel id="location">Ubicación</InputLabel>
					<Select
						labelId="location"
						id="location"
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
					<InputLabel id="university">Universidad</InputLabel>
					<Select
						labelId="university"
						id="university"
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
					<InputLabel id="timelapse">Estadía</InputLabel>
					<Select
						labelId="timelapse"
						id="timelapse"
						/*     value={}
            label={}
            onChange={} */
					>
						<MenuItem value={1}>Hasta 30 días</MenuItem>
						<MenuItem value={2}>Más de 30 días</MenuItem>
					</Select>
				</FormControl>
				<Box
					component="form"
					sx={{
						display: "flex",
						flex: 1,
						gap: "8px",
						justifyContent: "space-between",
					}}>
					<Button type="submit" variant="contained" sx={{ flex: 1 }}>
						<SearchIcon sx={{ color: "#fff" }} />
					</Button>
					<Button type="submit" variant="contained" sx={{ flex: 1 }}>
						<LocationOnIcon sx={{ color: "#fff" }} />
					</Button>
				</Box>
			</Box>
		</form>
	);
}
export default SearchBar;
