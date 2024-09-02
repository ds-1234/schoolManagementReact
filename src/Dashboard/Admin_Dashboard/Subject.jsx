import axios from 'axios';
import React, {useEffect, useState } from 'react'
import './Table.css'
// import { Link } from 'react-router-dom';
import AddSubject from './AddSubject';
import EditSubject from './EditSubject';
import edit from '../../assets/edit.png'

function Subject() {
  const [data, setData] = useState([]);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editSubjectId , setEditSubjectId] = useState(null)

  
  const openAddPopup = () => setIsAddPopupOpen(true);
  const closeAddPopup = () => setIsAddPopupOpen(false);

  const openEditPopup = (id) => {
    setEditSubjectId(id);
    setIsEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setEditSubjectId(null);
    setIsEditPopupOpen(false);
  };

  const fetchData = () => {
    axios({
      method: "GET",
      url: `http://localhost:8080/subject/getSubjectList`,
      headers: {
        "Content-Type": "application/json",
      },
      // withCredentials: true,
    })
      .then((response) => {
        console.log("Data from API:", response.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData() ;
  } , []);

  return (
    <div className='p-10 pl-20'>
        <button
        onClick={openAddPopup} 
        className='absolute top-4 right-5 p-2 bg-green-600 text-white rounded-lg shadow-sm shadow-black hover:bg-green-500 hover:font-semibold'>
            {/* <Link to="/admin/AddSubject">
                    Add Subject
            </Link> */}
            Add Subject
        </button>
      <table className='mt-20 text-black'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Subject</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.subject}</td>
              <td>{item.description}</td>
              <td>
                <button
                onClick={() => openEditPopup(item.id)} 
                className='p-1 bg-blue-500 text-white rounded ml-2'>
                  {/* <Link to={`/admin/editSubject/${item.id}`}>Edit</Link> */}
                  <img src={edit} className='h-4 w-6' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddSubject
        isOpen={isAddPopupOpen} 
        onClose={() => {
          closeAddPopup();
          fetchData(); // Refresh data when add popup closes
        }} 
        />

      <EditSubject
        isOpen={isEditPopupOpen}
        onClose={closeEditPopup}
        subjectId={editSubjectId}
        onSuccess={fetchData} // Refresh data after editing
      />
    </div>
  );
};


export default Subject