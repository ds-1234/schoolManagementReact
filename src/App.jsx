import { React } from 'react'
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom'
import Login from './Login'
import Registration from './Registration'
import SuccessCard from './SuccessCard'
import AdminDashboard from './Dashboard/Admin_Dashboard/AdminDashboard'
import School from './Dashboard/Admin_Dashboard/School/School'
import Subject from './Dashboard/Admin_Dashboard/Subject/Subject'
import StudentDashboard from './Dashboard/Student_Dashboard/StudentDashboard'
import TeacherDashboard from './Dashboard/Teacher_Dashboard/TeacherDashboard'
import ParentsDashboard from './Dashboard/Parent_Dashboard/ParentsDashboard'
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
import ExamType from './Dashboard/Admin_Dashboard/Examinations/ExamType/ExamType'
import ExamSchedule from './Dashboard/Admin_Dashboard/Examinations/ExamSchedule/ExamSchedule'
import ExamAttendance from './Dashboard/Admin_Dashboard/Examinations/ExamAttendance/ExamAttendance'
import ExamResults from './Dashboard/Admin_Dashboard/Examinations/ExamResults/ExamResults'
import Grade from './Dashboard/Admin_Dashboard/Examinations/Grade/Grade'
import Role from './Dashboard/Admin_Dashboard/User/Role/Role'
import TimeTable from './Dashboard/Admin_Dashboard/TimeTable/TimeTable'
import ClassSelect from './Dashboard/Admin_Dashboard/TimeTable/ClassSelect'
import SectionSelect from './Dashboard/Admin_Dashboard/TimeTable/SectionSelect'
import PendingUser from './Dashboard/Admin_Dashboard/User/PendingUser'
import AddUser from './Dashboard/Admin_Dashboard/User/AddUser'
import EditUser from './Dashboard/Admin_Dashboard/User/EditUser'
import LandingPage from './LandingPage'
import Admin from './Dashboard/Admin_Dashboard/Admin'
import Parent from './Dashboard/Parent_Dashboard/Parent'
import Student from './Dashboard/Student_Dashboard/Student'
import Teacher from './Dashboard/Teacher_Dashboard/Teacher'


function App() {

  return (
    <Router>
        <div className="h-screen">
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/login" element = {<LandingPage/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/SuccessCard" element={<SuccessCard/>}/>
            <Route path="/admin" element={<AdminDashboard/>}>
              {/* Default route */}
              <Route index element={<Admin />} />

              {/* Child Routes */}
              <Route path='school' element={<School/>}/>
              <Route path='subject' element={<Subject/>}/>
              <Route path='books' element={<Book/>}/>
              <Route path='activeUser' element={<User/>}/>
              <Route path = 'pendingUser' element={<PendingUser/>}/>
              <Route path = 'addUser' element = {<AddUser/>}/>
              <Route path = 'editUser' element = {<EditUser/>}/>
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
              <Route path='TimeTable' element={<TimeTable/>} />
              <Route path='timetable/class' element={<ClassSelect/>} />
              <Route path='timetable/class/section' element={<SectionSelect/>} />
            </Route>
            <Route path='/studentDashboard' element={<StudentDashboard/>}>
                 {/* Default route */}
                 <Route index element = {<Student/>} />
            </Route>
            <Route path='/teacherDashboard' element={<TeacherDashboard/>}>
                 {/* Default route */}
                 <Route index element={<Teacher/>} />
            </Route>
            <Route path='/parentsDashboard' element={<ParentsDashboard/>}>
                 {/* Default route */}
                <Route index element={<Parent/>} />
            </Route>
          </Routes>
        </div>
      </Router>
  )
}

export default App
