import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import BASE_URL from '../conf/conf';

function Labels() {
  const [attendanceStatuses, setAttendanceStatuses] = useState([]);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: `${BASE_URL}/attendance/getStaffAttendanceStatus`,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const statuses = response.data.data.map((item) => ({
          status: item.attendanceStatus,
          colorCode: item.colorCode , 
        }));
        setAttendanceStatuses(statuses);
      } catch (error) {
        console.error('Error fetching attendance status data:', error);
      }
    };

    fetchStatus();
  }, []);

  const getLabelCode = (status) => {
    const statusLabelMap = {
      Present: 'P',
      Absent: 'A',
      'Half Day': 'HD',
      Medical: 'M',
    };
    return statusLabelMap[status] || '?'; 
  };

  return (
    <div className="flex items-center justify-around bg-white p-2 rounded-xl xl:w-1/3 sm:w-3/5 sm:absolute sm:right-5 sm:top-40 flex-wrap sm:flex-nowrap">
      {attendanceStatuses.map(({ status, colorCode }) => (
        <div key={status} className="flex items-center">
          <span style={{ color: colorCode }} className={`font-bold`}>{getLabelCode(status)}</span>
          <span className="ml-2">- {status}</span>
        </div>
      ))}
    </div>
  );
}

export default Labels;
