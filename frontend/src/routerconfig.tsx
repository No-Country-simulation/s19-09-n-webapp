
import UniversityList from "./page/UniversityList";
import DashboardLayout from "./layouts/DashboardLayout";
import RootLayout from "./layouts/RootLayout";
import { PageHome, Login, Register, PropertiesPage,  } from "./page";
import Dashboard from "./page/Dashboard";
import RegisterProperty from "./page/RegisterProperty"



export const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <PageHome /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/properties", element: <PropertiesPage /> },
      { path: "/universities/:province", element: <UniversityList /> },
      { path: "/registerproperty", element: <RegisterProperty /> },
    ],    
  },
  {
    path: "/dashboard" ,   
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },


    ]
  },
];
