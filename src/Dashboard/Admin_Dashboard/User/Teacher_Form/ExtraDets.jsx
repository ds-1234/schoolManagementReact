import React , {useEffect, useState} from 'react';
import SelectDropdown from '../../../../Reusable_components/SelectDropdown';
import languageOptions from '../../../../Reusable_components/Languages.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleDoubleLeft , faPlus , faTrash} from '@fortawesome/free-solid-svg-icons';
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

  const [classes , setClasses] = useState([]) ;
  const [schools , setSchools] = useState([]) ;
  const [selectedSchl , setSelectedSchl] = useState('') ;
  // const [selectedCls , setSelectedCls] = useState([]) ;
  const [subjects , setSubjects] = useState([]) ;
  const [classSubjectRows, setClassSubjectRows] = useState([{ classId: '', subjectId: '' }]);
  const [teacherData , setTeacherData] = useState(null) 

  const fetchOptions = async () => {
    try {
      const [classRes, schoolRes, subjectRes] = await Promise.all([
        axios.get(`${BASE_URL}/class/getClassList`),
        axios.get(`${BASE_URL}/school/getSchoolList`),
        axios.get(`${BASE_URL}/subject/getSubjectList`),
      ]);

      setClasses(classRes.data.data);
      setSchools(schoolRes.data.data);
      setSubjects(subjectRes.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, [userId]);

  const handleClassChange = (index, value) => {
    const updatedRows = [...classSubjectRows];
    updatedRows[index].classId = value;
    setClassSubjectRows(updatedRows);
  };

  const handleSubjectChange = (index, value) => {
    const updatedRows = [...classSubjectRows];
    updatedRows[index].subjectId = value;
    setClassSubjectRows(updatedRows);
  };

  const addRow = () => setClassSubjectRows([...classSubjectRows, { classId: '', subjectId: '' }]);

  const removeRow = (index) => {
    const updatedRows = classSubjectRows.filter((_, i) => i !== index);
    setClassSubjectRows(updatedRows);
  };

  const onSubmit = (data) => {
    axios({
      method: "post",
      url: `${BASE_URL}/teacherInfo/createTeacherInfo`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { 
        ...data,
        ...teacherData ,
        teacherId : userId,
        languages: data.languages.map(lang => lang.value).join(',')
      }
    })
    .then((response) => {
      toast.success("User Updated Successfully !")
      console.log('selectes class and subjects' , classSubjectRows) ;
      console.log('selected school' , selectedSchl);
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
            setTeacherData(data) ;

            if (data) {
                // If data exists, populate the form
                reset(data);
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

const fetchBasicDets = async() => {
      await axios({
        method: "GET",
        url: `${BASE_URL}/user/getUser/${userId}`,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          const userData = response.data.data;
          setSelectedSchl(userData.school) 
          // setSelectedCls(userData.className)
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
}

      fetchDetails();
      fetchBasicDets() ;
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

       
        <div className="flex flex-col px-1 mt-2 mb-5">
          <label htmlFor="languages" className='text-gray-900 font-semibold text-xl'>Languages</label>
          <SelectDropdown
            name="languages"
            control={control}
            options={languageOptions} 
            isMulti={true}         
            placeholder="Select languages..."
            // defaultValue={teacherData.languages?.split(",")}
            {...register('languages' , {required : "Languages are required" })}
          />
          {errors.languages && <span className="text-red-500 text-sm">{errors.languages.message}</span>}
        </div>

        <div className="flex flex-col px-2 w-1/2">
            <label htmlFor="school" className='text-gray-900 font-medium'>School Branch</label>
            <select
            id="school"
            className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
            // {...register('school')}
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

        <div className="flex flex-col gap-2 mt-5">
        {classSubjectRows.map((row, index) => (
          <div key={index} className="flex gap-4 mb-2">
            <div className='flex flex-col gap-1'>
              <label htmlFor={`class-${index}`}>Class</label>
              <select
                id={`class-${index}`}
                className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
                value={row.id}
                onChange={(e) => handleClassChange(index, e.target.value)}
              >
                <option value="" hidden>Select Class</option>
                {classes.map((option) => (
                  <option key={option.id} value={option.id}>{option.name}-{option.section}</option>
                ))}
              </select>
            </div>

            <div className='flex flex-col gap-1'>
              <label htmlFor={`subject-${index}`}>Subject</label>
              <select
                id={`subject-${index}`}
                className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
                value={row.id}
                onChange={(e) => handleSubjectChange(index, e.target.value)}
              >
                <option value="" hidden>Select Subject</option>
                {subjects.map((option) => (
                  <option key={option.id} value={option.id}>{option.subject}</option>
                ))}
              </select>
            </div>
              <button type="button" className='flex items-end mb-1' onClick={() => removeRow(index)}>
              <FontAwesomeIcon icon={faTrash} className="text-red-500" />
            </button>
          </div>
        ))}

        <button type="button" onClick={addRow} className="flex items-center gap-1 text-blue-500">
          <FontAwesomeIcon icon={faPlus} />
          Add Class & Subject
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
