import React , {useState , useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashCan , faAngleDoubleLeft} from '@fortawesome/free-solid-svg-icons';
import Button from '../../../../Reusable_components/Button';
import DatePicker from '../../../../Reusable_components/DatePicker';
import BASE_URL from '../../../../conf/conf';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useForm , useFieldArray} from 'react-hook-form';
import {differenceInMonths , differenceInYears} from 'date-fns'

function Qualifications({handlePrevious , handleNext , userId , currentStep , selectedRole}) {

  const {
    register,
    control ,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      qualifications: [{ course: "", institute: "", passoutYear: "" }],
      workExperiences: [{ institute: "", designation: "", joining: "" , relieving: ""  }],
    },
  });

  const {
    fields: qualificationFields,
    append: appendQualification,
    remove: removeQualification,
  } = useFieldArray({
    control,
    name: 'qualifications',
  });

  const {
    fields: workExperienceFields,
    append: appendWorkExperience,
    remove: removeWorkExperience,
  } = useFieldArray({
    control,
    name: 'workExperiences',
  });

    const [joiningDate, setJoiningDate] = useState(null);
    const [relievingDate, setRelievingDate] = useState(null);
    const [totalExp, setTotalExp] = useState('');
  
    const calculateExperience = (joinDate, relieveDate) => {
      console.log('clicked');
      if (joinDate && relieveDate) {
        const years = differenceInYears(new Date(relieveDate), new Date(joinDate));
        const months = differenceInMonths(new Date(relieveDate), new Date(joinDate)) % 12;
        const newExperience = `${years} years ${months} months`;
        console.log(newExperience);
        
        setTotalExp(newExperience);
      } else {
        setTotalExp('');
      }
    };

    const onSubmit = (data) => {
      const formattedData = {
        qualificationList: data.qualifications.map((qualification) => ({
          teacherId: userId,
          course: qualification.course,
          institute: qualification.institute,
          passoutYear: qualification.passoutYear,
        })),
        workExperience: data.workExperiences.map((experience) => ({
          teacherId: userId,
          fromYear: experience.joining,
          toYear: experience.relieving,
          insitutue: experience.institute,
          designation: experience.designation,
        })),
      };
  
      console.log("Data to send:", formattedData);

      axios({
        method: "post",
        url: `${BASE_URL}/teacherInfo/createTeacherInfo`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { 
          teacherId : userId,
          ...formattedData
        }
      })
      .then((response) => {
        toast.success("User Updated Successfully !")
        handleNext()
      })
      .catch((error) => {
          console.error("Error updating user:", error);
        });
    };

    useEffect(() => {
      // Fetch the existing teacher details if available
      const fetchDetails = async () => {
          try {
              const response = await axios.get(`${BASE_URL}/teacherInfo/getTeacherInfo/${userId}`);
              const data = response.data.data;
  
              if (data) {
                // Mapping the fetched data to match the form structure
                const formattedData = {
                  qualifications: data.qualificationList || [{ course: "", institute: "", passoutYear: "" }],
                  workExperiences: data.workExperience ? data.workExperience.map(exp => ({
                    institute: exp.insitutue || "", 
                    designation: exp.designation || "",  
                    joining: exp.fromYear || "",  
                    relieving: exp.toYear || "",  
                  })) : [{ institute: "", designation: "", joining: "", relieving: "" }]
                };
        
                // Reset the form with fetched data
                reset(formattedData);
              }
          } catch (error) {
              console.error('Error fetching user details:', error);
          }
      };
  
        fetchDetails();
  }, [reset , userId]);

  return (
    <div>
    {/* Qualifications Section */}
    <div className="space-y-2 mb-7 ">
      <h3 className=" font-semibold text-gray-900 text-xl">Qualifications</h3>
      {qualificationFields.map((item, index) => (
        <div key={item.id} className="grid grid-cols-5 gap-2">
          <div className='flex flex-col gap-1'>
            <label htmlFor={`qualifications[${index}].course`}>Degree</label>
            <input
              type="text"
              {...register(`qualifications[${index}].course`, { required: true })}
              className="border p-2 rounded-lg"
              placeholder="Enter Degree"
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor={`qualifications[${index}].institute`}>Institution</label>
            <input
              type="text"
              {...register(`qualifications[${index}].institute`, { required: true })}
              className="border p-2 rounded-lg"
              placeholder="Enter Institution"
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor={`qualifications[${index}].passoutYear`}>Year of Passing</label>
            <input
              type="text"
              {...register(`qualifications[${index}].passoutYear`, { required: true })}
              className="border p-2 rounded-lg"
              placeholder="Enter Year"
            />
          </div>

          <div className="flex flex-col gap-1">
          <label htmlFor="file">Upload Marksheets/Degree</label>
          <input
            type="file"
            id="file"
            className={`p-1 rounded-lg border  ${errors.pan ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
            {...register('file')}
          />
          </div>

        <div className='flex items-center justify-center mt-7'>
        <Button onClick={() => removeQualification(index)} 
        label={<FontAwesomeIcon icon={faTrashCan} />} 
        className="bg-red-500 text-white hover:bg-white hover:text-red-700 h-10 w-20" />
        </div>
      </div>
      ))}
        <button type="button" className="text-blue-500 hover:text-blue-700 transition-colors duration-150" 
        onClick={() => appendQualification({ course: "", institute: "", passoutYear: "" })}>
            + Add New
        </button>
    </div>

    {/* Work Experience Section */}
      <div className="space-y-2 mb-7">
      <h3 className=" font-semibold text-gray-900 text-xl">Work Experience</h3>
      {workExperienceFields.map((item, index) => (
        <div key={item.id} className="grid grid-cols-4 gap-5">
          <div className='flex flex-col gap-1'>
            <label htmlFor={`workExperiences[${index}].institute`}>School/Institute Name</label>
            <input
              type="text"
              {...register(`workExperiences[${index}].institute`, { required: true })}
              className="border p-2 rounded-lg"
              placeholder="Enter Name"
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor={`workExperiences[${index}].designation`}>Designation</label>
            <input
              type="text"
              {...register(`workExperiences[${index}].designation`, { required: true })}
              className="border p-2 rounded-lg"
              placeholder="Enter Designation"
            />
          </div>
          <div className='flex flex-col gap-1'>
            <DatePicker 
            name={`workExperiences[${index}].joining`}
            label={'Joining'} 
            register={register}
            className={"border p-2 rounded-lg mt-1"}
            onChange={(date) => {
              setJoiningDate(date);
              calculateExperience(date, relievingDate);
            }}
            />
          </div>

          <div className='flex flex-col'>
            <DatePicker 
            name={`workExperiences[${index}].relieving`}
            label={'Relieving'} 
            register={register}
            className={"border p-2 rounded-lg mt-1"}
            onChange={(date) => {
              setRelievingDate(date);
              calculateExperience(joiningDate , date);
            }}
            />
          </div>

        <div className="flex flex-col  gap-1">
        <label htmlFor="">Upload Experience Letter</label>
        <input
          type="file"
          id="file"
          className={`py-2 px-2 rounded-lg border  ${errors.pan ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
          {...register('file')}
        />
        </div>

          <div className='flex items-center justify-center mt-7'>
            <Button onClick={() => removeWorkExperience(index)}
            label={<FontAwesomeIcon icon={faTrashCan} />} 
            className="bg-red-500 text-white hover:bg-white hover:text-red-700 h-10 w-20" />
          </div>

        <div className='flex gap-1'>
          <label className='text-gray-900'>Total Experience: </label>
          <p> {totalExp} </p>
        </div>
        </div>        
      ))}

       <button type="button" className="text-blue-500 hover:text-blue-700 transition-colors duration-150" 
        onClick={() => appendWorkExperience({ institute: "", designation: "", joining: "" , relieving:"" })}>
            + Add New
        </button>

    </div>

    <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="disabled:text-white text-gray-600"
        >
          <FontAwesomeIcon icon={faAngleDoubleLeft} className='mr-1'/>
          Back
        </button>

        <div className="col-span-2 flex justify-end space-x-4 mt-5">
        <button
          onClick={handleSubmit(onSubmit)}
          hidden={selectedRole != 4}
          className="hover:bg-[#ffae01] bg-[#042954] text-white px-4 py-2 rounded-lg"
        >
          Save & Continue 
        </button>
            <Button onClick={() => { 
                navigate('/admin/pendingUser')
            }} 
            label="Cancel" className='px-6 bg-[#ffae01] hover:bg-[#042954]'/>
        </div>
      </div>

      <ToastContainer/>
    </div>
  );
}

export default Qualifications;
