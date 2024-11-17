import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../../../../conf/conf';
import AddBtn from '../../../../Reusable_components/AddBtn';
import Table from '../../../../Reusable_components/Table';
import deleteIcon from '../../../../assets/delete.png';
import edit from '../../../../assets/edit.png';
import AddExamSchedule from './AddExamSchedule';
import ClassWiseExamSchedulepopup from './ClassWiseExamSchedulepopup';

const ExamSchedule = () => {
  const [loading, setLoading] = useState(true);
  const [examSchedule, setExamSchedule] = useState([]);
  const [examTypes, setExamTypes] = useState([]);  // State for exam types
  const [classes, setClasses] = useState([]);  // State for classes
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [className, setClassName] = useState(null);

  // Open/Close popup for adding a new exam schedule
  const openAddPopup = () => setIsAddPopupOpen(true);
  const closeAddPopup = () => {
    setIsAddPopupOpen(false)
    fetchExamSchedule() ;
  };

  // Open/Close popup for editing an exam schedule
  const openEditPopup = (exam,className) => {
    setClassName(className)
    setSelectedExam(exam);
    setIsEditPopupOpen(true);
    fetchExamSchedule() ;

  };

  const closeEditPopup = () => {
    setClassName(null)
    setIsEditPopupOpen(false);
    setSelectedExam(null);
    fetchExamSchedule() ;

  };

  const onDelete = (id) => {
    axios({
      method: "POST",
      url:`${BASE_URL}/exam/deleteExam/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      // withCredentials: true,
    })
      .then((response) => {
        console.log("Data from API:", response.data);
        fetchExamSchedule() ;
  
  
      })
      .catch((error) => {
        console.error("Error Deleting data:", error);
        fetchExamSchedule() ;
  
      });
  }

  // Fetch exam schedule data from the API
  const fetchExamSchedule = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/exam/getExam`);
      const data = response.data.data;
      if (response.data && response.data.success) {
        setExamSchedule(data);
      }
    } catch (error) {
      console.error('Error fetching exam schedule:', error);
    }
  };

  // Fetch class data from the API
  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/class/getClassList`);
      if (response.data && response.data.success) {
        setClasses(response.data.data);  // Store class data
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  // Fetch exam type data from the API
  const fetchExamTypes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/examType/getExamTypeList`);
      if (response.data && response.data.success) {
        setExamTypes(response.data.data);  // Store exam type data
      }
    } catch (error) {
      console.error('Error fetching exam types:', error);
    }
  };

  // Fetch all data on component mount
  useEffect(() => {
    fetchExamSchedule();
    fetchClasses();
    fetchExamTypes();
  }, []);

  // Map class ID to class name
  const getClassNameById = (classId) => {
    const classObj = classes.find((cls) => cls.id === classId);
    return classObj ? `${classObj.name} ${classObj.section}` : 'Unknown Class';
  };

  // Map exam type ID to exam type name
  const getExamTypeNameById = (examTypeId) => {
    console.log(examTypes,'examtypes')
    console.log(examTypeId,'examtypeid')
    const examType = examTypes.find((type) => type.id === examTypeId);
    return examType ? examType.examTypeName : 'Unknown Exam Type';
  };

  // Table columns definition
  const columns = [
    {
      name: 'SR.No',
      selector: (row, idx) => idx + 1,
      sortable: false,
    },
    {
      name: 'Class Name',
      selector: (row) => getClassNameById(row.className),  // Use the helper function to get class name
      sortable: true,
    },
    {
      name: 'Exam Name',
      selector: (row) => getExamTypeNameById(row.examName),  // Use the helper function to get exam type name
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className='flex gap-2'>
          <button onClick={() => openEditPopup(row , getClassNameById(row.className))}>
            <img src={edit} alt="Edit" className='h-8' />
          </button>
          <button
            onClick={() => onDelete(row.id)}

          >
            <img src={deleteIcon} alt="Delete" className='h-8' />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className='flex flex-col justify-start pl-0'>
      <h1 className='text-lg md:text-2xl font-semibold text-black mt-5'>Exam Schedule</h1>
      <p className='pl-0 mt-2'>
        Dashboard /<NavLink to='/admin/user'> Admin </NavLink>/<NavLink to='/admin/Examinations'> Examinations </NavLink>/ 
        <span className='text-[#ffae01] font-semibold'>Exam Schedule</span>
      </p>

      <AddBtn onAddClick={openAddPopup} />
      
      <Table columns={columns} data={examSchedule} />

      {/* Add Exam Schedule Popup */}
      <AddExamSchedule isOpen={isAddPopupOpen} onClose={closeAddPopup} />

      {/* Class Wise Exam Schedule Popup */}
      {selectedExam && (
        <ClassWiseExamSchedulepopup
          subjectWiseExamList={selectedExam.subjectWiseExamList} // Pass the subjectWiseExamList of the selected exam
          className={className} // Pass the className of the selected exam
          isOpen={isEditPopupOpen}
          onClose={closeEditPopup}
        />
      )}
    </div>
  );
};

export default ExamSchedule;
