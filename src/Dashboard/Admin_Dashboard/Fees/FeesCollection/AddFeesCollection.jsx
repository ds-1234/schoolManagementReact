import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../../../Reusable_components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import ToggleButton from '../../../../Reusable_components/ToggleButton';
import { useForm } from 'react-hook-form';

function AddFeesCollection({ isOpen, onClose }) {
  const [value, setValue] = useState(true); // Toggle button state
  const [student, setStudent] = useState([]); // Student list
  const [selectedStudent, setSelectedStudent] = useState(null); // Selected Student
  const [feesGrp, setFeesGrp] = useState([]); // fee grp list
  const [selectedFeesGrp, setSelectedFeesGrp] = useState(null); // Selected Fee grp
  const [dropdownOpen, setDropdownOpen] = useState(false); // Player dropdown
  const [dropdownOpen2, setDropdownOpen2] = useState(false); // Sport dropdown


  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
const [payDropdownOpen, setPayDropdownOpen] = useState(false);

// Function to handle selection of payment method
const handleSelectPaymentMethod = (method) => {
  setSelectedPaymentMethod(method);
  setPayDropdownOpen(false);
};
const { register, handleSubmit, formState: { errors }, reset } = useForm();


  // debugger
  useEffect(() => {
    axios.get('http://localhost:8080/user/getUserList')
      .then((response) => {
        console.log(response.data)
        const studentList = response.data.data.filter(user => user.role === 3);
        setStudent(studentList);
        console.log(studentList,'studentList')
      })
      .catch((error) => {
        console.log(error,'error')
        toast.error('Error fetching Student');
      });
  }, []);

  // Fetch Fees Grp
  useEffect(() => {
    axios.get('http://localhost:8080/feesGroup/getFeesGroupList')
      .then((response) => {
        setFeesGrp(response.data.data);
      })
      .catch((error) => {
        toast.error('Error fetching Fees Group');
      });
  }, []);

  // Handle form submission
  const onSubmit = (data) => {
    // e.preventDefault();

    // Ensure that both a player and a sport are selected
    if (!selectedStudent || !selectedFeesGrp) {
      toast.error('Please select both a player and a sport');
      return;
    }

    // Submit the form data to the server
    axios({
      method: 'post',
      url: 'http://localhost:8080/feesCollection/savefeesCollection',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        userId:  selectedStudent.id , 
        feesGroupNameId:  selectedFeesGrp.id , // Send selected Fee grp ID
        feeAmount:data.amount,
        paymentType: selectedPaymentMethod,
        description:data.description,
        isActive: value // Send active status
      },
    })
    .then(() => {
      toast.success('Fee Collection Created successfully!');
    //   onSuccess();
      onClose();
    })
    .catch((error) => {
      toast.error('Failed to Create Fee Collection.');
      console.error('Error Creating Fee Collection:', error);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>

        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold text-center mb-6 text-[#042954]">Add Fee Collection</h2>

          {/* Student List Input */}
          <div className="mb-4 relative">
            <label htmlFor="playersName" className="block text-gray-700 font-semibold mb-2">Student List</label>
            <div
              className="border rounded-lg cursor-pointer p-2 flex justify-between items-center"
              onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown for Student
            >
              <p>{selectedStudent? `${selectedStudent.firstName} ${selectedStudent.lastName}` : 'Select Student'}</p>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
            {dropdownOpen && (
              <div className="absolute bg-white border rounded-lg mt-1 flex flex-col w-full z-10">
                {student.map(student => (
                  <div
                    key={student.id}
                    className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
                    onClick={() => {
                        setSelectedStudent(student); // Set selected player
                      setDropdownOpen(false); // Close dropdown after selection
                    }}
                  >
                    {`${student.firstName} ${student.lastName}`}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Fees Grp Input */}
          <div className="mb-4 relative">
            <label htmlFor="sportsName" className="block text-gray-700 font-semibold mb-2">Fees Group</label>
            <div
              className="border rounded-lg cursor-pointer p-2 flex justify-between items-center"
              onClick={() => setDropdownOpen2(!dropdownOpen2)} // Toggle dropdown for sports
            >
              <p>{selectedFeesGrp ? selectedFeesGrp.feesGroupName : 'Select Fees Group'}</p>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
            {dropdownOpen2 && (
              <div className="absolute bg-white border rounded-lg mt-1 flex flex-col w-full z-10">
                {feesGrp.map(feesGrp => (
                  <div
                    key={feesGrp.id}
                    className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
                    onClick={() => {
                      setSelectedFeesGrp(feesGrp); // Set selected sport
                      setDropdownOpen2(false); // Close dropdown after selection
                    }}
                  >
                    {feesGrp.feesGroupName}
                  </div>
                ))}
              </div>
            )}
          </div>

        {/* Amount */}
                      <div>
              <label className="block text-sm font-medium mb-2 text-black" htmlFor="amount">Amount *</label>
              <input
                type="number"
                id="amount"
                {...register("amount", { required: "Amount is required" })}
                className="block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-[#f3f4f6] py-1 px-1"
              />
              {errors.amount && (
                <p className="text-red-500 text-sm">{errors.amount.message}</p>
              )}
            </div>

             {/* Payment Method */}
<div className="relative">
  <label htmlFor="paymentmethod" className="block text-sm font-medium mb-2 text-black">
    Payment Method *
  </label>
  <div
    className="block h-9 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-[#f3f4f6] py-2 px-3 cursor-pointer flex justify-between items-center"
    onClick={() => setPayDropdownOpen(!payDropdownOpen)}
  >
    <p>{selectedPaymentMethod || 'Select Payment Method'}</p>
    <FontAwesomeIcon icon={faAngleDown} />
  </div>
  {payDropdownOpen && (
    <div className="absolute bg-white border rounded-lg mt-1 flex flex-col w-full z-10">
      <div
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        onClick={() => handleSelectPaymentMethod('Cash')}
      >
        Cash
      </div>
      <div
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        onClick={() => handleSelectPaymentMethod('Online')}
      >
        Online
      </div>
    </div>
  )}
</div>

         {/* Description Input */}
         <div className="mb-2">
            <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              id="description"
              className={`w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              rows="4"
              {...register('description', { required: 'Description is required' })}
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>



          {/* Toggle for Status */}
          <div className="mb-2">
            <label className="block text-sm font-medium mb-2 text-black" htmlFor="active">
              Status 
            </label>
            <ToggleButton
              isOn={value}
              handleToggle={() => setValue(!value)}
              id="active"
              register={register}
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full text-center" />
        </form>
      </div>
    </div>
  );
}

export default AddFeesCollection;
