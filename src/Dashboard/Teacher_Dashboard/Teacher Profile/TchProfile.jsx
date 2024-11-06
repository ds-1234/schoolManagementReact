import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../../../conf/conf';
import StatusButton from '../../../Reusable_components/StatusButton';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faEnvelope, faFilePdf, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import maleImg from '../../../assets/man.png'
import femaleImg from '../../../assets/woman.png'

const TchProfile = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [teacherDetails, setTeacherDetails] = useState(null);
  const [teacherBasicDetails, setTeacherBasicDetails] = useState(null);
  const [activeTab, setActiveTab] = useState('hostel'); 
  const [hostel , setHostel] = useState({}) 
  const [transport , setTransport] = useState({})
  const [hostelRoom , setHostelRoom] = useState({}) 
  const [classList, setClassList] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);


console.log(filteredClasses,'classes')


    useEffect(() => {
      const fetchBasicInfo = () => {
        axios({
          method: 'GET',
          url: `${BASE_URL}/teacherInfo/getTeacherInfo/${user.id}`,
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            console.log('Data from API setTeacherBasicDetails:', response.data);
            setTeacherBasicDetails(response.data.data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      };
  
      fetchBasicInfo();
    },[user.id,teacherDetails]);


    useEffect(() => {

    const fetchData = () => {
      axios({
        method: 'GET',
        url: `${BASE_URL}/user/getUser/${user.id}`,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          console.log('Data from API teacherDetails:', response.data);
          if (response.data && response.data.data) {
            setTeacherDetails(response.data.data); // Ensure 'data' exists before setting state
          }
                })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };

    fetchData();
  }, [user.id]);


  // Fetch Class List
  const fetchClassList = async () => {
    try {
      const response = await fetch('http://localhost:8080/class/getClassList');
      const data = await response.json();
      setClassList(data.data);  // Assuming data.data holds the list of classes
    } catch (error) {
      console.error('Error fetching class list:', error);
    }
  };

  // Filter classes based on the teacher's className array
  useEffect(() => {
    if (teacherDetails && classList.length > 0) {
      const teacherClassIds = teacherDetails.className;  // Array of class IDs from teacher details
      const filtered = classList.filter(classItem =>
        teacherClassIds.includes(classItem.id)
      );
      setFilteredClasses(filtered);
    }
  }, [teacherDetails, classList]);

  useEffect(() => {
    fetchClassList();
  }, []);

  useEffect(() => {
    if( teacherDetails ){
        const fetchHostel = () => {
        axios({
          method: 'GET',
          url: `${BASE_URL}/hostel/getHostelById/${teacherDetails.buildingName}`,
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            console.log('Data from API:', response.data);
            setHostel(response.data.data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      };

      const fetchHostelRooms = () => {
        axios({
          method: 'GET',
          url: `${BASE_URL}/hostelRooms/getHostelRoomsById/${teacherDetails.roomNumber}`,
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            console.log('Data from API:', response.data);
            setHostelRoom(response.data.data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }

      const fetchTransport = () => {
        axios({
          method: 'GET',
          url: `${BASE_URL}/transport/getTransport/${teacherDetails.routeName}`,
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            console.log('Data from API:', response.data);
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
  } , [teacherDetails])

  if (!teacherDetails  || !teacherBasicDetails) return <div>Loading...</div>;

  const formattedDate = new Date(teacherDetails.dateOfBirth).toISOString().split('T')[0];
  console.log('formattedDate',formattedDate)

  return (
    <div className="mb-6">
      <h1 className="text-lg md:text-2xl pt-8 font-semibold text-black">Profile</h1>
      <p className="mt-2">
        Dashboard /
        <NavLink to="/teacherDashboard"> Teacher </NavLink>/
        <span className="text-[#ffae01] font-semibold">Profile</span>
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Student Overview Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6 flex gap-5">
          <img 
            src={teacherDetails.gender === "Male" ? maleImg : femaleImg} 
            alt="Student" 
            className="w-24 h-24 rounded-full border-2 border-gray-300" 
          />
            <div className=" flex flex-col gap-1">
                <StatusButton isActive={teacherDetails.isActive} />
              <h2 className="text-2xl font-bold text-gray-800">
                {teacherDetails.firstName} {teacherDetails.lastName}
              </h2>
              <p className="text-sm text-gray-500">{teacherDetails.admissionNumber}</p>
            </div>
          </div>

          {/* Basic Information Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Basic Information</h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-600">
            {/* <p><strong>Roll No:</strong></p> 
            <p>{teacherDetails.rollNumber}</p> */}

            <p><strong>Gender:</strong></p> 
            <p>{teacherDetails.gender}</p>

            <p><strong>Date of Birth:</strong></p> 
            <p>{formattedDate}</p>

            <p><strong>Blood Group:</strong></p> 
            <p>{teacherDetails.bloodGroup}</p>

            <p><strong>Religion:</strong></p> 
            <p>{teacherDetails.religion}</p>

            <p><strong>Caste:</strong></p> 
            <p>{teacherDetails.casteCategory}</p>

            <p><strong>Classes:</strong></p> 
            <p>
        {teacherDetails.className && teacherDetails.className.length > 0 ? (
            teacherDetails.className.map(classId => {
                const classDetails = filteredClasses.find(classItem => classItem.id === classId);
                return classDetails ? `${classDetails.name} - ${classDetails.section}` : null;
            }).join(", ")
        ) : "No classes assigned"}
    </p>
            </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
  <h3 className="text-lg font-semibold text-gray-700 mb-4">Profile Details</h3>
  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-600">
    <p><strong>Father's Name:</strong></p>
    <p>{teacherDetails.fatherName}</p>

    <p><strong>Mother's Name:</strong></p>
    <p>{teacherDetails.motherName}</p>

    <p><strong>Date of Birth:</strong></p>
    <p>{formattedDate}</p>

    <p><strong>Marital Status:</strong></p>
    <p>{teacherBasicDetails.maritalStatus}</p>
    </div>
    </div>


        {/* Primary Info Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Primary Contact Info</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faPhoneAlt} />
                <span><strong>Phone Number:</strong> {teacherDetails.phone}</span>
              </li>
              <li className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faEnvelope} />
                <span><strong>Email:</strong> {teacherDetails.email}</span>
              </li>
            </ul>
        </div>



          {/* Sibling Information */}
          {/* <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Sibling Information</h3>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Ralph Claudia:</strong> III, B</li>
              <li><strong>Julie Scott:</strong> V, A</li>
            </ul>
          </div> */}

            {/* Qualification Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">Qualification</h3>
    <table className="w-full border-collapse">
        <thead>
            <tr>
                <th className="text-left px-4 py-2">Course</th>
                <th className="text-left px-4 py-2">Institute</th>
                <th className="text-left px-4 py-2">Passout Year</th>
                <th className="text-left px-4 py-2">CGPA</th>
            </tr>
        </thead>
        <tbody>
        {teacherBasicDetails?.qualificationList && teacherBasicDetails.qualificationList.length > 0 ? (
                teacherBasicDetails.qualificationList.map((qual) => (
                    <tr key={qual.id} className="border-t">
                        <td className="px-4 py-2">{qual.course}</td>
                        <td className="px-4 py-2">{qual.institute}</td>
                        <td className="px-4 py-2">{qual.passoutYear}</td>
                        <td className="px-4 py-2">{qual.cgpa}</td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="4" className="text-center py-4">No qualifications available</td>
                </tr>
            )}
        </tbody>
    </table>
</div>


            {/* Work Experience Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Work Experience</h3>
                <table>
                    <thead>
                        <tr>
                            <th className="text-left px-4 py-2">From Year</th>
                            <th className="text-left px-4 py-2">To Year</th>
                            <th className="text-left px-4 py-2">Institute</th>
                            <th className="text-left px-4 py-2">Designation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teacherBasicDetails?.workExperience && teacherBasicDetails.workExperience.length > 0 ? (
                            teacherBasicDetails.workExperience.map((work) => (
                                <tr key={work.id}>
                                    <td className="px-4 py-2">{work.fromYear}</td>
                                    <td className="px-4 py-2">{work.toYear}</td>
                                    <td className="px-4 py-2">{work.insitutue}</td>
                                    <td className="px-4 py-2">{work.designation}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No work experience available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
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
              <div className='grid grid-cols-2 gap-x-4 gap-y-2 text-gray-600'>
                <p><strong>Hostel Name:</strong></p>
                <p>{hostel.hostelName}</p>
                <p><strong>Room No:</strong></p>
                <p>{hostelRoom.hostelRoomNumber}</p>
              </div>
            ) : (
              <div className='grid grid-cols-2 gap-x-4 gap-y-2 text-gray-600'>
                <p><strong>Route Name:</strong></p>
                <p>{transport.routeName}</p>
                <p><strong>Vehicle Number:</strong></p>
                <p>{transport.vehicleNumber}</p>
                <p><strong>Driver Name:</strong></p>
                <p>{transport.driverName}</p>
                <p><strong>Driver Phone Number:</strong></p>
                <p>{transport.phone}</p>
                <p><strong>Pickup Point:</strong></p>
                <p>{teacherDetails.pickupPoint}</p>
              </div>
            )}
          </div>
        </div>

        <div>
          {/* Parents Information Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-700mb-4">Parents Information</h3>
            <div className="space-y-2 text-gray-600">
              <div>
                <p><strong>Father Name:</strong> {teacherDetails.fatherName}</p>
              </div>
              <div>
                <p><strong>Mother Name:</strong> {teacherDetails.motherName}</p>
              </div>
            </div>
          </div>

        {/* Documents Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Documents</h3>
        <div className="space-y-4">
            {/* {teacherDetails.documents.map((doc, index) => ( */}
            <div key ="" className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow">
                <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faFilePdf} />
                <span className="text-gray-700 font-semibold">{/*doc.name*/}Transfer Certificate</span>
                </div>
                <a href="" className="text-blue-500 font-semibold flex items-center space-x-2">
                <FontAwesomeIcon icon={faDownload} />
                </a>
            </div>
            {/* ))} */}
        </div>
        </div>


        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Previous School Details</h3>
        <ul className=" text-gray-600 flex justify-between ">
            <li className='flex flex-col'><strong>School Name</strong> {teacherBasicDetails?.previousSchool}</li>
            <li className='flex flex-col'><strong>Address</strong> {teacherDetails.preSchoolAddress}</li>
            <li className='flex flex-col'><strong>Leaving Year</strong> {teacherDetails.preSchoolLeavingSession}</li>
        </ul>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Address</h3>
        <ul className="space-y-2 text-gray-600">
            <li><strong>House No:</strong> {teacherDetails.houseNumber}</li>
            <li><strong>Street:</strong> {teacherDetails.street}</li>
            <li><strong>City:</strong> {teacherDetails.city}</li>
            <li><strong>Pincode:</strong> {teacherDetails.pinCode}</li>
        </ul>
        </div>




          {/* Bank Details */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Bank Details</h3>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Bank Name:</strong>{teacherBasicDetails?.bankName}</li>
              <li><strong>Branch:</strong> {teacherBasicDetails?.branchName}</li>
              <li><strong>IFSC:</strong> {teacherBasicDetails?.ifsc}</li>
              <li><strong>Account Name:</strong> {teacherBasicDetails?.accountName}</li>
              <li><strong>PAN</strong> {teacherBasicDetails?.pan}</li>
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
  );
};

export default TchProfile