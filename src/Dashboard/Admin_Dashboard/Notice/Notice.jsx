import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../Reusable_components/Button'
import { Input } from '@nextui-org/react';
import { NavLink } from 'react-router-dom';

function AddNotice() {
  const { register, } = useForm();

  // Handle form submission
  const onSubmit = (data) => {
    console.log(data); 
  };

  return (
    <div  className="p-10 mx-auto ml-24 bg-white rounded-xl shadow-md space-y-6 my-10">
            <h2 className="text-2xl font-semibold text-black">Notice Board</h2>
            <p className=' mt-2'>Dashboard /<NavLink to = '/admin/user'> Admin </NavLink>/ <span className='text-[#ffae01] font-semibold'>Notice Board</span> </p>

            <div className="grid grid-cols-3 gap-6">
            <div className="flex gap-4">
            

            <Input
              {...register("date")}
              label="Search by date..."
              labelPlacement="outside"
              // classNames={{ label: "font-bold" }}
              radius="full"
            />
                      </div>
                      <div className="flex gap-4">

            <Input
              {...register("title")}
              label="Search by Title..."
              labelPlacement="outside"
              // classNames={{ label: "font-bold" }}
              radius="full"
            />
            </div>
              {/* Search Button */}
                        <div className=" space-x-4 mt-5">

              <Button 
              // onClick={() => reset()} 
              label="Search" 
              className='px-8 bg-[#ffae01] hover:bg-[#042954]'/>

</div>


            </div>

    </div>
  );
}

export default AddNotice;
