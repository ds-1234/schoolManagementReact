import React , {useEffect} from 'react';
// import SelectDropdown from '../../../../Reusable_components/SelectDropdown';
// import languageOptions from '../../../../Reusable_components/Languages.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleDoubleLeft} from '@fortawesome/free-solid-svg-icons';
import Button from '../../../../Reusable_components/Button';
import axios from 'axios';
import BASE_URL from '../../../../conf/conf';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ExtraDets({ handlePrevious , handleNext , userId , currentStep , selectedRole}) {

  const {
    register,
    control ,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    axios({
      method: "post",
      url: `${BASE_URL}/teacherInfo/createTeacherInfo`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { 
        ...data,
        teacherId : userId,
        // languages: data.languages.map(lang => lang.value)
      }
    })
    .then((response) => {
      toast.success("User Updated Successfully !")
      handleNext()
    })
    .catch((error) => {
        console.error("Error updating user:", error);
      });
  }

  useEffect(() => {
    // Fetch the existing teacher details if available
    const fetchDetails = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/teacherInfo/getTeacherInfo/${userId}`);
            const data = response.data.data;

            if (data) {
                // If data exists, populate the form
                reset(data);
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

      fetchDetails();
}, [reset , userId]);

  const navigate = useNavigate()

  return (
    <div>
         <div className="flex flex-col px-1 mt-2 mb-5">
            <label htmlFor="maritalStatus" className='text-gray-900 font-semibold text-xl'>Marital Status</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="maritalStatus"
                  value="Unmarried"
                  className="mr-2"
                  {...register('maritalStatus', { required: 'Marital Status is required' })}
                />
                Unmarried
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="maritalStatus"
                  value="Married"
                  className="mr-2"
                  {...register('maritalStatus', { required: 'Marital Status is required' })}
                />
                Married
              </label>
            </div>
            {errors.maritalStatus && <span className="text-red-500 text-sm">{errors.maritalStatus.message}</span>}
          </div>

       
        {/* <div className="flex flex-col px-1 mt-2 mb-5">
          <label htmlFor="languages" className='text-gray-900 font-semibold text-xl'>Languages</label>
          <SelectDropdown
            name="languagesKnown"
            control={control}
            options={languageOptions} 
            isMulti={true}         
            placeholder="Select languages..."
            {...register('languages' , {required : true })}
          />
          {errors.languages && <span className="text-red-500 text-sm">{errors.languages.message}</span>}
        </div> */}

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
            <Button 
            onClick={() => { 
                navigate('/admin/pendingUser')
            }} 
            label="Cancel"
            className='px-6 bg-[#ffae01] hover:bg-[#042954]'/>
        </div>
      </div>
    </div>
  );
}

export default ExtraDets;
