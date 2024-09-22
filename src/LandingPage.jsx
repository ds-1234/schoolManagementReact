import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from './Reusable_components/Layout';
import loginImg from './assets/Login.png';
import { CutEyeIcon } from './assets/Icons/CutEyeIcon';
import { EyeIcon } from './assets/Icons/EyeIcon';
import { useForm } from 'react-hook-form';
import { Input } from '@nextui-org/react';
import Button from './Reusable_components/Button';
import axios from 'axios';
import { toast } from 'react-toastify';

function LandingPage() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = (data) => {
    const formData = getValues();
    console.log(formData);
    console.log(data, 'data');

    axios({
      method: 'post',
      url: `http://localhost:8080/user/login`,
      data: {
        userName: data.userId,
        password: data.password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log('role:', res.data.data.role.name);
        let role = res.data.data.role;
        sessionStorage.setItem('username', res.data.data.userId);
        sessionStorage.setItem('role', res.data.data.role.name);
        toast.success('Successfully Logged In');

        switch (role.name) {
          case 'Student':
            navigate('/studentDashboard', { state: data });
            break;
          case 'Teacher':
            navigate('/teacherDashboard', { state: data });
            break;
          case 'Parent':
            navigate('/parentsDashboard', { state: data });
            break;
          case 'Admin':
            navigate('/admin', { state: data });
            break;
          case 'Guest':
            navigate('/admin', { state: data });
            break;
          default:
            console.log('Unknown user type');
        }
      })
      .catch((err) => {
        console.log(err, 'error:');
        toast.error('Runtime error');
      });
  };

  const handleClick = () => {
      navigate('/registration')
  }

  return (
    <Layout>
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="bg-white rounded-lg shadow-2xl flex overflow-hidden w-full max-w-5xl ">
          {/* Image Section */}
          <div className="w-1/2 hidden md:block">
            <img src={loginImg} alt="Login" className="h-full object-cover" />
          </div>

          {/* Login form */}
          <div className="w-full md:w-1/2 p-10 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">Welcome Back</h1>
            <p className="text-sm text-gray-500 mb-8">Please login to your account</p>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              {/* Email Input */}
              <div className="mb-6">
                <label htmlFor="userId" className="block text-gray-600 font-medium mb-2">
                  User ID
                </label>
                <Input
                  type="text"
                  id="userId"
                  {...register('userId', { required: 'UserId is required' })}
                  className={`w-full border-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.userId ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.userId && <p className="text-red-500 text-sm mt-1">{errors.userId.message}</p>}
              </div>

              {/* Password Input */}
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-600 font-medium mb-2">
                  Password
                </label>
                <Input
                  id="password"
                  {...register('password', { required: 'Password is required' })}
                  className={`w-full border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? <CutEyeIcon /> : <EyeIcon />}
                    </button>
                  }
                  type={isVisible ? 'text' : 'password'}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              </div>

              <div className="w-full">
                <Button label="Login" type="submit" className="w-full" />
              </div>
            </form>

            <p className="text-sm text-gray-500 mt-4">
              Don't have an account? <Button type= '' label="Create Account" className="bg-green-500  hover:bg-green-600 " onClick={handleClick}/>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LandingPage;
