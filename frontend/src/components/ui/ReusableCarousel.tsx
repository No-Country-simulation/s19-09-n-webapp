import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";

// Definir tipos para los props
interface CarouselItem {
    title: string;
    description: string;
    imageUrl?: string; // Opcional si quieres incluir imágenes
}

interface ReusableCarouselProps {
    items: CarouselItem[];
    autoPlay?: boolean;
    interval?: number;
    indicators?: boolean;
    navButtonsAlwaysVisible?: boolean;
}

const ReusableCarousel: React.FC<ReusableCarouselProps> = ({
    items,
    autoPlay = true,
    interval = 4000,
    indicators = true,
    navButtonsAlwaysVisible = false,
}) => {
    return (
        <Carousel
            autoPlay={autoPlay}
            interval={interval}
            indicators={indicators}
            navButtonsAlwaysVisible={navButtonsAlwaysVisible}
        >
            {items.map((item, index) => (
                <Slide key={index} item={item} />
            ))}
        </Carousel>
    );
};

const Slide: React.FC<{ item: CarouselItem }> = ({ item }) => (
    <Paper style={{ padding: "20px", textAlign: "center" }}>
        {item.imageUrl && (
            <img
                src={item.imageUrl}
                alt={item.title}
                style={{ maxWidth: "100%", height: "auto", marginBottom: "10px" }}
            />
        )}
        <h2>{item.title}</h2>
        <p>{item.description}</p>
    </Paper>
);

export default ReusableCarousel;
