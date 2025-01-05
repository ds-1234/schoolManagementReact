import React , {useState , useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashCan , faAngleDoubleLeft} from '@fortawesome/free-solid-svg-icons';
import Button from '../../../../Reusable_components/Button';
import DatePicker from '../../../../Reusable_components/DatePicker';
import BASE_URL from '../../../../conf/conf';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useForm , useFieldArray} from 'react-hook-form';
import {differenceInMonths , differenceInYears} from 'date-fns'
import { useNavigate } from 'react-router-dom';
import Loader from '../../../../Reusable_components/Loader';

function Qualifications({handlePrevious , handleNext , userId , currentStep , selectedRole}) {

  const {
    register,
    control ,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      qualifications: [{ course: "", institute: "", passoutYear: "" , cgpa: "" , degreeDoc: "", degreeFile: null}],
      workExperiences: [{ institute: "", designation: "", joining: "" , relieving: "" , documentName: "", file: null }],
    },
  });

  const navigate = useNavigate() ;
  const [documents , setDocuments] = useState([]) ;
  const [loading, setLoading] = useState(false);

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
    const [teacherData , setTeacherData] = useState(null) ;
  
    const calculateExperience = (joinDate, relieveDate) => {
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

    const uploadDocument = async (file, documentName , moduleName , moduleId) => {
      if (!file) return;
      const formData = new FormData();

      const existingDocs = documents.find(doc => doc.documentName === documentName) ;
      formData.append('id' , existingDocs? existingDocs.id : null);
      formData.append('file', file);
      formData.append('filesName', documentName);
      formData.append('moduleName' , moduleName);
      formData.append('moduleId' , moduleId);
      
      try {
        await axios.post(`${BASE_URL}/document/saveDocument/${userId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success("Document uploaded successfully!");
      } catch (error) {
        toast.error("Failed to upload document");
        console.error("Error uploading document:", error);
      }
    };

    

    const isDuplicateQualification = (qualification, existingQualifications) => {
      return existingQualifications.some((existing) =>
        existing.course === qualification.course &&
        existing.institute === qualification.institute &&
        existing.passoutYear === qualification.passoutYear &&
        existing.cgpa === qualification.cgpa
      );
    };
    
    const isDuplicateExperience = (experience, existingExperiences) => {
      return existingExperiences.some((existing) =>
        existing.insitutue === experience.institute &&
        existing.designation === experience.designation &&
        existing.fromYear === experience.joining &&
        existing.toYear === experience.relieving
      );
    };
    
    const onSubmit = async (data) => {
      setLoading(true); // Start loader
      const qualificationList = teacherData?.qualificationList || [];
      const workExperienceList = teacherData?.workExperience || [];
    
      const newQualifications = data.qualifications.filter(
        (qualification) => 
          qualification.course && qualification.institute && qualification.passoutYear && 
          qualification.cgpa && !isDuplicateQualification(qualification, qualificationList)
      );
    
      const newWorkExperiences = data.workExperiences.filter(
        (experience) => 
          experience.institute && experience.designation && experience.joining &&
          experience.relieving && !isDuplicateExperience(experience, workExperienceList)
      );
    
      if (newQualifications.length === 0 && newWorkExperiences.length === 0) {
        toast.warn("No new qualifications or work experiences to save.");
        handleNext()
        return;
      }
    
      const formattedData = {
        ...teacherData,
        qualificationList: newQualifications.map((qualification) => ({
          teacherId: userId,
          course: qualification.course,
          institute: qualification.institute,
          passoutYear: qualification.passoutYear,
          cgpa: qualification.cgpa,
        })),
        workExperience: newWorkExperiences.map((experience) => ({
          teacherId: userId,
          fromYear: experience.joining,
          toYear: experience.relieving,
          insitutue: experience.institute,
          designation: experience.designation,
        })),
      };
    
      console.log("Data to send:", formattedData);
    
      try {
        let res ;
        if (newQualifications.length > 0 || newWorkExperiences.length > 0) {
          res = await axios.post(`${BASE_URL}/teacherInfo/createTeacherInfo`, {
            teacherId: userId,
            ...formattedData,
          });
        }
        
        const responseData = res.data.data ;
        
        // Sequentially upload qualification documents
        for (const qualification of newQualifications) {
          if (qualification.degreeFile && qualification.degreeFile[0]) {
            console.log("Uploading qualification document:", qualification.degreeFile[0], qualification.degreeDoc , responseData.qualificationList[0].course , responseData.qualificationList[0].id);
            await uploadDocument(qualification.degreeFile[0], qualification.degreeDoc , responseData.qualificationList[0].course , responseData.qualificationList[0].id);
          }
        }
    
        // Sequentially upload work experience documents
        for (const experience of newWorkExperiences) {
          if (experience.file && experience.file[0]) {
            console.log("Uploading work experience document:", experience.file[0], experience.documentName , responseData.workExperience[0].insitutue , responseData.workExperience[0].id);
            await uploadDocument(experience.file[0], experience.documentName, responseData.workExperience[0].insitutue , responseData.workExperience[0].id);
          }
        }
    
        toast.success("User Updated Successfully!");
        handleNext();
      } catch (error) {
        toast.error("Error updating user details");
        console.error("Error updating user:", error);
      }finally{
        setLoading(false); // Stop loader
      };
    };
    
    

    useEffect(() => {
      // Fetch the existing teacher details if available
      const fetchDetails = async () => {
          try {
              const response = await axios.get(`${BASE_URL}/teacherInfo/getTeacherInfo/${userId}`);
              const data = response.data.data;
              setTeacherData(data) ;
  
              if (data) {
                // Mapping the fetched data to match the form structure
                const formattedData = {
                  qualifications: data.qualificationList || [{ course: "", institute: "", passoutYear: "" , cgpa : ""}],
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

      const getDocuments = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/document/getDocument/${userId}`);
          const fetchedDocuments = response.data.data;
          setDocuments(fetchedDocuments);
    
          // Map documents to corresponding fields
          reset((prevValues) => {
            const updatedQualifications = prevValues.qualifications.map((qualification) => {
              
              const matchingDoc = fetchedDocuments.find(
                (doc) => doc.moduleName === qualification.course
               );
               
              return {
                ...qualification,
                degreeDoc: matchingDoc?.documentName || qualification.degreeDoc,
                degreeFile: matchingDoc ? [{ name: matchingDoc.attachmentPath }] : null,
              };
            });
            
    
            const updatedWorkExperiences = prevValues.workExperiences.map((experience) => {
              const matchingDoc = fetchedDocuments.find(
                (doc) => doc.moduleName === experience.institute
              );
              return {
                ...experience,
                documentName: matchingDoc?.documentName || experience.documentName,
                file: matchingDoc ? [{ name: matchingDoc.attachmentPath }] : null,
              };
            });

            return {
              ...prevValues,
              qualifications: updatedQualifications,
              workExperiences: updatedWorkExperiences,
            };
          });
        } catch (error) {
          console.error("Error fetching documents:", error);
        }
      };
  
        fetchDetails();
        getDocuments() ;
  }, [reset , userId]);

  return (
    <div>
            <Loader isLoading={loading} /> {/* Use Reusable Loader */}
    {/* Qualifications Section */}
  <div className="space-y-2 mb-7 ">
  <h3 className=" font-semibold text-gray-900 text-xl">Qualifications</h3>
  {qualificationFields.map((item, index) => (
    <div key={item.id} className="grid grid-cols-4 gap-1">
      <div className='flex flex-col gap-1'>
        <label htmlFor={`qualifications[${index}].course`}>Degree <span className='text-red-700 font-bold'>*</span></label>
        <input
          type="text"
          {...register(`qualifications[${index}].course`, { required: true })}
          className="border p-2 rounded-lg"
          placeholder="Enter Degree"
        />
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor={`qualifications[${index}].institute`}>Institution <span className='text-red-700 font-bold'>*</span></label>
        <input
          type="text"
          {...register(`qualifications[${index}].institute`, { required: true })}
          className="border p-2 rounded-lg"
          placeholder="Enter Institution"
        />
      </div>
      <div className='flex flex-col gap-1 '>
        <label htmlFor={`qualifications[${index}].passoutYear`}>Year of Passing <span className='text-red-700 font-bold'>*</span></label>
        <input
          type="text"
          {...register(`qualifications[${index}].passoutYear`, { required: true })}
          className="border p-2 rounded-lg "
          placeholder="Enter Year"
        />
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor={`qualifications[${index}].cgpa`}>Marks (%) / CGPA <span className='text-red-700 font-bold'>*</span></label>
        <input
          type="text"
          {...register(`qualifications[${index}].cgpa`, { required: true })}
          className="border p-2 rounded-lg"
          placeholder="Enter Marks (%) or CGPA"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="file">Upload Marksheets/Degree <span className='text-red-700 font-bold'>*</span></label>
        <input
          type="text"
          {...register(`qualifications[${index}].degreeDoc` , {required: true})}
          className="border p-2 rounded-lg"
          placeholder="Document Name"
        />
        <input
          type="file"
          {...register(`qualifications[${index}].degreeFile`)}
          className="border p-2 rounded-lg"
        />

        {item.degreeFile && (
          <p className="text-sm text-gray-500">Uploaded File: {item.degreeFile[0]?.name}</p>
        )}
      </div>
      <div className='flex items-center justify-center mt-7'>
        <Button onClick={() => removeQualification(index)} 
        label={<FontAwesomeIcon icon={faTrashCan} />} 
        className="bg-red-500 text-white hover:bg-white hover:text-red-700 h-10 w-20" />
      </div>
    </div>
  ))}
  <button type="button" className="text-blue-500 hover:text-blue-700 transition-colors duration-150" 
  onClick={() => appendQualification({ course: "", institute: "", passoutYear: "", cgpa: "" ,degreeDoc: "", degreeFile: null})}>
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
              {...register(`workExperiences[${index}].institute`)}
              className="border p-2 rounded-lg"
              placeholder="Enter Name"
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor={`workExperiences[${index}].designation`}>Designation</label>
            <input
              type="text"
              {...register(`workExperiences[${index}].designation`)}
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
          type="text"
          {...register(`workExperiences[${index}].documentName`)}
          className="border p-2 rounded-lg"
          placeholder="Document Name"
        />
        <input
          type="file"
          {...register(`workExperiences[${index}].file`)}
          className="border p-2 rounded-lg"
        />
        {item.file && (
          <p className="text-sm text-gray-500">Uploaded File: {item.file[0]?.name}</p>
        )}
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
        onClick={() => appendWorkExperience({ institute: "", designation: "", joining: "" , relieving:"" ,documentName: "", file: null })}>
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
