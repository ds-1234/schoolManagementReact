import { React } from 'react'
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom'
import Login from './Login'
import Registeration from './Registeration'



function App() {

  return (
    <Router>
        <div className="h-screen">
          <Routes>
            <Route path="/" element={<Registeration/>}/>
            <Route path="/login" element = {<Login/>}/>
            <Route path="/registeration" element={<Registeration/>}/>
          </Routes>
        </div>
      </Router>
  )
}

export default App
