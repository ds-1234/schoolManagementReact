import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const ExamClasses = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { examType = "Unknown", classNames = [] } = location.state || {};
  const [examTypeName, setExamTypeName] = useState("");
  const [classNamestr, setClassNamestr] = useState([]);



  const handleTileClick = (className) => {
    navigate("/teacherdashboard/UpdateResult", {
      state: { className, examType },
    });
  };

  useEffect(() => {

    fetchExamType()
  }, []);

  const fetchExamType = async () => {
    try {
      const response = await axios.get("http://localhost:8080/examType/getExamTypeList");
      
      if (response.data.success) {
        const examTypeData = response.data.data;
        const ExamTyperes = examTypeData.find((type) => type.id == examType);
        const examName = ExamTyperes?.examTypeName;
        console.log(examName,'examName')
        
        if (examName) {
            setExamTypeName(examName);
        } else {
          console.error("Exam type not found for the selected exam ID.");
        }
      } else {
        console.error("Failed to fetch exam type data.");
      }
    } catch (error) {
      console.error("Error fetching exam type data:", error);
    }
  };
  const fetchClassName = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/class/getClassList"
      );

      if (response.data.success) {
        const clasdata = response.data.data;
        // const classres = clasdata.find((type) => type.id === className);
        setClassNamestr(clasdata);
      }
    } catch (error) {
      console.error("Error fetching class data:", error);
    }
  };

  useEffect(() => {
    fetchClassName();
  }, []);

  const getclassNameById = (id) => {
    const cls = classNamestr.find((type) => type.id == id);
    return cls ? cls.name : "Unknown";
  };

  return (
    <div>
    <div className="h-full mb-10 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          {/* Exam Type: {examTypeName} */}
          Class List
        </h1>
        {/* <h1 className="text-lg md:text-2xl pt-8 font-semibold text-black">Exam Result</h1> */}
      <p className="mt-2">
        Dashboard /
        {/* <NavLink to="/teacherDashboard"> Teacher Dashboard </NavLink> / */}
        <NavLink to="/teacherdashboard/tchExamResult"> Exam Result </NavLink>/
        <span className="text-[#ffae01] font-semibold">  Class List</span>
      </p>
        {/* <p className="mt-2 text-gray-600">Select a class to view details:</p> */}

        {/* Class Name Tiles */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {classNames.map((className, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-lg shadow-lg cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl"
              onClick={() => handleTileClick(className)}
            >
              <p className="font-semibold text-lg">Class: {getclassNameById(className)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default ExamClasses;
