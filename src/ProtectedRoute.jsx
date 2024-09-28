import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if user is logged in by looking for username and role in session storage
  const user = sessionStorage.getItem('user') ;
  const username = sessionStorage.getItem('username');
  const role = sessionStorage.getItem('role');

  if (!username || !role) {
    // If not logged in, redirect to login page
    return <Navigate to="/" replace />;
  }

  // If logged in, render the protected component
  return children;
};

export default ProtectedRoute;
