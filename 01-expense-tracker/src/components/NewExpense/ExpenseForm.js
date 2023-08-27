import React, { useState } from 'react';

import './ExpenseForm.css';

const ExpenseForm = (props) => {
   const [enteredTitle, setEnteredTitle] = useState('');
   const [enteredAmount, setEnteredAmount] = useState('');
   const [enteredDate, setEnteredDate] = useState('');

   //form에 대한 data state를 독립적으로 관리할 때
   const titleChangeHandler = (e) => {
      setEnteredTitle(e.target.value);
   };

   const amountChangeHandler = (e) => {
      setEnteredAmount(e.target.value);
   };

   const dateChangeHandler = (e) => {
      setEnteredDate(e.target.value);
   };

   //  const [formData, setFormData] = useState({
   //     enteredTitle: '',
   //     enteredAmount: '',
   //     eneterDate: '',
   //  });
   //리액트는 변경된 State를 바로 반엳하는 것이 아니라,
   //변경된 상태를 다음 렌더링 될 때 보여질 수 있도록 '변경하도록 예약'하는 것이므로
   //따라서, 항상 최신의 상태를 반영하여 작업하는 경우 아래 방법을 추천!
   //  const titleChangeHandler = (e) => {
   //     //form에 대한 Data를 객체로써 관리할 때, (좋지않은 방법)
   //     // setFormDate({ ...formData, enteredTitle: e.target.value });
   //     //동시에 수 많은 상태 업데이터를 해야할 경우, 오래된 정보이거나 잘못된 상태에 의존 할 수 있음
   //     setFormData((prevState) => {
   //        return setFormData({ ...prevState, enteredTitle: e.target.value });
   //     });
   //  };
   //  const amountChangeHandler = (e) => {
   //     //form에 대한 Data를 객체로써 관리할 때, (좋지않은 방법)
   //     // setFormDate({ ...formData, enteredAmount: e.target.value });
   //     setFormData((prevState) => {
   //        return setFormData({ ...prevState, enteredAmount: e.target.value });
   //     });
   //  };
   //  const dateChangeHandler = (e) => {
   //     //form에 대한 Data를 객체로써 관리할 때, (좋지않은 방법)
   //     // setFormDate({ ...formData, eneterDate: e.target.value });
   //     setFormData((prevState) => {
   //        return setFormData({ ...prevState, enteredDate: e.target.value });
   //     });
   //  };
   const submitHandler = (e) => {
      e.preventDefault();
      const newExpenseData = {
         title: enteredTitle,
         amount: +enteredAmount,
         date: new Date(enteredDate),
      };

      props.onSaveExpenseData(newExpenseData);

      setEnteredTitle('');
      setEnteredAmount('');
      setEnteredDate('');
   };

   return (
      <form onSubmit={submitHandler}>
         <div className="new-expense__controls">
            <div className="new-expense__control">
               <label>TItle</label>
               <input
                  type="text"
                  value={enteredTitle}
                  onChange={titleChangeHandler}
               />
            </div>
            <div className="new-expense__control">
               <label>Amount</label>
               <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={enteredAmount}
                  onChange={amountChangeHandler}
               />
            </div>
            <div className="new-expense__control">
               <label>Date</label>
               <input
                  type="date"
                  min="2019-01-01"
                  max="2022-12-31"
                  value={enteredDate}
                  onChange={dateChangeHandler}
               />
            </div>
         </div>
         <div className="new-expense__actions">
            <button type="button" onClick={props.onConvert}>
               Cancel
            </button>
            <button type="submit">Add Expense</button>
         </div>
      </form>
   );
};

export default React.memo(ExpenseForm);
