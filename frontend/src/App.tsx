
import {BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import { Suspense } from 'react'
import { AppRouter } from './Router'
import  Spinner  from './components/ui/Spinner'
import Navbar from './components/ui/Navbar'
import Carousel from './components/ui/Carousel'


function App() {


  return (
    <Router>
      <Navbar />
      <Carousel />
      <Suspense fallback={<Spinner />} >
        <AppRouter />
      </Suspense>

    </Router>
  )
}

export default App
