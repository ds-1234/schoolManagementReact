import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../../../Reusable_components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import ToggleButton from '../../../../Reusable_components/ToggleButton';
import { useForm } from 'react-hook-form';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import  '../../../../Reusable_components/CkEditor.css';

function AddFeesCollection({ isOpen, onClose }) {
  const [value, setValue] = useState(true); // Toggle button state
  const [students, setStudents] = useState([]); // Student list
  const [filteredStudents, setFilteredStudents] = useState([]); // Filtered student list
  const [selectedStudent, setSelectedStudent] = useState(null); // Selected Student
  const [feesGrp, setFeesGrp] = useState([]); // Fee group list
  const [selectedFeesGrp, setSelectedFeesGrp] = useState(null); // Selected Fee group
  const [classes, setClasses] = useState([]); // Class list
  const [selectedClass, setSelectedClass] = useState(null); // Selected Class
  const [dropdownOpen, setDropdownOpen] = useState(false); // class dropdown
  const [dropdownOpen1, setDropdownOpen1] = useState(false); // Student dropdown
  const [dropdownOpen2, setDropdownOpen2] = useState(false); // Fees group dropdown
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [payDropdownOpen, setPayDropdownOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // Radio button state

  const classDropdownRef = useRef(null); // Ref for the class dropdown
  const studentDropdownRef = useRef(null); // Ref for the student dropdown
  const feesGroupDropdownRef = useRef(null); // Ref for the fees group dropdown
  const paymentmtdDropdownRef = useRef(null); // Ref for the fees group dropdown
  const [editorData, setEditorData] = useState('');



  const { register, handleSubmit, formState: { errors }, reset } = useForm();



  useEffect(() => {
    // Disable scrolling on background when the popup is open
    if (isOpen) {
      setEditorData('')

      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Add event listener for ESC key press
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        reset();
        setSelectedStudent(null)
        setSelectedFeesGrp(null)
        setSelectedClass(null)
        setSelectedPaymentMethod('')
        setPaymentStatus(null); // Reset to null after submission
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto'; // Clean up scrolling style
    };
  }, [isOpen, onClose]);

  // Fetch students
  useEffect(() => {
    axios.get('http://localhost:8080/user/getUserList')
      .then((response) => {
        const studentList = response.data.data.filter(user => user.role === 3);
        setStudents(studentList);
      })
      .catch((error) => {
        toast.error('Error fetching Students');
      });
  }, []);

  // Fetch Fees Groups
  useEffect(() => {
    axios.get('http://localhost:8080/feesGroup/getFeesGroupList')
      .then((response) => {
        const feeGroups = response.data.data;

        const reqGroup = feeGroups.filter(feeGrp => feeGrp.isActive === true);

        setFeesGrp(reqGroup);      })
      .catch((error) => {
        toast.error('Error fetching Fees Group');
      });
  }, []);

  // Fetch Classes
  useEffect(() => {
    axios.get('http://localhost:8080/class/getClassList')
      .then((response) => {
        setClasses(response.data.data);
      })
      .catch((error) => {
        toast.error('Error fetching Classes');
      });
  }, []);

  // Filter students by selected class
  useEffect(() => {
    if (selectedClass) {
      const filtered = students.filter(student => student.className?.includes(selectedClass.id));
      setFilteredStudents(filtered);
    } else {
    //   setFilteredStudents(students);
    }
  }, [selectedClass, students]);



  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownOpen && classDropdownRef.current && !classDropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (dropdownOpen1 && studentDropdownRef.current && !studentDropdownRef.current.contains(e.target)) {
        setDropdownOpen1(false);
      }
      if (dropdownOpen2 && feesGroupDropdownRef.current && !feesGroupDropdownRef.current.contains(e.target)) {
        setDropdownOpen2(false);
      }
      if (payDropdownOpen && paymentmtdDropdownRef.current && !paymentmtdDropdownRef.current.contains(e.target)) {
        setPayDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen, dropdownOpen1, dropdownOpen2,payDropdownOpen]);




  // Handle form submission
  const onSubmit = (data) => {
    if (!selectedStudent || !selectedFeesGrp) {
      toast.error('Please select both a student and a fees group');
      return;
    }
    // if (!paymentStatus ) {
    //   toast.error('Please select Payment status');
    //   return;
    // }

    // Submit the form data to the server
    axios.post('http://localhost:8080/feesCollection/savefeesCollection', {
      userId: selectedStudent.id,
      feesGroupNameId: selectedFeesGrp.id,
      feeAmount: data.amount,
      paymentType: selectedPaymentMethod,
      description: editorData,
      isActive: paymentStatus
    })
      .then(() => {
        toast.success('Fee Collection Created successfully!');
        reset();
        setSelectedStudent(null)
        setSelectedFeesGrp(null)
        setSelectedClass(null)
        setSelectedPaymentMethod('')
        setPaymentStatus(null); // Reset to null after submission

        onClose();
      })
      .catch((error) => {
        toast.error('Failed to Create Fee Collection.');
        console.error('Error Creating Fee Collection:', error);
      });
  };

  const handleCut = () => {
    onClose();
    reset();
    setSelectedStudent(null)
    setSelectedFeesGrp(null)
    setSelectedClass(null)
    setSelectedPaymentMethod('')
    setPaymentStatus(null); // Reset to null after submission   
  };

  const clearForm = () => {
    reset();
    setSelectedStudent(null)
    setSelectedFeesGrp(null)
    setSelectedClass(null)
    setSelectedPaymentMethod('')
    setPaymentStatus(null); // Reset to null after submission  
    };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-4 rounded-lg w-full max-w-md relative">
        <button onClick={handleCut} className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900">&times;</button>

        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold text-center mb-2 text-[#042954]">Add Fee Collection</h2>

 {/* Class Input */}
 <div className="mb-2 relative" ref={classDropdownRef}>
 <label htmlFor="className" className="block text-gray-700 font-semibold mb-2">Class</label>
  <div
    className="border rounded-lg cursor-pointer p-2 flex justify-between items-center"
    onClick={() => setDropdownOpen(!dropdownOpen)}
  >
    <p>{selectedClass ? selectedClass.name : 'Select Class'}</p>
    <FontAwesomeIcon icon={faAngleDown} />
  </div>
  {dropdownOpen && (  // Correctly check dropdownOpen
    <div className="absolute bg-white border rounded-lg mt-1 flex flex-col w-full z-10">
      {classes.map(classItem => (
        <div
          key={classItem.id}
          className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
          onClick={() => {
            setSelectedStudent(null)
            setSelectedClass(classItem);
            setDropdownOpen(false);
          }}
        >
          {classItem.name}
        </div>
      ))}
    </div>
  )}
</div>

{/* Student List Input */}
<div className="mb-2 relative" ref={studentDropdownRef}>
<label htmlFor="studentsName" className="block text-gray-700 font-semibold mb-2">Student Name</label>
  <div
    className="border rounded-lg cursor-pointer p-2 flex justify-between items-center"
    onClick={() => setDropdownOpen1(!dropdownOpen1)}  // Toggle dropdown for Student
  >
    <p>{selectedStudent ? `${selectedStudent.firstName} ${selectedStudent.lastName}` : 'Select Student'}</p>
    <FontAwesomeIcon icon={faAngleDown} />
  </div>
  {dropdownOpen1 && (  // Change this to dropdownOpen1 for the Student dropdown
    <div className="absolute bg-white border rounded-lg mt-1 flex flex-col w-full z-10">
      {filteredStudents.map(student => (
        <div
          key={student.id}
          className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
          onClick={() => {
            setSelectedStudent(student);
            setDropdownOpen1(false); // Close dropdown after selection
          }}
        >
          {`${student.firstName} ${student.lastName}`}
        </div>
      ))}
    </div>
  )}
</div>


          {/* Fees Group Input */}
          <div className="mb-2 relative" ref={feesGroupDropdownRef}>
          <label htmlFor="feesGroup" className="block text-gray-700 font-semibold mb-2">Fees Group</label>
            <div
              className="border rounded-lg cursor-pointer p-2 flex justify-between items-center"
              onClick={() => setDropdownOpen2(!dropdownOpen2)} // Toggle dropdown for Fees Group
            >
              <p>{selectedFeesGrp ? selectedFeesGrp.feesGroupName : 'Select Fees Group'}</p>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
            {dropdownOpen2 && (
              <div className="absolute bg-white border rounded-lg mt-1 flex flex-col w-full z-10">
                {feesGrp.map(feesGroup => (
                  <div
                    key={feesGroup.id}
                    className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
                    onClick={() => {
                      setSelectedFeesGrp(feesGroup);
                      setDropdownOpen2(false);
                    }}
                  >
                    {feesGroup.feesGroupName}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="amount">Amount *</label>
            <input
              type="number"
              id="amount"
              {...register("amount", { required: "Amount is required" })}
              className="w-full px-3 py-2 border ${errors.feesGroupName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">{errors.amount.message}</p>
            )}
          </div>

          {/* Payment Method */}
          <div className="mb-2 relative" ref={paymentmtdDropdownRef}>
            <label htmlFor="paymentMethod" className="block text-sm font-medium mb-2 text-black">Payment Method *</label>
            <div
              className="border rounded-lg cursor-pointer p-2 flex justify-between items-center"
              onClick={() => setPayDropdownOpen(!payDropdownOpen)}
            >
              <span>{selectedPaymentMethod || 'Select Payment Method'}</span>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
            {payDropdownOpen && (
              <div className="absolute bg-white border rounded-lg mt-1 flex flex-col w-full z-10">
                <div
                  className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
                  onClick={() => {
                    setSelectedPaymentMethod('Cash');
                    setPayDropdownOpen(false);
                  }}
                >
                  Cash
                </div>
                <div
                  className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
                  onClick={() => {
                    setSelectedPaymentMethod('Online');
                    setPayDropdownOpen(false);
                  }}
                >
                  Online
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-2">
            <label className="block text-sm font-medium mb-2 text-black" htmlFor="description">Description</label>
            {/* <textarea
              id="description"
              {...register("description")}
              rows="3"
              className="w-full px-3 py-2 border ${errors.feesGroupName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> */}
                                                                                          <CKEditor
  editor={ClassicEditor}
  data={editorData}
  onChange={(event, editor) => {
    const data = editor.getData();
    setEditorData(data);
  }}
  onReady={(editor) => {
    editor.ui.view.editable.element.style.minHeight = "100px";
 }}
 config={{
  toolbar: [
    'heading','bold', 'italic', 'underline', 'bulletedList', 'numberedList', 
    'link', 'blockQuote', 'undo', 'redo'
    // Exclude 'imageUpload' to remove the icon
  ],
}}

/>
          </div>
          {/* Payment Status (Radio Buttons) */}
          <div className="mb-2">
            <label className="block text-sm font-medium mb-2 text-black">Payment Status *</label>
            <div className="flex items-center">
              <label className="mr-4">
                <input
                  type="radio"
                  value="Paid"
                  checked={paymentStatus === true}
                  onChange={() => setPaymentStatus(true)}
                  className="mr-2"
                />
                Paid
              </label>
              <label>
                <input
                  type="radio"
                  value="Unpaid"
                  checked={paymentStatus === false}
                  onChange={() => setPaymentStatus(false)}
                  className="mr-2"
                />
                Unpaid
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-wrap gap-10 mb-1 items-center justify-center">
            <Button type="submit" text="Save" />
            <Button
                onClick={clearForm}
                className="mt-0 bg-[#ffae01] hover:bg-[#042954]"
                label="Clear"
              />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddFeesCollection;
