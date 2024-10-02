import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#f0f1f3] text-[#646464]">
      {/* You can add a common header, sidebar, etc., here if needed */}
      {children}
    </div>
  );
};

export default Layout;
