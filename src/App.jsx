import { React } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
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
import EditUser from './Dashboard/Admin_Dashboard/User/EditUser';
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

import HomePage from './Dashboard/Admin_Dashboard/TimeTable/HomePage'
import ClassPage from './Dashboard/Admin_Dashboard/TimeTable/ClassPage';
import TimetablePage from './Dashboard/Admin_Dashboard/TimeTable/TimeTablePage';
import TeacherPage from './Dashboard/Admin_Dashboard/TimeTable/TeacherPage'
import TeacherTimeTable from './Dashboard/Admin_Dashboard/TimeTable/TeacherTimeTable';

function App() {
  return (
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
            <Route path="editUser" element={<EditUser />} />
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
  );
}

export default App;
