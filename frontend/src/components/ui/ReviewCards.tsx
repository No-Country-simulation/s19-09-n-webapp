import { Card, CardContent, CardMedia, Typography, Grid2 } from "@mui/material";
import { Box } from "@mui/system";

const reviews = [
  {
    image:
      "https://img.freepik.com/foto-gratis/retrato-infeliz-joven-caucasico-camiseta-azul-buen-peinado-barba-haciendo-expresion-extremadamente-asustada-pensando-saltarse-conferencia-profesor-enojado_176420-10359.jpg", // URL de la imagen
    name: "Juan Pérez",
    review:
      "Usar Roomiefind fue súper fácil y eficiente. Encontré un compañero de cuarto con intereses similares en solo unos días. La plataforma es intuitiva y me dio mucha confianza en todo momento. ¡La recomiendo a cualquiera que busque un roomie!",
  },
  {
    image:
      "https://cdn.pixabay.com/photo/2017/08/25/21/45/thinking-2681494_1280.jpg",
    name: "María González",
    review:
      "Roomiefind fue la solución perfecta para encontrar un compañero de cuarto de confianza. Me encantaron las herramientas para filtrar las opciones según mis necesidades. Además, la experiencia fue muy segura y profesional. ¡Definitivamente volvería a usarla!",
  },
  {
    image:
      "https://img.freepik.com/foto-gratis/hombre-caucasico-guapo-camiseta-roja-sonriendo-felizmente-aplaudiendo-sorprendio-regalo-cumpleanos-amigos-retrato-primer-individuo-afeitar-que-comparte-vibraciones-positivas_176420-10245.jpg",
    name: "Carlos López",
    review:
      "La mejor decisión fue usar Roomiefind para buscar a mi roomie. Me sorprendió lo fácil que fue conectarme con personas compatibles. Ahora tengo un compañero genial, y todo gracias a esta app. ¡10/10!",
  },
];

const ReviewCards = () => {
  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Typography variant="h4" align="center" gutterBottom  sx={{  mb: 4 }}> 
        Opiniones de nuestros usuarios
      </Typography>
      <Grid2 container spacing={3} justifyContent="center">
        {reviews.map((review, index) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Card sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                height="300"
                image={review.image}
                alt={review.name}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {review.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {review.review}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default ReviewCards;
