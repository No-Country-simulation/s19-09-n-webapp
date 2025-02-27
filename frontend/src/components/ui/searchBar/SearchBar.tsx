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

import axios from "axios";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { locations, timeLapse } from "./constants";
import { useNavigate } from "react-router-dom";

type FormData = {
	property_type: string;
	city: string;
	university: string;
	rentalPeriod: string;
};

function SearchBar() {
	const theme = useTheme();
	const navigate = useNavigate();
	const [universities, setUniversities] = useState<
		{ id: number; name: string }[]
	>([]);
	const { control, handleSubmit } = useForm<FormData>();

	useEffect(() => {
		axios
			.get("https://s19-09-n-back.vercel.app/api/v1/univ")
			.then((res) => {
				setUniversities(res.data);
			})
			.catch((error) => {
				console.log("Error al obtener los datos:", error);
			});
	}, []);

	const SearchProperty = (data: FormData) => {
		const filteredData = Object.fromEntries(
			Object.entries(data).filter(
				([, value]) => value !== "" && value !== undefined
			)
		);

		const searchParams = new URLSearchParams(
			filteredData as Record<string, string>
		).toString();

		navigate(`/properties?${searchParams}`);
	};

	return (
		<form onSubmit={handleSubmit(SearchProperty)}>
			<Box
				component="div"
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
					<InputLabel id="property_type">Tipo de alojamiento</InputLabel>
					<Controller
						name="property_type"
						defaultValue=""
						control={control}
						render={({ field }) => (
							<Select labelId="property_type" id="property_type" {...field}>
								<MenuItem value="">Todos</MenuItem>
								<MenuItem value="ROOM">
									<BedIcon
										sx={{
											fontSize: "medium",
											color: theme.palette.primary.main,
											paddingRight: "4px",
										}}
									/>
									Habitación
								</MenuItem>
								<MenuItem value="APARTMENT">
									<ApartmentIcon
										sx={{
											fontSize: "medium",
											color: theme.palette.primary.main,
											paddingRight: "4px",
										}}
									/>
									Departamento
								</MenuItem>
								<MenuItem value="HOME">
									<HouseIcon
										sx={{
											fontSize: "medium",
											color: theme.palette.primary.main,
											paddingRight: "4px",
										}}
									/>
									Casa
								</MenuItem>
							</Select>
						)}></Controller>
				</FormControl>

				<FormControl fullWidth>
					<InputLabel id="city">Ubicación</InputLabel>
					<Controller
						name="city"
						defaultValue=""
						control={control}
						render={({ field }) => (
							<Select labelId="city" id="city" {...field}>
								<MenuItem value="">Seleccionar</MenuItem>
								{locations.map((location: { value: string; label: string }) => (
									<MenuItem key={location.value} value={location.value}>
										{location.label}
									</MenuItem>
								))}
							</Select>
						)}></Controller>
				</FormControl>

				<FormControl fullWidth>
					<InputLabel id="university">Universidad</InputLabel>
					<Controller
						name="university"
						defaultValue=""
						control={control}
						render={({ field }) => (
							<Select labelId="university" id="university" {...field}>
								<MenuItem value="">Seleccionar</MenuItem>
								{universities.map(
									(university: { id: number; name: string }) => (
										<MenuItem key={university.id} value={university.id}>
											{university.name}
										</MenuItem>
									)
								)}
							</Select>
						)}></Controller>
				</FormControl>

				<FormControl fullWidth>
					<InputLabel id="rentalPeriod">Estadía</InputLabel>
					<Controller
						name="rentalPeriod"
						defaultValue=""
						control={control}
						render={({ field }) => (
							<Select labelId="rentalPeriod" id="rentalPeriod" {...field}>
								<MenuItem value="">Seleccionar</MenuItem>
								{timeLapse.map(
									(timeLapse: { value: string; label: string }) => (
										<MenuItem key={timeLapse.value} value={timeLapse.value}>
											{timeLapse.label}
										</MenuItem>
									)
								)}
							</Select>
						)}></Controller>
				</FormControl>

				<Box
					component="div"
					sx={{
						display: "flex",
						flex: 1,
						gap: "8px",
						justifyContent: "space-between",
					}}>
					<Button type="submit" variant="contained" sx={{ flex: 1 }}>
						<SearchIcon sx={{ color: "#fff" }} />
					</Button>
					<Button type="button" variant="contained" sx={{ flex: 1 }}>
						<LocationOnIcon sx={{ color: "#fff" }} />
					</Button>
				</Box>
			</Box>
		</form>
	);
}
export default SearchBar;
