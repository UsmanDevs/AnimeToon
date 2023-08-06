import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Anime from './compoenets/Anime'
import Home from './compoenets/Home'
import Gallery from './compoenets/Gallery'

function App() {
  
  return (
    <>
    <BrowserRouter >
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/anime/:id' element={<Anime />} />
      <Route path='/character/:id' element={<Gallery/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
