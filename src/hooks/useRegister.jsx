import { useState } from 'react';
import axios from 'axios';

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerUser = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8080/user/createUser', userData , {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setLoading(false);
      return response.data;
    } catch (error ) {
      setError(error.response.data.message || 'Something went wrong');
      setLoading(false);
    }
  };

  return { registerUser, loading, error };
};

export default useRegister;