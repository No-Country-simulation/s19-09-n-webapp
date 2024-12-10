import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Rating from "@mui/material/Rating";
import Select from "@mui/material/Select";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { filterLabels } from "../../Data/filterValues";
import { useForm } from "react-hook-form";
import OutlinedInput from "@mui/material/OutlinedInput";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import WeekendOutlinedIcon from '@mui/icons-material/WeekendOutlined';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useFilters } from "../../hooks/useFilters";

export default function FiltersBar() {
  const {filters, updateFilters, resetFilters} = useFilters();
  const { register, handleSubmit } = useForm({defaultValues: filters});

  return (
    <Container
      component="form"
      onSubmit={handleSubmit(updateFilters)}
      sx={{ height: 800, bgcolor: "#eee", borderRadius: 1 }}
    >
      <Typography variant="h6" sx={{ textAlign: "start", pt: 3, mb: 1 }}>
        Filtrar por:
      </Typography>

      <FormControl fullWidth sx={{ my: 1 }}>
        <InputLabel>
          <LocationOnOutlinedIcon />
          <span style={{ position: "relative", bottom: 5, marginLeft: 5 }}>
            {filterLabels.city.label}
          </span>
        </InputLabel>
        <Select label={`${filterLabels.city.label}____`} {...register("city")}>
          {Object.entries(filterLabels.city.cities).map(([key, value]) => (
            <MenuItem key={key} value={value}>
              {value !== undefined ? key : <em>{key}</em>}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ my: 1 }}>
        <InputLabel>
          <HomeOutlinedIcon />
          <span style={{ position: "relative", bottom: 5, marginLeft: 5 }}>
            {filterLabels.type.label}
          </span>
        </InputLabel>
        <Select
          label={`${filterLabels.type.label}____`}
          {...register("property_type")}
        >
          {Object.entries(filterLabels.type.types).map(([key, value]) => (
            <MenuItem key={key} value={value}>
              {value !== undefined ? key : <em>{key}</em>}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ my: 1 }}>
        <InputLabel>
          <CalendarMonthOutlinedIcon />
          <span style={{ position: "relative", bottom: 5, marginLeft: 5 }}>
            {filterLabels.period.label}
          </span>
        </InputLabel>
        <Select
          label={`${filterLabels.period.label}____`}
          {...register("rentalPeriod")}
        >
          {Object.entries(filterLabels.period.periods).map(([key, value]) => (
            <MenuItem key={key} value={value}>
              {value !== undefined ? key : <em>{key}</em>}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box
        sx={{
          my: 1,
          width: "100%",
          pl: 1,
        }}
      >
        <FormLabel sx={{ width: "full" }}>
          <WeekendOutlinedIcon />
          <span style={{ position: "relative", bottom: 5, marginLeft: 5 }}>
            {filterLabels.hasFurniture.label}
          </span>
        </FormLabel>
        <RadioGroup row defaultValue={undefined} {...register("isFurnished")}>
          {Object.entries(filterLabels.hasFurniture.values).map(
            ([key, value]) => (
              <FormControlLabel
                value={value}
                control={<Radio size="small" />}
                label={key}
              />
            )
          )}
        </RadioGroup>
      </Box>

      <Box
        sx={{
          width: "100%",
          my: 1,
          pl: 1,
        }}
      >
        <FormLabel>
          <EmojiObjectsOutlinedIcon />
          <span style={{ position: "relative", bottom: 5, marginLeft: 5 }}>
            {filterLabels.hasServices.label}
          </span>
        </FormLabel>
        <RadioGroup
          row
          defaultValue={undefined}
          {...register("isServicesIncluded")}
        >
          {Object.entries(filterLabels.hasServices.values).map(
            ([key, value]) => (
              <FormControlLabel
                value={value}
                control={<Radio size="small" />}
                label={key}
              />
            )
          )}
        </RadioGroup>
      </Box>

      <Box
        sx={{
          width: "100%",
          my: 1,
          textAlign: "start",
          display: "flex",
          justifyContent: "space-evenly",
          gap: 1,
          alignItems: "center",
        }}
      >
        <FormControl variant="outlined">
          <InputLabel size="small">
            <span>
              <AttachMoneyOutlinedIcon fontSize="small" />
              <span style={{ position: "relative", bottom: 4, left: -3 }}>
                {filterLabels.minPrice.label}
              </span>
            </span>
          </InputLabel>
          <OutlinedInput
            {...register("minPrice")}
            sx={{ maxWidth: 88 }}
            size="small"
            label={`${filterLabels.minPrice.label}__`}
          />
        </FormControl>
        —
        <FormControl variant="outlined">
          <InputLabel size="small">
            <span>
              <AttachMoneyOutlinedIcon fontSize="small" />
              <span style={{ position: "relative", bottom: 4, left: -3 }}>
                {filterLabels.maxPrice.label}
              </span>
            </span>
          </InputLabel>
          <OutlinedInput
            {...register("maxPrice")}
            sx={{ maxWidth: 88 }}
            size="small"
            label={`${filterLabels.maxPrice.label}__`}
          />
        </FormControl>
      </Box>

      <FormControl variant="outlined" fullWidth sx={{ my: 1 }}>
        <InputLabel size="small">
          <span>
            <PersonOutlineOutlinedIcon fontSize="small" />
            <span style={{ position: "relative", bottom: 4, left: 3 }}>
              {filterLabels.maxOccupants.label}
            </span>
          </span>
        </InputLabel>
        <OutlinedInput
          {...register("max_occupants")}
          size="small"
          label={`${filterLabels.maxOccupants.label}___`}
        />
      </FormControl>

      <FormControl
        component="fieldset"
        sx={{ my: 1, textAlign: "start", width: "100%", pl: 1 }}
      >
        <FormLabel>{filterLabels.rating.label}</FormLabel>
        <Rating name="rating" />
      </FormControl>

      <Button
      type="submit"
        variant="contained"
        fullWidth
        sx={{ my: 1 }}
      >
        Buscar
      </Button>
      <Button type="button" onClick={resetFilters} variant="outlined" color="error" fullWidth sx={{ my: 1 }}>
        Reestablecer filtros
      </Button>
    </Container>
  );
}
