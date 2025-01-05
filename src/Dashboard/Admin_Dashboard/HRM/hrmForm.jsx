import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import BASE_URL from "../../../conf/conf";
import { toast } from "react-toastify";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Button from '../../../Reusable_components/Button'
import DatePicker from '../../../Reusable_components/DatePicker'
import Loader from "../../../Reusable_components/Loader";

const HrmForm = () => {
  const [leaveTypes, setLeaveTypes] = useState([]); // Dynamic leave types
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const {state} = useLocation()
  const teacherId = state?.teacherId ;
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);

  // Fetch leave types dynamically
  useEffect(() => {
    const fetchLeaveTypes = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/leaves/getLeavesList`);
        setLeaveTypes(response.data.data || []);
      } catch (error) {
        toast.error("Error fetching leave types.");
      }
    };
    fetchLeaveTypes();
  }, []);

  // Submit Handler
  const onSubmit = async (data) => {
    setLoading(true);
    const formattedData = {
        ...data,
      teacherId: teacherId, 
      leaveCounterDto: leaveTypes.map((leave) => ({
        leaveTypes: leave.id,
        leaveCount: data[`leave_${leave.id}`] ? data[`leave_${leave.id}`] : 0, 
      })),
    };

    try {
      const response = await axios.post(`${BASE_URL}/hrm/saveHrmDetails`, formattedData);
      toast.success("Details saved successfully!");
      navigate('/admin/hrm/payroll')
    } catch (error) {
      toast.error("Error saving HRM details.");
      console.log(error);
      
    }finally {
      setLoading(false); // Stop loader
    };
  };

  return (
    <div className=' h-full mb-10'>
                <Loader isLoading={loading} /> {/* Use Reusable Loader */}
      <h1 className='text-lg md:text-2xl  pt-8 font-semibold text-black'>HRM Application</h1>
      <p className=' mt-2'>
        <NavLink to = '/admin'> Dashboard </NavLink>/ 
        <NavLink to = '/admin/hrm'> HRM </NavLink>/
        <NavLink to = '/admin/hrm/payroll'> Payroll </NavLink>/
        <span className='text-[#ffae01] font-semibold'>HRM Application</span> </p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-5 text-gray-900">
        {/* Payroll Section */}
        <div className="p-4 border rounded-md bg-white">
          <h3 className="text-xl font-semibold text-black mb-5">Payroll</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
              <label className="block font-medium">Employee No <span className="text-red-500">*</span></label>
              <input
                {...register("employeeNumber", { required: "Employee Number is required" })}
                className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.employeeNumber? 'border-red-500' : 'border-gray-300'} focus:outline-none w-full`}
              />
              {errors.employeeNumber && <p className="text-red-500">{errors.employeeNumber.message}</p>}
            </div>

            <div>
              <label className="block font-medium">EPF No <span className="text-red-500">*</span></label>
              <input
                {...register("epfNumber", { required: "EPF Number is required" })}
                className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.epfNumber ? 'border-red-500' : 'border-gray-300'} focus:outline-none w-full`}
              />
              {errors.epfNumber && <p className="text-red-500">{errors.epfNumber.message}</p>}
            </div>

            <div>
              <label className="block font-medium">Basic Salary <span className="text-red-500">*</span></label>
              <input
                type="number"
                {...register("basicSalary", { required: "Basic Salary is required" })}
                className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.basicSalary ? 'border-red-500' : 'border-gray-300'} focus:outline-none w-full`}
              />
              {errors.basicSalary && <p className="text-red-500">{errors.basicSalary.message}</p>}
            </div>

            <div>
              <label className="block font-medium">Contract Type <span className="text-red-500">*</span></label>
              <select
                {...register("contractType", { required: "Contract Type is required" })}
                className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.contractType ? 'border-red-500' : 'border-gray-300'} focus:outline-none w-full`}
              >
                <option value="">Select</option>
                <option value="Permanent">Permanent</option>
                <option value="Temporary">Temporary</option>
              </select>
              {errors.contractType && <p className="text-red-500">{errors.contractType.message}</p>}
            </div>

            <div>
              <label className="block font-medium">Work Shift <span className="text-red-500">*</span></label>
              <select
                {...register("workShift", { required: "Work Shift is required" })}
                className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.workShift ? 'border-red-500' : 'border-gray-300'} focus:outline-none w-full`}
              >
                <option value="">Select</option>
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
              </select>
              {errors.workShift && <p className="text-red-500">{errors.workShift.message}</p>}
            </div>

            <DatePicker 
            label={"Date of Joining"}
            name={"dateOfJoining"}
            register={register}
            required={true}
            labelClass={"block font-medium"}
            className={`py-1 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none w-full`}
             />

            <div>
              <label className="block font-medium">Work Location <span className="text-red-500">*</span></label>
              <input
                {...register("workLocation", { required: "Work Location is required" })}
                className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.workLocation ? 'border-red-500' : 'border-gray-300'} focus:outline-none w-full`}
              />
              {errors.workLocation && <p className="text-red-500">{errors.workLocation.message}</p>}
            </div>
          </div>
        </div>

        {/* Leaves Section */}
        <div className="p-4 border rounded-md bg-white">
          <h3 className="text-xl font-semibold mb-5 text-black">Leaves</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {leaveTypes.map((leave) => (
              <div key={leave.id}>
                <label className="block font-medium">{leave.leaveType} Leaves <span className="text-red-500">*</span></label>
                <Controller
                  name={`leave_${leave.id}`}
                  control={control}
                  defaultValue=""
                  rules={{ required: `${leave.leaveType} Leaves is required` }}
                  render={({ field }) => (
                    <input
                      type="number"
                      {...field}
                      className={`py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none w-full`}
                    />
                  )}
                />
                {errors[`leave_${leave.id}`] && (
                  <p className="text-red-500">{errors[`leave_${leave.id}`].message}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center space-x-4">
          <Button text="Submit" onClick={handleSubmit(onSubmit)} />
        </div>
      </form>
    </div>
  );
};

export default HrmForm;
