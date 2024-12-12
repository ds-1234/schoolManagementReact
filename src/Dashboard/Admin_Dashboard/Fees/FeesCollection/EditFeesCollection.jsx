import axios from 'axios';

import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../../../Reusable_components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import ToggleButton from '../../../../Reusable_components/ToggleButton';
import { useForm } from 'react-hook-form';
import PaymentStatus from '../../../../Reusable_components/PaymentStatus';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import  '../../../../Reusable_components/CkEditor.css';

function EditFeesCollection({ isOpen, onClose, FeeCollectionId, onSuccess }) {
    const [value, setValue] = useState(true);
  const [feeCollectionData, setFeeCollectionData] = useState();
  const [feeData, setFeeData] = useState({ feeAmount: '', description: '',  });
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
  const [classId, setClassId] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [feeGrpId, setFeeGrpId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null); // Radio button state
  const [paid, setPaid] = useState(null); // paid unpaid state

  const classDropdownRef = useRef(null); // Ref for the class dropdown
  const studentDropdownRef = useRef(null); // Ref for the student dropdown
  const feesGroupDropdownRef = useRef(null); // Ref for the fees group dropdown
  const paymentmtdDropdownRef = useRef(null); // Ref for the fees group dropdown
  const [editorData, setEditorData] = useState('');



  const {
    register,
    // handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  useEffect(() => {

        // Disable scrolling on background when the popup is open
        if (isOpen) {
            document.body.style.overflow = 'hidden';
          } else {
            document.body.style.overflow = 'auto';
          }

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
    if (FeeCollectionId) {
        axios.get(`http://localhost:8080/feesCollection/getFeesCollectionById/${FeeCollectionId}`)
            .then((response) => {
                const FeeCollectionData = response.data.data;
                setFeeData(FeeCollectionData);
                setFeeCollectionData(FeeCollectionData);
                setStudentId(FeeCollectionData.userId);
                setFeeGrpId(FeeCollectionData.feesGroupNameId);
                setSelectedPaymentMethod(FeeCollectionData.paymentType);
                setPaymentStatus(FeeCollectionData.isActive);
                setPaid(FeeCollectionData.isActive);
                console.log(FeeCollectionData.paymentType,'paymentType')
                setEditorData(FeeCollectionData.description)

                
                // Set selected values for dropdowns
                setSelectedStudent(FeeCollectionData.userId);
                setSelectedFeesGrp(FeeCollectionData.setFeeGrpId);
                setSelectedClass(FeeCollectionData.classId); 
            })
            .catch((error) => {
                console.error('Error fetching Fees Collection:', error);
            });
    }
}, [FeeCollectionId, isOpen]);

// Ensure students and fees groups are set correctly in their respective useEffect hooks
useEffect(() => {
    // Fetch Students
    axios.get('http://localhost:8080/user/getUserList')
        .then((response) => {
            const studentList = response.data.data.filter(user => user.role === 3);
            setStudents(studentList);
            
            // Optionally set filtered students based on pre-selected student
            const selstulist = studentList.find(user => user.id === studentId);
            setFilteredStudents(selstulist ? [selstulist] : []);
            setSelectedStudent(selstulist); // Set selected student
            console.log(selstulist,'selstulist')
            setClassId(selstulist.className[0]); // Set selected classid
            console.log(classId,'clasid')
        })
        .catch((error) => {
            // toast.error('Error fetching Students');
        });
}, [studentId,isOpen]);

useEffect(() => {
    // Fetch Fees Groups
    if(feeGrpId){
    axios.get('http://localhost:8080/feesGroup/getFeesGroupList')
        .then((response) => {
            const feeGroups = response.data.data;
            const reqGroup = feeGroups.filter(feeGrp => feeGrp.isActive === true);

            setFeesGrp(reqGroup);
            
            // Set selected fees group
            const selectedGroup = feeGroups.find(feeGrp => feeGrp.id === feeGrpId);
            setSelectedFeesGrp(selectedGroup);
            console.log(feeGrpId,'select grp')
        })
        .catch((error) => {
            toast.error('Error fetching Fees Group');
        });
    }
}, [feeGrpId,isOpen]);

