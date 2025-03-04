import React from 'react';

const DatePicker = ({ labelClass , name, label,register , required ,  className , onChange }) => {

  // Function to format the date to dd/mm/yyyy
  const formatDateToDDMMYYYY = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  // Function to get the current date in yyyy-mm-dd format
  const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`; // Format as yyyy-mm-dd
  };

  const handleFocus = (e) => {
    e.target.type = 'date';
    e.target.placeholder = '';
  };

  const handleBlur = (e) => {
    const value = e.target.value;
    e.target.type = 'text'; // Switch back to text input on blur
    e.target.placeholder = 'Select Date'; // Restore placeholder
    if (value) {
      e.target.value = formatDateToDDMMYYYY(value);
    }
  };

  return (
    <div className='flex flex-col'>
      <label className={labelClass} >{label} <span className='text-red-700 font-bold'>*</span></label>
      <input
        className={className}
        placeholder="Select Date"
        onFocus={handleFocus}
        onBlur={handleBlur}
        max={getCurrentDate()} // Restrict future dates
        onChange={onChange}
        {...(register && register(name, { required }))}
      />
    </div>
  );
};

export default DatePicker;
