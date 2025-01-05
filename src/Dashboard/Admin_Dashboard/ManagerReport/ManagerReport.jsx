import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Button from '../../../Reusable_components/Button';
import BASE_URL from '../../../conf/conf';
import { toast } from 'react-toastify';
import Table from '../../../Reusable_components/Table';
import Loader from '../../../Reusable_components/Loader';

const ManagerReport = () => {
  const [teachers, setTeachers] = useState([]);
  const [nonTeachStaff, setNonTeachStaff] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [roles, setRoles] = useState([]);
  const [selectedManager, setSelectedManager] = useState('');
  const [selectedReportee, setSelectedReportee] = useState('');
  const [managerList, setManagerList] = useState([]);
  const [reporteeData, setReporteeData] = useState([]);
  const [users , setUsers] = useState([]) ;
  const [loadData , setLoadData] = useState(false) ;
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/getUserList`, {
          headers: { 'Content-Type': 'application/json' },
        });
        const filteredTeachers = response.data.data.filter((user) => user.role === 4);
        const staff = response.data.data.filter((user) => user.role === 6);
        setTeachers(filteredTeachers);
        setNonTeachStaff(staff);
        setUsers(response.data.data) ;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/role/getRoleList`);
        const rolesRes = response.data.data.filter((role) => role.id === 4 || role.id === 6);
        setRoles(rolesRes);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchUsers();
    fetchRoles();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        seniorStaffId: selectedManager,
        staffId: selectedReportee,
      };
      await axios.post(`${BASE_URL}/teacherInfo/createStaffReportee`, payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      toast.success('Manager and Reportee assigned successfully!');
      setLoadData(!loadData) ;
      selectedManager('');
      selectedReportee('') ;
      selectedRole('') ;
    } catch (error) {
      console.error('Error submitting data:', error);
    }finally {
      setLoading(false); // Stop loader
    };
  };
  
  useEffect(() => {
    const fetchManagersAndReportees = async () => {
      try {
        // Fetch managers
        const managerResponse = await axios.get(`${BASE_URL}/teacherInfo/getTeacherInfoList`, {
          headers: { 'Content-Type': 'application/json' },
        });
  
        const managers = managerResponse.data.data.filter((m) => m.manager === 0);
        setManagerList(managers);
  
        // Initialize reporteeMap as an array
        const reporteeMap = [];
        for (const manager of managers) {          
          const response = await axios.get(`${BASE_URL}/teacherInfo/getReporteeList/${manager.teacherId}`);
          const reportees = response.data.data;
  
          // Add manager and reportees to the array
          reportees.forEach((reportee) => {
            const managerBasicDets = users?.find((user) => user.id == manager.teacherId)
            reporteeMap.push({
              managerName: `${managerBasicDets?.firstName} ${managerBasicDets?.lastName}`,
              reporteeName: reportee,
            });
          });
        }
  
        setReporteeData(reporteeMap);
      } catch (error) {
        console.error('Error fetching managers or reportees:', error);
        toast.error('Failed to load manager and reportee data.');
      }
    };
  
    fetchManagersAndReportees();
  }, [loadData , users]);
  

  const columns = [
    {
      name: 'Manager',
      selector: (row) => row.managerName,
      sortable: true,
    },
    {
      name: 'Reportee',
      selector: (row) => row.reporteeName,
      sortable: true,
    },
  ];

  return (
    <div className='flex flex-col justify-start pl-0'>
                <Loader isLoading={loading} /> {/* Use Reusable Loader */}
      <h1 className='text-lg md:text-2xl font-semibold text-black mt-5'>Manager Report</h1>
      <p className='mt-2'>
        <NavLink to='/admin'>Dashboard</NavLink> /
        <NavLink to='/admin/conf'> Configuration </NavLink> /
        <span className='text-[#ffae01] font-semibold'>Manager Report</span>
      </p>

      <div className='flex flex-wrap mt-10 gap-4'>
        <div>
          <label htmlFor="role" className="block text-lg font-medium text-gray-700 mb-2">
            Select Role
          </label>
          <select
            className="block bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="" className='hidden'>Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        {selectedRole && (
          <div className='flex flex-row flex-wrap gap-4'>
            <div>
              <label htmlFor="manager" className="block text-lg font-medium text-gray-700 mb-2">
                Select Manager
              </label>
              <select
                id="manager"
                className="block bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setSelectedManager(e.target.value)}
              >
                <option value="" className='hidden'>Select a Manager</option>
                {selectedRole == 4
                  ? teachers.map((tch) => (
                      <option key={tch.id} value={tch.id}>
                        {tch.firstName} - {tch.userName}
                      </option>
                    ))
                  : nonTeachStaff.map((tch) => (
                      <option key={tch.id} value={tch.id}>
                        {tch.firstName} - {tch.userName}
                      </option>
                    ))}
              </select>
            </div>

            <div>
              <label htmlFor="reportee" className="block text-lg font-medium text-gray-700 mb-2">
                Select Reportee
              </label>
              <select
                id="reportee"
                className="block bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setSelectedReportee(e.target.value)}
              >
                <option value="" className='hidden'>Select a Reportee</option>
                {selectedRole == 4
                  ? teachers.map((tch) => (
                      <option key={tch.id} value={tch.id}>
                        {tch.firstName} - {tch.userName}
                      </option>
                    ))
                  : nonTeachStaff.map((tch) => (
                      <option key={tch.id} value={tch.id}>
                        {tch.firstName} - {tch.userName}
                      </option>
                    ))}
              </select>
            </div>

            <Button onClick={handleSubmit} label='Submit' className='mt-8 w-20 flex justify-center' />
          </div> 
        )}
      </div>

      <Table
      columns={columns}
      data={reporteeData}
       />
    </div>
  );
};

export default ManagerReport;
