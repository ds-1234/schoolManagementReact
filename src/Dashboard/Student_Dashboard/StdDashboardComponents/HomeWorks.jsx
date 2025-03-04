import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons'; 
import BASE_URL from '../../../conf/conf';

function HomeWorks() {
  const user = JSON.parse(sessionStorage.getItem('user')); // Parse the user data
  const [homeworks, setHomeworks] = useState([]);
  const [subjects, setSubjects] = useState([]); // Store subjects data
  const [filteredHomeworks, setFilteredHomeworks] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(''); // Track selected subject

  const classId = user.className ? user.className[0] : null; // Get the class ID from the user's className array

  useEffect(() => {
    // Fetch homeworks and subjects data
    const fetchHomeworks = async () => {
      try {
        const homeworkResponse = await fetch(`${BASE_URL}/homework/getHomeworkList`);
        const homeworkData = await homeworkResponse.json();
        console.log('Fetched Homework Data:', homeworkData);

        // Filter homeworks to match the user's class
        const classFilteredHomeworks = homeworkData.data.filter(
          (homework) => homework.className === classId
        );
        setHomeworks(classFilteredHomeworks); // Save only relevant homeworks
      } catch (error) {
        console.error('Error fetching homework:', error);
      }
    };

    const fetchSubjects = async () => {
      try {
        const classResponse = await fetch(`${BASE_URL}/class/getClass/${classId}`);
        const classData = await classResponse.json();
        console.log('Fetched Class Data:', classData);

        if (classData.success) {
          const classSubjects = classData.data.subject; // Get subjects related to the class
          console.log('Class Subjects:', classSubjects);

          // Fetch subject names based on subject IDs
          const subjectNames = await Promise.all(
            classSubjects.map(async (subjectId) => {
              const subjectResponse = await fetch(`${BASE_URL}/subject/getSubject/${subjectId}`);
              const subjectData = await subjectResponse.json();
              console.log('Fetched Subject Data:', subjectData);
              return subjectData.data; // Assuming the subject API returns the full subject object
            })
          );

          setSubjects(subjectNames); // Save subjects to the state
        }
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchHomeworks();
    fetchSubjects();
  }, [classId]);

  useEffect(() => {
    // Filter homeworks based on the selected subject
    const filtered = homeworks.filter((homework) =>
      !selectedSubject || homework.subject === selectedSubject
    );
    setFilteredHomeworks(filtered);
  }, [homeworks, selectedSubject]);

  const getSubjectName = (subjectId) => {
    // Find subject name from the subjects state using the subject ID
    const subject = subjects.find((sub) => sub.id === subjectId);
    return subject ? subject.subject : 'Unknown Subject'; // Return subject name or default text
  };

  const generateRandomPercentage = () => {
    return Math.floor(Math.random() * 101); // Random percentage between 0 and 100
  };

  return (
    <div className="p-5 bg-white shadow-lg rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">HomeWorks</h1>
        <div className="flex items-center space-x-2">
          <label htmlFor="subject" className="font-medium">Filter by Subject:</label>
          <select
            id="subject"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none"
          >
            <option value="">All</option>
            {subjects.length === 0 ? (
              <option>Loading subjects...</option> // Show loading text if subjects are still fetching
            ) : (
              subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.subject} {/* Display the subject name */}
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      {/* Homework List */}
      <div className="space-y-4">
        {filteredHomeworks.length === 0 ? (
          <p>No homework found for the selected subject.</p> // Show message if no homework found
        ) : (
          filteredHomeworks.map((hw, index) => {
            const subjectName = getSubjectName(hw.subject); // Get subject name using the helper function
            const randomPercentage = generateRandomPercentage(); // Get random percentage for each homework

            return (
              <div
                key={index}
                className="flex justify-between items-center p-4 border rounded-lg shadow-md"
              >
                {/* Subject Tag Above Description */}
                <div
                  className={`px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-full mb-2`}
                >
                  {subjectName} {/* Display the subject name */}
                </div>

                {/* Homework Details */}
                <div className="flex-1 ml-4">
                  <p className="font-semibold">{hw.homeworkId}</p>
                  <p className="text-sm text-gray-500">
                    Due: {new Date(hw.submissionDate).toLocaleDateString()}
                  </p>
                </div>

                {/* Circular Percentage Indicator */}
                <div className="relative w-16 h-16">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <circle
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      strokeDasharray={`${(randomPercentage * 2.51)}, 100`} // Filling circle based on random percentage
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                    {randomPercentage}%
                  </div>
                </div>

                {/* Download Button for Attachment */}
                <div className="ml-4">
                  <a
                    href={hw.attachmentPath} // Assuming the attachmentPath is the correct URL to the attachment
                    download
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FontAwesomeIcon icon={faDownload} className="mr-2 text-[#ffae01]" />
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default HomeWorks;
