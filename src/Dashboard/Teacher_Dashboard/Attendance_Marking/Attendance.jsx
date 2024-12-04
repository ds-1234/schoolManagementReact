import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../../../Reusable_components/Table'; 
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import Button from '../../../Reusable_components/Button';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';
import BASE_URL from '../../../conf/conf';

const Attendance = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const { classItem } = useLocation().state;
  const [students, setStudents] = useState([]);
  const [attendanceMap, setAttendanceMap] = useState({});
  const today = dayjs().format('YYYY-MM-DD'); // ISO format for date in payload
  const [attendanceStatuses, setAttendanceStatuses] = useState([]);

  // Fetch students based on classItem
  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/getUserList`, {
        headers: { 'Content-Type': 'application/json' },
      });
      const filteredStds = response.data.data.filter(user => user.role === 3);
      const filteredStudents = filteredStds.filter(std => std.className?.includes(classItem.id));
      setStudents(filteredStudents);      

     // Set default attendance as "Absent" for all students
      const defaultAttendance = {};
      filteredStudents.forEach(student => {
        defaultAttendance[student.id] = 'Absent';
      });
      setAttendanceMap(defaultAttendance);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchAttendanceStatus = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/attendance/getStaffAttendanceStatus`, {
        headers: { 'Content-Type': 'application/json' },
      });
      setAttendanceStatuses(response.data.data.filter(status => status.isActive));
    } catch (error) {
      console.error('Error fetching attendance statuses:', error);
    }
  };

  // Update attendance record for each student
  const handleAttendanceChange = (studentId, status) => {
    setAttendanceMap((prevMap) => ({
      ...prevMap,
      [studentId]: status, 
    }));
  };

  useEffect(() => {
    fetchStudents();
    fetchAttendanceStatus()
  }, [classItem]);

  // Handle form submission (sending the attendance data)
  const handleSubmit = async () => {
    if (Object.keys(attendanceMap).length < students.length) {
      Swal.fire('Error!', 'Please fill attendance for all students.', 'error');
      return;
    }

    Swal.fire({
      title: 'Submit Attendance?',
      text: 'Are you sure you want to submit the attendance?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, submit it!',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {

        const attendanceStatusList = Object.keys(attendanceMap).map((studentId) => {
          const attendanceStatus = attendanceStatuses.find(
            (status) => status.attendanceStatus === attendanceMap[studentId]
          );
          return {
            studentId: parseInt(studentId),
            attendanceStatusId: attendanceStatus?.id,
          };
        });

        const payload = {
          teacher: user.id,
          className: classItem.id,
          attendanceDate: today,
         attendanceStatusList
        };

        try {
          await axios.post(`${BASE_URL}/attendance/saveAttendance`, payload, {
            headers: { 'Content-Type': 'application/json' },
          });
          Swal.fire('Success!', 'Attendance submitted successfully!', 'success');
        } catch (error) {
          console.error('Error submitting attendance:', error);
          Swal.fire('Error!', 'There was an error submitting the attendance.', 'error');
        }
      } else {
        setAttendanceMap({});
      }
    });
  };

  // Columns for react-table
  const columns = [
    {
      name: 'SR.No',
      selector: (row, idx) => idx + 1,
      sortable: false,
    },
    {
      name: 'Roll No',
      selector: (row) => row.rollNumber,
      sortable: false,
    },
    {
      name: 'Student Name',
      selector: (row) => row.firstName + ' ' + row.lastName,
      sortable: true,
    },
    // {
    //   name: 'Present',
    //   cell: (row) => (
    //     <input
    //       type="radio"
    //       name={`attendance_${row.id}`}
    //       value="present"
    //       checked={attendanceMap[row.id] === 'present'}
    //       onChange={() => handleAttendanceChange(row.id, 'present')}
    //       className="bg-green-500"
    //     />
    //   ),
    // },
    // {
    //   name: 'Absent',
    //   cell: (row) => (
    //     <input
    //       type="radio"
    //       name={`attendance_${row.id}`}
    //       value="absent"
    //       checked={attendanceMap[row.id] === 'absent'}
    //       onChange={() => handleAttendanceChange(row.id, 'absent')}
    //       className="bg-red-500"
    //     />
    //   ),
    // },

    // {
    //   name: 'Half Day',
    //   cell: (row) => (
    //     <input
    //       type="radio"
    //       name={`attendance_${row.id}`}
    //       value="halfDay"
    //       checked={attendanceMap[row.id] === 'halfDay'}
    //       onChange={() => handleAttendanceChange(row.id, 'halfDay')}
    //       className="bg-yellow-500"
    //     />
    //   ),
    // },

    // {
    //   name: 'Medical',
    //   cell: (row) => (
    //     <input
    //       type="radio"
    //       name={`attendance_${row.id}`}
    //       value="medical"
    //       checked={attendanceMap[row.id] === 'medical'}
    //       onChange={() => handleAttendanceChange(row.id, 'medical')}
    //       className="bg-blue-500"
    //     />
    //   ),
    // },
    ...attendanceStatuses.map((status) => ({
      name: status.attendanceStatus,
      cell: (row) => (
        <input
          type="radio"
          name={`attendance_${row.id}`}
          value={status.attendanceStatus}
          checked={attendanceMap[row.id] === status.attendanceStatus}
          onChange={() => handleAttendanceChange(row.id, status.attendanceStatus)}
          // className={`bg-${status.attendanceStatus.toLowerCase()}-500`}
        />
      ),
    })),
  ];

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setAttendanceMap({});
        Swal.fire('Deleted!', 'Your Data has been deleted.', 'success');
      }
    });
  };

  return (
    <div className='h-full mb-10'>
      <div className="flex flex-col mb-6">
        <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>{`Attendance: ${classItem.name} - ${classItem.section}`}</h1>
        <p className='mt-2'>Dashboard /<NavLink to = '/teacherDashboard'> Teacher </NavLink>/ <NavLink to = '/teacherDashboard/classSelect'> Classes </NavLink>/ <span className='text-[#ffae01] font-semibold'>Attendance</span> </p>
      </div>
      <span className="text-lg absolute top-20 right-10">{`Date: ${today}`}</span>
      <Table
        columns={columns}
        data={students}
        searchOptions={[{ label: 'Student Name', value: 'name' }]}
      />

      <div className='flex gap-2'>
        <Button onClick={handleSubmit} label='Submit Attendance' className='mt-5'/>
        <Button onClick={handleDelete} label='Cancel' className='mt-5 bg-[#ffae01]'/>
      </div>
    </div>
  );
};

export default Attendance;
