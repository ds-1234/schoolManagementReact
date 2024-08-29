import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate() 

  

  const registerUser =  (userData) => {
    setLoading(true);
    setError(null);
    

    // try {
    //   const response = await axios.post('http://localhost:8080/user/createUser', userData , {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });
    //   setLoading(false);
    //   return response.data;
    // } catch (error ) {
    //   setError(error.response.data.message || 'Something went wrong');
    //   setLoading(false);
    // }
    axios({
      method:"post",
      url : `http://localhost:8080/user/createUser`,
      data: userData,
      headers: {
        "Content-Type": "application/json",
      },
      //  withCredentials: true,
  
    }).then((res)=>{
      console.log(res.data.data.userId,'userid')
      let data = res.data.data;
          // navigate to DashBoard
          navigate('/dashboard' , {state: data}) ;
  
    }).catch(err=>{
       console.log(err,'error:')
    })
  };

  return { registerUser, loading, error };
};

export default useRegister;