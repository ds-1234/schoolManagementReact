import { Button, Input } from '@nextui-org/react';
import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AddSchool() {
    const navigate = useNavigate() 

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
      } = useForm();

      const Submitschool = (data) => {

        const formData = getValues();
        console.log(formData)
        console.log(data,"data")
    
    
        
      axios({
        method:"post",
        url : `http://localhost:8080/school/createSchool`,
        data: {
            name : data.name,
            houseNumber : data.houseNumber,
            street : data.street,
            city : data.city,
            state : data.state,
            pinCode : data.pinCode,
            country : data.country
        },
        headers: {
          "Content-Type": "application/json",
        },
    
      }).then((res)=>{
        console.log('response' , res.data)
        toast.success("successful");
      

            navigate('/admin/school' , {state: data}) ;

        
    
      }).catch(err=>{
         console.log(err,'error:')
         toast.error("error to add school");
    
      })
        
        // navigate to DashBoard
        // navigate('/dashboard' , {state: data}) ;
      };

  return (
    <div className='w-full'>
       <form
        onSubmit={handleSubmit(Submitschool)}
          className="mt-20 flex flex-col gap-4 w-2/3 mx-20"
        >
          <div className="flex gap-4">
            

            <Input
              {...register("name", {
                required: 'name is required',
                pattern: {
                  message: 'please enter a valid name',
                }
              })}
              type="name"
              label="School name"
              labelPlacement="outside"
              placeholder="Enter a name"
              classNames={{ label: "font-bold" }}
              radius="full"
              errorMessage={errors.name && "Please enter a name"}
            />
                          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}

          </div>

          

          

          <div className="flex gap-4">
            <Input
              {...register("houseNumber", {
                required: 'houseNumber is required',
              })}
              label="House Number"
              labelPlacement="outside"
              radius="full"
              classNames={{ label: "font-bold" }}
              placeholder="Enter your House number"
              errorMessage={errors.houseNumber && "Please enter your House number"}

            />
                                      {errors.houseNumber && <span className="text-red-500 text-sm">{errors.houseNumber.message}</span>}



          </div>
          <div className="flex gap-4">
            <Input
              {...register("street", {
                required: 'street is required',
              })}
              label="Street"
              labelPlacement="outside"
              radius="full"
              classNames={{ label: "font-bold" }}
              placeholder="Enter your Street"
              errorMessage={errors.street && "Please enter your street"}

            />
                                      {errors.street && <span className="text-red-500 text-sm">{errors.street.message}</span>}



          </div>
          <div className="flex gap-4">
            <Input
              {...register("city", {
                required: 'City is required',
              })}
              label="City"
              labelPlacement="outside"
              radius="full"
              classNames={{ label: "font-bold" }}
              placeholder="Enter your City"
              errorMessage={errors.city && "Please enter your City"}

            />
                                      {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}



          </div>
          <div className="flex gap-4">
            <Input
              {...register("state", {
                required: 'state is required',
              })}
              label="State"
              labelPlacement="outside"
              radius="full"
              classNames={{ label: "font-bold" }}
              placeholder="Enter your State"
              errorMessage={errors.state && "Please enter your State"}

            />
                                      {errors.state && <span className="text-red-500 text-sm">{errors.state.message}</span>}



          </div>
          <div className="flex gap-4">
            <Input
              {...register("pinCode", {
                required: 'pinCode is required',
              })}
              label="pinCode"
              labelPlacement="outside"
              radius="full"
              classNames={{ label: "font-bold" }}
              placeholder="Enter your pinCode"
              errorMessage={errors.pinCode && "Please enter your pinCode"}

            />
                                      {errors.pinCode && <span className="text-red-500 text-sm">{errors.pinCode.message}</span>}



          </div>
          <div className="flex gap-4">
            <Input
              {...register("country", {
                required: 'country is required',
              })}
              label="country"
              labelPlacement="outside"
              radius="full"
              classNames={{ label: "font-bold" }}
              placeholder="Enter your country"
              errorMessage={errors.country && "Please enter your country"}

            />
                                      {errors.country && <span className="text-red-500 text-sm">{errors.country.message}</span>}



          </div>

          <Button
            type="submit"
            radius="full"
            variant="shadow"
            color="primary"
            className="self-center mt-4"
          >
            ADD
          </Button>

        </form>
    </div>
  )
}

export default AddSchool
