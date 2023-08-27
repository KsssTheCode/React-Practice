import React, { useState } from 'react';
import './ExpenseItem.css';

import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';

const ExpenseItem = (props) => {
   const [title, setNewTitle] = useState(props.title);
   const [amount, setNewAmount] = useState(props.amount);
   const [date, setNewDate] = useState(props.date);

   return (
      <li>
         <Card className="expense-item">
            <ExpenseDate date={date} />
            <div className="expense-item__description">
               <h2>{title}</h2>
               <div className="expense-item__price">${amount}</div>
            </div>
         </Card>
      </li>
   );
};

export default React.memo(ExpenseItem);
