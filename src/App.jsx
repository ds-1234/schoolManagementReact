import { React } from 'react'
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom'
import Login from './Login'
import Registration from './Registration'
import Dashboard from './Dashboard'
import SuccessCard from './SuccessCard'
import AdminDashboard from './Dashboard/Admin_Dashboard/AdminDashboard'
import School from './Dashboard/Admin_Dashboard/School/School'
import Subject from './Dashboard/Admin_Dashboard/Subject/Subject'
import StudentDashboard from './Dashboard/StudentDashboard'
import TeacherDashboard from './Dashboard/TeacherDashboard'
import ParentsDashboard from './Dashboard/ParentsDashboard'
import Book from './Dashboard/Admin_Dashboard/Books/Books'
import User from './Dashboard/Admin_Dashboard/User/User'
import Class from './Dashboard/Admin_Dashboard/Class/Class'
import AllStudents from './Dashboard/Admin_Dashboard/Students/AllStudents'
import AdmissionForm from './Dashboard/Admin_Dashboard/Students/AdmissionForm'
import StudentDetails from './Dashboard/Admin_Dashboard/Students/StudentDetails'
import StudentPromotion from './Dashboard/Admin_Dashboard/Students/StudentPromotion'
import Transport from './Dashboard/Admin_Dashboard/Transport/Transport'
import Notice from './Dashboard/Admin_Dashboard/Notice/Notice'
import AddTransport from './Dashboard/Admin_Dashboard/Transport/AddTransport'
import AddNotice from './Dashboard/Admin_Dashboard/Notice/AddNotice'
import ExamType from './Dashboard/Admin_Dashboard/Examinations/ExamType'
import ExamSchedule from './Dashboard/Admin_Dashboard/Examinations/ExamSchedule'
import ExamAttendance from './Dashboard/Admin_Dashboard/Examinations/ExamAttendance'
import ExamResults from './Dashboard/Admin_Dashboard/Examinations/ExamResults'
import Grade from './Dashboard/Admin_Dashboard/Examinations/Grade'
import Role from './Dashboard/Admin_Dashboard/User/Role'


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
              <Route path='subject' element={<Subject/>}/>
              <Route path='books' element={<Book/>}/>
              <Route path='user' element={<User/>}/>
              <Route path='role' element={<Role/>}/>
              <Route path='class' element={<Class/>}/>
              <Route path = 'allStudents' element={<AllStudents/>}/>
              <Route path = 'admissionForm' element={<AdmissionForm/>}/>
              <Route path = 'studentDetails' element={<StudentDetails/>}/>
              <Route path = 'studentPromotion' element={<StudentPromotion/>}/>
              <Route path = 'transport' element={<Transport/>}/>
              <Route path='AddTransport' element={<AddTransport/>}/>
              <Route path='notice' element={<Notice/>}/>
              <Route path='AddNotice' element={<AddNotice/>}/>
              <Route path='Examinations' element={<ExamType/>}/>
              <Route path='Examschedule' element={<ExamSchedule/>}/>
              <Route path='ExamAttendance' element={<ExamAttendance/>}/>
              <Route path='ExamResults' element={<ExamResults/>}/>
              <Route path='Grade' element={<Grade/>}/>
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
