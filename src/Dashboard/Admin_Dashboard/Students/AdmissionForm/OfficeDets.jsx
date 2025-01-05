import React, {useEffect, useState} from 'react'
import DatePicker from '../../../../Reusable_components/DatePicker'
import { useForm } from 'react-hook-form';
import Button from '../../../../Reusable_components/Button';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../../hooks/UserContext';
import axios from 'axios';
import BASE_URL from '../../../../conf/conf';
import ProgressIndicator from './ProgressIndicator';
import { useStepContext } from '../../../../hooks/StepContext';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft , faAngleDown} from '@fortawesome/free-solid-svg-icons';
import Loader from '../../../../Reusable_components/Loader';

function OfficeDets() {
  const { currentStep, handleNextStep , handlePrevStep } = useStepContext();
  const {userId} = useUserContext()
  const [selectedStds , setSelectedStds] = useState([]) ;
  const [stds , setStds] = useState([]);
  const [dropdown , setDropdown] = useState(false)
  const [userData , setUserData] = useState({}) 
  const [loading, setLoading] = useState(false);
  

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();

      const navigate = useNavigate();

      useEffect(() => {
        // Fetch the existing student details if available
        const fetchStudentDetails = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/user/getStudentDetails/${userId}`);
                const studentData = response.data.data;
                setUserData(studentData) ;

                if (studentData) {
                    // If data exists, populate the form
                    const formattedData = {
                      ...studentData ,
                      admissionDate : studentData.admissionDate ? new Date(studentData.admissionDate).toLocaleString().split(',')[0] : ''
                    }
                    reset(formattedData);
                }
            } catch (error) {
                console.error('Error fetching student details:', error);
            }
        };

          if(userId){
            fetchStudentDetails();
          }
    }, [reset , userId]);

    useEffect(() => {
      const fetchStds = async() =>{
        await axios({
          method:"GET" , 
          url: `${BASE_URL}/user/getUserList` , 
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setStds(res.data.data.filter((std) => (std.role === 3 && std.isActive === true && std.siblings == null))) ;
        })
        .catch(err => {
          console.log(err , 'error:');
        })
      }
     fetchStds()
    } , []);

      const onSubmit = async(data) => {
        setLoading(true);
          await axios({
              method:"POST",
              url : `${BASE_URL}/user/updateOfficeDetails`,
              data: {
                ...userData ,
                admissionNumber : data.admissionNumber ,
                admissionDate: data.admissionDate ? new Date(data.admissionDate).toISOString().split("T")[0] : null,
                siblings: selectedStds? selectedStds : null ,
                userId : userId ,
                knownAllergies: userData.knownAllergies?  data.knownAllergies : [data.knownAllergies] ,
                medications: userData.medications? data.medications : [data.medications] 
              } ,
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
          }).finally(() => {
            setLoading(false); // Stop loader
          });
    }

    const handleCheckboxChange = (stdId) => {
      setSelectedStds((prevSelected) => {
        if (prevSelected.includes(stdId)) {
          return prevSelected.filter(id => id !== stdId);
        } else {
          return [...prevSelected, stdId];
        }
      });
    };

  return (
    <div>
              <Loader isLoading={loading} /> {/* Use Reusable Loader */}
      <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Admission Form</h1>
      <p className=' mt-2'>
        <NavLink to = '/admin'> Dashboard </NavLink>/
        <NavLink to = '/admin/students'> Students </NavLink>/
        <span className='text-[#ffae01] font-semibold'>Admission form</span> </p>
       <ProgressIndicator currentStep={currentStep} />
    <div className='bg-white mt-10 p-5 rounded-xl'>
    <h2 className="col-span-4 mt-8 text-xl font-semibold text-black">Office Details</h2>
    <form className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-5 gap-6">
        <div className="flex flex-col px-1">
            <DatePicker 
            name={'admissionDate'}
            label={"Admission Date"}
            register={register}
            className={`py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none`}
            {...register('admissionDate')}
            />
        </div>

        <div className="flex flex-col px-1">
            <label htmlFor="admissionNumber">Admission Number <span className='text-red-700 font-bold'>*</span></label>
            <input
            type="text"
            id="admissionNumber"
            placeholder=""
            className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
            {...register('admissionNumber')}
            />
        </div>

        <div className="relative">
          <label htmlFor="student" className="block font-semibold">Sibling Mapping</label>
          <div 
            className="border rounded-lg cursor-pointer p-2 flex justify-between items-center "
            onClick={() => setDropdown(!dropdown)}
          >
            <p>{selectedStds.length === 0 ? 'Select Siblings' : selectedStds.map(id => stds.find(std => std.id === id)?.firstName).join(', ')}</p>
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
          {dropdown && (
            <div className="absolute bg-white border rounded-lg mt-1 flex flex-col w-full">
              {stds.map(std => (
                <label key={std.id} className="px-4 py-2 hover:bg-gray-100 flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedStds.includes(std.id)}
                    onChange={() => handleCheckboxChange(std.id)}
                    className="mr-2"
                  />
                  {std.firstName} {std.lastName}
                </label>
              ))}
            </div>
          )}
          </div>

          <div className="flex flex-col px-1">
            <label htmlFor="knownAllergies">Allergies</label>
            <input
            type="text"
            id="knownAllergies"
            placeholder=""
            className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
            {...register('knownAllergies')}
            />
        </div>

        <div className="flex flex-col px-1">
            <label htmlFor="medications">Medications</label>
            <input
            type="text"
            id="medications"
            placeholder=""
            className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
            {...register('medications')}
            />
        </div>
    </form>
    <div className='flex justify-between items-center xl:mt-5 mt-10'>
    <button onClick={() => handlePrevStep()}>
            <h1 className=' font-semibold text-medium cursor-pointer'>
                <FontAwesomeIcon icon={faAngleDoubleLeft} className='mr-1'/>
                Back
            </h1>
      </button>
        <div className="col-span-2 flex justify-end space-x-4 ">
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

export default OfficeDets