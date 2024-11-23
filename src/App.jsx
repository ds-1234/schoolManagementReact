import { React } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './Login';
import Registration from './Registration';
import SuccessCard from './SuccessCard';
import AdminDashboard from './Dashboard/Admin_Dashboard/AdminDashboard';
import School from './Dashboard/Admin_Dashboard/School/School';
import Subject from './Dashboard/Admin_Dashboard/Subject/Subject';
import StudentDashboard from './Dashboard/Student_Dashboard/StudentDashboard';
import TeacherDashboard from './Dashboard/Teacher_Dashboard/TeacherDashboard';
import ParentsDashboard from './Dashboard/Parent_Dashboard/ParentsDashboard';
import Book from './Dashboard/Admin_Dashboard/Books/Books';
import User from './Dashboard/Admin_Dashboard/User/User';
import Class from './Dashboard/Admin_Dashboard/Class/Class';
import AllStudents from './Dashboard/Admin_Dashboard/Students/AllStudents';
import AdmissionForm from './Dashboard/Admin_Dashboard/Students/AdmissionForm';
import StudentDetails from './Dashboard/Admin_Dashboard/Students/StudentDetails';
import StudentPromotion from './Dashboard/Admin_Dashboard/Students/StudentPromotion';
import Transport from './Dashboard/Admin_Dashboard/Transport/Transport';
import Notice from './Dashboard/Admin_Dashboard/Notice/Notice';
import AddTransport from './Dashboard/Admin_Dashboard/Transport/AddTransport';
import AddNotice from './Dashboard/Admin_Dashboard/Notice/AddNotice';
import ExamType from './Dashboard/Admin_Dashboard/Examinations/ExamType/ExamType';
import ExamSchedule from './Dashboard/Admin_Dashboard/Examinations/ExamSchedule/ExamSchedule';
import ExamAttendance from './Dashboard/Admin_Dashboard/Examinations/ExamAttendance/ExamAttendance';
import ExamResults from './Dashboard/Admin_Dashboard/Examinations/ExamResults/ExamResults';
import Grade from './Dashboard/Admin_Dashboard/Examinations/Grade/Grade';
import Role from './Dashboard/Admin_Dashboard/User/Role/Role';
import PendingUser from './Dashboard/Admin_Dashboard/User/PendingUser';
import AddUser from './Dashboard/Admin_Dashboard/User/AddUser';
// import EditUser from './Dashboard/Admin_Dashboard/User/EditUser';
import LandingPage from './LandingPage';
import Admin from './Dashboard/Admin_Dashboard/Admin';
import Parent from './Dashboard/Parent_Dashboard/Parent';
import Student from './Dashboard/Student_Dashboard/Student';
import Teacher from './Dashboard/Teacher_Dashboard/Teacher';
import ProtectedRoute from './ProtectedRoute';  // Import the ProtectedRoute component
import Expenses from './Dashboard/Admin_Dashboard/Accounts/Expenses/Expenses';
import ExpenseCategory from './Dashboard/Admin_Dashboard/Accounts/Expense Category/ExpenseCategory';
import Income from './Dashboard/Admin_Dashboard/Accounts/Income/Income';
import Invoices from './Dashboard/Admin_Dashboard/Accounts/Invoices/Invoices';
import InvoiceView from './Dashboard/Admin_Dashboard/Accounts/Invoice View/InvoiceView';
import Transactions from './Dashboard/Admin_Dashboard/Accounts/Transactions/Transactions';
import AddExpenses from './Dashboard/Admin_Dashboard/Accounts/Expenses/AddExpenses';
import GuestDashboard from './Dashboard/Guest_DashBoard/GuestDashBoard';
import Guest from './Dashboard/Guest_DashBoard/Guest';
import AddIncome from './Dashboard/Admin_Dashboard/Accounts/Income/AddIncome';
import AdminHomework from './Dashboard/Admin_Dashboard/Homework/AdminHomework'
import HomePage from './Dashboard/Admin_Dashboard/TimeTable/HomePage'
import ClassPage from './Dashboard/Admin_Dashboard/TimeTable/Class/ClassPage'
import TimetablePage from './Dashboard/Admin_Dashboard/TimeTable/Class/TimeTablePage';
import TeacherPage from './Dashboard/Admin_Dashboard/TimeTable/Teacher/TeacherPage'
import TeacherTimeTable from './Dashboard/Admin_Dashboard/TimeTable/Teacher/TeacherTimeTable';
import Holidays from './Dashboard/Admin_Dashboard/Holidays/Holidays';
import Timetable from './Dashboard/Teacher_Dashboard/TimeTable/TimeTable';
import StdTimetable from './Dashboard/Student_Dashboard/TimeTable/StdTimeTable';
import Leave from './Dashboard/Admin_Dashboard/Leave/Leave';
import Sports from './Dashboard/Admin_Dashboard/Sports/Sports/Sports';
import Players from './Dashboard/Admin_Dashboard/Sports/Players/Players';
import Homework from './Dashboard/Teacher_Dashboard/Homework/Homework';
import StdHomework from './Dashboard/Student_Dashboard/Homework/Homework';
import Hostel from './Dashboard/Admin_Dashboard/Hostel/Hostel/Hostel';
import RoomType from './Dashboard/Admin_Dashboard/Hostel/RoomType/RoomType';
import HostelRooms from './Dashboard/Admin_Dashboard/Hostel/HostelRooms/HostelRooms';
import StdHolidays from './Dashboard/Student_Dashboard/Holidays/StdHolidays';
import TeaHolidays from './Dashboard/Teacher_Dashboard/Holidays/TeaHolidays';
import StdSports from './Dashboard/Student_Dashboard/Sports/StdSports';
import TeaSports from './Dashboard/Teacher_Dashboard/Sports/TeaSports';
import Designation from './Dashboard/Admin_Dashboard/Designation/Designation';
import Department from './Dashboard/Admin_Dashboard/Department/Department';
import StdNotice from './Dashboard/Student_Dashboard/Notice/StdNotice';

