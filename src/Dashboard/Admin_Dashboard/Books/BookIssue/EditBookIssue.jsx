import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../../../Reusable_components/Button';
import { useForm } from 'react-hook-form';
import BASE_URL from '../../../../conf/conf';
import LibraryStatusButton from '../../../../Reusable_components/LibraryStatusButton';

function EditBookIssue({ isOpen, onClose, BookIssueId, onSuccess }) {
  const [bookIssueData, setBookIssueData] = useState(null); // Store the fetched data
  const [userData, setUserData] = useState(null); // Store the fetched user data
  const [bookData, setBookData] = useState(null); // Store the fetched Book data
  const [status, setStatus] = useState(true); // Active/Inactive status

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();

  useEffect(() => {
    if (isOpen && BookIssueId) {
      fetchBookIssueById(BookIssueId);
    }
  }, [isOpen, BookIssueId]);

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
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  // Fetch book issue data by ID
  const fetchBookIssueById = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/library/getBookIssuedById/${id}`);
      if (response.data && response.data.success) {
        const data = response.data.data;
        setBookIssueData(data);
        
        // Fetch user data based on the userId from book issue data
        fetchUserById(data.userId);
        fetchBookById(data.bookMapping);

        // Populate the form with the fetched book issue data
        setValue('userId', data.userId);
        setValue('bookId', data.bookId);
        setValue('issuedDate', data.issuedDate);
        setValue('returnDate', data.returnDate);
        setValue('bookNumber', data.bookNumber);
        setStatus(data.isActive); // Set the status value
      } else {
        console.error("Unexpected response structure for book issue:", response.data);
      }
    } catch (error) {
      console.error("Error fetching book issue:", error);
      toast.error("Failed to fetch book issue data.");
    }
  };

  // Fetch user data by userId
  const fetchUserById = async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/getUser/${userId}`);
      if (response.data && response.data.success) {
        setUserData(response.data.data); // Store user data
      } else {
        console.error("Unexpected response structure for user:", response.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch user data.");
    }
  };

  // Fetch book data by bookMapping
  const fetchBookById = async (bookMapping) => {
    try {
      const response = await axios.get(`${BASE_URL}/book/getBook/${bookMapping}`);
      if (response.data && response.data.success) {
        setBookData(response.data.data); // Store book data
      } else {
        console.error("Unexpected response structure for Book:", response.data);
      }
    } catch (error) {
      console.error("Error fetching Book data:", error);
      toast.error("Failed to fetch Book data.");
    }
  };

  const onSubmit = async (formData) => {
    const payload = {
      id: BookIssueId,
      userId: userData.id,
      bookMapping: bookData.id,
      bookNumber: formData.bookNumber,
      issuedDate: formData.issuedDate,
      returnDate: formData.returnDate,
      isActive: status,
    };

    try {
      const response = await axios.post(`${BASE_URL}/library/saveBookIssued`, payload);
      if (response.data && response.data.success) {
        toast.success("Book issue updated successfully!");
        onSuccess();
        onClose();
      } else {
        console.error("Error response from save API:", response.data);
        toast.error("Failed to save book issue.");
      }
    } catch (error) {
      console.error("Error saving book issue:", error);
      toast.error("Error occurred while saving.");
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
              <input
                type="text"
                value={bookData ? `${bookData.name}` : 'Loading...'}
                readOnly
                className="mt-1 block w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* User Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Book Issued To</label>
              <input
                type="text"
                value={userData ? `${userData.firstName} ${userData.lastName}` : 'Loading...'}
                readOnly
                className="mt-1 block w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Book Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Book Number</label>
              <input
                type="text"
                value={bookIssueData?.bookNumber || ''}
                readOnly={status === false} // If status is false, make this readonly
                onChange={(e) => setValue('bookNumber', e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Issued Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Issued Date</label>
              <input
                type="date"
                value={bookIssueData?.issuedDate || ''}
                readOnly={status === false} // If status is false, make this readonly
                className="mt-1 block w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Return Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Return Date</label>
              {status ? (
                <input
                  type="date"
                  value={bookIssueData?.returnDate || ''}
                  onChange={(e) => setValue('returnDate', e.target.value)}
                  min={bookIssueData?.issuedDate}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              ) : (
                <input
                  type="text"
                  value={bookIssueData?.returnDate || ''}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              )}
            </div>

            {/* Issue Status */}
            <div className="flex items-center">
              {status ? (
                <>
                  <label className="mr-4">
                    <input
                      type="checkbox"
                      checked={status === true}
                      onChange={() => setStatus(true)} // Set status to true when "Issued" is selected
                      className="mr-2"
                    />
                    Issued
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      checked={status === false}
                      onChange={() => setStatus(false)} // Set status to false when "Returned" is selected
                      className="mr-2"
                    />
                    Returned
                  </label>
                </>
              ) : (
                // <div className="text-gray-500">Returned</div>
                <LibraryStatusButton isActive={false} />
              )}
            </div>

            <div className="flex justify-center mt-6">
              <Button type="submit" label="Save" />
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default EditBookIssue;
