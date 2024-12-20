import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import PaySlip from './PaySlip';

const IncomeDetailsSection = ({ onPayloadUpdate }) => {
  const [leftAdditionalFields, setLeftAdditionalFields] = useState([]);
  const [rightAdditionalFields, setRightAdditionalFields] = useState([]);
  const [grossSalary, setGrossSalary] = useState(0);
  const [totalDeduction, setTotalDeduction] = useState(0);
  const [totalNetPay, setTotalNetPay] = useState(0);
  const [earningFieldsList, setEarningFieldsList] = useState([]);
  const [deductionFieldsList, setDeductionFieldsList] = useState([]);
  const [grossEarning, setGrossEarning] = useState(0);
  const [grossDeduction, setGrossDeduction] = useState(0);
  const {
    register,
    watch,
    formState: { errors },
  } = useForm();

  const watchFields = watch();

  const netPayable = grossEarning - grossDeduction;

  const numberToWords = (num) => {
    // Basic function to convert numbers to words
    const words = [
      "Zero", "One", "Two", "Three", "Four", "Five",
      "Six", "Seven", "Eight", "Nine", "Ten",
      // Add more as needed...
    ];
    return words[num] || num.toString();
  };

  const generatePayload = () => {
    const totalGrossEarnings = grossEarning + leftAdditionalFields.reduce((sum, field) => sum + parseFloat(field.value || 0), 0);
    const totalGrossDeductions = grossDeduction + rightAdditionalFields.reduce((sum, field) => sum + parseFloat(field.value || 0), 0);
    const netPay = totalGrossEarnings - totalGrossDeductions;

    return {
      basicPayEarning: parseFloat(watchFields.basic || 0),
      houseRentAllowEarning: parseFloat(watchFields.houseRentAllowance || 0),
      specialPayAllowance: parseFloat(watchFields.specialPayAllowance || 0),
      overTimePay: parseFloat(watchFields.overTimePay || 0),
      earningFieldsList: leftAdditionalFields.map((field) => ({
        earningFieldName: field.name,
        earningFieldValue: field.value
      })),
      grossSalary: grossEarning,
      incomeTaxDeduction: parseFloat(watchFields.incomeTaxDeduction || 0),
      pfDeduction: parseFloat(watchFields.pfDeduction || 0),
      gratuityDeduction: parseFloat(watchFields.gratuityDeduction || 0),
      professionalTax: parseFloat(watchFields.professionalTax || 0),
      advancePay: parseFloat(watchFields.advancePay || 0),
      deductionFieldsList: rightAdditionalFields.map((field) => ({
        deductionFieldName: field.name,
        deductionFieldValue: field.value
      })),
      totalDeduction: grossDeduction,
      totalNetPay: netPay,
      netPayAmountInWords: numberToWords(netPay)
    };
  };

  const handleReset = () => {
    setGrossEarning(0);
    setGrossDeduction(0);
    setLeftAdditionalFields([]);
    setRightAdditionalFields([]);
    setGrossSalary(0);
    setTotalDeduction(0);
    setTotalNetPay(0);
  };




  useEffect(() => {
    // const totalGrossEarnings = grossEarning + leftAdditionalFields.reduce((sum, field) => sum + parseFloat(field.value || 0), 0);
    // const totalGrossDeductions = grossDeduction + rightAdditionalFields.reduce((sum, field) => sum + parseFloat(field.value || 0), 0);

    // setGrossSalary(totalGrossEarnings);
    // setTotalDeduction(totalGrossDeductions);

    // Calculating Net Pay
    // const netPay = totalGrossEarnings - totalGrossDeductions;
    // setTotalNetPay(netPay);

    // Send updated payload to parent
    const updatedPayload = generatePayload();
    onPayloadUpdate(updatedPayload);
  }, [ updatedPayload]);
//   useEffect(() => {
//     onPayloadUpdate(payload); // This sends the updated payload to the parent component
//   }, [payload]); // Update when the payload state changes
  




  useEffect(() => {
    const calculateGrossEarning = () => {
      const basic = parseFloat(watchFields.basic || 0);
      const houseRentAllowance = parseFloat(watchFields.houseRentAllowance || 0);
      const specialPayAllowance = parseFloat(watchFields.specialPayAllowance || 0);
      const overTimePay = parseFloat(watchFields.overTimePay || 0);

      const additionalEarnings = leftAdditionalFields.reduce(
        (sum, field) => sum + parseFloat(field.value || 0),
        0
      );

      setGrossEarning(
        basic + houseRentAllowance + specialPayAllowance + overTimePay + additionalEarnings
      );
    };

    const calculateGrossDeduction = () => {
      const incomeTaxDeduction = parseFloat(watchFields.incomeTaxDeduction || 0);
      const pfDeduction = parseFloat(watchFields.pfDeduction || 0);
      const gratuityDeduction = parseFloat(watchFields.gratuityDeduction || 0);
      const professionalTax = parseFloat(watchFields.professionalTax || 0);
      const advancePay = parseFloat(watchFields.advancePay || 0);

      const additionalDeductions = rightAdditionalFields.reduce(
        (sum, field) => sum + parseFloat(field.value || 0),
        0
      );

      setGrossDeduction(
        incomeTaxDeduction + pfDeduction + gratuityDeduction + professionalTax + advancePay + additionalDeductions
      );
    };

    // const netPayable = grossEarning - grossDeduction;



    calculateGrossEarning();
    calculateGrossDeduction();


  }, [watchFields, leftAdditionalFields, rightAdditionalFields]);

  const handleAddLeftField = () => {
    setLeftAdditionalFields([
      ...leftAdditionalFields,
      { id: Date.now(), name: '', value: '' },
    ]);
  };

  const handleAddRightField = () => {
    setRightAdditionalFields([
      ...rightAdditionalFields,
      { id: Date.now(), name: '', value: '' },
    ]);
  };

  const handleLeftFieldChange = (id, field, value) => {
    setLeftAdditionalFields(
      leftAdditionalFields.map((fieldItem) =>
        fieldItem.id === id ? { ...fieldItem, [field]: value } : fieldItem
      )
    );
  };

  const handleRightFieldChange = (id, field, value) => {
    setRightAdditionalFields(
      rightAdditionalFields.map((fieldItem) =>
        fieldItem.id === id ? { ...fieldItem, [field]: value } : fieldItem
      )
    );
  };

  const handleDeleteLeftField = (id) => {
    setLeftAdditionalFields(
      leftAdditionalFields.filter((fieldItem) => fieldItem.id !== id)
    );
  };

  const handleDeleteRightField = (id) => {
    setRightAdditionalFields(
      rightAdditionalFields.filter((fieldItem) => fieldItem.id !== id)
    );
  };

  return (
    <div className="grid grid-cols-2 gap-8 p-6 bg-white rounded-lg shadow-lg">
      {/* Left Section */}
      <div className="flex flex-col space-y-6">
        <h2 className="text-xl font-bold mb-4">Income Details </h2>

        <div className="flex items-center mb-2 gap-4">

        <span className="w-1/3 text-lg font-semibold">Earnings </span>
        <span className="w-1/3 text-lg ml-4 font-semibold">Amount </span>
        </div>
        <div className="flex items-center gap-4">

          <label className="w-1/3 font-medium">Basic *</label>
          <input
            type="number"
            {...register('basic', { required: 'Basic is required' })}
            className="py-2 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none w-2/3"
          />
          {errors.basic && (
            <p className="text-red-500 text-sm">{errors.basic.message}</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <label className="w-1/3 font-medium">House Rent Allowance *</label>
          <input
            type="number"
            {...register('houseRentAllowance', { required: 'House Rent Allowance is required' })}
            className="py-2 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none w-2/3"
          />
          {errors.houseRentAllowance && (
            <p className="text-red-500 text-sm">{errors.houseRentAllowance.message}</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <label className="w-1/3 font-medium">Special Pay Allowance *</label>
          <input
            type="number"
            {...register('specialPayAllowance', { required: 'Special Pay Allowance is required' })}
            className="py-2 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none w-2/3"
          />
          {errors.specialPayAllowance && (
            <p className="text-red-500 text-sm">{errors.specialPayAllowance.message}</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <label className="w-1/3 font-medium">Over Time Pay *</label>
          <input
            type="number"
            {...register('overTimePay', { required: 'Over Time Pay is required' })}
            className="py-2 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none w-2/3"
          />
          {errors.overTimePay && (
            <p className="text-red-500 text-sm">{errors.overTimePay.message}</p>
          )}
        </div>

        {/* Additional Fields for Left Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Additional Fields </h3>
          {leftAdditionalFields.map((field) => (
            <div key={field.id} className="flex items-center gap-4 mb-3">
              <input
                type="text"
                placeholder="Name *"
                value={field.name}
                onChange={(e) =>
                  handleLeftFieldChange(field.id, 'name', e.target.value)
                }
                required
                className="py-2 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none w-1/2"
              />
              <input
                type="text"
                placeholder="Value *"
                value={field.value}
                onChange={(e) =>
                  handleLeftFieldChange(field.id, 'value', e.target.value)
                }
                required
                className="py-2 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none w-1/2"
              />
              <button
                onClick={() => handleDeleteLeftField(field.id)}
                className="py-1 px-3 bg-red-500 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          ))}
          <span
            onClick={handleAddLeftField}
            className="text-blue-500 cursor-pointer flex items-center gap-2"
          >
            <span className="text-xl">+</span> Add Additional Field
          </span>
          
        </div>
                {/* Gross Earning */}
                <div className="flex items-center gap-4 mt-4">
          <label className="w-1/3 font-medium">Gross Earning</label>
          <input
            type="number"
            value={grossEarning}
            readOnly
            className="py-2 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none w-2/3"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col space-y-6">
        <h2 className="mb-4">-</h2>

        <div className="flex items-center mb-2 gap-4">

            <span className="w-1/3 text-lg font-semibold">Deductions </span>
            <span className="w-1/3 text-lg ml-4 font-semibold">Amount </span>
        </div>

        <div className="flex items-center gap-4">
          <label className="w-1/3 font-medium">Income Tax Deduction *</label>
          <input
            type="number"
            {...register('incomeTaxDeduction', { required: 'Income Tax Deduction is required' })}
            className="py-2 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none w-2/3"
          />
          {errors.incomeTaxDeduction && (
            <p className="text-red-500 text-sm">{errors.incomeTaxDeduction.message}</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <label className="w-1/3 font-medium">PF Deduction *</label>
          <input
            type="number"
            {...register('pfDeduction', { required: 'PF Deduction is required' })}
            className="py-2 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none w-2/3"
          />
          {errors.pfDeduction && (
            <p className="text-red-500 text-sm">{errors.pfDeduction.message}</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <label className="w-1/3 font-medium">Gratuity Deduction *</label>
          <input
            type="number"
            {...register('gratuityDeduction', { required: 'Gratuity Deduction is required' })}
            className="py-2 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none w-2/3"
          />
          {errors.gratuityDeduction && (
            <p className="text-red-500 text-sm">{errors.gratuityDeduction.message}</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <label className="w-1/3 font-medium">Professional Tax *</label>
          <input
            type="number"
            {...register('professionalTax', { required: 'Professional Tax is required' })}
            className="py-2 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none w-2/3"
          />
          {errors.professionalTax && (
            <p className="text-red-500 text-sm">{errors.professionalTax.message}</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <label className="w-1/3 font-medium">Advance Pay *</label>
          <input
            type="number"
            {...register('advancePay', { required: 'Advance Pay is required' })}
            className="py-2 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none w-2/3"
          />
          {errors.advancePay && (
            <p className="text-red-500 text-sm">{errors.advancePay.message}</p>
          )}
        </div>

        {/* Additional Fields for Right Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Additional Fields </h3>
          {rightAdditionalFields.map((field) => (
            <div key={field.id} className="flex items-center gap-4 mb-3">
              <input
                type="text"
                placeholder="Name *"
                value={field.name}
                onChange={(e) =>
                  handleRightFieldChange(field.id, 'name', e.target.value)
                }
                required
                className="py-2 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none w-1/2"
              />
              <input
                type="text"
                placeholder="Value *"
                value={field.value}
                onChange={(e) =>
                  handleRightFieldChange(field.id, 'value', e.target.value)
                }
                required
                className="py-2 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none w-1/2"
              />
              <button
                onClick={() => handleDeleteRightField(field.id)}
                className="py-1 px-3 bg-red-500 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          ))}
          <span
            onClick={handleAddRightField}
            className="text-blue-500 cursor-pointer flex items-center gap-2"
          >
            <span className="text-xl">+</span> Add Additional Field
          </span>
        </div>
                {/* Gross Deduction */}
                <div className="flex items-center gap-4 mt-4">
          <label className="w-1/3 font-medium">Gross Deduction</label>
          <input
            type="number"
            value={grossDeduction}
            readOnly
            className="py-2 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none w-2/3"
          />
        </div>
      </div>

      <div className="p-6 font-sans">
      {/* Net Payable Amount Heading and Amount */}
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h2 className="text-2xl font-semibold">Net Payable Amount</h2>
        <h2 className="text-2xl font-semibold text-gray-800">
          ₹ {netPayable.toFixed(2)}
        </h2>
      </div>

      {/* Gross Earnings - Gross Deductions */}
      <p className="text-sm text-gray-600">
        (Gross Earnings: ₹ {grossEarning.toFixed(2)} - Gross Deductions: ₹{" "}
        {grossDeduction.toFixed(2)})
      </p>

      {/* Amount in Words */}
      <p className="mt-4 text-lg">
        <span className="font-bold">Amount in Words:</span>{" "}
        <span className="text-gray-800">{numberToWords(netPayable)}</span>
      </p>
    </div>
    </div>
  );
};

export default IncomeDetailsSection;
