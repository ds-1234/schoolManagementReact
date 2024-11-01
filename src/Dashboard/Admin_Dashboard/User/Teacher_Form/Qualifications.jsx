import React , {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashCan , faAngleDoubleLeft} from '@fortawesome/free-solid-svg-icons';
import Button from '../../../../Reusable_components/Button';
import DatePicker from '../../../../Reusable_components/DatePicker';
import BASE_URL from '../../../../conf/conf';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useForm } from 'react-hook-form';

function Qualifications({handlePrevious , handleNext , userId , currentStep , selectedRole}) {

  const {
    register,
    control ,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      qualifications: [{ degree: "", institution: "", yearOfPassing: "" }],
      workExperiences: [{ companyName: "", designation: "", joining: "" , relieving: ""  }],
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
      if (joinDate && relieveDate) {
        const startDate = new Date(joinDate);    // Ensure proper Date object
        const endDate = new Date(relieveDate);
  
        if (!isNaN(startDate) && !isNaN(endDate)) {  // Validate dates
          const diffInYears = endDate.getFullYear() - startDate.getFullYear();
          setTotalExp(diffInYears);
        } else {
          setTotalExp('');  // Clear if invalid dates
        }
      } else {
        setTotalExp('');  // Clear if dates are missing
      }
    };

    const onSubmit = (data) => {
      const formattedData = {
        qualificationList: data.qualifications.map((qualification) => ({
          teacherId: userId,
          course: qualification.degree,
          institute: qualification.institution,
          passoutYear: qualification.yearOfPassing,
        })),
        workExperience: data.workExperiences.map((experience) => ({
          teacherId: userId,
          fromYear: experience.joining,
          toYear: experience.relieving,
          institute: experience.companyName,
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
  return (
    <div>
    <div className="space-y-2 mb-7 ">
      <h3 className=" font-semibold text-gray-900 text-xl">Qualifications</h3>
      {qualificationFields.map((item, index) => (
        <div key={item.id} className="grid grid-cols-5 gap-2">
          <div className='flex flex-col gap-1'>
            <label htmlFor={`qualifications[${index}].degree`}>Degree</label>
            <input
              type="text"
              {...register(`qualifications[${index}].degree`, { required: true })}
              className="border p-2 rounded-lg"
              placeholder="Enter Degree"
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor={`qualifications[${index}].institution`}>Institution</label>
            <input
              type="text"
              {...register(`qualifications[${index}].institution`, { required: true })}
              className="border p-2 rounded-lg"
              placeholder="Enter Institution"
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor={`qualifications[${index}].yearOfPassing`}>Year of Passing</label>
            <input
              type="text"
              {...register(`qualifications[${index}].yearOfPassing`, { required: true })}
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
        onClick={() => appendQualification({ degree: "", institution: "", yearOfPassing: "" })}>
            + Add New
        </button>
    </div>

          {/* Work Experience Section */}
      <div className="space-y-2 mb-7">
      <h3 className=" font-semibold text-gray-900 text-xl">Work Experience</h3>
      {workExperienceFields.map((item, index) => (
        <div key={item.id} className="grid grid-cols-4 gap-5">
          <div className='flex flex-col gap-1'>
            <label htmlFor={`workExperiences[${index}].companyName`}>School/Institute Name</label>
            <input
              type="text"
              {...register(`workExperiences[${index}].companyName`, { required: true })}
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
        </div>
      ))}
       <button type="button" className="text-blue-500 hover:text-blue-700 transition-colors duration-150" 
        onClick={() => appendWorkExperience({ companyName: "", designation: "", duration: "" })}>
            + Add New
        </button>

        <div className='flex gap-1'>
      <label className='text-gray-900'>Total Experience: </label>
      <p> {totalExp ? `${totalExp} years` : ''} </p>
    </div>
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
    </div>
  );
}

export default Qualifications;
