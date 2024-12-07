import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const TchExamResult = () => {
  const [exams, setExams] = useState([]);
  const [examTypes, setExamTypes] = useState([]);
  const navigate = useNavigate();
  const [classNamestr, setClassNamestr] = useState([]);


  const teacherData = JSON.parse(sessionStorage.getItem("teacherData"));
  useEffect(() => {
    fetchClassName();
  }, []);

  useEffect(() => {
    fetchExamTypes();

    const validClasses = teacherData.classSubjectEntity
      .filter((entry) => entry.classId !== null)
      .map((entry) => entry.classId);

    axios
      .get("http://localhost:8080/exam/getExam")
      .then((response) => {
        const { data } = response;
        if (data.success) {
          const filteredExams = data.data.filter((exam) =>
            validClasses.includes(String(exam.className))
        );
          setExams(filteredExams);
        }
      })
      .catch((error) => {
        console.error("Error fetching exams:", error);
      });
  }, []);

  const fetchExamTypes = () => {
    axios
      .get("http://localhost:8080/examType/getExamTypeList")
      .then((response) => {
        if (response.data.success) {
          setExamTypes(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching exam types:", error);
      });
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

  const getExamTypeNameById = (examTypeId) => {
    const examType = examTypes.find((type) => type.id == examTypeId);
    return examType ? examType.examTypeName : "Unknown";
  };
  const getclassNameById = (id) => {
    const cls = classNamestr.find((type) => type.id == id);
    return cls ? cls.name : "Unknown";
  };

  // Group exams by examType and collect unique classNames
  const groupedExamData = exams.reduce((acc, exam) => {
    const { examName: examTypeId, className } = exam;
    if (!acc[examTypeId]) {
      acc[examTypeId] = {
        examType: examTypeId,
        classNames: new Set(),
      };
    }
    acc[examTypeId].classNames.add(className);
    return acc;
  }, {});

  // Convert to an array and remove duplicate classNames
  const uniqueExamTypes = Object.values(groupedExamData).map((item) => ({
    examType: item.examType,
    classNames: Array.from(item.classNames),
  }));

  const handleTileClick = (examType, classNames) => {
    navigate("/teacherdashboard/ExamClasses", {
      state: { examType, classNames },
    });
  };

  return (
    <div className="h-full mb-10 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Exam Result</h1>
        <p className="mt-2 text-gray-600">
          <NavLink to="/teacherDashboard">
            Dashboard
          </NavLink>{" "}
          / <span className="text-yellow-500 font-semibold">Exam Result</span>
        </p>

        {/* Exam Tiles */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {uniqueExamTypes.map(({ examType, classNames }) => (
            <div
              key={examType}
              className="bg-gradient-to-r from-red-500 to-red-700 text-white p-6 rounded-lg shadow-lg cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl"
              onClick={() => handleTileClick(examType, classNames)}
            >
              <p className="font-semibold text-lg">
                Exam Type: {getExamTypeNameById(examType)}
              </p>
              <p className="text-sm">Classes: {classNames.join(", ")}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TchExamResult;
