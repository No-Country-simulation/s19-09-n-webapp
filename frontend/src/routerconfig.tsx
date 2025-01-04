import UniversityList from "./page/UniversityList";
import RootLayout from "./layouts/RootLayout";
import {
  PageHome,
  Login,
  Register,
  PropertiesPage,
  PropertyPage,
  DashboardProperties,
  DashboardRentals,
} from "./page";

import Dashboard from "./page/Dashboard";
import RegisterProperty from "./page/RegisterProperty";
import { Navigate, RouteObject } from "react-router-dom";
import DashboardLayoutAccountSidebar from "./components/ui/Sidebar";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <PageHome /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/properties", element: <PropertiesPage /> },
      { path: "/properties/:id", element: <PropertyPage /> },
      { path: "/universities/:province", element: <UniversityList /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayoutAccountSidebar />,
    children: [
      { index: true, element: <Navigate to={"user"} /> },
      { path: "properties/:property?", element: <DashboardProperties /> },
      { path: "rentals", element: <DashboardRentals /> },
      { path: "user", element: <Dashboard /> },
      {
        path: "registerproperty",
        element: <RegisterProperty />,
      },
    ],
  },
];
