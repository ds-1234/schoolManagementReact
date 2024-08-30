import { React } from 'react'
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom'
import Login from './Login'
import Registration from './Registration'
import Dashboard from './Dashboard'
import SuccessCard from './SuccessCard'



function App() {

  return (
    <Router>
        <div className="h-screen">
          <Routes>
            <Route path="/" element={<Registration/>}/>
            <Route path="/login" element = {<Login/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/SuccessCard" element={<SuccessCard/>}/>
          </Routes>
        </div>
      </Router>
  )
}

export default App
