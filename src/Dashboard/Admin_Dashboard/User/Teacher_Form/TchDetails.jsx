import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../../../conf/conf";
import StatusButton from "../../../../Reusable_components/StatusButton";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt, faEnvelope, faDownload, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import maleImg from "../../../../assets/man.png";
import femaleImg from "../../../../assets/woman.png";

const TchDetails = () => {
  const { userId } = useLocation().state || {};

  const [teacherDetails, setTeacherDetails] = useState(null);
  const [teacherBasicDetails, setTeacherBasicDetails] = useState(null);
  const [activeTab, setActiveTab] = useState("personalInfo"); // Default active tab
  const [classList, setClassList] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [hostel, setHostel] = useState({});
  const [transport, setTransport] = useState({});
  const [hostelRoom, setHostelRoom] = useState({});
  const[country , setCountry] = useState(null) ;
  const [stateMap, setStateMap] = useState({});
  const [cityMap, setCityMap] = useState({});
  const [designation , setDesignation] = useState('') 
  const [department , setDepartment] = useState('') 

  const fetchCountries = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/area/getCountryList`);
      setCountry(response.data.data.filter((c) => c.id === teacherBasicDetails?.country))
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchStatesByCountry = async (countryId) => {
    try {
      const response = await axios.get(`${BASE_URL}/area/getStateList/${countryId}`);
      const states = response.data.data;
      const newStateMap = { ...stateMap };
      states.forEach((state) => {
        newStateMap[state.id] = state.name;
      });
      setStateMap(newStateMap);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const fetchCitiesByState = async (stateId) => {
    try {
      const response = await axios.get(`${BASE_URL}/area/getCitiesList/${stateId}`);
      const cities = response.data.data;
      const newCityMap = { ...cityMap };
      cities.forEach((city) => {
        newCityMap[city.id] = city.name;
      });
      setCityMap(newCityMap);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };
  
  useEffect(() => {
    fetchCountries() ;
  } , [teacherBasicDetails])

  // Fetch Teacher Basic Info
  useEffect(() => {
    axios
      .get(`${BASE_URL}/teacherInfo/getTeacherInfo/${userId}`)
      .then((response) => setTeacherDetails(response.data.data))
      .catch((error) => console.error("Error fetching basic info:", error));
  }, [userId]);

  // Fetch Teacher Details
  useEffect(() => {
    axios
      .get(`${BASE_URL}/user/getUser/${userId}`)
      .then((response) =>{
        setTeacherBasicDetails(response.data.data)
        
          if (response.data.data?.country && !stateMap[response.data.data.state]) {
             fetchStatesByCountry(response.data.data.country); 
          }
          if (response.data.data?.state && !cityMap[response.data.data.city]) {
             fetchCitiesByState(response.data.data.state); 
          }
      })
      .catch((error) => console.error("Error fetching teacher details:", error));
  }, [userId]);

  // Fetch Class List
  useEffect(() => {
    axios
      .get(`${BASE_URL}/class/getClassList`)
      .then((response) => setClassList(response.data.data))
      .catch((error) => console.error("Error fetching class list:", error));
  }, []);

  // Filter Classes based on teacher's className array
  useEffect(() => {
    if (teacherDetails?.className && classList.length > 0) {
      const filtered = classList.filter((classItem) =>
        teacherDetails.className.includes(classItem.id)
      );
      setFilteredClasses(filtered);
    }
  }, [teacherDetails, classList]);

  // Fetch Hostel, Transport, and Hostel Rooms
  useEffect(() => {
    if (teacherBasicDetails) {
      const fetchHostel = () => {
        axios
          .get(`${BASE_URL}/hostel/getHostelById/${teacherBasicDetails.buildingName}`)
          .then((response) => setHostel(response.data.data))
          .catch((error) => console.error("Error fetching hostel data:", error));
      };

      const fetchHostelRooms = () => {
        axios
          .get(`${BASE_URL}/hostelRooms/getHostelRoomsById/${teacherBasicDetails.roomNumber}`)
          .then((response) => setHostelRoom(response.data.data))
          .catch((error) => console.error("Error fetching hostel rooms:", error));
      };

      const fetchTransport = () => {
        axios
          .get(`${BASE_URL}/transport/getTransport/${teacherBasicDetails.routeName}`)
          .then((response) => setTransport(response.data.data))
          .catch((error) => console.error("Error fetching transport data:", error));
      };

      const fetchDocuments = () => {
        axios
          .get(`${BASE_URL}/document/getDocument/${userId}`)
          .then((response) => setDocuments(response.data.data))
          .catch((error) => console.error("Error fetching documents:", error));
      };

      fetchHostel();
      fetchHostelRooms();
      fetchTransport();
      fetchDocuments();
    }
  }, [teacherBasicDetails, userId]);

  useEffect(() => {
    const fetchDesignation = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/designation/getDesignationList`);
        const desi = res.data.data.find((desi) => desi.id === teacherDetails?.designation);
        if (desi) setDesignation(desi.designationName);
      } catch (error) {
        console.error("Error fetching designation:", error);
      }
    };
  
    const fetchDepartment = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/department/getDepartmentList`);
        const depart = res.data.data.find((dep) => dep.id === teacherDetails?.department);
        if (depart) setDepartment(depart.departmentName);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
  
    if (teacherDetails) {
      fetchDepartment();
      fetchDesignation();
    }
  }, [teacherDetails]);
  

  if (!teacherDetails || !teacherBasicDetails) return <div>Loading...</div>;

  // Format Date of Birth
  const formattedDate = new Date(teacherBasicDetails.dateOfBirth).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Format Classes
  const formattedClasses =
    filteredClasses.length > 0
      ? filteredClasses.map((cls) => `${cls.name} - ${cls.section}`).join(", ")
      : "N/A";
      
  return (
    <div className="mt-6">
      <h1 className="text-2xl font-semibold text-black">Teacher Profile</h1>
      <p className="mt-2">
        <NavLink to="/admin">Dashboard</NavLink> /{" "}
        <NavLink to="/admin/activeUser">Users</NavLink> /{" "}
        <span className="text-[#ffae01] font-semibold">Teacher Profile</span>
      </p>

      {/* Profile Tile */}
      <div className="bg-white shadow-lg rounded-lg py-6 px-6 mt-6 flex  gap-10 lg:w-1/2 w-full">
        <img
          src={teacherBasicDetails.gender === "Male" ? maleImg : femaleImg}
          alt="Teacher"
          className="w-24 h-24 rounded-full border-2 border-gray-300"
        />
        <div className="flex flex-col gap-2 w-full">
         <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 ">
              {teacherBasicDetails.firstName} {teacherBasicDetails.lastName}
            </h2>
            <StatusButton isActive={teacherBasicDetails.isActive} />
         </div>
          <div className="grid-cols-1 grid text-gray-700  gap-1">
            <p >Employee ID: {teacherDetails.employeeNumber || "N/A"}</p>
            <p >Designation: {designation || "N/A"}</p>
            <p >Department: {department|| "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 bg-white py-5 rounded-md px-5">
        <div className="border-b">
          <nav className="flex flex-wrap space-x-4">
            <button
              onClick={() => setActiveTab("personalInfo")}
              className={`py-2 px-4 ${
                activeTab === "personalInfo"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              Personal Information
            </button>
            <button
              onClick={() => setActiveTab("qualification")}
              className={`py-2 px-4 ${
                activeTab === "qualification"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              Qualification
            </button>
            <button
              onClick={() => setActiveTab("workExperience")}
              className={`py-2 px-4 ${
                activeTab === "workExperience"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              Work Experience
            </button>
            <button
              onClick={() => setActiveTab("hostel")}
              className={`py-2 px-4 ${
                activeTab === "hostel"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              Hostel
            </button>
            <button
              onClick={() => setActiveTab("transport")}
              className={`py-2 px-4 ${
                activeTab === "transport"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              Transportation
            </button>
            <button
              onClick={() => setActiveTab("documents")}
              className={`py-2 px-4 ${
                activeTab === "documents"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              Documents
            </button>
            <button
              onClick={() => setActiveTab("bankDetails")}
              className={`py-2 px-4 ${
                activeTab === "bankDetails"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              Bank Details
            </button>
            <button
              onClick={() => setActiveTab("address")}
              className={`py-2 px-4 ${
                activeTab === "address"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              Address
            </button>

            <button
              onClick={() => setActiveTab("payroll")}
              className={`py-2 px-4 ${
                activeTab === "payroll"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              Payroll
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-4  rounded-b-lg">
          {/* Personal Information Tab */}
          {activeTab === "personalInfo" && (
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                <div>
                  <p><strong>Father's Name:</strong> {teacherBasicDetails.fatherName || "N/A"}</p>
                </div>
                <div>
                  <p><strong>Mother's Name:</strong> {teacherBasicDetails.motherName || "N/A"}</p>
                </div>
                <div>
                  <p><strong>Date of Birth:</strong> {formattedDate}</p>
                </div>
                <div>
                  <p><strong>Marital Status:</strong> {teacherDetails.maritalStatus || "N/A"}</p>
                </div>
                <div>
                  <p><strong>Gender:</strong> {teacherBasicDetails.gender || "N/A"}</p>
                </div>
                <div>
                  <p><strong>Blood Group:</strong> {teacherDetails.bloodGroup || "N/A"}</p>
                </div>
                <div>
                  <p><strong>Religion:</strong> {teacherDetails.religion || "N/A"}</p>
                </div>
                <div>
                  <p><strong>Caste:</strong> {teacherDetails.casteCategory || "N/A"}</p>
                </div>
              </div>
            </div>
          )}

          {/* Qualification Tab */}
          {activeTab === "qualification" && (
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Qualification</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left px-4 py-2">Course</th>
                    <th className="text-left px-4 py-2">Institute</th>
                    <th className="text-left px-4 py-2">Passout Year</th>
                    <th className="text-left px-4 py-2">CGPA</th>
                  </tr>
                </thead>
                <tbody>
                  {teacherDetails?.qualificationList && teacherDetails.qualificationList.length > 0 ? (
                    teacherDetails.qualificationList.map((qual) => (
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
          )}

          {/* Work Experience Tab */}
          {activeTab === "workExperience" && (
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Work Experience</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left px-4 py-2">From Year</th>
                    <th className="text-left px-4 py-2">To Year</th>
                    <th className="text-left px-4 py-2">Institute</th>
                    <th className="text-left px-4 py-2">Designation</th>
                  </tr>
                </thead>
                <tbody>
                  {teacherDetails?.workExperience && teacherDetails.workExperience.length > 0 ? (
                    teacherDetails.workExperience.map((work) => (
                      <tr key={work.id} className="border-t">
                        <td className="px-4 py-2">{work.fromYear}</td>
                        <td className="px-4 py-2">{work.toYear}</td>
                        <td className="px-4 py-2">{work.institute || "N/A"}</td>
                        <td className="px-4 py-2">{work.designation || "N/A"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4">No work experience available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Hostel Tab */}
          {activeTab === "hostel" && (
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Hostel Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                <div>
                  <p><strong>Hostel Name:</strong> {hostel.hostelName || "N/A"}</p>
                </div>
                <div>
                  <p><strong>Room No:</strong> {hostelRoom.hostelRoomNumber || "N/A"}</p>
                </div>
              </div>
            </div>
          )}

          {/* Transportation Tab */}
          {activeTab === "transport" && (
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Transportation Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                <div>
                  <p><strong>Route Name:</strong> {transport.routeName || "N/A"}</p>
                </div>
                <div>
                  <p><strong>Vehicle Number:</strong> {transport.vehicleNumber || "N/A"}</p>
                </div>
                <div>
                  <p><strong>Driver Name:</strong> {transport.driverName || "N/A"}</p>
                </div>
                <div>
                  <p><strong>Driver Phone Number:</strong> {transport.phone || "N/A"}</p>
                </div>
                <div>
                  <p><strong>Pickup Point:</strong> {teacherDetails.pickupPoint || "N/A"}</p>
                </div>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Documents</h3>
              <div className="space-y-4">
                {documents.length > 0 ? (
                  documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow">
                      <div className="flex items-center space-x-3">
                        <FontAwesomeIcon icon={faFilePdf} className="text-red-500" />
                        <span className="text-gray-700 font-semibold">{doc.documentName}</span>
                      </div>
                      {doc.attachmentPath ? (
                        <a href={`${BASE_URL}${doc.attachmentPath}`} download className="text-blue-500 font-semibold flex items-center space-x-2">
                          <FontAwesomeIcon icon={faDownload} />
                          <span className="hidden sm:block">Download</span>
                        </a>
                      ) : (
                        <span className="text-gray-500">No Document</span>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No documents available.</p>
                )}
              </div>
            </div>
          )}

          {/* Bank Details Tab */}
          {activeTab === "bankDetails" && (
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Bank Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                <div>
                  <p><strong>Bank Name:</strong> {teacherDetails.bankName || "N/A"}</p>
                </div>
                <div>
                  <p><strong>Branch:</strong> {teacherDetails.branchName || "N/A"}</p>
                </div>
                <div>
                  <p><strong>IFSC:</strong> {teacherDetails.ifsc || "N/A"}</p>
                </div>
                <div>
                  <p><strong>Account Name:</strong> {teacherDetails.accountName || "N/A"}</p>
                </div>
                <div>
                  <p><strong>PAN:</strong> {teacherDetails.pan || "N/A"}</p>
                </div>
                <div>
                  <p><strong>Addhar:</strong> {teacherDetails.pan || "N/A"}</p>
                </div>
                {/* Add more bank-related details if available */}
              </div>
            </div>
          )}

          {/* Address Tab */}
          {activeTab === "address" && (
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                <div>
                  <p><strong>House No:</strong> {teacherBasicDetails.houseNumber || "N/A"}</p>
                </div>
                <div>
                  <p><strong>Street:</strong> {teacherBasicDetails.street || "N/A"}</p>
                </div>
                <div>
                  <p><strong>City:</strong> {cityMap[teacherBasicDetails.city] || "N/A"}</p>
                </div>
                <div>
                  <p><strong>State:</strong> {stateMap[teacherBasicDetails.state] || "N/A"}</p>
                </div>
                <div>
                  <p><strong>Country:</strong> {country[0]?.name || "N/A"}</p>
                </div>
                <div>
                  <p><strong>Pincode:</strong> {teacherBasicDetails.pinCode || "N/A"}</p>
                </div>
                {/* Add more address-related details if available */}
              </div>
            </div>
          )}

        {activeTab === "payroll" && (
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Payroll</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                <div>
                  <p><strong>EPF Number:</strong> {teacherDetails.epfNumber || "N/A"}</p>
                </div>
                <div>
                  <p><strong>Basic Salary:</strong> {teacherDetails.basicSalary || "N/A"}</p>
                </div>
                <div>
                  <p><strong>Contract Type:</strong> {teacherDetails.contractType || "N/A"}</p>
                </div>
                <div>
                  <p><strong>Work Shift:</strong> {teacherDetails.workShift || "N/A"}</p>
                </div>
                <div>
                  <p><strong>Work Location:</strong> {teacherDetails.workLocation || "N/A"}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TchDetails;
