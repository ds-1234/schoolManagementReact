import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../../../../conf/conf';

const TimetableGrid = ({timetableData}) => {
  const [classMap, setClassMap] = useState({});
  const [subjectMap, setSubjectMap] = useState({});
  const [userMap, setUserMap] = useState({});

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const colors = ['bg-red-300', 'bg-blue-300', 'bg-yellow-300', 'bg-green-300', 'bg-purple-300', 'bg-pink-300'];

  // Fetch class data
  const fetchCls = async() => {
    await axios.get(`${BASE_URL}/class/getClassList`)
      .then((response) => {
        const classes = {};
        response.data.data.forEach((cls) => {
          classes[cls.id] = cls;
        });
        setClassMap(classes);
      })
      .catch((error) => {
        console.error('Error fetching class data:', error);
      });
  };

  // Fetch subject data
  const fetchSub = async () => {
    await axios.get(`${BASE_URL}/subject/getSubjectList`)
      .then((response) => {
        const subjects = {};
        response.data.data.forEach((sub) => {
          subjects[sub.id] = sub.subject;
        });
        setSubjectMap(subjects);
      })
      .catch((error) => {
        console.error('Error fetching subject data:', error);
      });
  };

  // Fetch user (teacher) data
  const fetchUsers = async() => {
   await axios.get(`${BASE_URL}/user/getUserList`)
      .then((response) => {
        const users = {};
        response.data.data.forEach((tch) => {
          users[tch.id] = tch;
        });
        setUserMap(users);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  useEffect(() => {
    fetchSub();
    fetchCls();
    fetchUsers();
  } , [])


const transformData = (data) => {
  const result = {};
  data.forEach((item, index) => {
    const className = classMap[item.className]?.name || 'N/A';
    const section = classMap[item.className]?.section || 'N/A';
    const day = item.weekDay || 'N/A';
    const time = `${item.startTime} - ${item.endTime}`;
    const color = colors[index % colors.length]; // Assign a color from the list
    

    if (!result[day]) result[day] = [];

    result[day].push({
      time,
      subject: subjectMap[item.subject[0]] || 'N/A',
     teacher: userMap[item.userId]?.firstName + " " + userMap[item.userId]?.lastName ,
      color,
    });
  });
  return result;
};


  const timetable = transformData(timetableData);

  return (
<div className="flex flex-nowrap justify-evenly gap-4 bg-white pb-10 pt-4 rounded-lg">
  {daysOfWeek.map((day) => (
    <div key={day}>
      <h3 className="text-base font-semibold text-[#202C4B] mb-4">{day}</h3>
      <div className="space-y-4">
        {timetable[day] ? (
          timetable[day].map((slot, index) => (
            <div key={index} className={`${slot.color} text-gray-900 p-4 rounded-lg shadow-lg space-y-2`}>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-semibold">
                  <i className="far fa-clock"></i> {slot.time}
                </span>
              </div>
              <p className="font-medium">Subject: {slot.subject}</p>
              <div className="flex items-center space-x-3">
                <p className="font-medium">{slot.teacher}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No classes</p>
        )}
      </div>
    </div>
          ))}
    </div>
  );
};

export default TimetableGrid;





