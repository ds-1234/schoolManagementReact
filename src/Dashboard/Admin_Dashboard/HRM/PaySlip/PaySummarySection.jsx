import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const PaySummarySection = () => {
  const [additionalFields, setAdditionalFields] = useState([]);
  const {
    register,
    formState: { errors },
  } = useForm();

  const handleAddField = () => {
    setAdditionalFields([
      ...additionalFields,
      { id: Date.now(), name: '', value: '' },
    ]);
  };

  const handleFieldChange = (id, field, value) => {
    setAdditionalFields(
      additionalFields.map((fieldItem) =>
        fieldItem.id === id ? { ...fieldItem, [field]: value } : fieldItem
      )
    );
  };

  const handleDeleteField = (id) => {
    setAdditionalFields(
      additionalFields.filter((fieldItem) => fieldItem.id !== id)
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-6">Employee Pay Summary</h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Employee Name */}
        <div className="flex items-center gap-4">
          <label className="w-1/3 font-medium ">Employee Name *</label>
          <input
            type="text"
            {...register('employeeName', { required: 'Employee Name is required' })}
            className={`py-2 px-3 rounded-lg bg-gray-100 border ${
              errors.employeeName ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none w-2/3`}
          />
          {errors.employeeName && (
            <p className="text-red-500 text-sm">{errors.employeeName.message}</p>
          )}
        </div>

        {/* Employee ID */}
        <div className="flex items-center gap-4">
          <label className="w-1/3 font-medium ">Employee ID *</label>
          <input
            type="text"
            {...register('employeeId', { required: 'Employee ID is required' })}
            className={`py-2 px-3 rounded-lg bg-gray-100 border ${
              errors.employeeId ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none w-2/3`}
          />
          {errors.employeeId && (
            <p className="text-red-500 text-sm">{errors.employeeId.message}</p>
          )}
        </div>

        {/* Pay Period */}
        <div className="flex items-center gap-4">
          <label className="w-1/3 font-medium ">Pay Period *</label>
          <input
            type="month"
            {...register('payPeriod', { required: 'Pay Period is required' })}
            className={`py-2 px-3 rounded-lg bg-gray-100 border ${
              errors.payPeriod ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none w-2/3`}
          />
          {errors.payPeriod && (
            <p className="text-red-500 text-sm">{errors.payPeriod.message}</p>
          )}
        </div>

        {/* Paid Days */}
        <div className="flex items-center gap-4">
          <label className="w-1/3 font-medium ">Paid Days *</label>
          <input
            type="number"
            {...register('paidDays', { required: 'Paid Days are required' })}
            className={`py-2 px-3 rounded-lg bg-gray-100 border ${
              errors.paidDays ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none w-2/3`}
          />
          {errors.paidDays && (
            <p className="text-red-500 text-sm">{errors.paidDays.message}</p>
          )}
        </div>

        {/* Loss of Pay Days */}
        <div className="flex items-center gap-4">
          <label className="w-1/3 font-medium ">Loss of Pay Days *</label>
          <input
            type="number"
            {...register('lossOfPayDays', { required: 'Loss of Pay Days are required' })}
            className={`py-2 px-3 rounded-lg bg-gray-100 border ${
              errors.lossOfPayDays ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none w-2/3`}
          />
          {errors.lossOfPayDays && (
            <p className="text-red-500 text-sm">{errors.lossOfPayDays.message}</p>
          )}
        </div>

        {/* Pay Date */}
        <div className="flex items-center gap-4">
          <label className="w-1/3 font-medium ">Pay Date *</label>
          <input
            type="date"
            {...register('payDate', { required: 'Pay Date is required' })}
            className={`py-2 px-3 rounded-lg bg-gray-100 border ${
              errors.payDate ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none w-2/3`}
          />
          {errors.payDate && (
            <p className="text-red-500 text-sm">{errors.payDate.message}</p>
          )}
        </div>
      </div>

      {/* Additional Fields */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Additional Fields</h3>
        {additionalFields.map((field) => (
          <div key={field.id} className="flex items-center gap-4 mb-3">
            <input
              type="text"
              placeholder="Name *"
              value={field.name}
              onChange={(e) =>
                handleFieldChange(field.id, 'name', e.target.value)
              }
              required
              className="py-2 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none w-1/2"
            />
            <input
              type="text"
              placeholder="Value *"
              value={field.value}
              onChange={(e) =>
                handleFieldChange(field.id, 'value', e.target.value)
              }
              required
              className="py-2 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none w-1/2"
            />
            <button
              onClick={() => handleDeleteField(field.id)}
              className="py-1 px-3 bg-red-500 text-white rounded-lg"
            >
              Delete
            </button>
          </div>
        ))}
        <span
          onClick={handleAddField}
          className="text-blue-500 cursor-pointer flex items-center gap-2"
        >
          <span className="text-xl">+</span> Add Additional Field
        </span>
      </div>
    </div>
  );
};

export default PaySummarySection;
