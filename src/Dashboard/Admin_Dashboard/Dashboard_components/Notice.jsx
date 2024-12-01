import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../../conf/conf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../Reusable_components/Button";
import { useNavigate } from "react-router-dom";

function Notice() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/notice/getNoticeList`);
        const sortedNotices = response.data.data.sort(
          (a, b) => new Date(a.noticeDate) - new Date(b.noticeDate) // Sort by newest date
        );
        setNotices(sortedNotices.slice(0, 2));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notices:", error);
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className="p-4 pb-8 bg-white rounded-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-bold text-blue-950 ">📌 Notices</h1>
        <Button label="View More" onClick={() => navigate('/admin/notice')}/>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading notices...</p>
      ) : (
        <ul className="space-y-6">
          {notices.map((notice, index) => (
            <li
              key={index}
              className="flex items-start bg-gray-50 rounded-lg shadow-lg p-5 hover:shadow-xl transition-shadow duration-200 gap-5"
            >
              {/* Icon */}
              <div className="flex-shrink-0 bg-blue-100 rounded-full p-4">
                <FontAwesomeIcon icon={faFileAlt} className="text-blue-500 text-xl" />
              </div>

              {/* Notice Content */}
              <div className="flex flex-col ">
                <h3 className="text-medium font-bold text-gray-800">{notice.noticeTitle}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Holiday on: {new Date(notice.noticeDate).toLocaleDateString()}
                </p>
                <p className="text-gray-700 mt-2 text-sm line-clamp-2 ">
                  {notice.noticeDetails || "No additional description available."}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notice;
