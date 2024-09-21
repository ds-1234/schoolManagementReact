import React, { useState } from "react";
import girl from "./assets/girl.jpg";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Button, Divider, Input } from "@nextui-org/react";
import { CutEyeIcon } from "./assets/Icons/CutEyeIcon";
import { EyeIcon } from "./assets/Icons/EyeIcon";
import bg from "./assets/LoginBack.png";
import axios from "axios";
import { ToastContainer , toast } from "react-toastify";

function Login() {
 
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const navigate = useNavigate() 

  

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const Submitdata = (data) => {

    const formData = getValues();
    console.log(formData)
    console.log(data,"data")


    
  axios({
    method:"post",
    url : `http://localhost:8080/user/login`,
    data: {
      userName : data.userId,
      password : data.password
    },
    headers: {
      "Content-Type": "application/json",
    },
    //  withCredentials: true,

  }).then((res)=>{
    // console.log('role:' , res.data.data.role)
    // let role = res.data.data.role
    toast.success("Successfull Login");
  
    // switch (role) {
    //   case 'Student':
    //     navigate('/studentDashboard' , {state: data}) ;
    //     break;
    //   case 'Teacher':
    //     navigate('/teacherDashboard' , {state: data}) ;
    //     break;
    //   case 'Parent':
    //     navigate('/parentsDashboard' , {state: data}) ;
    //     break;
    //   case 'Admin':
    //     navigate('/admin' , {state: data}) ;
    //     break;
    //   case 'Guest':
    //     navigate('/admin' , {state: data}) ;
    //     break;
    //   default:
    //     console.log('Unknown user type');
    // }

    navigate('/admin' , {state: data})

  }).catch(err=>{
     console.log(err,'error:')
     toast.error("Runtime error");

  })
    
    // navigate to DashBoard
    // navigate('/dashboard' , {state: data}) ;
  };
  

  return (
    <section
      style={{
        backgroundImage: `url(${bg})`,


        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'

      }}
      className="min-h-screen flex p-0 m-0"
    >
      <div className="flex flex-col justify-center items-center gap-12 lg:w-7/12 w-full">
        <div className="self-center flex flex-col gap-4">
          <h1 className="sm:text-[3em] text-[1.2em] font-bold">
            <span className="bg-blue-400 rounded-md">Connecting</span> Scholars
          </h1>
          <div className="flex gap-4 items-center">
            <p className="sm:text-[1.2em] text-[1em] font-semibold">
              Already have an account
            </p>
            <Divider orientation="vertical" className="h-6 bg-black" />
            <p className="sm:text-[1.2em] text-[1em] font-semibold">
              Create account?{" "}
              <Link
                to="/registration"
                className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
              >
                Signup
              </Link>
            </p>
          </div>
        </div>
        <form
        onSubmit={handleSubmit(Submitdata)}
          className="flex flex-col gap-4 w-2/3"
        >
          <div className="flex gap-4">
            

            <Input
              {...register("userId", {
                required: 'userId is required',
                pattern: {
                  message: 'please enter a valid userId',
                }
              })}
              type="userId"
              label="User ID"
              labelPlacement="outside"
              placeholder="Enter a userId"
              classNames={{ label: "font-bold" }}
              radius="full"
              errorMessage={errors.userId && "Please enter a userId"}
            />
                          {errors.userId && <span className="text-red-500 text-sm">{errors.userId.message}</span>}

          </div>

          

          

          <div className="flex gap-4">
            <Input
              {...register("password", {
                required: 'password is required',
              })}
              label="Password"
              labelPlacement="outside"
              radius="full"
              classNames={{ label: "font-bold" }}
              placeholder="Enter your passwrod"
              errorMessage={errors.password && "Please enter your password"}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? <CutEyeIcon /> : <EyeIcon />}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />
                                      {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}



          </div>

          <Button
            type="submit"
            radius="full"
            variant="shadow"
            color="primary"
            className="self-center mt-4"
          >
            Login
          </Button>

        </form>
      </div>
      <div className="lg:flex hidden flex-col justify-center gap-20 items-center w-1/3">
        <div className="w-7/12 aspect-square rotate-45 bg-white rounded-[2em] overflow-hidden shadow-2xl">
          <img className="-rotate-45 scale-100 mb-2 ml-20" src={girl} alt="" />
        </div>
        <h1 className="sm:text-[2.5em] text-[1em] font-bold">
          <span className="bg-blue-400 rounded-md">Empowering</span> Careers
        </h1>
      </div>
      <ToastContainer/>
    </section>

  );
}

export default Login;


