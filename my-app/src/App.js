/* global chrome*/
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import Auth from "./components/Auth/Auth"
import Sign from "./components/Main/signup-succes"
import { useEffect, useState } from "react"




function App() {
  const [currentPage, setCurrentPage] = useState(localStorage.getItem('token') ? 'main': 'signin');//Если есть токен то выведит main
  
  

  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      console.log('WTF')
    })
  } ,[])
  return (
    <div>
      {
        currentPage === 'signin' && <Auth goToMain={() => setCurrentPage('main')} />
      }
      {
        currentPage === 'signup' && <Auth />
      }
      {
        currentPage === 'main' && <Sign goToSignin={() => setCurrentPage('signin')}/>
      }
    </div>
    
  )
}

export default App; 