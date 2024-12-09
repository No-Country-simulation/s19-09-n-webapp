
import UniversityList from "./page/UniversityList";
import DashboardLayout from "./layouts/DashboardLayout";
import RootLayout from "./layouts/RootLayout";
import { PageHome, Login, Register, PropertiesPage, PropertyPage, DashboardProperties } from "./page";
import Dashboard from "./page/Dashboard";




export const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <PageHome /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/properties", element: <PropertiesPage /> },
      { path: "/properties/:id", element: <PropertyPage/>},
      { path: "/universities/:province", element: <UniversityList /> },
    ],    
  },
  {
    path: "/dashboard" ,   
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      {path: "/dashboard/properties", element: <DashboardProperties/>},


    ]
  },
];
