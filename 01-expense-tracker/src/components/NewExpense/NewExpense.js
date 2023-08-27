import React, { useState } from 'react';

import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

const NewExpense = (props) => {
   const [convertFormButton, setConvertFormButton] = useState(true);

   const onConvertFormHandler = () => {
      setConvertFormButton((prev) => {
         return !prev;
      });
   };
   const saveExpenseDataHandler = (newExpenseData) => {
      const expenseData = {
         ...newExpenseData,
         id: Math.random().toString(),
      };
      props.onAddExpense(expenseData);
   };

   return (
      <div className="new-expense">
         {convertFormButton ? (
            <button onClick={onConvertFormHandler}>Add New Expense</button>
         ) : (
            <ExpenseForm
               onConvert={onConvertFormHandler}
               onSaveExpenseData={saveExpenseDataHandler}
            />
         )}
      </div>
   );
};

export default React.memo(NewExpense);
