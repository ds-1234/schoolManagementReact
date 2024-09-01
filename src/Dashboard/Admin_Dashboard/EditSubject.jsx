import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function EditSubject() {
  const { id } = useParams(); // Get the subject ID from the URL
  const [subject, setSubject] = useState({ subject: '', description: '' });
  const navigate = useNavigate();

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:8080/subject/getSubject/${id}`, // API to get specific subject by ID
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setSubject(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching subject:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubject({ ...subject, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "PUT",
      // url: `http://localhost:8080/subject/createSubject/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: subject,
    })
      .then((response) => {
        console.log("Subject updated:", response.data);
        toast.success("Subject updated successfully!")
        navigate("/admin/subject"); // Navigate back to the subject list
      })
      .catch((error) => {
        console.error("Error updating subject:", error);
      });
  };

  return (
    <div className="flex justify-center items-center mt-20">
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Edit Subject</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Subject</label>
          <input
            type="text"
            name="subject"
            value={subject.subject}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter subject name"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            name="description"
            value={subject.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter subject description"
            rows="4"
            required
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Update Subject
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/subject')}
            className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default EditSubject;