import TeaNotice from './Dashboard/Teacher_Dashboard/Notice/TeaNotice';
import FeesGrp from './Dashboard/Admin_Dashboard/Fees/FeesGrp/FeesGrp';
import FeesCollection from './Dashboard/Admin_Dashboard/Fees/FeesCollection/FeesCollection';

import ClassSelect from './Dashboard/Teacher_Dashboard/Attendance_Marking/ClassSelect';
import Attendance from './Dashboard/Teacher_Dashboard/Attendance_Marking/Attendance';
import StdAttendance from './Dashboard/Student_Dashboard/Attendance/Attendance'
import Select from './Dashboard/Admin_Dashboard/Attendance/Select';
import TchsAttendance from './Dashboard/Admin_Dashboard/Attendance/TchsAttendance';
import ClassAttendance from './Dashboard/Admin_Dashboard/Attendance/ClassSelect'
import StdsAttendance from './Dashboard/Admin_Dashboard/Attendance/StdsAttendance';
import BasicDets from './Dashboard/Admin_Dashboard/Students/AdmissionForm/BasicDets';
import AcademicDets from './Dashboard/Admin_Dashboard/Students/AdmissionForm/AcademicDets';
import OfficeDets from './Dashboard/Admin_Dashboard/Students/AdmissionForm/OfficeDets';
import TransportDets from './Dashboard/Admin_Dashboard/Students/AdmissionForm/TransportDets';
import HostelDets from './Dashboard/Admin_Dashboard/Students/AdmissionForm/HostelDets';
import DocsDets from './Dashboard/Admin_Dashboard/Students/AdmissionForm/DocsDets';
import PrevSchlDets from './Dashboard/Admin_Dashboard/Students/AdmissionForm/PrevSchlDets';
import Profile from './Dashboard/Student_Dashboard/Profile/Profile'
import StdFeeCollection from './Dashboard/Student_Dashboard/Fees/StdFeeCollection';

