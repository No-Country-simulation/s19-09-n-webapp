import "./App.css";
import { Suspense } from "react";
import AppRouter from "./Router";
import Spinner from "./components/ui/Spinner";

<<<<<<< HEAD
import {BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import { Suspense } from 'react'
import { AppRouter } from './Router'
import  Spinner  from './components/ui/Spinner'
import Navbar from './components/ui/Navbar'
import Carousel from './components/ui/Carousel'


=======
>>>>>>> ef2787368f5dbb783a317a210c186632ffc6d106
function App() {
  return (
<<<<<<< HEAD
    <Router>
      <Navbar />
      <Carousel />
      <Suspense fallback={<Spinner />} >
=======
    <>
      <Suspense fallback={<Spinner />}>
>>>>>>> ef2787368f5dbb783a317a210c186632ffc6d106
        <AppRouter />
      </Suspense>
    </>
  );
}

export default App;
