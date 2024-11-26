
import { 
    PageHome,
    Login,
    Register 
} from "./page";

// import {
//     Carousel
// } from "./components/ui/Carousel"


export const routes = [
    { path: '/', element: <PageHome /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    // { path: '/carousel', element: <Carousel /> },
    
    
]