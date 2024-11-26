import React from "react";
import PageHome from "../components/Home/Home";

export {PageHome}

export const Login = React.lazy(() => import("../components/Login/Login"));
export const Register = React.lazy(() => import("../components/Register/Register"));
export const universities = React.lazy(() => import("../components/UniversityList/UniversityList"));
export {default as PropertiesPage} from "./PropertiesPage.tsx";