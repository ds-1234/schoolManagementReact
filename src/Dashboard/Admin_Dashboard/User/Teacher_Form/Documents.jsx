import React , {useState, useEffect} from 'react';
import ToggleButton from '../../../../Reusable_components/ToggleButton';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleDoubleLeft} from '@fortawesome/free-solid-svg-icons';
import Button from '../../../../Reusable_components/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import BASE_URL from '../../../../conf/conf';

function Documents({ handlePrevious , currentStep , selectedRole , userId}) {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [toggleValue, setToggleValue] = useState(true);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [documents , setDocuments] = useState([]) ;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/getUser/${userId}`);
        const data = response.data.data;
        if (data) {
          setUserData(data); // Store all user data
          reset(data);       // Populate form with user data
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();

    const getDocuments = async () => {
      await axios({
        method: "GET" ,
        url: `${BASE_URL}/document/getDocument/${userId}` ,
        headers:{ 'Content-Type': 'application/json' }
      })
      .then((res) => {
        console.log(res.data.data);
        setDocuments(res.data.data);
      })
      .catch((err) => console.log("error in get Documents" , err));
    }
    getDocuments() ;
  }, [reset, userId]);

  const resumePath = documents.find(doc => doc.documentName === "Resume")?.attachmentPath || "";
  const photoPath = documents.find(doc => doc.documentName === "Photo")?.attachmentPath || "";

  const uploadDocument = async (file, documentName) => {
    if (!file) return;
    const formData = new FormData();

    const existingDocs = documents.find(doc => doc.documentName === documentName) ;
    formData.append('id' , existingDocs? existingDocs.id : null);
    formData.append('file', file);
    formData.append('filesName', documentName);
    formData.append('moduleName' , documentName);
    formData.append('moduleId' , 0);

    try {
      await axios.post(`${BASE_URL}/document/saveDocument/${userId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success(`${documentName} uploaded successfully!`);
    } catch (error) {
      toast.error(`Failed to upload ${documentName}`);
      console.error("Error uploading document:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      // First, upload the Resume and Photo files, if provided
      const resumeUploaded = resumePath || (data.resume?.[0] && (await uploadDocument(data.resume[0], 'Resume')));
    const photoUploaded = photoPath || (data.photo?.[0] && (await uploadDocument(data.photo[0], 'Photo')));

      // Only proceed with updating user data if both uploads were successful
      if (resumeUploaded && photoUploaded) {
        const updatedData = {
          ...userData,
          isActive: toggleValue,
        };

        await axios.post(`${BASE_URL}/user/updateUser`, updatedData, {
          headers: { "Content-Type": "application/json" },
        });
        navigate('/admin/activeUser');
        toast.success("User Updated Successfully!");
        
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user details.");
    }
  };

  return (
    <div className='space-y-2 mb-5'>
      <h3 className="font-semibold text-gray-900 text-xl">Upload Documents</h3>
      <div className='grid grid-cols-2 gap-5'>
        <div className="flex flex-col mb-5">
          <label htmlFor="resume">Resume <span className='text-red-700 font-bold'>*</span></label>
          <input
            type="file"
            id="resume"
            className={`py-2 px-2 rounded-lg border ${errors.resume ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
            {...register('resume' , {required: !resumePath && 'Resume is required'})}
          />
          {resumePath && <span className="text-sm text-blue-500">Current document: {resumePath}</span>}
          {!resumePath && errors.resume && <span className="text-red-500 text-sm">{errors.resume.message}</span>}
        </div>

        <div className="flex flex-col mb-5">
          <label htmlFor="photo">Upload Photo <span className='text-red-700 font-bold'>*</span></label>
          <input
            type="file"
            id="photo"
            className={`py-2 px-2 rounded-lg border ${errors.photo ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
            {...register('photo' , {required: !photoPath && 'Photo is required'})}
          />
          {photoPath && <span className="text-sm text-blue-500">Current document: {photoPath}</span>}
          {!photoPath && errors.photo && <span className="text-red-500 text-sm">{errors.photo.message}</span>}
        </div>
      </div>

      <div className="mb-2">
        <label className="mb-2" htmlFor="active">Status <span className='text-red-700 font-bold'>*</span></label>
        <ToggleButton
          isOn={toggleValue}
          handleToggle={() => setToggleValue(!toggleValue)}
          id="active"
        />
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
            hidden={selectedRole !== 4}
            className="hover:bg-[#ffae01] bg-[#042954] text-white px-4 py-2 rounded-lg"
          >
            Save & Continue 
          </button>
          <Button onClick={() => navigate('/admin/pendingUser')} label="Cancel" className='px-6 bg-[#ffae01] hover:bg-[#042954]'/>
        </div>
      </div>
    </div>
  );
}

export default Documents;
