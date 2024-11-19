import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from '../../../../Reusable_components/Table';
import deleteIcon from '../../../../assets/delete.png'
import edit from '../../../../assets/edit.png'
import { NavLink } from 'react-router-dom';
import AddBtn from '../../../../Reusable_components/AddBtn'
import BASE_URL from '../../../../conf/conf';
// import AddExamResult from './AddExamResult';


function ExamResults() {
  const user = JSON.parse(sessionStorage.getItem('user'));
    const [data, setData] = useState([]);
    const [filterData , setFilterData] = useState([])
    const [student , setStudent] = useState([])
    const [classes , setClasses] = useState([])
    const [subject , setSubject] = useState([])
    // const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
    // const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    // const [editGradeId , setEditGradeId] = useState(null)
  
    
    // const openAddPopup = () => setIsAddPopupOpen(true);
    // const closeAddPopup = () => setIsAddPopupOpen(false);
  
    // const openEditPopup = (id) => {
    //   setEditGradeId(id);
    //   setIsEditPopupOpen(true);
    // };
  
    // const closeEditPopup = () => {
    //   setEditGradeId(null);
    //   setIsEditPopupOpen(false);
    // };

    // useEffect(() => {
    //   if (isAddPopupOpen || isEditPopupOpen) {
    //     document.body.style.overflow = 'hidden';  // Disable scroll when any popup is open
    //   } else {
    //     document.body.style.overflow = 'auto';  // Enable scroll when no popup is open
    //   }
  
    //   return () => {
    //     document.body.style.overflow = 'auto';  // Cleanup on unmount
    //   };
    // }, [isAddPopupOpen, isEditPopupOpen]);


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
  const fetchUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/getUserList`);
      if (response.data && response.data.success) {
        setStudent(response.data.data);  // Store exam type data
      }
    } catch (error) {
      console.error('Error fetching exam types:', error);
    }
  };
  // Fetch exam type data from the API
  const fetchSubject = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/subject/getSubjectList`);
      if (response.data && response.data.success) {
        setSubject(response.data.data);  // Store exam type data
      }
    } catch (error) {
      console.error('Error fetching exam types:', error);
    }
  };

  // Fetch all data on component mount
  useEffect(() => {
    fetchData();
    fetchClasses();
    fetchSubject();
    fetchUser();
  }, []);

    // Map class ID to class name
    const getClassNameById = (classId) => {
      console.log(classId,'classid')
      console.log(classes,'classes')
      const classObj = classes.find((cls) => cls.id === classId);
      return classObj ? `${classObj.name} ${classObj.section}` : 'Unknown Class';
    };
  
    // Map exam type ID to exam type name
    const getStudentNameById = (userId) => {
      // console.log(examTypes,'examtypes')
      // console.log(examTypeId,'examtypeid')
      const stu = student.find((std) => std.id === userId);
      return stu ? stu.firstName : 'Unknown Exam Type';
    };
    // Map exam type ID to exam type name
    const getSubjectNameById = (subjectId) => {
      // console.log(examTypes,'examtypes')
      // console.log(examTypeId,'examtypeid')
      const sub = subject.find((sb) => sb.id === subjectId);
      return sub ? sub.subject : 'Unknown Exam Type';
    };


  
    const fetchData = () => {
      axios({
        method: "GET",
        url: `${BASE_URL}/exam/getExamResult`,
        headers: {
          "Content-Type": "application/json",
        },
        // withCredentials: true,
      })
        .then((response) => {
          console.log("Data from API:", response.data.data);
          setData(response.data.data);
          setFilterData(response.data.data) ;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
  
    useEffect(() => {
      fetchData() ;
    } , []);
  
    useEffect(() => {
      setData(data);  
      setFilterData(data); 
    }, []);
    
  const column = [
    {
      name: 'SR.No',
      selector: (row,idx) => idx+1,
      sortable: false,
    },
    {
      name: 'Class Name',
      selector: (row) => getClassNameById(row.className),  // Use the helper function to get class name
      sortable: true,
    },
    {
      name: 'Student Name',
      selector: (row) => getStudentNameById(row.studentId),  // Use the helper function to get class name
      sortable: true,
    },
    {
      name: 'Subject Name',
      selector: (row) => getSubjectNameById(row.subjectId),  // Use the helper function to get class name
      sortable: true,
    },
    {
      name: 'Subject Marks',
      selector: row => row.subjectMarks,
      sortable: true,
    },
    {
      name: 'Remarks',
      selector: row => row.remarks,
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => (
        <div className='flex gap-2'>
          <button
          onClick={() => openEditPopup(row.id)}
        >
          <img src={edit} alt="Edit" className='h-8' />
        </button>
  
        <button>
          <img src={deleteIcon} alt="Delete" className='h-8' />
        </button>
        </div>
      ),
    },
  ]
  
  // const handleFilter = (event) => {
  //   const newData = filterData.filter(row=>row.subject.toLowerCase().includes(event.target.value.toLowerCase()))
  //   setData(newData);
  // }
  
  const handleSearch = (query, checkboxRefs) => {
    if (!query) {
      setData(filterData);
      return;
    }
  
    const selectedFields = Object.keys(checkboxRefs)
      .filter((key) => checkboxRefs[key].checked);
  
    const filteredData = filterData.filter((row) =>
      selectedFields.some((field) => {
        return row[field]?.toLowerCase().includes(query.toLowerCase())
        
      }
      )
    );
  
    setData(filteredData);
  };
  
  // handle clear button logic
  const handleClear = () => {
    setData(filterData);  // Reset to original data
  };
  
  const searchOptions = [
    { label: 'Class Name', value: 'name' },
    { label: 'Section', value: 'section' }
  ];
  
    return (
      <div className=' h-full mb-10'>
        <h1 className='text-lg md:text-2xl  pt-8 font-semibold text-black'>Exam Result</h1>
        <p className=' mt-2'>Dashboard /<NavLink to = '/teacherDashboard'> Teacher </NavLink>/ <span className='text-[#ffae01] font-semibold'>Exam Result</span> </p>
        {/* <AddBtn onAddClick={openAddPopup}/> */}
        <Table 
        columns={column}
        data={data}
        searchOptions={searchOptions}
        onSearch={handleSearch}
        handleClear={handleClear}
        />
  
        {/* <AddClassPopup
          isOpen={isAddPopupOpen} 
          onClose={() => {
            closeAddPopup();
            fetchData(); // Refresh data when add popup closes
          }} 
          /> */}
          {/* <AddExamResult
                    isOpen={isAddPopupOpen} 
                    onClose={() => {
                      closeAddPopup();
                      fetchData(); // Refresh data when add popup closes
                    }} 

                      /> */}
  
        {/* <EditClass
          isOpen={isEditPopupOpen}
          onClose={closeEditPopup}
          GradeId={editGradeId}
          onSuccess={fetchData} // Refresh data after editing
        /> */}
      </div>
    );
}

export default ExamResults