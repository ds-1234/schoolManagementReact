import React from 'react';
import Select from 'react-select';
import { Controller } from 'react-hook-form';

const SelectDropdown = ({
  options,
  isMulti = false,
  placeholder = "Select...",
  name,
  control,
}) => {
  return (
    <div className="w-1/2 mt-1">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            isMulti={isMulti}
            placeholder={placeholder}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(selectedOption) => field.onChange(selectedOption)}
            value={field.value || (isMulti ? [] : null)}
          />
        )}
      />
    </div>
  );
};

export default SelectDropdown;
