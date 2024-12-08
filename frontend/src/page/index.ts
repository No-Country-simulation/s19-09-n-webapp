import React from "react";
import PageHome from "../components/Home/Home";

export {PageHome}

export const Login = React.lazy(() => import("../components/Login/Login"));
export const Register = React.lazy(() => import("../components/Register/Register"));