import PendingAdmForm from './Dashboard/Admin_Dashboard/Students/PendingAdmForm';
import { UserProvider } from './hooks/UserContext';
import Event from './Dashboard/Admin_Dashboard/Event/Event/Event';
import { StepProvider } from './hooks/StepContext';
import EventCategory from './Dashboard/Admin_Dashboard/Event/EventCategory/EventCategory';
import TchProfile from './Dashboard/Teacher_Dashboard/Teacher Profile/TchProfile';
import StdEvent from './Dashboard/Student_Dashboard/Event/StdEvent/StdEvent';
import TeaEvent from './Dashboard/Teacher_Dashboard/TeaEvent/TeaEvent';
import Edit from './Dashboard/Admin_Dashboard/User/Edit'
import TchDetails from './Dashboard/Admin_Dashboard/User/Teacher_Form/TchDetails';

import BookIssue from './Dashboard/Admin_Dashboard/Books/BookIssue/BookIssue';
import TchBookIssue from './Dashboard/Teacher_Dashboard/Library/TchBookIssue';
import StdBookIssue from './Dashboard/Student_Dashboard/Library/StdBookIssue';

import StaffAttendanceStatus from './Dashboard/Admin_Dashboard/StaffAttendanceStatus/StaffAttendanceStatus';

import ViewParent from './Dashboard/Admin_Dashboard/User/ViewParent';
import TchExamResult from './Dashboard/Teacher_Dashboard/Examination/Exam Result/TchExamResult';
import StdExamResult from './Dashboard/Student_Dashboard/Examination/Exam Result/StdExamResult';
import StaffAttendance from './Dashboard/Admin_Dashboard/Staff Attendance/StaffAttendance';
import AllStaffAttendance from './Reusable_components/AllStaffAttendance';




