import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../../Reusable_components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import ToggleButton from '../../../Reusable_components/ToggleButton';
import BASE_URL from '../../../conf/conf';

function EditDepartment({ isOpen, onClose, departmentId, onSuccess }) {
    const [value, setValue] = useState(true);
  const [department, setDepartment] = useState({ departmentName: '',isActive:true });


  const {
    register,
    // handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);



  useEffect(() => {
    if (departmentId) {
      axios.get(`${BASE_URL}/department/getDepartmentById/${departmentId}`)
        .then((response) => {
          const department = response.data.data;
          setDepartment(department);
          setValue(department.isActive)

        })
        .catch((error) => {
          console.error('Error fetching Department:', error);
        });
    }
  }, [departmentId, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

//   const handleCheckboxChange = (id) => {
//     if (selectedCoach.includes(id)) {
//         setSelectedCoach(selectedCoach.filter(subjectId => subjectId !== id));
//     } else {
//         setSelectedCoach([...selectedCoach, id]);
//     }
//   };

const handleSubmit = (e) => {
    e.preventDefault();

    // Send only the selected coach ID
    axios({
      method: 'post',
      url:`${BASE_URL}/department/saveDepartment`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        id: departmentId,
        departmentName: department.departmentName,
        isActive: value
      },
    })
      .then((response) => {
        toast.success('Department updated successfully!');
        onSuccess();
        onClose();
      })
      .catch((error) => {
        toast.error('Failed to update Department.');
        console.error('Error updating Department:', error);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 md:p-0 p-5">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>

        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center mb-6 text-[#042954]">Edit Department</h2>

          {/* Department Input */}
          <div className="mb-4">
            <label htmlFor="departmentName" className="block text-gray-700 text-sm font-bold mb-2">Department</label>
            <input
              type="text"
              id="departmentName"
              name="departmentName"
              value={department.departmentName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Department name"
              required
            />
          </div>




          <div className="mb-2">
              <label className="block text-sm font-medium mb-2 text-black" htmlFor="active">
                Status 
              </label>
              <ToggleButton
                isOn={value}
                handleToggle={() => setValue(!value)}
                id="active"
                // label="Active"
                register={register}
              />
            </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full text-center"
          />
        </form>
      </div>
    </div>
  );
}

export default EditDepartment;
