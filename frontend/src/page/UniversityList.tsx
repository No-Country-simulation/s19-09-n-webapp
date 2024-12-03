import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid2, Card, CardContent, Typography, Link } from '@mui/material';
import universities from '../Data/universities.json';

const UniversityList: React.FC = () => {
  const { province } = useParams<{ province: string }>();
  const filteredUniversities = universities.filter(
    (uni) => uni.province.toLowerCase() === province?.toLowerCase()
);
console.log(province)

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Universidades en {province}
      </Typography>
      <Grid2 container spacing={2}>
        {filteredUniversities.map((uni) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}  key={uni.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{uni.name}</Typography>
                <Typography>{uni.address}</Typography>
                <Link href={uni.website} target="_blank">
                  Sitio web
                </Link>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
};

export default UniversityList;
