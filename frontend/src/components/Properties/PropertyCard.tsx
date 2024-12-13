import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Property } from "../../types/propertyInterface";
import { MdLocationOn } from "react-icons/md";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card>
      <CardMedia component="img" image={property.imgUrl} alt={property.title} />
      <CardContent>
        <Typography variant="body2">
          <MdLocationOn style={{marginRight:4}}/>
          {property.city}
        </Typography>
        <Typography variant="subtitle2">{property.title}</Typography>
        <Typography variant="body1">{property.description}</Typography>
        <Typography variant="h6">${property.price}/mes</Typography>
      </CardContent>
    </Card>
  );
}
