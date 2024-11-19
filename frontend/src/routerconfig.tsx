import { 
    PageHome,
    Login,
    Register 
} from "./page";

export const routes = [
    { path: '/', element: <PageHome /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    
]