useEffect(() => {
    // Fetch Classes
    axios.get('http://localhost:8080/class/getClassList')
        .then((response) => {
            setClasses(response.data.data);
            
            // Set selected class if it matches
            const selectedClass = response.data.data.find(cls => cls.id === classId); // Update with your class ID logic
            setSelectedClass(selectedClass);
            console.log(response.data.data,'selectecls')
        })
        .catch((error) => {
            toast.error('Error fetching Classes');
        });
}, [classId,isOpen,onclose]);


    // Filter students by selected class
    useEffect(() => {
        if (selectedClass) {
          const filtered = students.filter(student => student.className?.includes(selectedClass.id));
          setFilteredStudents(filtered);
        } else {
        //   setFilteredStudents(students);
        }
      }, [selectedClass, students]);





  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeeData({ ...feeData, [name]: value });
  };



//   const handleSportCheckboxChange = (id) => {
//     setSelectedSports(prevSelected => {
//       if (prevSelected.includes(id)) {
//         return prevSelected.filter(sportId => sportId !== id);
//       } else {
//         return [...prevSelected, id];
//       }
//     });
//   };

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


  const handleSubmit = (e) => {
    e.preventDefault();
console.log(selectedFeesGrp.id,'selectedFeesGrp.id')
    axios({
      method: 'post',
      url: `http://localhost:8080/feesCollection/savefeesCollection`,
      headers: {
        'Content-Type': 'application/json',
      },
      
      data: {
        id: FeeCollectionId,
        // ...feeCollectionData,
        ...feeData,
        feesGroupNameId:selectedFeesGrp.id,
        paymentType:selectedPaymentMethod,
        isActive: paymentStatus,
      },
    })
      .then(() => {
        toast.success('Fee Collection updated successfully!');
        reset();
        setSelectedStudent(null)
        setSelectedFeesGrp(null)
        setSelectedClass(null)
        setSelectedPaymentMethod('')
        setPaymentStatus(null); // Reset to null after submission
        onSuccess();
        onClose();
      })
      .catch((error) => {
        toast.error('Failed to update Fee Collection.');
        console.error('Error updating Fee Collection:', error);
      });
  };

  if (!isOpen) return null;
  else if (isOpen && paid) return(
    <>
       <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-4 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>

        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center mb-2 text-[#042954]">View Fee Collection</h2>
          {console.log(selectedClass,'selectedclass')}

 {/* Class Input */}
 <div className="mb-2 relative">
  <label htmlFor="className" className="block text-gray-700 font-semibold mb-2">Class</label>
  <div
    className="border rounded-lg cursor-pointer p-2 flex justify-between items-center"
    // onClick={() => setDropdownOpen(!dropdownOpen)}
  >
    <p>{selectedClass ? selectedClass.name : 'Select Class'}</p>
    {/* <FontAwesomeIcon icon={faAngleDown} /> */}
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
<div className="mb-2 relative">
  <label htmlFor="studentsName" className="block text-gray-700 font-semibold mb-2">Student Name</label>
  <div
    className="border rounded-lg cursor-pointer p-2 flex justify-between items-center"
    // onClick={() => setDropdownOpen1(!dropdownOpen1)} 
     // Toggle dropdown for Student
  >
    <p>{selectedStudent ? `${selectedStudent.firstName} ${selectedStudent.lastName}` : 'Select Student'}</p>
    {/* <FontAwesomeIcon icon={faAngleDown} /> */}
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
            //   onClick={() => setDropdownOpen2(!dropdownOpen2)} // Toggle dropdown for Fees Group
            >
              <p>{selectedFeesGrp ? selectedFeesGrp.feesGroupName : 'Select Fees Group'}</p>
              {/* <FontAwesomeIcon icon={faAngleDown} /> */}
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
                    //   setFeeGrpId(feesGroup.id)
                    }}
                  >
                    {feesGroup.feesGroupName}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Amount Input */}
          <div className="mb-2">
            <label htmlFor="feeAmount" className="block text-gray-700 text-sm font-bold mb-2">Amount</label>
            <input
            readOnly
              type="text"
              id="feeAmount"
              name="feeAmount"
              value={feeData.feeAmount}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Fee Amount "
              required
            />
          </div>

                    {/* Method Type */}
                    <div className="mb-2">
            <label htmlFor="paymentMethod" className="block text-gray-700 text-sm font-bold mb-2">Payment Method</label>
            <input
            readOnly
              type="text"
              id="paymentMethod"
              name="paymentMethod"
              value={selectedPaymentMethod}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>



          {/* Description Input */}
          <div className="mb-2">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
            readOnly
              type="text"
              rows='3'
              id="description"
              name="description"
              value={feeData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter description "
              required
            />
          </div>

          <div className="mb-2">
              <label className="block text-sm font-medium mb-2 text-black" htmlFor="active">
                Payment Status 
              </label>


              <PaymentStatus isActive={paymentStatus}/>
              </div>

        </form>
      </div>
    </div>
    </>
  );










  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>

        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center mb-2 text-[#042954]">Edit Fee Collection</h2>
          {console.log(selectedClass,'selectedclass')}

 {/* Class Input */}
 <div className="mb-2 relative">
  <label htmlFor="className" className="block text-gray-700 font-semibold mb-2">Class</label>
  <div
    className="border rounded-lg cursor-pointer p-2 flex justify-between items-center"
    // onClick={() => setDropdownOpen(!dropdownOpen)}
  >
    <p>{selectedClass ? selectedClass.name : 'Select Class'}</p>
    {/* <FontAwesomeIcon icon={faAngleDown} /> */}
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

          {/* Class Input */}
          {/* <div className="mb-2">
            <label htmlFor="className" className="block text-gray-700 text-sm font-bold mb-2">Class</label>
            <input
            readOnly
              type="text"
              id="className"
              name="className"
              value={selectedClass[0].name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Class Name "
              required
            />
          </div> */}
          {/* Student Input */}
          {/* <div className="mb-2">
            <label htmlFor="studentsName" className="block text-gray-700 text-sm font-bold mb-2">Student Name</label>
            <input
            readOnly
              type="text"
              id="studentsName"
              name="studentsName"
              value={selectedStudent[0].firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Class Name "
              required
            />
          </div> */}


{/* Student List Input */}
<div className="mb-2 relative">
  <label htmlFor="studentsName" className="block text-gray-700 font-semibold mb-2">Student Name</label>
  <div
    className="border rounded-lg cursor-pointer p-2 flex justify-between items-center"
    // onClick={() => setDropdownOpen1(!dropdownOpen1)} 
     // Toggle dropdown for Student
  >
    <p>{selectedStudent ? `${selectedStudent.firstName} ${selectedStudent.lastName}` : 'Select Student'}</p>
    {/* <FontAwesomeIcon icon={faAngleDown} /> */}
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
                    //   setFeeGrpId(feesGroup.id)
                    }}
                  >
                    {feesGroup.feesGroupName}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Amount Input */}
          <div className="mb-2">
            <label htmlFor="feeAmount" className="block text-gray-700 text-sm font-bold mb-2">Amount</label>
            <input
              type="text"
              id="feeAmount"
              name="feeAmount"
              value={feeData.feeAmount}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Fee Amount "
              required
            />
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



          {/* Description Input */}
          <div className="mb-2">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
              type="text"
              rows='3'
              id="description"
              name="description"
              value={feeData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter description "
              required
            />
          </div>

          {/* Payment Status (Radio Buttons) */}
          <div className="mb-4">
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
          <Button type="submit" className="w-full text-center" />
        </form>
      </div>
    </div>
  );
}

export default EditFeesCollection;
