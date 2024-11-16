import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../../../../Reusable_components/Button';
import { useForm } from 'react-hook-form';
import BASE_URL from '../../../../conf/conf';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import  '../../../../Reusable_components/CkEditor.css';

function EditIncome({ isOpen, onClose, incomeId, onSuccess }) {
  const [income, setIncome] = useState({ Income: '', source: '', date: '', amount: '',invoice: '',payment: '', description: '' });
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [value, setValue] = useState(true);
  const [editorData, setEditorData] = useState('');




  useEffect(() => {
    if (isOpen) {
      axios({
        method: 'GET',
        url: `${BASE_URL}/income/getIncomeById/${incomeId}`,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          setIncome(response.data.data);
          // Reset the form with the fetched data
          reset({
            Income: response.data.data.incomeName,
            source: response.data.data.incomeSource,
            date: response.data.data.incomeDate,
            amount: response.data.data.amount,
            invoice: response.data.data.invoice,
            payment: response.data.data.paymentMode,
            description: response.data.data.description,
          });
          setEditorData(response.data.data.description)

          // Update the toggle button value
        //   setValue(response.data.data.isActive === 'true');
        })
        .catch((error) => {
          console.error('Error fetching Income:', error);
        });
    }
  }, [incomeId, isOpen, reset]);

  useEffect(() => {
      // Disable scrolling on background when the popup is open
  if (isOpen) {
    document.body.style.overflow = 'hidden';
    setValue(true)

  } else {
    document.body.style.overflow = 'auto';
  }
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
  }, [onClose,isOpen]);

//   const onSubmit = (data, e) => {
//     e.preventDefault();

//     axios({
//       method: 'PUT',
//       url: `http://localhost:8080/gradePoints/updateGradePoints`,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       data: {
//         id: `${gradeId}`,
//         grade: data.Grade,
//         percentageFrom: data.marksfrom,
//         percentageUpto: data.marksupto,
//         gradePoints: data.gradepoints,
//         description: data.description,
//         isActive: value ? 'true' : 'false',
//       },
//     })
//       .then((response) => {
//         toast.success('Grade updated successfully!');
//         onSuccess();
//         onClose();
//         setValue(true);
//       })
//       .catch((error) => {
//         toast.error('Failed to update Grade.');
//       });
//   };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative ">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>

        <form  className="">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#042954]">View Income</h2>

          {/* Income Input */}
          <div className="mb-1">
            <label htmlFor="Income" className="block text-gray-700 font-semibold mb-1">Income Name</label>
            <input
            readOnly
              type="text"
              id="Income"
              className={`w-full px-3 py-2 border ${errors.Income ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register('Income')}
              value={income.Income}
            />
            {errors.Income && <p className="text-red-500 text-sm mt-1">{errors.Income.message}</p>}
          </div>

          {/* Source from */}
          <div className="mb-1">
            <label htmlFor="source" className="block text-gray-700 font-semibold mb-1">Source</label>
            <input
            readOnly
              type="text"
              id="source"
              className={`w-full px-3 py-2 border ${errors.source ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register('source')}
              value={income.source}
            />
            {errors.source && <p className="text-red-500 text-sm mt-1">{errors.source.message}</p>}
          </div>

          {/* Date Upto */}
          <div className="mb-1">
            <label htmlFor="date" className="block text-gray-700 font-semibold mb-1">Date Of Income</label>
            <input
            readOnly
              type="text"
              id="date"
              className={`w-full px-3 py-2 border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register('date')}
              value={income.date}
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
          </div>

          {/* Amount */}
          <div className="mb-1">
            <label htmlFor="amount" className="block text-gray-700 font-semibold mb-1">Amount</label>
            <input
            readOnly
              type="text"
              id="amount"
              className={`w-full px-3 py-2 border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register('amount')}
              value={income.amount}
            />
            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
          </div>
          {/* Invoice */}
          <div className="mb-1">
            <label htmlFor="invoice" className="block text-gray-700 font-semibold mb-1">Invoice no.</label>
            <input
            readOnly
              type="text"
              id="invoice"
              className={`w-full px-3 py-2 border ${errors.invoice ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register('invoice')}
              value={income.invoice}
            />
            {errors.invoice && <p className="text-red-500 text-sm mt-1">{errors.invoice.message}</p>}
          </div>
          {/* Payment mtd */}
          <div className="mb-1">
            <label htmlFor="payment" className="block text-gray-700 font-semibold mb-1">Payment Method</label>
            <input
            readOnly
              type="text"
              id="payment"
              className={`w-full px-3 py-2 border ${errors.payment ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register('payment')}
              value={income.payment}
            />
            {errors.payment && <p className="text-red-500 text-sm mt-1">{errors.payment.message}</p>}
          </div>

          {/* Description Input */}
          <div className="mb-1">
            <label htmlFor="description" className="block text-gray-700 font-semibold mb-1">Description</label>
            {/* <textarea
            readOnly
              id="description"
              className={`w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              rows="2"
              {...register('description')}
              value={income.description}
            ></textarea> */}
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
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EditIncome;
