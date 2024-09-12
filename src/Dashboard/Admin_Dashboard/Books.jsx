import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Table.css';
import { Link } from 'react-router-dom';
import edit from '../../assets/edit.png';
import AddBooksPopup from './AddBooksPopup';
import EditBookPopup from './EditBookPopup';
// import AddSchoolPopup from './AddSchoolPopup';
// import EditSchoolPopup from './EditSchoolPopup';

function Books() {
  const [data, setData] = useState([]);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editBookId, setEditBookId] = useState(null);

  const openAddPopup = () => setIsAddPopupOpen(true);
  const closeAddPopup = () => setIsAddPopupOpen(false);

  const openEditPopup = (id) => {
    setEditBookId(id);
    setIsEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setEditBookId(null);
    setIsEditPopupOpen(false);
  };

  const fetchData = () => {
    axios({
      method: 'GET',
      url: 'http://localhost:8080/book/getBookList',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('Data from API:', response.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      
      <button
        onClick={openAddPopup}
        className='absolute top-4 right-5 p-2 bg-green-600 text-white rounded-lg shadow-sm shadow-black hover:bg-green-500 hover:font-semibold'>
        Add Book
      </button>

      <div className='rounded-2xl'>
        <table className='mt-20 text-black w-4/5 mx-10'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Author</th>
              <th>Publishing Year</th>
              <th>Book unique Id</th>
              <th>Book ref Id</th>
              <th>Alloted atart date</th>
              <th>Alloted End Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.author}</td>
                <td>{item.publishingYear}</td>
                <td>{item.bookUniqueId}</td>
                <td>{item.bookRefId}</td>
                <td>{item.allotedStratDate}</td>
                <td>{item.allotedEndtDate}</td>
                <td>
                  <button
                    onClick={() => openEditPopup(item.id)}
                    className='p-1 bg-blue-500 text-white rounded ml-2'>
                    <img src={edit} className='h-4 w-6' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddBooksPopup
        isOpen={isAddPopupOpen} 
        onClose={() => {
          closeAddPopup();
          fetchData(); // Refresh data when add popup closes
        }} 
      />

      <EditBookPopup
        isOpen={isEditPopupOpen}
        onClose={closeEditPopup}
        bookId={editBookId}
        onSuccess={fetchData} // Refresh data after editing
      />
    </div>
  );
}

export default Books;