function App() {
  return (
    <UserProvider>
      <StepProvider>
    <Router>
      <div className="h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LandingPage />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/successCard" element={<SuccessCard />} />

          {/* Admin Dashboard Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Admin />} />
            <Route path="school" element={<School />} />
            <Route path="subject" element={<Subject />} />
            <Route path="books" element={<Book />} />
            <Route path="activeUser" element={<User />} />
            <Route path="pendingUser" element={<PendingUser />} />
            <Route path="addUser" element={<AddUser />} />
            <Route path="editUser" element={<Edit/>} />
            <Route path="role" element={<Role />} />
            <Route path="class" element={<Class />} />
            <Route path="allStudents" element={<AllStudents />} />
            <Route path="admissionForm" element={<AdmissionForm />} />
            <Route path="studentDetails" element={<StudentDetails />} />
            <Route path="studentPromotion" element={<StudentPromotion />} />
            <Route path="transport" element={<Transport />} />
            <Route path="addTransport" element={<AddTransport />} />
            <Route path="notice" element={<Notice />} />
            <Route path="addNotice" element={<AddNotice />} />
            <Route path="examinations" element={<ExamType />} />
            <Route path="examSchedule" element={<ExamSchedule />} />
            <Route path="examAttendance" element={<ExamAttendance />} />
            <Route path="examResults" element={<ExamResults />} />
            <Route path="grade" element={<Grade />} />
            <Route path="home" element={<HomePage />} />
            <Route path="classes" element={<ClassPage />} />
            <Route path="teachers" element={<TeacherPage/>} />
            <Route path="timetable/:className/:section" element={<TimetablePage />} />
            <Route path='timetable/:teacherId' element = {<TeacherTimeTable/>}/>
            <Route path="Expenses" element={<Expenses />} />
            <Route path="addExpenses" element={<AddExpenses />} />
            <Route path="ExpenseCategory" element={<ExpenseCategory />} />
            <Route path="income" element={<Income />} />
            <Route path="addincome" element={<AddIncome />} />
            <Route path="Invoices" element={<Invoices />} />
            <Route path="Invoiceview" element={<InvoiceView />} />
            <Route path="Transactions" element={<Transactions />} />
            <Route path="holidays" element={<Holidays />} />
            <Route path="leave" element={<Leave />} />
            <Route path="sports" element={<Sports />} />
            <Route path="players" element={<Players />} />

            <Route path='homework' element = {<AdminHomework/>} />
            <Route path='hostel' element = {<Hostel/>} />
            <Route path='roomtype' element = {<RoomType/>} />
            <Route path='hostelrooms' element = {<HostelRooms/>} />
            <Route path='designation' element = {<Designation/>} />
            <Route path='department' element = {<Department/>} />

            <Route path='feesgrp' element = {<FeesGrp/>} />
            <Route path='feescollect' element = {<FeesCollection/>} />

            <Route path='select' element = {<Select/>}/> 
            <Route path='classSelect' element={<ClassAttendance/>}/>
            <Route path='stdsAttendance/:className/:section' element = {<StdsAttendance/>}/>
            <Route path='tchsAttendance' element = {<TchsAttendance/>}/>
            <Route path = 'basic' element = {<BasicDets/>}/>
            <Route path = 'academic' element={<AcademicDets/>}/>
            <Route path='office' element= {<OfficeDets/>}/>
            <Route path='transportation' element={<TransportDets/>}/>
            <Route path='hostelDetails' element={<HostelDets/>}/>
            <Route path='uploadDocs' element={<DocsDets/>}/>
            <Route path='prevSchool' element={<PrevSchlDets/>}/> 
            <Route path='event' element={<Event/>}/> 
            <Route path='eventcategory' element={<EventCategory/>}/> 
            
            <Route path='pendingAdmissionForm' element={<PendingAdmForm/>}/>
            <Route path='TchDetails' element={<TchDetails/>}/>
            <Route path='bookissue' element={<BookIssue/>}/>
            <Route path='StaffAttendanceStatus' element={<StaffAttendanceStatus/>}/>

            <Route path = 'ViewParent' element= {<ViewParent/>}/> 
            <Route path = 'StaffAttendance' element= {<StaffAttendance/>}/> 
          </Route>

          {/* Student Dashboard Routes */}
          <Route
            path="/studentDashboard"
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Student />} />
            <Route path='timetable' element={<StdTimetable/>}/>
            <Route path='homework' element = {<StdHomework/>} />
            <Route path='holidays' element = {<StdHolidays/>} />
            <Route path='stdsports' element = {<StdSports/>} />
            <Route path='stdnotice' element = {<StdNotice/>} />
            <Route path = 'attendance' element = {<StdAttendance/>}/>
            <Route path = 'StdFeeCollection' element = {<StdFeeCollection/>}/>
            <Route path = 'StdEvent' element = {<StdEvent/>}/>
            <Route path = 'profile' element = {<Profile/>}/>
            <Route path = 'StdBookIssue' element = {<StdBookIssue/>}/>
            <Route path = 'stdExamResult' element = {<StdExamResult/>}/>
          </Route>

          {/* Teacher Dashboard Routes */}
          <Route
            path="/teacherDashboard"
            element={
              <ProtectedRoute>
                <TeacherDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Teacher />} />
            <Route path='timetable' element={<Timetable/>}/>
            <Route path='homework' element = {<Homework/>} />
            <Route path='teaholidays' element = {<TeaHolidays/>} />
            <Route path='teasports' element = {<TeaSports/>} />
            <Route path='teanotice' element = {<TeaNotice/>} />
            <Route path='classSelect' element = {<ClassSelect/>}/>
            <Route path='attendance/:className/:section' element={<Attendance/>}/>
            <Route path='profile' element={<TchProfile/>} />
            <Route path='TeaEvent' element={<TeaEvent/>} />
            <Route path='tchBookIssue' element={<TchBookIssue/>} />
            <Route path='tchExamResult' element={<TchExamResult/>} />
            <Route path='AllStaffAttendance' element={<AllStaffAttendance/>} />
          </Route>

          {/* Parents Dashboard Routes */}
          <Route
            path="/parentsDashboard"
            element={
              <ProtectedRoute>
                <ParentsDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Parent />} />
          </Route>
        {/* Guest Dashboard Routes */}
        <Route
            path="/guestDashboard"
            element={
              <ProtectedRoute>
                <GuestDashboard/>
              </ProtectedRoute>
            }
          >
            <Route index element={<Guest/>} />
          </Route>
        </Routes>
      </div>
    </Router>
    </StepProvider>
    </UserProvider>
  );
}

export default App;
