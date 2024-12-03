
import ReusableCarousel from "./ReusableCarousel";

const ExamplePage = () => {
    const carouselItems = [
        {
            title: "Simulador financiero simple y rápido",
            description: "Simplifica tus decisiones financieras con nuestro simulador financiero, una herramienta intuitiva y veloz que te permite calcular pagos, intereses y plazos en segundos. Ideal para quienes desean entender rápidamente su capacidad de pago o evaluar opciones de financiamiento, este simulador es perfecto para tomar decisiones informadas. Ingresa los datos básicos, ajusta tus variables y obtén resultados claros al instante. ¡Optimiza tu tiempo y resuelve tus dudas financieras en un solo lugar!",
            imageUrl: "https://http2.mlstatic.com/storage/landing-valhalla/exhibitor-assets/MSD_Simulador_2024(der).jpg", // URL de imagen opcional
        },
        {
            title: "Promociones inmobiliarias en RoomieFind",
            description: "Descubre las mejores oportunidades para encontrar tu hogar ideal con RoomieFind. Explora una amplia variedad de promociones inmobiliarias diseñadas para ajustarse a tus necesidades y presupuesto. Desde modernos departamentos en el centro de la ciudad hasta acogedoras casas en las afueras, nuestra plataforma reúne ofertas exclusivas con condiciones únicas. Aprovecha descuentos especiales, financiamiento flexible y acceso directo a propiedades destacadas en tu zona. ¡Haz de tu búsqueda una experiencia fácil y emocionante con RoomieFind!",
            imageUrl: "https://http2.mlstatic.com/storage/landing-valhalla/exhibitor-assets/MSD_Promos_7oct2024.jpg",

        },
        {
            title: "Tasación online de propiedades",
            description: "Conoce el valor real de tu propiedad de manera rápida y confiable con nuestra herramienta de tasación online. Solo necesitas proporcionar algunos datos clave, y en cuestión de minutos obtendrás un estimado actualizado y basado en el mercado actual. Ideal para compradores, vendedores y agentes inmobiliarios, esta herramienta simplifica el proceso de evaluación sin necesidad de visitas ni costos adicionales. ¡Descubre cuánto vale tu propiedad hoy mismo y toma decisiones estratégicas!",
            imageUrl: "https://http2.mlstatic.com/storage/landing-valhalla/exhibitor-assets/MSD_Propiteq_28oct2024.jpg",
        },
    ];

    return (
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2px",borderRadius: 2 }}>
            <ReusableCarousel
                items={carouselItems}
                autoPlay={true}
                interval={3000}
                indicators={true}
                navButtonsAlwaysVisible={true}
            />
        </div>
    );
};

export default ExamplePage;
