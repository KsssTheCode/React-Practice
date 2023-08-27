import React, { useState } from 'react';

import './Expenses.css';
import ExpensesList from './ExpensesList';
import ExpensesFilter from './ExpensesFilter';
import ExpensesChart from './ExpensesChart';

const Expenses = ({ items }) => {
   const [yearOfFilter, setYearOfFilter] = useState('2020');

   const filterChangeHandler = (year) => {
      setYearOfFilter(year);
   };

   const filteredExpenses = items.filter(
      (expense) => expense.date.getFullYear().toString() === yearOfFilter
   );

   return (
      <div>
         <ExpensesFilter
            onChangeFilter={filterChangeHandler}
            yearOfFilter={yearOfFilter}
         />
         <ExpensesChart expenses={filteredExpenses} />
         <ExpensesList items={filteredExpenses} />
      </div>
   );
};

export default Expenses;
