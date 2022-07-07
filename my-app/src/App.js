import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { Routes, Route , MemoryRouter} from "react-router-dom"
import Auth from "./Auth"
import Sign from "./signup-succes"
import { useState } from "react"
function App() {
  const [currentPage, setCurrentPage] = useState(localStorage.getItem('token') ? 'main': 'signin');//Если есть токен то выведит main


  return (
    <div>
      {
        currentPage === 'signin' && <Auth afterSignIn={() => setCurrentPage('main')}/>
      }
      {
        currentPage === 'signup' && <Auth />
      }
      {
        currentPage === 'main' && <Sign />
      }
    </div>
    
  )
}

export default App; 