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
  const [selectedClass , setSelectedClass] = useState('') ;
  const [clsDets , setClsDets] = useState(null);
  const [subjects , setSubjects] = useState([]) ;
  const [classSubjectRows, setClassSubjectRows] = useState([{ classId: '', subjectId: '' }]);
  const [teacherData , setTeacherData] = useState(null) 
  const [designations , setDesignations] = useState([]) ;
  const [selectedDest , setSelectedDest] = useState('') ;
  const [departments , setDepartments] = useState([]) ;
  const [selectedDept , setSelectedDept] = useState('') ;
  const [basicTchData , setBasicTchData] = useState(null) ;

  const fetchOptions = async () => {
    try {
      const [classRes, schoolRes, subjectRes , destRes , deptRes] = await Promise.all([
        axios.get(`${BASE_URL}/class/getClassList`),
        axios.get(`${BASE_URL}/school/getSchoolList`),
        axios.get(`${BASE_URL}/subject/getSubjectList`),
        axios.get(`${BASE_URL}/designation/getDesignationList`),
        axios.get(`${BASE_URL}/department/getDepartmentList`)
      ]);

      setClasses(classRes.data.data);
      setSchools(schoolRes.data.data);
      setSubjects(subjectRes.data.data);
      setDepartments(deptRes.data.data) ;
      setDesignations(destRes.data.data)
      setSelectedClass(classRes.data.data.find((cls) => cls.primaryTeacher === userId)?.id)
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if(selectedClass){
      axios.get(`${BASE_URL}/class/getClass/${selectedClass}`)
        .then((response) => {
          setClsDets(response.data.data);
        })
        .catch((error) => {
          console.error('Error fetching class details:', error);
        });
    }
  } , [selectedClass])

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
    
    const classSubjectEntity = classSubjectRows.map((row) => {
      const existingClassSubject = teacherData?.classSubjectEntity?.find(
        (item) => item.classId === row.classId && item.subjectId === row.subjectId
      );
      return {
        id: existingClassSubject ? existingClassSubject.id : null,
        teacherId: userId,
        classId: parseInt(row.classId),
        subjectId: parseInt(row.subjectId),
        isActive: true,
      };
    });

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
        designation : parseInt(data.designation),
        department : parseInt(data.department),
        languages: data.languages.map(lang => lang.value).join(','),
        classSubjectEntity
      }
    })
    .then((response) => {
      axios.post(`${BASE_URL}/user/updateUser` ,  {...basicTchData , school : selectedSchl}) ;
      if(selectedClass){
        axios.post(`${BASE_URL}/class/createClass` ,  {...clsDets , primaryTeacher :  userId}) ;
      }
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
            setTeacherData(data) ;

            if (data) {
              reset({
                ...data,
                languages: data.languages
                  ? data.languages.split(',').map((lang) => languageOptions.find((opt) => opt.value === lang))
                  : [],
              });
              setSelectedDept(data.department)
              setSelectedDest(data.designation)

              if (data.classSubjectEntity && Array.isArray(data.classSubjectEntity)) {
                const parsedRows = data.classSubjectEntity.map((item) => ({
                  classId: item.classId, 
                  subjectId: item.subjectId, 
                }));
                console.log(parsedRows);
                
                setClassSubjectRows(parsedRows);
              }
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
          setBasicTchData(userData) ;
          setSelectedSchl(userData.school) 
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
            <label htmlFor="maritalStatus" className='text-gray-900 font-semibold text-xl'>Marital Status <span className='text-red-700 font-bold'>*</span></label>
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
          <label htmlFor="languages" className='text-gray-900 font-semibold text-xl'>Languages <span className='text-red-700 font-bold'>*</span></label>
          <SelectDropdown
            name="languages"
            control={control}
            options={languageOptions} 
            isMulti={true}         
            placeholder="Select languages..."
            {...register('languages' , {required : "Languages are required" })}
          />
          {errors.languages && <span className="text-red-500 text-sm">{errors.languages.message}</span>}
        </div>

        <div className="flex flex-col px-2 w-1/2 mb-4">
            <label htmlFor="designation" className='text-gray-900 font-medium'>Designation</label>
            <select
            id="designation"
            className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
            {...register('designation')}
            value={selectedDest}
            onChange={(e) => setSelectedDest(e.target.value)}
            placeholder = "Select Designation "
            >
            <option value="" hidden>Select designation </option>
            {designations.map(option => (
            <option key={option.id} value={option.id}>{option.designationName}</option>
            ))}
            </select>
        </div>

        <div className="flex flex-col px-2 w-1/2 mb-4">
            <label htmlFor="department" className='text-gray-900 font-medium'>Department</label>
            <select
            id="department"
            className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
            {...register('department')}
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            placeholder = "Select Department "
            >
            <option value="" hidden>Select department</option>
            {departments.map(option => (
            <option key={option.id} value={option.id}>{option.departmentName}</option>
            ))}
            </select>
        </div>

        <div className="flex flex-col px-2 w-1/2 mb-4">
            <label htmlFor="school" className='text-gray-900 font-medium'>School Branch <span className='text-red-700 font-bold'>*</span></label>
            <select
            id="school"
            className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
            {...register('school' , {required: 'School is required'})}
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

        <div className="flex flex-col px-2 w-1/2 mb-4">
            <label htmlFor="classTeacher" className="block text-gray-900 font-semibold ">Class Teacher</label>
            <select  
              id="classTeacher" 
              value={selectedClass}
              className={`py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none`}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>{cls.name} - {cls.section}</option>
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
                value={row.classId}
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
                value={row.subjectId}
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
