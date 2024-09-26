import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';

function EditExpenses({ isOpen, onClose, expenseId, onSuccess }) {
  const [expense, setExpense] = useState({ Expense: '', category: '', date: '', amount: '',invoice: '',payment: ''});
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [value, setValue] = useState(true);



  useEffect(() => {
    if (isOpen) {
      axios({
        method: 'GET',
        url: `http://localhost:8080/expenses/getExpensesById/${expenseId}`,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          setExpense(response.data.data);
          // Reset the form with the fetched data
          reset({
            Expense: response.data.data.name,
            category: response.data.data.expenseType.expenseCategoryName,
            date: response.data.data.date,
            amount: response.data.data.amount,
            invoice: '',
            payment: response.data.data.payment_mode,
          });
          // Update the toggle button value
        //   setValue(response.data.data.isActive === 'true');
        })
        .catch((error) => {
          console.error('Error fetching Expense:', error);
        });
    }
  }, [expenseId, isOpen, reset]);

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
          <h2 className="text-2xl font-bold mb-6 text-center text-[#042954]">View Expense</h2>

          {/* Expense Input */}
          <div className="mb-1">
            <label htmlFor="Expense" className="block text-gray-700 font-semibold mb-1">Expense Name</label>
            <input
            readOnly
              type="text"
              id="Expense"
              className={`w-full px-3 py-2 border ${errors.Expense ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register('Expense')}
              value={expense.Expense}
            />
            {errors.Expense && <p className="text-red-500 text-sm mt-1">{errors.Expense.message}</p>}
          </div>

          {/* Category from */}
          <div className="mb-1">
            <label htmlFor="category" className="block text-gray-700 font-semibold mb-1">Category</label>
            <input
            readOnly
              type="text"
              id="category"
              className={`w-full px-3 py-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register('category')}
              value={expense.category}
            />
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
          </div>

          {/* Date Upto */}
          <div className="mb-1">
            <label htmlFor="date" className="block text-gray-700 font-semibold mb-1">Date Of Expense</label>
            <input
            readOnly
              type="text"
              id="date"
              className={`w-full px-3 py-2 border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register('date')}
              value={expense.date}
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
              value={expense.amount}
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
              value={expense.invoice}
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
              value={expense.payment}
            />
            {errors.payment && <p className="text-red-500 text-sm mt-1">{errors.payment.message}</p>}
          </div>


        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EditExpenses;
