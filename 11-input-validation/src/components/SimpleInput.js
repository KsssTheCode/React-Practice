import { useEffect, useRef, useState } from 'react';

const SimpleInput = (props) => {
   const nameInputRef = useRef();
   const [enteredName, setEnteredName] = useState('');
   const [nameIsValid, setNameIsValid] = useState(false);
   const [nameTouched, setNameTouched] = useState(false);

   useEffect(() => {
      if (nameIsValid) {
         console.log('Name input is valid!');
      }
   });

   const nameInputChangeHandler = (e) => {
      setEnteredName(e.target.value);
   };

   const formSubmissionHandler = (e) => {
      e.preventDefault();

      setNameTouched(true);

      if (enteredName.trim() == '') {
         setNameIsValid(false);
         return;
      }
      setNameIsValid(true);

      console.log(enteredName);
      const enteredValue = nameInputRef.current.value;
      console.log(enteredValue);

      setEnteredName('');
   };

   const nameInputIsInvalid = !nameIsValid && nameTouched;

   const nameInputClasses = nameInputIsInvalid
      ? 'form-control invalid'
      : 'form-control';

   return (
      <form onSubmit={formSubmissionHandler}>
         <div className={nameInputClasses}>
            <label htmlFor="name">Your Name</label>
            <input
               ref={nameInputRef}
               type="text"
               id="name"
               onChange={nameInputChangeHandler}
               value={enteredName}
            />
            {nameIsValid && <p className="error-text">Name must no be empty</p>}
         </div>
         <div className="form-actions">
            <button type="submit">Submit</button>
         </div>
      </form>
   );
};

export default SimpleInput;
