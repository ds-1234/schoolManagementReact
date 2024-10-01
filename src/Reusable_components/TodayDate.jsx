import React , { useState , useEffect } from 'react'

function TodayDate({label , labelClass , register , required = false , name , className }) {
    const [minDate, setMinDate] = useState('');
    const [defaultDate, setDefaultDate] = useState('');
  
    useEffect(() => {
      const today = new Date();
      const formatted = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
      setMinDate(formatted);
      setDefaultDate(formatted);
      // onDateChange(formatted) ; 
    }, []);

    // const handleChange = (e) => {
    //     onDateChange(e.target.value) ;
    // }

  return (
    <div>
        <label className={labelClass} >{label} *</label>
        <input
        {...register(name , { required })}
        type="date"
        className={className}
        min={minDate} 
        defaultValue={defaultDate} 
        placeholder="Select Date"
        // onChange={handleChange}
        />
    </div>
  )
}

export default TodayDate