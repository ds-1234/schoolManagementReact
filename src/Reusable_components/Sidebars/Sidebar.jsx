import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faAngleDown, faAngleRight, faSchool, faBookOpen, faUser, faPenRuler, faBookAtlas, faChildren,  faFileLines, faBus, faCalendarDay, faSliders } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {

  // const [isStdDropdown , setIsStdDropdown] = useState(false) ;
  // const [isExamDropdown , setIsExamDropdown] = useState(false) ;
  // const [isIncomeDropdown , setIsIncomeDropdown] = useState(false) ;
  // const [isSportsDropdown , setIsSportsDropdown] = useState(false) ;
  // const [isHostelDropdown , setIsHostelDropdown] = useState(false) ;
  // const [isUserDropdown , setIsUserDropdown] = useState(false) ;
  // const [isConfOpen , setIsConfOpen] = useState(false) ;
  const userRole = sessionStorage.getItem('role') 
  const [openDropdown, setOpenDropdown] = useState(null)


  // const toggleStdDropdown = () => {
  //   setIsStdDropdown(!isStdDropdown);
  // };

  // const toggleExamDropdown = () => {
  //   setIsExamDropdown(!isExamDropdown);
  // };
  // const toggleIncomeDropdown = () => {
  //   setIsIncomeDropdown(!isIncomeDropdown);
  // };
  // const toggleSportsDropdown = () => {
  //   setIsSportsDropdown(!isSportsDropdown);
  // };
  // const toggleHostelDropdown = () => {
  //   setIsHostelDropdown(!isHostelDropdown);
  // };

  // const toggleUserDropdown = () => {
  //   setIsUserDropdown(!isUserDropdown);
  // };

  // const toggleConf = () => {
  //   setIsConfOpen(!isConfOpen) ;
  // }

   const toggleDropdown = (dropdown) => {
    setOpenDropdown(prevDropdown => prevDropdown === dropdown ? null : dropdown);
  };

 
  return (
    <div className='bg-[#051f3e] fixed h-screen '>
      <nav className="p-5 h-full overflow-y-auto scrollbar-hide">
        <ul>
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink to={'/admin'} className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 hover:rounded-xl ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`}
              >
              <div className="flex gap-1 justify-center items-center">
                <FontAwesomeIcon icon={faHouse} className="mr-2 text-[#ffae01]"  />
                  Dashboard
              </div>
            </NavLink>
            </li>

           {/* User Section */}
           <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/admin/activeUser"
              className={({ isActive }) =>
                `flex items-center justify-between hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
              <div className='flex items-center justify-start gap-1'>
              <FontAwesomeIcon icon={faUser} className="mr-3 text-[#ffae01]" />
                User
              </div>
              <FontAwesomeIcon icon={faAngleDown} className="mr-2" onClick={() => toggleDropdown('user')} />
            </NavLink>
            {openDropdown === 'user' && (
              <ul className=" text-sm font-normal flex flex-col bg-[#021933] mt-2">
                <li>
                  <NavLink
                    to="/admin/activeUser"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] py-2 px-10 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Active Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/pendingUser"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] py-2 px-10 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Pending Users
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Conf Section */}
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/admin/role"
              className={({ isActive }) =>
                `flex items-center justify-between hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'bg-[#002b52] text-[#ffae01] font-bold rounded-xl' : ''}`
              }
            >
              <div className='flex items-center justify-start gap-1'>
              <FontAwesomeIcon icon={faSliders} className="mr-2 text-[#ffae01]" />
                Configuration
              </div>
              <FontAwesomeIcon icon={faAngleDown} className="mr-3" onClick={() => toggleDropdown('conf')} />
            </NavLink>
            {openDropdown=='conf' && (
              <ul className=" text-sm font-normal flex flex-col bg-[#021933] mt-2">
                <li>
                  <NavLink
                    to="/admin/role"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256]  hover:rounded-xl py-2 px-10 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Role
                  </NavLink>
                </li>


          {/* Class Section */}
          <li className="">
            <NavLink
              to="/admin/class"
              className={({ isActive }) =>
                `flex items-center gap-1 hover:bg-[#063256] hover:rounded-xl py-2 px-10 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
              {/* <FontAwesomeIcon icon={faPenRuler} className="mr-3 text-[#ffae01]" /> */}
              <FontAwesomeIcon icon={faAngleRight} />
              Grade
            </NavLink>
          </li>

          {/* Subject Section */}
          <li className="">
            <NavLink
              to="/admin/subject"
              className={({ isActive }) =>
                `flex items-center gap-1 hover:bg-[#063256] hover:rounded-xl py-2 px-10 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
              {/* <FontAwesomeIcon icon={faBook} className="mr-3 text-[#ffae01]" /> */}
               <FontAwesomeIcon icon={faAngleRight} />
              Subject
            </NavLink>
          </li>

                 {/* School Section */}
                 <li className="">
            <NavLink
              to="/admin/school"
              className={({ isActive }) =>
                `flex items-center gap-1 hover:bg-[#063256] hover:rounded-xl py-2 px-10 ${isActive ? 'bg-[#002b52] text-[#ffae01] font-bold rounded-xl' : ''}`
              }
            >
              {/* <FontAwesomeIcon icon={faSchool} className="mr-3 text-[#ffae01]" /> */}
               <FontAwesomeIcon icon={faAngleRight} />
              School
            </NavLink>
          </li>
                 {/* Designation Section */}
                 <li className="">
            <NavLink
              to="/admin/designation"
              className={({ isActive }) =>
                `flex items-center gap-1 hover:bg-[#063256] hover:rounded-xl py-2 px-10 ${isActive ? 'bg-[#002b52] text-[#ffae01] font-bold rounded-xl' : ''}`
              }
            >
              {/* <FontAwesomeIcon icon={faSchool} className="mr-3 text-[#ffae01]" /> */}
               <FontAwesomeIcon icon={faAngleRight} />
               Designation
            </NavLink>
          </li>
                 {/* Departmrnt Section */}
                 <li className="">
            <NavLink
              to="/admin/department"
              className={({ isActive }) =>
                `flex items-center gap-1 hover:bg-[#063256] hover:rounded-xl py-2 px-10 ${isActive ? 'bg-[#002b52] text-[#ffae01] font-bold rounded-xl' : ''}`
              }
            >
              {/* <FontAwesomeIcon icon={faSchool} className="mr-3 text-[#ffae01]" /> */}
               <FontAwesomeIcon icon={faAngleRight} />
               Department
            </NavLink>
          </li>
              </ul>
            )}
          </li>



          {/* Books Section */}
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/admin/books"
              className={({ isActive }) =>
                `flex items-center hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
              <FontAwesomeIcon icon={faBookAtlas} className="mr-4 text-[#ffae01]" />
              Library
            </NavLink>
          </li>

          

          {/* Student Section */}
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
            to={'/admin/AdmissionForm'}
              className={({ isActive }) =>
                `flex items-center justify-between hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
              <div className='flex items-center justify-start gap-1'>
                <FontAwesomeIcon  icon={faChildren} className=" mr-2 text-[#ffae01]" />
                Students
              </div>
              <FontAwesomeIcon icon={faAngleDown} className="mr-3" onClick={() => toggleDropdown('students')} />
            </NavLink>
            {openDropdown == 'students' && (
              <ul className=" text-sm font-normal flex flex-col bg-[#021933] mt-2">
                {/* <li>
                  <NavLink
                    to="/admin/AllStudents"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] py-2 px-10 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    All Students
                  </NavLink>
                </li> */}
                <li>
                  <NavLink
                    to="/admin/AdmissionForm"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] py-2 px-10 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Admission Form
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/studentDetails"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] py-2 px-10 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight}  />
                    Student Details 
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/studentPromotion"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] py-2 px-10 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Student Promotion 
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

    {/* Transport section */}
    <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/admin/transport"
              className={({ isActive }) =>
                `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
                <FontAwesomeIcon icon={faBus} className="mr-3 text-[#ffae01]" />
                Transport
            </NavLink>
          </li>

          {/* Notice Board Section */}
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/admin/notice"
              className={({ isActive }) =>
                `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
                <FontAwesomeIcon icon={faFileLines} className="mr-4 text-[#ffae01]" />
                Notice
              
            </NavLink>
          </li>


          {/* Examinations Section */}
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/admin/Examinations"
              className={({ isActive }) =>
                `flex items-center justify-between hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
              <div className='flex items-center justify-start gap-1'>
                <FontAwesomeIcon icon={faFileLines} className="mr-3 text-[#ffae01]" />
                Examinations
              </div>
              <FontAwesomeIcon icon={faAngleDown} className="mr-3" onClick={() => toggleDropdown('exam')} />
            </NavLink>
            {openDropdown=='exam' && (
              <ul className=" text-sm font-normal flex flex-col bg-[#021933] mt-2">
                <li>
                  <NavLink
                    to="/admin/Examinations"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] py-2 px-10 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Exam type
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/Examschedule"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] py-2 px-10 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Exam Schedule
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/Grade"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] py-2 px-10 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Grade
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/Examattendance"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] py-2 px-10 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Exam Attendance
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/Examresults"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] py-2 px-10 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Exam Results
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Time Table Section */}
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/admin/home"
              className={({ isActive }) =>
                `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
                <FontAwesomeIcon icon={faCalendarDay} className="mr-4 text-[#ffae01]" />
                Time Table
              
            </NavLink>
          </li>
          {/* HomeWork Section */}
       <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
        <NavLink
          to="/admin/homework"
          className={({ isActive }) =>
            `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
          }
        >
            <FontAwesomeIcon icon={faBookOpen} className="mr-3 text-[#ffae01]" />
            Home work
          
        </NavLink>
      </li>


          {/* accounts Section */}
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/admin/Expenses"
              className={({ isActive }) =>
                `flex items-center justify-between hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
              <div className='flex items-center justify-start gap-1'>
                <FontAwesomeIcon icon={faFileLines} className="mr-4 text-[#ffae01]" />
                Accounts
              </div>
              <FontAwesomeIcon icon={faAngleDown} className="mr-3" onClick={() => toggleDropdown('accounts')} />
            </NavLink>
            {openDropdown=='accounts' && (
              <ul className=" text-sm font-normal flex flex-col bg-[#021933] mt-2">
                <li>
                  <NavLink
                    to="/admin/Expenses"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] py-2 px-10 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Expenses
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/ExpenseCategory"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] py-2 px-10 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Expense Category
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/income"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] py-2 px-10 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Income
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/Invoices"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] py-2 px-10 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Invoices
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/Invoiceview"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] py-2 px-10 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Invoice Veiw
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/Transactions"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] py-2 px-10 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Transactions
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

    {/* Holidays section */}
    <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/admin/holidays"
              className={({ isActive }) =>
                `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
                <FontAwesomeIcon icon={faBus} className="mr-3 text-[#ffae01]" />
                Holidays
            </NavLink>
          </li>
    {/* Leave section */}
    <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/admin/leave"
              className={({ isActive }) =>
                `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
                <FontAwesomeIcon icon={faBus} className="mr-3 text-[#ffae01]" />
                Leave
            </NavLink>
          </li>


          {/* Sports Section */}
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
            to={'/admin/sports'}
              className={({ isActive }) =>
                `flex items-center justify-between hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
              <div className='flex items-center justify-start gap-1'>
                <FontAwesomeIcon icon={faChildren} className="mr-1 text-[#ffae01]" />
                Sports
              </div>
              <FontAwesomeIcon icon={faAngleDown} className="mr-3" onClick={() => toggleDropdown('sports')} />
            </NavLink>
            {openDropdown=='sports' && (
              <ul className=" text-sm font-normal flex flex-col bg-[#021933] mt-2">
                <li>
                  <NavLink
                    to="/admin/Sports"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] py-2 px-10 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Sports
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/Players"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] py-2 px-10 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight}  />
                    Players 
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          {/* Hostel Section */}
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
            to={'/admin/hostel'}
              className={({ isActive }) =>
                `flex items-center justify-between hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
              <div className='flex items-center justify-start gap-1'>
                <FontAwesomeIcon icon={faChildren} className="mr-1 text-[#ffae01]" />
                Hostel
              </div>
              <FontAwesomeIcon icon={faAngleDown} className="mr-3" onClick={() => toggleDropdown('hostel')} />
            </NavLink>
            {openDropdown == 'hostel' && (
              <ul className=" text-sm font-normal flex flex-col bg-[#021933] mt-2">
                <li>
                  <NavLink
                    to="/admin/hostel"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] py-2 px-10 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Hostel
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/hostelrooms"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] py-2 px-10 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight}  />
                    Hostel Rooms 
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/roomtype"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] py-2 px-10 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight}  />
                     Room Type
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/hostelallocation"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] py-2 px-10 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight}  />
                    Hostel Allocation 
                  </NavLink>
                </li>
              </ul>
            )}
          </li>



        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

