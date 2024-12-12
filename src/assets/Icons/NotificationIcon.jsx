import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const NotificationIcon = ({ notificationCount}) => {
  return (
    <div className="relative inline-block">
      {/* Bell Icon */}
      <FontAwesomeIcon icon={faBell} className="text-gray-700 text-2xl" />
      
      {/* Notification Badge */}
      {notificationCount > 0 && (
        <span className="absolute bottom-3 left-3 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-md">
          {notificationCount}
        </span>
      )}
    </div>
  );
};

export default NotificationIcon;
