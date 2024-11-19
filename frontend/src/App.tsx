
import {BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import { Suspense } from 'react'
import { AppRouter } from './Router'
import  Spinner  from './components/ui/Spinner'
import Navbar from './components/ui/Navbar'
function App() {


  return (
    <Router>
      <Navbar />
      <Suspense fallback={<Spinner />} >
        <AppRouter />
      </Suspense>

    </Router>
  )
}

export default App
