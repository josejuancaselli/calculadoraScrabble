import { BrowserRouter, Route, Routes } from "react-router-dom"
import Calculadora from "./components/Calculadora"
import Inicio from "./components/Inicio"


function App() {


  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/calculadora" element={<Calculadora />} />
        
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
