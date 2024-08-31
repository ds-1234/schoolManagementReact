import React from 'react';
import { useNavigate , useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Layout from './Reusable_components/Layout';
import Button from './Reusable_components/Button';

function SuccessCard() {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;

  const handleCopyUserId = () => {
    navigator.clipboard.writeText(userId);
    toast.success('User ID copied to clipboard!');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <Layout>
    
    <div className="flex flex-col justify-center items-center px-10 py-5 mt-20">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full sm:w-1/2">
        <h2 className="text-2xl font-semibold text-center text-[#042954]">Registration Successful!</h2>
        <p className="text-lg text-center mt-2">Your User ID has been generated.</p>

        <div className="bg-gray-100 p-4 rounded-lg mt-4 flex justify-between items-center">
          <span className="font-mono text-sm sm:text-lg">{userId}</span>
          <button
            onClick={handleCopyUserId}
            className="text-blue-600 hover:text-blue-800 text-sm sm:text-base"
          >
            Copy User ID
          </button>
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            onClick={handleLoginClick}
            label={"Go to Login"}
          />
        </div>
      </div>
      <ToastContainer />
    </div>

    </Layout>
  );
}

export default SuccessCard;
