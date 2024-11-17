import React, { useState } from 'react'
import Table from '../../../../Reusable_components/Table';
import LibraryStatusButton from '../../../../Reusable_components/LibraryStatusButton';
// import EditBookIssue from './EditBookIssue'; // Import EditBookIssue component
import edit from '../../../../assets/edit.png';
import deleteIcon from '../../../../assets/delete.png'
import { useEffect } from 'react';

function ClassWiseExamSchedulepopup({ subjectWiseExamList, onClose, isOpen,className }) {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
//   const [editBookId, setEditBookId] = useState(null);

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

  const columns = [
    {
      name: 'SR.No',
      selector: (row, idx) => idx + 1,
      sortable: false,
    },
    {
      name: 'Subject',
      selector: row => row.subject,
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

          <button>
            <img src={deleteIcon} alt="Delete" className="h-8" />
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
          <div className="bg-white p-6 rounded-lg w-full max-w-4xl relative">
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

export default ClassWiseExamSchedulepopup;
