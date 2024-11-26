
<<<<<<< HEAD
import { 
    PageHome,
    Login,
    Register 
} from "./page";
=======
import UniversityList from "./components/UniversityList/UniversityList";
import RootLayout from "./layouts/RootLayout";
import { PageHome, Login, Register, PropertiesPage } from "./page";
>>>>>>> ef2787368f5dbb783a317a210c186632ffc6d106

// import {
//     Carousel
// } from "./components/ui/Carousel"


export const routes = [
<<<<<<< HEAD
    { path: '/', element: <PageHome /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    // { path: '/carousel', element: <Carousel /> },
    
    
]
=======
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <PageHome /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "properties", element: <PropertiesPage /> },
      { path: "/universities/:province", element: <UniversityList /> },
      
    ],
  },
];
>>>>>>> ef2787368f5dbb783a317a210c186632ffc6d106
