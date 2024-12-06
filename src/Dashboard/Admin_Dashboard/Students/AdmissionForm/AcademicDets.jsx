import React, { useEffect , useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Button from '../../../../Reusable_components/Button';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../../hooks/UserContext';
import BASE_URL from '../../../../conf/conf';
import ProgressIndicator from './ProgressIndicator';
import { useStepContext } from '../../../../hooks/StepContext';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';

function AcademicDets() {
    const {userId} = useUserContext() 
    const { currentStep, handleNextStep , handlePrevStep } = useStepContext();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();

    const [classes , setClasses] = useState([]) ;
    const [schools , setSchools] = useState([]) ;
    const [initialData ,setInitialData] = useState({});
    const [selectedSchl , setSelectedSchl] = useState('') ;
    const [selectedCls , setSelectedCls] = useState('') ;
    const navigate = useNavigate()

    const fetchClassOptions = () => {
        axios({
          method: "GET",
          url: `${BASE_URL}/class/getClassList`,
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
          url: `${BASE_URL}/school/getSchoolList`,
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
      } , [userId])

      useEffect(() => {
        // Fetch the existing student details if available
        const fetchStudentDetails = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/user/getStudentDetails/${userId}`);
                const studentData = response.data.data;

                if (studentData) {
                    // If data exists, populate the form
                    console.log(studentData);
                    setInitialData(studentData)
                    setSelectedCls(studentData.className[0])
                    setSelectedSchl(studentData.school) 
                    reset(studentData);
                }
            } catch (error) {
                console.error('Error fetching student details:', error);
            }
        };

          fetchStudentDetails();
    }, [reset , userId]);


      const onSubmit = async (data) => {
        console.log(data);
        console.log(data.className,'data.className')
        console.log(initialData.className,'initialData.className[0]')

        
        const userData = {
            ...data , 
            userId : userId ,
            rollNumber : parseInt(data.rollNumber) ,
            className:   initialData.className[0] === data.className? data.className : [parseInt(data.className)]
          }
          await axios({
              method:"Post",
              url : `${BASE_URL}/user/updateAcademicDetails`,
              data: userData ,
              headers: {
                "Content-Type": "application/json",
              },
          
            })
            .then((response)=>{
              // console.log('response' , response.data.data)
              handleNextStep()
              reset()
          })
          .catch(err=>{
              console.log(err,'error:')
              reset()
          })
    }
      
  return (
    <div>
      <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Admission Form</h1>
      <p className=' mt-2'>Dashboard /<NavLink to = '/admin'> Admin </NavLink>/<span className='text-[#ffae01] font-semibold'>Admission form</span> </p>
       <ProgressIndicator currentStep={currentStep} />
    <div className='bg-white mt-10 p-5 rounded-xl'>
    <h2 className="col-span-4 mt-8 text-xl font-semibold text-black">Academic Details</h2>
    <form  className="grid grid-cols-4 mt-5 gap-6">
        <div className="flex flex-col px-1">
            <label htmlFor="school">School Branch <span className='text-red-700 font-bold'>*</span></label>
            <select
            id="school"
            className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
            {...register('school')}
            value={selectedSchl}
            onChange={(e) => setSelectedSchl(e.target.value)}
            placeholder = "Select School Branch "
            >
            <option value="" hidden>Select Branch </option>
            {schools.map(option => (
            <option key={option.id} value={option.id}>{option.name}</option>
            ))}
            </select>
        </div>

        <div className="flex flex-col px-1">
            <label htmlFor="class">Class <span className='text-red-700 font-bold'>*</span></label>
            <select
            id="class"
            className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
            {...register('className')}
            value={selectedCls}
            onChange={(e) => setSelectedCls(e.target.value)}
            >
            <option value="" hidden>Select Class </option>
            {classes.map(option => (
            <option key={option.id} value={option.id}>{option.name}-{option.section}</option>
            ))}
            </select>
        </div>

        <div className="flex flex-col px-1">
            <label htmlFor="academicYear">Academic Year <span className='text-red-700 font-bold'>*</span></label>
            <input
            type="text"
            id="academicYear"
            placeholder="e.g., 2014-2015"
            className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
            {...register('academicYear' , {required: true})}
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
    </form>

    <div className='flex justify-between items-center'>
    <button onClick={() => handlePrevStep()}>
            <h1 className='mt-6 font-semibold text-medium cursor-pointer'>
                <FontAwesomeIcon icon={faAngleDoubleLeft} className='mr-1'/>
                Back
            </h1>
    </button>
        <div className="col-span-2 flex justify-end space-x-4 mt-5">
            <Button type='submit' label="Save & Continue" className='' onClick={handleSubmit(onSubmit)} />
            <Button onClick={() => {
                reset() 
                navigate('/admin/allStudents')
            }} 
            label="Cancel" className='px-8 bg-[#ffae01] hover:bg-[#042954]'/>
        </div>
    </div>
</div>
    </div>
  )
}

export default AcademicDets