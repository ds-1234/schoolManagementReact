import React, { useEffect , useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Button from '../../../../Reusable_components/Button';
import { useNavigate } from 'react-router-dom';

function AcademicDets({ handleNextStep , currentStep }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();

    const [classes , setClasses] = useState([]) ;
    const [schools , setSchools] = useState([]) ;
    const navigate = useNavigate()

    const fetchClassOptions = () => {
        axios({
          method: "GET",
          url: `http://localhost:8080/class/getClassList`,
          headers: {
            "Content-Type": "application/json",
          },
          // withCredentials: true,
        })
          .then((response) => {
            setClasses(response.data.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      };

      const fetchSchoolOptions = () => {
        axios({
          method: "GET",
          url: `http://localhost:8080/school/getSchoolList`,
          headers: {
            "Content-Type": "application/json",
          },
          // withCredentials: true,
        })
          .then((response) => {
            setSchools(response.data.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      };

      useEffect(() => {
        fetchClassOptions() ;
        fetchSchoolOptions() ;
      } , [])

      const onSubmit = (data) => {
        console.log(data);
        if (handleNextStep) {
          handleNextStep(currentStep);
        } else {
          console.error("handleNextStep is not defined");
        }
      };
      
  return (
    <div className='bg-white mt-10 p-5 rounded-xl'>
    <h2 className="col-span-4 mt-8 text-xl font-semibold text-black">Academic Details</h2>
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-4 mt-5 gap-6">
        <div className="flex flex-col px-1">
            <label htmlFor="school">School Branch</label>
            <select
            id="school"
            className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
            {...register('school')}
            placeholder = "Select School Branch "
            >
            <option value="" hidden>Select Branch </option>
            {schools.map(option => (
            <option key={option.id} value={option.id}>{option.name}</option>
            ))}
            </select>
        </div>

        <div className="flex flex-col px-1">
            <label htmlFor="class">Class</label>
            <select
            id="class"
            className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
            {...register('class')}
            >
            <option value="" hidden>Select Class </option>
            {classes.map(option => (
            <option key={option.id} value={option.id}>{option.name}</option>
            ))}
            </select>
        </div>

        <div className="flex flex-col px-1">
            <label htmlFor="academicYear">Academic Year</label>
            <input
            type="text"
            id="academicYear"
            placeholder="e.g., 2014-2015"
            className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
            {...register('academicYear')}
            />
        </div>

        <div className="flex flex-col px-1">
            <label htmlFor="rollNumber">Roll Number</label>
            <input
            type="text"
            id="rollNumber"
            placeholder=""
            className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
            {...register('rollNumber')}
            />
        </div>
        
        <div className="col-span-2 flex justify-start space-x-4 mt-10">
          <Button type='submit' label="Save" className='px-8'/>
          <Button onClick={() => {
            reset() 
            navigate('/admin/allStudents')
          }} 
          label="Cancel" className='px-8 bg-[#ffae01] hover:bg-[#042954]'/>
      </div>
    </form>

    </div>
  )
}

export default AcademicDets