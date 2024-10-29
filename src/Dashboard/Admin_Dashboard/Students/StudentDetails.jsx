import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../../../conf/conf';
import StatusButton from '../../../Reusable_components/StatusButton';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faEnvelope, faFilePdf, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import maleImg from '../../../assets/man.png'
import femaleImg from '../../../assets/woman.png'

function StudentDetails() {
  const {userId }= useLocation().state || {} ; 

  const [studentDetails, setStudentDetails] = useState(null);
  const [activeTab, setActiveTab] = useState('hostel'); 
  const [hostel , setHostel] = useState({}) 
  const [transport , setTransport] = useState({})
  const [hostelRoom , setHostelRoom] = useState({}) 
  const [documents , setDocuments] = useState({})

  useEffect(() => {
    const fetchData = () => {
      axios({
        method: 'GET',
        url: `${BASE_URL}/user/getStudentDetails/${userId}`,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          setStudentDetails(response.data.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };

    const fetchDocuments = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/document/getDocument/${id}`);
        setDocuments(response.data.data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchData();
    fetchDocuments() ;
  }, [userId]);

  useEffect(() => {
    if( studentDetails ){
        const fetchHostel = () => {
        axios({
          method: 'GET',
          url: `${BASE_URL}/hostel/getHostelById/${studentDetails.buildingName}`,
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            setHostel(response.data.data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      };

      const fetchHostelRooms = () => {
        axios({
          method: 'GET',
          url: `${BASE_URL}/hostelRooms/getHostelRoomsById/${studentDetails.roomNumber}`,
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            setHostelRoom(response.data.data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }

      const fetchTransport = () => {
        axios({
          method: 'GET',
          url: `${BASE_URL}/transport/getTransport/${studentDetails.routeName}`,
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            setTransport(response.data.data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      };

      fetchHostel() ;
      fetchTransport() ;
      fetchHostelRooms()
    }
  } , [studentDetails])

  const handleDownload = (attachmentName) => {
    const fullPath = `${attachmentName}`; 
    const link = document.createElement('a');
    link.href = fullPath;  
    link.setAttribute('download', attachmentName); 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!studentDetails) return <div>Loading...</div>;

  const formattedDate = new Date(studentDetails.dateOfBirth).toDateString();

  return (
    <div className="mb-6">
      <h1 className="text-lg md:text-2xl pt-8 font-semibold text-black">Student Profile</h1>
      <p className="mt-2">
        Dashboard /
        <NavLink to="/admin"> Admin </NavLink>/
        <NavLink to='/admin/allStudents'> Students </NavLink> /
        <span className="text-[#ffae01] font-semibold">Profile</span>
      </p>

      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div>
          {/* Student Overview Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6 flex gap-5">
          <img 
            src={studentDetails.gender === "Male" ? maleImg : femaleImg} 
            alt="Student" 
            className="w-24 h-24 rounded-full border-2 border-gray-300" 
          />
            <div className=" flex flex-col gap-1">
                <StatusButton isActive={studentDetails.isActive} />
              <h2 className="text-2xl font-bold text-gray-800">
                {studentDetails.firstName} {studentDetails.lastName}
              </h2>
              <p className="text-sm text-gray-500">{studentDetails.admissionNumber}</p>
            </div>
          </div>

          {/* Basic Information Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Basic Information</h3>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Roll No:</strong> {studentDetails.rollNumber}</li>
              <li><strong>Gender:</strong> {studentDetails.gender}</li>
              <li><strong>Date of Birth:</strong> {formattedDate}</li>
              <li><strong>Blood Group:</strong> {studentDetails.bloodGroup}</li>
              <li><strong>Religion:</strong> {studentDetails.religion}</li>
              <li><strong>Caste:</strong> {studentDetails.casteCategory}</li>
            </ul>
          </div>

        {/* Primary Info Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Primary Contact Info</h3>
        <ul className="space-y-2 text-gray-600">
            <li className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faPhoneAlt} />
            <span><strong>Phone Number:</strong> {studentDetails.phone}</span>
            </li>
            <li className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faEnvelope} />
            <span><strong>Email:</strong> {studentDetails.email}</span>
            </li>
        </ul>
        </div>



          {/* Sibling Information */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Sibling Information</h3>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Ralph Claudia:</strong> III, B</li>
              <li><strong>Julie Scott:</strong> V, A</li>
            </ul>
          </div>

          {/* Hostel and Transport Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Hostel & Transportation</h3>

            {/* Tab buttons */}
            <div className="flex border-b border-gray-200 mb-4">
              <button
                className={`px-4 py-2 focus:outline-none ${activeTab === 'hostel' ? 'border-b-2 border-blue-500' : ''}`}
                onClick={() => setActiveTab('hostel')}
              >
                Hostel
              </button>
              <button
                className={`px-4 py-2 focus:outline-none ${activeTab === 'transport' ? 'border-b-2 border-blue-500' : ''}`}
                onClick={() => setActiveTab('transport')}
              >
                Transport
              </button>
            </div>

            {/* Conditional Rendering for Tabs */}
            {activeTab === 'hostel' ? (
              <div className='space-y-2 text-gray-600'>
                <p><strong>Hostel Name:</strong> {hostel.hostelName}</p>
                <p> <strong>Room No:</strong> {hostelRoom.hostelRoomNumber}</p>
              </div>
            ) : (
              <div className='space-y-2 text-gray-600'>
                <p><strong>Route Name:</strong> {transport.routeName}</p>
                <p><strong>Vehicle Number:</strong> {transport.vehicleNumber}</p>
                <p><strong>Driver Name:</strong> {transport.driverName}</p>
                <p><strong>Driver Phone Number:</strong> {transport.phone}</p>
                <p><strong>Pickup Point:</strong> {studentDetails.pickupPoint}</p>
              </div>
            )}
          </div>
        </div>

        
        <div>
          {/* Parents Information Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Parents Information</h3>
            <div className="space-y-2 text-gray-600">
              <div>
                <p><strong>Father Name:</strong> {studentDetails.fatherName}</p>
              </div>
              <div>
                <p><strong>Mother Name:</strong> {studentDetails.motherName}</p>
              </div>
            </div>
          </div>

       {/* Documents Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Documents</h3>
        <div className="space-y-4">
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow">
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faFilePdf} />
                <span className="text-gray-700 font-semibold">{doc.documentName}</span>
              </div>
              <button
                onClick={() => handleDownload(doc.attachmentName)}
                className="text-blue-500 font-semibold flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faDownload} />
                <span>Download</span>
              </button>
            </div>
          ))}
        </div>
      </div>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Previous School Details</h3>
        <ul className=" text-gray-600 flex justify-between ">
            <li className='flex flex-col'><strong>School Name</strong> {studentDetails.previousSchoolName}</li>
            <li className='flex flex-col'><strong>Address</strong> {studentDetails.preSchoolAddress}</li>
            <li className='flex flex-col'><strong>Leaving Year</strong> {studentDetails.preSchoolLeavingSession}</li>
        </ul>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Address</h3>
        <ul className="space-y-2 text-gray-600">
            <li><strong>House No:</strong> {studentDetails.houseNumber}</li>
            <li><strong>Street:</strong> {studentDetails.street}</li>
            <li><strong>City:</strong> {studentDetails.city}</li>
            <li><strong>Pincode:</strong> {studentDetails.pinCode}</li>
        </ul>
        </div>




          {/* Bank Details */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Bank Details</h3>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Bank Name:</strong> Bank of America</li>
              <li><strong>Branch:</strong> Cincinnati</li>
              <li><strong>IFSC:</strong> BOA83209832</li>
            </ul>
          </div>

          {/* Medical History */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Medical History</h3>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Known Allergies:</strong> Rashes</li>
              <li><strong>Medications:</strong> -</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails