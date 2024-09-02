import { React } from 'react'
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom'
import Login from './Login'
import Registration from './Registration'
import Dashboard from './Dashboard'
import SuccessCard from './SuccessCard'
import AdminDashboard from './Dashboard/Admin_Dashboard/AdminDashboard'
import School from './Dashboard/Admin_Dashboard/School'
import Subject from './Dashboard/Admin_Dashboard/Subject'
// import AddSchool from './Dashboard/Admin_Dashboard/AddSchool'
// import AddSubject from './Dashboard/Admin_Dashboard/AddSubject'
import StudentDashboard from './Dashboard/StudentDashboard'
import TeacherDashboard from './Dashboard/TeacherDashboard'
import ParentsDashboard from './Dashboard/ParentsDashboard'
// import EditSubject from './Dashboard/Admin_Dashboard/EditSubject'
// import EditSchool from './Dashboard/Admin_Dashboard/EditSchool'
import Book from './Dashboard/Admin_Dashboard/Books'



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
              {/* <Route path='AddSchool' element={<AddSchool/>}/> */}
              <Route path='subject' element={<Subject/>}/>
              {/* <Route path='AddSubject' element={<AddSubject/>}/> */}
              {/* <Route path='editSubject/:id' element={<EditSubject/>}/> */}
              {/* <Route path='editschool/:id' element={<EditSchool/>}/> */}
              <Route path='books' element={<Book/>}/>
            </Route>
            <Route path='/studentDashboard' element={<StudentDashboard/>}/>
            <Route path='/teacherDashboard' element={<TeacherDashboard/>}/>
            <Route path='/parentsDashboard' element={<ParentsDashboard/>}/>
          </Routes>
        </div>
      </Router>
  )
}

export default App
