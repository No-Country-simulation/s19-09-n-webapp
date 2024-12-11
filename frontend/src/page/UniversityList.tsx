import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Grid2,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
} from "@mui/material";
import { getUniversitiesByCity } from "../services/universitiesService";
import { CitiesSkeleton } from "../components/Buscador-img/ProvinceGrid";
import { useQuery } from "@tanstack/react-query";
import { ReturnUniversityDto } from "../types/universityInterface";

function capitalizeWords(input: string): string {
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

const UniversityList: React.FC = () => {
  const { province } = useParams<{ province: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useQuery<ReturnUniversityDto[]>({
    queryKey: ["universities-by-city"], // Un identificador único para esta query
    queryFn: () => getUniversitiesByCity(capitalizeWords(province!)), // La función que hará el fetch
    enabled: !!province,
  });

  useEffect(() => {
    if (province) {
      refetch();
    }
  }, [province, refetch]);

  if (isLoading) return <CitiesSkeleton length={4} />;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Universidades en {capitalizeWords(province!)}
      </Typography>
      <Grid2 container spacing={2}>
        {data &&
          data.map((uni) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={uni.id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={uni.image_url}
                  alt={uni.city}
                />
                <CardContent sx={{display:'flex', flexDirection:'column', height:'100%', justifyContent:'space-between', alignItems:'center'}}>
                  <Typography variant="h6">{uni.name}</Typography>
                  <Typography>{uni.address}</Typography>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/properties")}
                    sx={{ color: "white" }}
                  >
                    Ver propiedades cercanas
                  </Button>
                </CardContent>
              </Card>
            </Grid2>
          ))}
      </Grid2>
    </div>
  );
};

export default UniversityList;
