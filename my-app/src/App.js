import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import Auth from "./components/Auth/Auth"
import Sign from "./components/Sign/signup-succes"
import { useState } from "react"

/*global chrome*/


function App() {
  const [currentPage, setCurrentPage] = useState(localStorage.getItem('token') ? 'main': 'signin');//Если есть токен то выведит main


  // chrome.runtime.onStartup.addListener(
  //   ()=>console.log('ddddddddddddd')
  // )
  
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