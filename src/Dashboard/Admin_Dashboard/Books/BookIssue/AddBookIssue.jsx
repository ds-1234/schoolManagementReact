import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../../../Reusable_components/Button';
import ToggleButton from '../../../../Reusable_components/ToggleButton';
import { useForm } from 'react-hook-form';

function AddBookIssue({ isOpen, onClose }) {
  const [books, setBooks] = useState([]); // List of books
  const [users, setUsers] = useState([]); // List of users
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [issuedDate, setIssuedDate] = useState(new Date().toISOString().split('T')[0]); // Today's date
  const [returnDate, setReturnDate] = useState('');
  const [status, setStatus] = useState(true); // Active/Inactive status
  const [bookNumber, setBookNumber] = useState(''); // New state for Book Number

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Fetch books and users on component mount
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        reset();
        setSelectedBook(null);
        setSelectedUser(null);
        setReturnDate('');
        setBookNumber(''); // Reset the book number when closing
        setStatus(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/book/getBookList');
        if (response.data && response.data.success) {
          setBooks(response.data.data);
        } else {
          console.error("Unexpected response structure for books:", response.data);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
        toast.error("Failed to fetch books.");
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user/getUserList');
        if (response.data && response.data.success) {
          const filteredUsers = response.data.data.filter(user => user.role === 3 || user.role === 4);
          setUsers(filteredUsers);
        } else {
          console.error("Unexpected response structure for users:", response.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users.");
      }
    };

    fetchBooks();
    fetchUsers();
  }, []);

  const onSubmit = async (data) => {
    // Prepare data to match API format
    const formData = {
      userId: selectedUser ? selectedUser.id : null,
      issuedDate,
      returnDate,
      bookNumber: bookNumber || (selectedBook ? selectedBook.bookNumber : null), // Use bookNumber input value or selectedBook
      isActive: true, // toggle active/inactive status
    };

    console.log("Form submission data:", formData);

    try {
      const response = await axios.post('http://localhost:8080/library/saveBookIssued', formData);

      if (response.data.success) {
        toast.success('Book issued successfully!');
        onClose(); // Close modal after successful submission
        reset(); // Reset form fields
        setBookNumber(''); // Reset the book number
      } else {
        toast.error('Failed to issue book!');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      toast.error('Error submitting book issue!');
    }
  };

return (
  isOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
      <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#042954]">Issue Book</h2>


          {/* Book Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Book Name</label>
            <select
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setSelectedBook(books.find(book => book.id === parseInt(e.target.value)))}
              disabled // Disable the input (readonly)
            >
              <option value="">Select a Book</option>
              {books.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.name}
                </option>
              ))}
            </select>
          </div>

          {/* User Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Book Issued To</label>
            <select
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setSelectedUser(users.find(user => user.id === parseInt(e.target.value)))}
              disabled // Disable the input (readonly)
            >
              <option value="">Select a User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName}
                </option>
              ))}
            </select>
          </div>

          {/* Book Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Book Number</label>
            <input
              type="text"
              value={bookNumber}
              readOnly // Make input readonly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Issued Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Issued Date</label>
            <input
              type="date"
              value={issuedDate}
              readOnly // Make input readonly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Return Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Return Date</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              min={issuedDate}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Status Toggle */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <div className="flex items-center">
              <ToggleButton
                isOn={status}
                handleToggle={() => setStatus(!status)}
                id="active"
                register={register}
              />
            </div>
          </div> */}

          {/* Submit Button */}
          <div className="flex justify-end mt-4">
          <Button
            type="submit"
            className="w-full text-center" 
          />
          </div>
        </form>
      </div>
    </div>
  )
);

}

export default AddBookIssue;
