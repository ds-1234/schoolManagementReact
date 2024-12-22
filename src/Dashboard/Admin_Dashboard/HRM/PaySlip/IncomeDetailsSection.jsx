import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import PaySlip from './PaySlip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

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

  const convertNumberToWords = (number) => {
    const units = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const tens = [
      "",
      "Ten",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    const teens = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const crore = "Crore";
    const lakh = "Lakh";
    const arab = "Arab";
    const currency = "Rupees";
    const paisa = "Paisa";
    
    if (number === 0) {
      return "Zero " + currency;
    }

    let words = "";
    
    if (number >= 1000000000) {
      words +=
        convertNumberToWords(Math.floor(number / 1000000000)) +
        " " +
        arab +
        " ";
      number %= 1000000000;
    }
    if (number >= 10000000) {
      words +=
        convertNumberToWords(Math.floor(number / 10000000)) + " " + crore + " ";
      number %= 10000000;
    }

    if (number >= 100000) {
      words +=
        convertNumberToWords(Math.floor(number / 100000)) + " " + lakh + " ";
      number %= 100000;
    }

    if (number >= 1000) {
      words += convertNumberToWords(Math.floor(number / 1000)) + " Thousand ";
      number %= 1000;
    }

    if (number >= 100) {
      words += convertNumberToWords(Math.floor(number / 100)) + " Hundred ";
      number %= 100;
    }

    if (number >= 20) {
      words += tens[Math.floor(number / 10)] + " ";
      number %= 10;
    } else if (number >= 10) {
      console.log(number);
      words += teens[number - 10] + " ";
      number = 0;
      console.log(words);
    }

    if (number > 0) {
      words += units[number] + " ";
    }
    const decimalPart = Math.round((number % 1) * 100);
    console.log(decimalPart);
    if (decimalPart > 0) {
      words += "and" + decimalPart + " " + paisa + "only ";
    }
    
    console.log(words);
    return words.trim() + " ";
  };

  const generatePayload = () => {
    const totalGrossEarnings = grossEarning + leftAdditionalFields.reduce((sum, field) => sum + parseFloat(field.value || 0), 0);
    const totalGrossDeductions = grossDeduction + rightAdditionalFields.reduce((sum, field) => sum + parseFloat(field.value || 0), 0);
    const netPay = totalGrossEarnings - totalGrossDeductions;

    return {
      basicPayEarning: parseFloat(watchFields.basic || 0).toString(),
      houseRentAllowEarning: parseFloat(watchFields.houseRentAllowance || 0).toString(),
      specialPayAllowance: parseFloat(watchFields.specialPayAllowance || 0).toString(),
      overTimePay: parseFloat(watchFields.overTimePay || 0).toString().toString(),
      earningFieldsList: leftAdditionalFields.map((field) => ({
        earningFieldName: field.name,
        earningFieldValue: field.value
      })),
      grossSalary: grossEarning.toString(),
      incomeTaxDeduction: parseFloat(watchFields.incomeTaxDeduction || 0).toString(),
      pfDeduction: parseFloat(watchFields.pfDeduction || 0).toString(),
      gratuityDeduction: parseFloat(watchFields.gratuityDeduction || 0).toString(),
      professionalTax: parseFloat(watchFields.professionalTax || 0).toString(),
      advancePay: parseFloat(watchFields.advancePay || 0).toString(),
      deductionFieldsList: rightAdditionalFields.map((field) => ({
        deductionFieldName: field.name,
        deductionFieldValue: field.value
      })),
      totalDeduction: grossDeduction.toString(),
      totalNetPay: netPay.toString(),
      netPayAmountInWords: convertNumberToWords(netPay)
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
    const updatedPayload = generatePayload();
    onPayloadUpdate(updatedPayload);
  }, [grossEarning, grossDeduction]);

  




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
    <div className="grid grid-cols-2 gap-8 p-6">
      {/* Left Section */}
      <div className="flex flex-col space-y-6 bg-white shadow-lg  pr-6 border-r border-gray-300">
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
          {/* <h3 className="text-lg font-semibold mb-4">Additional Fields </h3> */}
          {leftAdditionalFields.map((field) => (
            <div key={field.id} className="flex items-center gap-4 mb-3">
              <input
                type="text"
                placeholder="Field Name *"
                value={field.name}
                onChange={(e) =>
                  handleLeftFieldChange(field.id, 'name', e.target.value)
                }
                required
                className="py-2 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none w-1/2"
              />
              <input
                type="number"
                placeholder="Field Value *"
                value={field.value}
                onChange={(e) =>
                  handleLeftFieldChange(field.id, 'value', e.target.value)
                }
                required
                className="py-2 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none w-1/2"
              />
              {/* <button
                onClick={() => handleDeleteLeftField(field.id)}
                className="py-1 px-3 bg-red-500 text-white rounded-lg"
              >
                Delete
              </button> */}
                <button
                    type="button"
                    onClick={() => handleDeleteLeftField(field.id)}
                    className="text-red-500 hover:text-red-700"
                >
                    <FontAwesomeIcon icon={faTrashCan} />
                </button> 
            </div>
          ))}
          <span
            onClick={handleAddLeftField}
            className="text-blue-500 cursor-pointer flex items-center gap-2"
          >
            <span className="text-xl">+</span> Add Earnings 
          </span>
          
        </div>
                {/* Gross Earning */}
                <div className="flex items-center gap-4 mt-4 mb-2">
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
      <div className="flex flex-col space-y-6 bg-white shadow-lg pl-6 ">
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
          {/* <h3 className="text-lg font-semibold mb-4">Additional Fields </h3> */}
          {rightAdditionalFields.map((field) => (
            <div key={field.id} className="flex items-center gap-4 mb-3">
              <input
                type="text"
                placeholder="Field Name *"
                value={field.name}
                onChange={(e) =>
                  handleRightFieldChange(field.id, 'name', e.target.value)
                }
                required
                className="py-2 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none w-1/2"
              />
              <input
                type="number"
                placeholder="Field Value *"
                value={field.value}
                onChange={(e) =>
                  handleRightFieldChange(field.id, 'value', e.target.value)
                }
                required
                className="py-2 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none w-1/2"
              />
              {/* <button
                onClick={() => handleDeleteRightField(field.id)}
                className="py-1 px-3 bg-red-500 text-white rounded-lg"
              >
                Delete
              </button> */}
              <button
                type="button"
                onClick={() => handleDeleteRightField(field.id)}
                className="text-red-500 hover:text-red-700"
                >
                <FontAwesomeIcon icon={faTrashCan} />
                </button> 
            </div>
          ))}
          <span
            onClick={handleAddRightField}
            className="text-blue-500 cursor-pointer flex items-center gap-2"
          >
            <span className="text-xl">+</span> Add Deductions
          </span>
        </div>
                {/* Gross Deduction */}
                <div className="flex items-center gap-4 mt-4 mb-2">
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
        <span className="text-gray-800">{convertNumberToWords(netPayable)}</span>
      </p>
    </div>
    </div>
  );
};

export default IncomeDetailsSection;
