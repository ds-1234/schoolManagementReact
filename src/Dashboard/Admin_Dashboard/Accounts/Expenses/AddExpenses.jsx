import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';
import ToggleButton from '../../../../Reusable_components/ToggleButton';
import Button from '../../../../Reusable_components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import BASE_URL from '../../../../conf/conf';

function AddExpenses() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const [value, setValue] = useState(true);
  const [expenseCat, setExpenseCat] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  // State for payment method dropdown
const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
const [payDropdownOpen, setPayDropdownOpen] = useState(false);

// Function to handle selection of payment method
const handleSelectPaymentMethod = (method) => {
  setSelectedPaymentMethod(method);
  setPayDropdownOpen(false);
};


  const fetchExpenseCat = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/expenseCat/getExpenseCatList`);
      setExpenseCat(response.data.data);
    } catch (error) {
      toast.error("Error fetching Expense Category");
    }
  };

  useEffect(() => {
    fetchExpenseCat();
  }, []);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category.expenseCategoryName);
    setDropdownOpen(false);
  };

  const onSubmit = (data) => {
    const selectedExpenseCategory = expenseCat.find(cat => cat.expenseCategoryName === selectedCategory);

    if (selectedExpenseCategory) {
      axios({
        method: "POST",
        url: `${BASE_URL}/expenses/createExpenses`,
        data: {
          name: data.expenseName,
          expenseType: {
            id: selectedExpenseCategory.id,
            expenseCategoryId: selectedExpenseCategory.expenseCategoryId,
            expenseCategoryName: selectedExpenseCategory.expenseCategoryName,
            expenseCategoryDescription: selectedExpenseCategory.expenseCategoryDescription ,
            isActive: selectedExpenseCategory.isActive
          },
          amount: data.amount,
          paymentMode: selectedPaymentMethod,
          date: data.date,
          email: data.email,
          isActive: value
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        toast.success("Successfully added expense!");
        navigate('/admin/Expenses');
        setValue(true);
      })
      .catch(err => {
        toast.error("Error adding new expense!");
        setValue(true);
      });
    } else {
      toast.error("Please select a valid expense category.");
    }
  };

  return (
    <div className='pl-0 h-full'>
      <h1 className='text-lg md:text-2xl pl-20 pt-8 font-semibold text-black'>Add Expenses</h1>
      <p className='pl-20 mt-2'>Dashboard /<NavLink to='/admin'> Admin </NavLink>/ <NavLink to='/admin/Expenses'> Expenses </NavLink> / <span className='text-[#ffae01] font-semibold'>Add Expense</span></p>

      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl my-20 ml-24">
        <h2 className="text-2xl font-semibold mb-6 text-black">Add New Expense</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Expense Name */}
            <div>
              <label className="flex text-sm font-medium mb-2 text-black" htmlFor="expenseName">
                Expense Name *
              </label>
              <input
                type="text"
                id="expenseName"
                {...register("expenseName", { required: "Expense Name is required" })}
                className="block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-[#f3f4f6] py-1 px-1"
              />
              {errors.expenseName && (
                <p className="text-red-500 text-sm">{errors.expenseName.message}</p>
              )}
            </div>

            {/* Expense Category Dropdown */}
            <div className="relative">
              <label htmlFor="category" className="block text-sm font-medium mb-2 text-black">Category *</label>
              <div
                className=" h-9 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-[#f3f4f6] py-2 px-3 cursor-pointer flex justify-between items-center"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <p>{selectedCategory || 'Select a category'}</p>
                <FontAwesomeIcon icon={faAngleDown} />
              </div>
              {dropdownOpen && (
                <div className="absolute bg-white border rounded-lg mt-1 flex flex-col w-full z-10">
                  {expenseCat.map((category) => (
                    <div
                      key={category.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelectCategory(category)}
                    >
                      {category.expenseCategoryName}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Date */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-2 text-black">Date *</label>
              <input
                {...register('date', { required: 'Date is required' })}
                className="block h-9 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-[#f3f4f6] py-2 px-3"
                placeholder="Select Date"
                onFocus={(e) => {
                  e.target.type = 'date';
                  e.target.placeholder = '';
                }}
                onBlur={(e) => {
                  const value = e.target.value;
                  e.target.type = 'text';
                  e.target.placeholder = 'Select Date';

                  if (value) {
                    const [year, month, day] = value.split('-');
                    e.target.value = `${day}/${month}/${year}`;
                  }
                }}
                aria-invalid={errors.date ? 'true' : 'false'}
              />
              {errors.date && (
                <p className="text-red-500 text-sm">{errors.date.message}</p>
              )}
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium mb-2 text-black" htmlFor="amount">Amount *</label>
              <input
                type="number"
                id="amount"
                {...register("amount", { required: "Amount is required" })}
                className="block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-[#f3f4f6] py-1 px-1"
              />
              {errors.amount && (
                <p className="text-red-500 text-sm">{errors.amount.message}</p>
              )}
            </div>

            {/* Invoice Number */}
            <div>
              <label className="block text-sm font-medium mb-2 text-black" htmlFor="invoiceno">Invoice Number *</label>
              <input
                type="number"
                id="invoiceno"
                {...register("invoiceno", { required: "Invoice Number is required" })}
                className="block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-[#f3f4f6] py-1 px-1"
              />
              {errors.invoiceno && (
                <p className="text-red-500 text-sm">{errors.invoiceno.message}</p>
              )}
            </div>

            {/* Payment Method */}
            {/* <div>
              <label className="block text-sm font-medium mb-2 text-black" htmlFor="paymentmethod">Payment Method *</label>
              <input
                type="text"
                id="paymentmethod"
                {...register("paymentmethod", { required: "Payment Method is required" })}
                className="block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-[#f3f4f6] py-1 px-1"
              />
              {errors.paymentmethod && (
                <p className="text-red-500 text-sm">{errors.paymentmethod.message}</p>
              )}
            </div> */}

            {/* Payment Method */}
<div className="relative">
  <label htmlFor="paymentmethod" className="block text-sm font-medium mb-2 text-black">
    Payment Method *
  </label>
  <div
    className="h-9 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-[#f3f4f6] py-2 px-3 cursor-pointer flex justify-between items-center"
    onClick={() => setPayDropdownOpen(!payDropdownOpen)}
  >
    <p>{selectedPaymentMethod || 'Select Payment Method'}</p>
    <FontAwesomeIcon icon={faAngleDown} />
  </div>
  {payDropdownOpen && (
    <div className="absolute bg-white border rounded-lg mt-1 flex flex-col w-full z-10">
      <div
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        onClick={() => handleSelectPaymentMethod('Cash')}
      >
        Cash
      </div>
      <div
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        onClick={() => handleSelectPaymentMethod('Online')}
      >
        Online
      </div>
    </div>
  )}
</div>


            {/* Status Toggle */}
            <div className="mb-2">
              <label className="block text-sm font-medium mb-2 text-black" htmlFor="active">Status *</label>
              <ToggleButton
                isOn={value}
                handleToggle={() => setValue(!value)}
                id="active"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            <Button type="submit" className="px-8" />
            <Button
              type="button"
              onClick={() => reset()}
              className="px-8 bg-[#ffae01] hover:bg-[#042954]"
              label="Reset"
            />
            <ToastContainer />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddExpenses;
