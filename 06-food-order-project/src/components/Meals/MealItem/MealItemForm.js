import { useRef, useState } from 'react';
import Input from '../../UI/Input/Input';

import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
   const amountInputRef = useRef();

   const submitHandler = (e) => {
      e.preventDefault();
      const enteredAmount = amountInputRef.current.value;
      if (
         enteredAmount.trim().length === 0 ||
         +enteredAmount < 1 ||
         +enteredAmount > 5
      ) {
         setAmountIsValid(true);
      }
      props.onAddItem(enteredAmount);
   };

   const [amountIsValid, setAmountIsValid] = useState(false);

   return (
      <form className={classes.form} onSubmit={submitHandler}>
         <Input
            label="Amount"
            ref={amountInputRef}
            input={{
               id: 'amount_' + props.id,
               type: 'number',
               min: '1',
               max: '5',
               step: '1',
               defaultValue: '1',
            }}
         />
         <button>+ Add</button>
         {amountIsValid && <p>Please enter a valid amount (1-5)</p>}
      </form>
   );
};

export default MealItemForm;
