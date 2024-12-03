
import UniversityList from "./components/UniversityList/UniversityList";
import RootLayout from "./layouts/RootLayout";
import { PageHome, Login, Register, PropertiesPage } from "./page";



export const routes = [
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
