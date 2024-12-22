import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import BASE_URL from "../../../../conf/conf";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const PaySummarySection = ({ onPayloadUpdate }) => {
  const [additionalFields, setAdditionalFields] = useState([]);
  const [users, setUsers] = useState([]);
  const [payload, setPayload] = useState({});
  const [department, setDepartment] = useState({});
  const [designation, setDesignation] = useState({});
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

    // Calculate the current month (YYYY-MM format)
    const getCurrentMonth = () => {
        const date = new Date();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}`;
      };
    
  // Calculate the first date of the current month
    const getFirstDateOfMonth = () => {
    const date = new Date();
    date.setDate(1); // Set the day to 1 (first day of the month)
    return date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  };
  

      useEffect(() => {
        // Set default values for payPeriod and payDate
        setValue('payPeriod', getCurrentMonth());
        setValue('payDate', getFirstDateOfMonth());

      }, [setValue]);

  // Watch all the form fields to track changes
  const formData = watch();
  const fetchdepartment = () => {
    axios
      .get(`${BASE_URL}/department/getDepartmentList`)
      .then((response) => {
        if (response.data.success) {
          setDepartment(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching :", error);
      });
  };
  useEffect(()=>{
    fetchdepartment();
  },[])

  const getDepartmentNameById = (id) => {
    const dep = department.find((type) => type.id == id);
    return dep ? dep.departmentName : id;
  };
  const fetchdesignation = () => {
    axios
      .get(`${BASE_URL}/designation/getDesignationList`)
      .then((response) => {
        if (response.data.success) {
          setDesignation(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching:", error);
      });
  };
  useEffect(()=>{
    fetchdesignation();
  },[])

  const getDesignationNameById = (id) => {
    const des = designation.find((type) => type.id == id);
    return des ? des.designationName : id;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/getUserList`);
        const filteredUsers = response.data.data.filter(user => user.role === 4 && user.isActive == true);
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  // Use ref to store previous formData and avoid infinite effect
  const prevFormData = useRef();
  useEffect(() => {
    // Only run when formData has changed
    if (JSON.stringify(formData) !== JSON.stringify(prevFormData.current)) {
      prevFormData.current = formData;
      generatePayload();
    }
  }, [formData, additionalFields, users]); // Trigger effect on formData, additionalFields, or users change

  const resetForm = () => {
    // Reset the form fields and payloads
    setAdditionalFields([]);
    setPayload({});
    setDepartment([]);
    setDesignation([]);
    setUsers([]);
    reset(); // Reset all the form data via react-hook-form
  };

  const generatePayload = async () => {
    if (!formData.employeeName) return; // Do not generate if employee is not selected
  
    // Get the selected user (employee)
    const selectedUser = users.find(user => user.id == formData.employeeName);
  
    // Fetch school details using the selected user's school ID
    const schoolResponse = await axios.get(`${BASE_URL}/school/getSchoolList`);
    const schoolData = schoolResponse.data.data.find(school => school.id == selectedUser.school);
    console.log(schoolData,'schoolData')
  
    // Fetch teacher info for the selected employee
    const teacherInfoResponse = await axios.get(`${BASE_URL}/teacherInfo/getTeacherInfoList`);
    const teacherInfo = teacherInfoResponse.data.data.find(teacher => teacher.teacherId == selectedUser.id);

    const date = new Date(formData.payPeriod); 
const formattedDate = date.toLocaleDateString('en-US', {
  month: 'short', // Gets abbreviated month name
  year: 'numeric', // Gets numeric year
});
const finalDate = formattedDate.replace(' ', ', '); // Adds a comma after the month
  
    // Construct the payload
    const newPayload = {
      userTableId: formData.employeeName,
      schoolName: schoolData?.name || '',
      schoolAddress: schoolData?.houseNumber || '',
      schoolCity: schoolData?.city || '',
      schoolPincode: schoolData?.pinCode || '',
      schoolCountry: schoolData?.country || '',
      empName: `${selectedUser.firstName} ${selectedUser.lastName}`,
      payPeriod: finalDate,
      lossOfPaydays: formData.lossOfPayDays,
      employeeId: teacherInfo?.employeeNumber||'1',
      paidDays: formData.paidDays,
      payDate: formData.payDate,
      dateOfJoining: teacherInfo?.dateOfJoining || '2024-01-01', // Use the fetched date of joining
      designation: getDesignationNameById(teacherInfo?.designation) || '', // Use the fetched designation
      department: getDepartmentNameById(teacherInfo?.department) || '', // Use the fetched department
      paySummaryFieldList: additionalFields.map(field => ({
        paySummaryFieldName: field.name,
        paySummaryValue: field.value
      }))
    };
  
    console.log('Generated Payload inside generatePayload:', newPayload); // Log inside generatePayload
    setPayload(newPayload); // Update the payload state
    setValue('employeeId', teacherInfo?.employeeNumber);

  };


  useEffect(() => {
    onPayloadUpdate(payload); // This sends the updated payload to the parent component
  }, [payload,setValue]); // Update when the payload state changes
  
  

    useEffect(() => {
    //   const updatedPayload = generatePayload();
      onPayloadUpdate(payload);
    }, [ ]);

  // Handle adding additional fields
  const handleAddField = () => {
    setAdditionalFields([
      ...additionalFields,
      { id: Date.now(), name: '', value: '' },
    ]);
  };

  const handleFieldChange = (id, field, value) => {
    setAdditionalFields(
      additionalFields.map((fieldItem) =>
        fieldItem.id === id ? { ...fieldItem, [field]: value } : fieldItem
      )
    );
  };

  const handleDeleteField = (id) => {
    setAdditionalFields(
      additionalFields.filter((fieldItem) => fieldItem.id !== id)
    );
  };

  return (
    <div className="p-6 ">
        {/* {      console.log('Updated Payload:', newPayload)        } */}
      <h2 className="text-xl font-bold mb-6">Employee Pay Summary</h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Employee Name */}
        <div className="flex items-center gap-4">
          <label className="w-1/3 font-medium">Employee Name *</label>
          <select
            {...register('employeeName', { required: 'Employee Name is required' })}
            className={`py-2 px-3 rounded-lg bg-gray-100 border ${errors.employeeName ? 'border-red-500' : 'border-gray-300'} focus:outline-none w-2/3`}
          >
            <option value="">Select Employee</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </select>
          {errors.employeeName && (
            <p className="text-red-500 text-sm">{errors.employeeName.message}</p>
          )}
        </div>

        {/* Employee ID */}
        <div className="flex items-center gap-4">
          <label className="w-1/3 font-medium">Employee ID *</label>
          <input
          readOnly
            type="text"
            {...register('employeeId', { required: 'Employee ID is required' })}
            className={`py-2 px-3 rounded-lg bg-gray-100 border ${errors.employeeId ? 'border-red-500' : 'border-gray-300'} focus:outline-none w-2/3`}
          />
          {errors.employeeId && (
            <p className="text-red-500 text-sm">{errors.employeeId.message}</p>
          )}
        </div>

        {/* Pay Period */}
        <div className="flex items-center gap-4">
          <label className="w-1/3 font-medium">Pay Period *</label>
          <input
            type="month"
            {...register('payPeriod', { required: 'Pay Period is required' })}
            className={`py-2 px-3 rounded-lg bg-gray-100 border ${errors.payPeriod ? 'border-red-500' : 'border-gray-300'} focus:outline-none w-2/3`}
          />
          {errors.payPeriod && (
            <p className="text-red-500 text-sm">{errors.payPeriod.message}</p>
          )}
        </div>

        {/* Paid Days */}
        <div className="flex items-center gap-4">
          <label className="w-1/3 font-medium">Paid Days *</label>
          <input
            type="number"
            {...register('paidDays', { required: 'Paid Days are required' })}
            className={`py-2 px-3 rounded-lg bg-gray-100 border ${errors.paidDays ? 'border-red-500' : 'border-gray-300'} focus:outline-none w-2/3`}
          />
          {errors.paidDays && (
            <p className="text-red-500 text-sm">{errors.paidDays.message}</p>
          )}
        </div>

        {/* Loss of Pay Days */}
        <div className="flex items-center gap-4">
          <label className="w-1/3 font-medium">Loss of Pay Days *</label>
          <input
            type="number"
            {...register('lossOfPayDays', { required: 'Loss of Pay Days are required' })}
            className={`py-2 px-3 rounded-lg bg-gray-100 border ${errors.lossOfPayDays ? 'border-red-500' : 'border-gray-300'} focus:outline-none w-2/3`}
          />
          {errors.lossOfPayDays && (
            <p className="text-red-500 text-sm">{errors.lossOfPayDays.message}</p>
          )}
        </div>

        {/* Pay Date */}
        <div className="flex items-center gap-4">
          <label className="w-1/3 font-medium">Pay Date *</label>
          <input
            type="date"
            {...register('payDate', { required: 'Pay Date is required' })}
            className={`py-2 px-3 rounded-lg bg-gray-100 border ${errors.payDate ? 'border-red-500' : 'border-gray-300'} focus:outline-none w-2/3`}
          />
          {errors.payDate && (
            <p className="text-red-500 text-sm">{errors.payDate.message}</p>
          )}
        </div>
      </div>

      {/* Additional Fields */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Additional Fields</h3>
        {additionalFields.map((field) => (
          <div key={field.id} className="flex items-center gap-4 mb-3">
            <input
              type="text"
              placeholder="Field Name *"
              value={field.name}
              onChange={(e) => handleFieldChange(field.id, 'name', e.target.value)}
              required
              className="py-2 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none w-1/2"
            />
            <input
              type="text"
              placeholder="Field Value *"
              value={field.value}
              onChange={(e) => handleFieldChange(field.id, 'value', e.target.value)}
              required
              className="py-2 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none w-1/2"
            />
            {/* <button
              type="button"
              onClick={() => handleDeleteField(field.id)}
              className="text-red-500"
            >
              Delete
            </button> */}
            <button
                type="button"
                onClick={() => handleDeleteField(field.id)}
                className="text-red-500 hover:text-red-700"
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        ))}
        {/* <button
          type="button"
          onClick={handleAddField}
          className="py-2 px-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
        >
          Add Field
        </button> */}
                  <span
            onClick={handleAddField}
            className="text-blue-500 cursor-pointer flex items-center gap-2"
          >
            <span className="text-xl">+</span> Add Additional Field
          </span>
      </div>
    </div>
  );
};

export default PaySummarySection;
