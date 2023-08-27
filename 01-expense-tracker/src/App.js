// import React from 'react';
import React, { useState } from 'react';
import Expenses from './components/Expenses/Expenses';
import NewExpense from './components/NewExpense/NewExpense';

const App = () => {
   const [expenses, setExpenses] = useState([
      {
         id: 'e1',
         title: 'Toilet Paper',
         amount: 94.12,
         date: new Date(2020, 7, 14),
      },
      {
         id: 'e2',
         title: 'New TV',
         amount: 799.49,
         date: new Date(2021, 2, 12),
      },
      {
         id: 'e3',
         title: 'Car Insurance',
         amount: 294.67,
         date: new Date(2021, 2, 28),
      },
      {
         id: 'e4',
         title: 'New Desk (Wooden)',
         amount: 450,
         date: new Date(2021, 5, 12),
      },
   ]);

   const addExpenseHandler = (newExpense) => {
      setExpenses((prevExpense) => {
         //[...prevExpense, newExpense]와 [newExpense, ...prevExpense]의 차이점은 newExpense가 배열의 최우선 객체가 될지, 마지막 객체가 될 지 결정됨
         return [newExpense, ...prevExpense];
      });
   };

   //  return React.createElement(
   //     'div',
   //     {},
   //     React.createElement('h2', {}, "Let's get started!"),
   //     React.createElement(Expenses, { items: expenses })
   //  );
   return (
      <div>
         <NewExpense onAddExpense={addExpenseHandler} />
         <div className="expenses">
            <Expenses items={expenses} />
         </div>
      </div>
   );
};

export default App;
