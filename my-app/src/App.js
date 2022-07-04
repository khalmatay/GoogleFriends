import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { Routes, Route , MemoryRouter} from "react-router-dom"
import Auth from "./Auth"
import Sign from "./signup-succes"
function App() {
  
  return (

    
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/nur" element={<Sign/>} />
      </Routes>
    </MemoryRouter>
  )
}

export default App;