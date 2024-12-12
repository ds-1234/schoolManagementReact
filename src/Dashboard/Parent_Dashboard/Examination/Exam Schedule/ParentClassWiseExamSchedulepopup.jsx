import React, { useState } from 'react'
import Table from '../../../../Reusable_components/Table';
import LibraryStatusButton from '../../../../Reusable_components/LibraryStatusButton';
// import EditBookIssue from './EditBookIssue'; // Import EditBookIssue component
import edit from '../../../../assets/edit.png';
import deleteIcon from '../../../../assets/delete.png'
import { useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../../../../conf/conf';


function ParentClassWiseExamSchedulepopup({ subjectWiseExamList, onClose, isOpen,className }) {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
//   const [editBookId, setEditBookId] = useState(null);
const [subject, setSubject] = useState([]);  // State for exam types


  useEffect(() => {
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
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  // Function to handle opening the edit popup and setting the issue ID
//   const openEditPopup = (id) => {
//     setEditBookId(id);
//     setIsEditPopupOpen(true);
//   };

  // Function to handle closing the edit popup
//   const closeEditPopup = () => {
//     setIsEditPopupOpen(false);
//     setEditBookId(null); // Reset the selected ID after closing the popup
//   };
  // Fetch exam type data from the API


  const onDelete = (id) => {
    axios({
      method: "POST",
      url:`${BASE_URL}/exam/deleteSubjectFromExamList/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      // withCredentials: true,
    })
      .then((response) => {
        console.log("Data from API:", response.data);
        fetchSubject() ;
        onClose();

  
  
      })
      .catch((error) => {
        console.error("Error Deleting data:", error);
        fetchSubject() ;
  
      });
  }



  const fetchSubject = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/subject/getSubjectList`);
      if (response.data && response.data.success) {
        setSubject(response.data.data);  // Store exam type data
        console.log(response.data.data,'res')
      }
    } catch (error) {
      console.error('Error fetching exam types:', error);
    }
  };
    // Fetch all data on component mount
    useEffect(() => {
        fetchSubject();
      }, []);
        // Map class ID to class name
  const getSubjectNameById = (subjectId) => {
    console.log(subjectId,'subid')
    console.log(subject,'subject')
    const subjectObj = subject.find((sub) => sub.id === subjectId);
    return subjectObj ? `${subjectObj.subject} ` : 'Unknown Subject';
  };

  const columns = [
    {
      name: 'SR.No',
      selector: (row, idx) => idx + 1,
      sortable: false,
    },
    {
      name: 'Subject',
      selector: row => getSubjectNameById(row.subject),
      sortable: true,
    },
    {
      name: 'Exam Date',
      selector: row => row.examDate,
      sortable: true,
    },
    {
      name: 'End Time',
      selector: row => row.startTime,
      sortable: true,
    },
    {
      name: 'Duration',
      selector: row => row.duration,
      sortable: true,
    },
    {
      name: 'Max Marks',
      selector: row => row.maxMarks,
      sortable: true,
    },
    {
      name: 'Min Marks',
      selector: row => row.minMarks,
      sortable: true,
    },
    // {
    //   name: 'Status',
    //   selector: row => <LibraryStatusButton isActive={row.isActive} />,
    //   sortable: true,
    // },
    {
      name: 'Action',
      cell: row => (
        <div className="flex gap-2">
          <button onClick={() => openEditPopup(row.id)}>
            <img src={edit} alt="Edit" className="h-8" />
          </button>

          <button
            // onClick={() => onDelete(row.id)}

          >            <img src={deleteIcon} alt="Delete" className="h-8" />
          </button>
        </div>
      ),
    },
  ];

//   const conditionalRowStyles = [
//     {
//       when: row => !row.isActive,
//       style: {
//         backgroundColor: 'rgba(255, 0, 0, 0.1)', // Light red background
//       },
//     },
//     {
//         when:row=> row.isActive,
//         style:{
//             backgroundColor: 'rgba(0, 255, 0, 0.1)', // Light green background when isActive is true
//         }
//     }
//   ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-5xl relative">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center text-[#042954]">{className}'s Exam Schedule</h2>
            <Table columns={columns} 
            data={subjectWiseExamList}    
            //    conditionalRowStyles={conditionalRowStyles} 
               />
          </div>
        </div>
      )}

      {/* Conditionally render the EditBookIssue popup */}
      {/* {isEditPopupOpen && (
        <EditBookIssue
          isOpen={isEditPopupOpen}
          onClose={closeEditPopup}
          BookIssueId={editBookId}
          onSuccess={() => {
            // Call the function to refresh data (e.g., fetchBooks)
            onClose(); // Close the EditBookIssue popup when done
          }}
        />
      )} */}
    </>
  );
}

export default ParentClassWiseExamSchedulepopup;
