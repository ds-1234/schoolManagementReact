import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast} from 'react-toastify';
import Button from '../../../../Reusable_components/Button';
import { useForm } from 'react-hook-form';
import ToggleButton from '../../../../Reusable_components/ToggleButton';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import  '../../../../Reusable_components/CkEditor.css';

function EditFeesGrp({ isOpen, onClose, feesGrpId, onSuccess }) {
  const [feesGrp, setFeesGrp] = useState({ feesGroupName: '', description: '' });
  const [value,setValue] =useState(true)
  const [editorData, setEditorData] = useState('');


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  useEffect(() => {
    axios({
      method: 'GET',
      url: `http://localhost:8080/feesGroup/getFeesGroupById/${feesGrpId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        const feesgrpdata = response.data.data;
        setFeesGrp({
            feesGroupName: feesgrpdata.feesGroupName,
            description: feesgrpdata.description,
        });
        setEditorData(feesgrpdata.description)

        setValue(feesgrpdata.isActive); // Set active status based on API response
      })
      .catch((error) => {
        console.error('Error fetching Fees Group:', error);
      });
  }, [feesGrpId]);

  useEffect(() => {
    // Add event listener for ESC key press
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeesGrp({ ...feesGrp, [name]: value });
  };

  const onSubmit = (e) => {
    // e.preventDefault();
    axios({
      method: 'POST',
      url: `http://localhost:8080/feesGroup/saveFeesGroup`,
      headers: {
        'Content-Type': 'application/json',
      },
      data:{
        id : `${feesGrpId}`,
        feesGroupName:feesGrp.feesGroupName,
        description:feesGrp.description,
        isActive:value,
        },
    })
      .then((response) => {
        console.log('Fees Group updated:', response.data);
        toast.success('Fees Group updated successfully!');
        onSuccess();
        onClose();
      })
      .catch((error) => {
        console.error('Error updating Fees Group:', error);
        toast.error('Failed to update Fees Group.');
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>

        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold text-center mb-6 text-[#042954]">Edit Fees Group</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Fees Group</label>
            <input
              type="text"
              name="feesGroupName"
              value={feesGrp.feesGroupName}  
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Fees Group"
              required
            />
          </div>



          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            {/* <textarea
              name="description"
              value={feesGrp.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter description"
              rows="4"
              required
            /> */}
                                                                        <CKEditor
              editor={ClassicEditor}
              data={editorData}
              onChange={(event, editor) => {
                const data = editor.getData();
                setEditorData(data);
              }}
              config={{
                toolbar: [
                  'heading','bold', 'italic', 'underline', 'bulletedList', 'numberedList', 
                  'link', 'blockQuote', 'undo', 'redo'
                  // Exclude 'imageUpload' to remove the icon
                ],
              }}
            />
          </div>

          <div className="mb-2">
              <label className="block text-sm font-medium mb-2 text-black" htmlFor="active">
                Status 
              </label>
              <ToggleButton
                isOn={value}
                handleToggle={() => setValue(!value)}
                id="active"
                // label="Active"
                register={register}
              />
            </div>

          <Button
            type="submit"
            className="w-full text-center"
          />
        </form>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default EditFeesGrp;
