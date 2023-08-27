import React, { useState } from 'react';
// import styled from 'styled-components';
import styles from './CourseInput.module.css';

import Button from '../../UI/Button/Button';

const CourseInput = (props) => {
   const [enteredValue, setEnteredValue] = useState('');
   const [isValidInput, setIsValidInput] = useState(true);

   const goalInputChangeHandler = (event) => {
      event.target.value.trim().length === 0
         ? setIsValidInput(false)
         : setIsValidInput(true);
      setEnteredValue(event.target.value);
   };

   const formSubmitHandler = (event) => {
      event.preventDefault();
      if (enteredValue.trim().length === 0) {
         setIsValidInput(false);
         return;
      }
      props.onAddGoal(enteredValue);
   };

   return (
      <form onSubmit={formSubmitHandler}>
         <div
            className={`${styles['form-control']} ${
               !isValidInput && styles.invalid
            }`}
         >
            <label>Course Goal</label>
            <input type="text" onChange={goalInputChangeHandler} />
         </div>
         <div />
         <Button type="submit">Add Goal</Button>
      </form>
   );
};

// const FormControl = styled.div`
//    margin: 0.5rem 0;

//    & label {
//       font-weight: bold;
//       display: block;
//       margin-bottom: 0.5rem;
//       color: ${(props) => (props.isValidInput ? 'red' : 'black')};
//    }

//    & input {
//       display: block;
//       width: 100%;
//       border: 1px solid ${(props) => (props.isValidInput ? 'red' : '#ccc')};
//       background: ${(props) =>
//          props.isValidInput ? '#ffdf7d7' : 'transparent'};
//       font: inherit;
//       line-height: 1.5rem;
//       padding: 0 0.25rem;
//    }

//    & input:focus {
//       outline: none;
//       background: #fad0ec;
//       border-color: #8b005d;
//    }

//    &.invalid input {
//       border-color: red;
//       background: #ffd7d7;
//    }

//    &.invalid label {
//       color: red;
//    }
// `;

export default CourseInput;
