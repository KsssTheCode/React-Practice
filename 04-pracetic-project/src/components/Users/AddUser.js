import React, { useState, Fragment, useRef } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';

import classes from './AddUser.module.css';
import ErrorModal from '../UI/ErrorModal';

const AddUser = (props) => {
   const [error, setError] = useState();
   const nameInputRef = useRef();
   const ageInputRef = useRef();
   const id = useRef(1);

   const onSubmitHandler = (e) => {
      e.preventDefault();

      const enteredName = nameInputRef.current.value;
      const enteredAge = ageInputRef.current.value;

      if (enteredName.trim().length === 0 || enteredAge.trim().length === 0) {
         setError({
            title: 'Invalid Input',
            message: 'Please enter a valid name and age (non-empty values)',
         });
         return;
      }

      if (+enteredAge < 1) {
         setError({
            title: 'Invalid Input',
            message: 'Please set age greater than 0',
         });
         return;
      }

      props.onAddUser(enteredName, enteredAge, id.current);
      nameInputRef.current.value = '';
      ageInputRef.current.value = '';
      id.current += 1;
   };

   const onCloseModal = () => {
      setError(null);
   };

   return (
      <Fragment>
         {error && (
            <ErrorModal
               title={error.title}
               message={error.message}
               onConfirmClicked={onCloseModal}
            />
         )}
         <Card className={classes.input}>
            <form onSubmit={onSubmitHandler}>
               <input type="hidden" name="id" value={id.current} />
               <label htmlFor={classes.userName}>Name</label>
               <input name="userName" type="text" ref={nameInputRef} />
               <label htmlFor={classes.age}>Age</label>
               <input name="age" type="number" ref={ageInputRef} />
               <Button type="submit">Add User</Button>
            </form>
         </Card>
      </Fragment>
   );
};

export default AddUser;
