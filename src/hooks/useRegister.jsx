import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../conf/conf';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate() 

  

  const registerUser =  (userData) => {
    setLoading(true);
    setError(null);
  
    axios({
      method:"post",
      url : `${BASE_URL}/user/createUser`,
      data: userData,
      headers: {
        "Content-Type": "application/json",
      },
      //  withCredentials: true,
  
    }).then((res)=>{
      console.log(res.data.data.userId,'userid')
      let data = res.data.data;

      // Show popup with userId
        // toast.success(`Registered User Successfully ! User ID: ${data.userId}`);


          // navigate to DashBoard
          // navigate('/dashboard' , {state: data}) ;

          // navigate to successCard
          navigate('/SuccessCard' , {state : {userId : data.userId}})
  
    }).catch(err=>{
       console.log(err,'error:')
    })
  };

  return { registerUser, loading, error };
};

export default useRegister;