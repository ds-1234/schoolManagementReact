import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../../Reusable_components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import ToggleButton from '../../../Reusable_components/ToggleButton';
import { useForm } from 'react-hook-form';
import PaymentStatus from '../../../Reusable_components/PaymentStatus';

function EditStdFeesCollection({ isOpen, onClose, FeeCollectionId, onSuccess }) {
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
  const user = JSON.parse(sessionStorage.getItem('user')); // Parse the user data


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
    if (FeeCollectionId) {
        axios.get(`http://localhost:8080/feesCollection/getFeesCollectionById/${FeeCollectionId}`)
            .then((response) => {
                const FeeCollectionData = response.data.data;
                setFeeData(FeeCollectionData);
                setFeeCollectionData(FeeCollectionData);
                setStudentId(FeeCollectionData.userId);
                setFeeGrpId(FeeCollectionData.feesGroupNameId);
                setSelectedPaymentMethod(FeeCollectionData.paymentType);
                setValue(FeeCollectionData.isActive);

            })
            .catch((error) => {
                console.error('Error fetching Fees Collection:', error);
            });
    }
}, [FeeCollectionId, isOpen]);



useEffect(() => {
    // Fetch all fee groups
    if (feeGrpId) {
        axios.get('http://localhost:8080/feesGroup/getFeesGroupList')
            .then((response) => {
                const feeGroups = response.data.data;
                console.log(feeGroups,"feeGroups")
                setFeesGrp(feeGroups);

                // Find the fee group by matching feeGrpId
                const selectedGroup = feeGroups.find(feeGrp => feeGrp.id === feeGrpId);
                if (selectedGroup) {
                    setSelectedFeesGrp(selectedGroup); // Set the selected fee group
                } else {
                    console.error(`No fee group found with id: ${feeGrpId}`);
                }
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
        })
        .catch((error) => {
            toast.error('Error fetching Classes');
        });
}, [isOpen]);


    // Filter students by selected class
    useEffect(() => {
        if (selectedClass) {
          const filtered = students.filter(student => student.className.includes(selectedClass.id));
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

        <form >
          <h2 className="text-2xl font-bold text-center mb-6 text-[#042954]">View Fee </h2>

{console.log(selectedFeesGrp,'selectedFeesGrp')}


          {/* Student Name Input */}
          <div className="mb-2">
            <label htmlFor="studentsName" className="block text-gray-700 text-sm font-bold mb-2">Student Name</label>
            <input
                        readOnly
              type="text"
              id="studentsName"
              name="studentsName"
              value={user.firstName}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>


          {/* Fees Group Input */}
          <div className="mb-2">
            <label htmlFor="feesGroup" className="block text-gray-700 text-sm font-bold mb-2">Fees Group</label>
            <input
                        readOnly
              type="text"
              id="feesGroup"
              name="feesGroup"
              value={selectedFeesGrp.feesGroupName}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>



          {/* Fees Group Input
          <div className="mb-2 relative">
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
          </div> */}

          {/* Amount Input */}
          <div className="mb-2">
            <label htmlFor="feeAmount" className="block text-gray-700 text-sm font-bold mb-2">Amount</label>
            <input
            readOnly
              type="text"
              id="feeAmount"
              name="feeAmount"
              value={feeData.feeAmount}
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
              value={feeData.paymentType}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>







          {/* Description Input */}
          <div className="mb-2">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <input
            readOnly
              type="text"
              id="description"
              name="description"
              value={feeData.description}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter description "
              required
            />
          </div>

          <div className="mb-2">
              <label className="block text-sm font-medium mb-2 text-black" htmlFor="active">
                Payment Status 
              </label>


              <PaymentStatus isActive={value}/>
            </div>

        </form>
      </div>
    </div>
  );
}

export default EditStdFeesCollection;
