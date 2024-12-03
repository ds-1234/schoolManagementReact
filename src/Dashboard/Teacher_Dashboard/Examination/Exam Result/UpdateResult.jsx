import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../../../Reusable_components/Button";

const UpdateResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const teacherData = JSON.parse(sessionStorage.getItem("teacherData"));

  const [userList, setUserList] = useState([]);
  const [examResults, setExamResults] = useState([]);
  const [subjects, setSubjects] = useState("");
  const [classNamestr, setClassNamestr] = useState("");
  const [examTypeName, setExamTypeName] = useState("");

  const { className = "Unknown", examType = "Unknown" } = location.state || {};
  const teacherId = user.id;

  const subjectId = teacherData?.classSubjectEntity?.find(
    (entry) => entry.classId == className
  )?.subjectId;

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("http://localhost:8080/user/getUserList");
      const data = await response.json();

      if (data.success && data.data) {
        const filteredUsers = data.data.filter(
          (user) =>
            user.role === 3 &&
            user.isActive === true &&
            user.className.includes(className)
        );

        setUserList(filteredUsers);

        const defaultExamResults = filteredUsers.map((user) => ({
          studentId: user.id,
          examMarks: "",
          remarks: "",
        }));
        setExamResults(defaultExamResults);

        // Fetch and populate exam results
        fetchExamResults(defaultExamResults);
      }
    };

    fetchUserData();
  }, [className]);

  const fetchExamResults = async (defaultExamResults) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/exam/getExamResult"
      );

      if (response.data.success) {
        const fetchedResults = response.data.data;

        // Map fetched results to default results
        const updatedResults = defaultExamResults.map((result) => {
          const matchedResult = fetchedResults.find(
            (exam) =>
              exam.studentId == result.studentId &&
              exam.examData.teacherId == teacherId &&
              exam.examData.className == className &&
              exam.examData.subjectId == subjectId &&
              exam.examData.examType == parseInt(examType)
          );
          return matchedResult
            ? {
                ...result,
                examMarks: matchedResult.examMarks || "",
                remarks: matchedResult.remarks || "",
              }
            : result;
        });

        setExamResults(updatedResults);
      }
    } catch (error) {
      console.error("Error fetching exam results:", error);
    }
  };

  useEffect(() => {
    fetchSubjects();
    fetchClassName();
    fetchExamType();
  }, []);

  const fetchExamType = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/examType/getExamTypeList"
      );

      if (response.data.success) {
        const examTypeData = response.data.data;
        const ExamTyperes = examTypeData.find((type) => type.id == examType);
        setExamTypeName(ExamTyperes?.examTypeName || "");
      }
    } catch (error) {
      console.error("Error fetching exam type data:", error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/subject/getSubjectList"
      );

      if (response.data.success) {
        const subjectData = response.data.data;
        const Subjectres = subjectData.find((type) => type.id == subjectId);
        setSubjects(Subjectres?.subject || "");
      }
    } catch (error) {
      console.error("Error fetching subject data:", error);
    }
  };

  const fetchClassName = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/class/getClassList"
      );

      if (response.data.success) {
        const clasdata = response.data.data;
        const classres = clasdata.find((type) => type.id === className);
        setClassNamestr(classres?.name || "");
      }
    } catch (error) {
      console.error("Error fetching class data:", error);
    }
  };

  const handleMarksChange = (studentId, value) => {
    setExamResults((prevResults) =>
      prevResults.map((result) =>
        result.studentId === studentId
          ? { ...result, examMarks: value }
          : result
      )
    );
  };

  const handleRemarksChange = (studentId, value) => {
    setExamResults((prevResults) =>
      prevResults.map((result) =>
        result.studentId === studentId
          ? { ...result, remarks: value }
          : result
      )
    );
  };

  const handleSaveChanges = async () => {
    const saveData = {
      teacherid: teacherId,
      className: className,
      subject: subjectId,
      examType,
      isActive: true,
      studentMarksMapping: examResults,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/exam/saveExamResult",
        saveData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        alert("Changes saved successfully!");
        navigate("/teacherDashboard/tchExamResult");
      } else {
        alert("Error saving changes.");
      }
    } catch (error) {
      console.error("There was an error saving the exam results:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="h-full mb-10">
      <h1 className="text-lg md:text-2xl pt-8 font-semibold text-black">
        Exam Result
      </h1>
      <p className="mt-2">
        Dashboard /
        <NavLink to="/teacherDashboard"> Teacher Dashboard </NavLink> /
        <NavLink to="/teacherdashboard/tchExamResult"> Exam Result </NavLink>/
        <span className="text-[#ffae01] font-semibold"> Update Result</span>
      </p>

      <h2 className="mt-6 text-xl font-semibold text-black">
        Update Marks of {classNamestr} for {subjects} in {examTypeName}
      </h2>

      <div className="container mt-4">
        <table className="min-w-full table-auto border-collapse border border-gray-200 bg-white">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-center">Full Name</th>
              <th className="border px-4 py-2 text-center">Exam Marks</th>
              <th className="border px-4 py-2 text-center">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2 text-center">
                  {user.firstName} {user.lastName}
                </td>
                <td className="border px-4 py-2 text-center">
                  <input
                    type="number"
                    className="border p-1 rounded w-40 text-center"
                    placeholder="Enter marks"
                    value={
                      examResults.find((result) => result.studentId === user.id)
                        ?.examMarks || ""
                    }
                    onChange={(e) =>
                      handleMarksChange(user.id, e.target.value)
                    }
                  />
                </td>
                <td className="border px-4 py-2 text-center">
                  <input
                    type="text"
                    className="border p-1 rounded w-full text-center"
                    placeholder="Enter remarks"
                    value={
                      examResults.find((result) => result.studentId === user.id)
                        ?.remarks || ""
                    }
                    onChange={(e) =>
                      handleRemarksChange(user.id, e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          <Button
            onClick={handleSaveChanges}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateResult;
