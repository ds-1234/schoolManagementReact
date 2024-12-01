import { useLocation } from "react-router-dom";

const ExamSubjects = () => {
  const location = useLocation();
  const { examType = "Unknown", classNames = [] } = location.state || {};

  return (
    <div>
      <h1>Exam Type: {examType}</h1>
      <p>Classes: {classNames.length > 0 ? classNames.join(", ") : "No classes available"}</p>
    </div>
  );
};

export default ExamSubjects;
