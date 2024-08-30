import { React } from 'react'
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom'
import Login from './Login'
import Registration from './Registration'
import Dashboard from './Dashboard'
import SuccessCard from './SuccessCard'
import AdminDashboard from './Dashboard/Admin_Dashboard/AdminDashboard'
import School from './Dashboard/Admin_Dashboard/School'
import Subject from './Dashboard/Admin_Dashboard/Subject'
import AddSchool from './Dashboard/Admin_Dashboard/AddSchool'



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
            <Route path="/admin" element={<AdminDashboard/>}>
              <Route path='school' element={<School/>}/>
              <Route path='AddSchool' element={<AddSchool/>}/>
              <Route path='subject' element={<Subject/>}/>
            </Route>
          </Routes>
        </div>
      </Router>
  )
}

export default App
