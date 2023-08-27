import { useRef, useState } from 'react';

import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isFiveNumber = (value) => value.trim().length === 5;

const Checkout = (props) => {
   const [formInputsValidity, setFormInputsValidity] = useState({
      name: true,
      street: true,
      city: true,
      postal: true,
   });

   const nameInputRef = useRef();
   const streetInputRef = useRef();
   const postalInputRef = useRef();
   const cityInputRef = useRef();

   const confirmHandler = (e) => {
      e.preventDefault();

      const enteredNameIsValid = !isEmpty(nameInputRef.current.value);
      const enteredStreetIsValid = !isEmpty(streetInputRef.current.value);
      const enteredCityIsValid = !isEmpty(cityInputRef.current.value);
      const enteredPostalIsValid = isFiveNumber(postalInputRef.current.value);

      setFormInputsValidity({
         name: enteredNameIsValid,
         street: enteredStreetIsValid,
         city: enteredCityIsValid,
         postal: enteredPostalIsValid,
      });

      const formIsValid =
         enteredNameIsValid &&
         enteredStreetIsValid &&
         enteredCityIsValid &&
         enteredPostalIsValid;

      if (!formIsValid) {
         return;
      }

      props.onConfirm({
         name: nameInputRef.current.value,
         street: streetInputRef.current.value,
         postal: postalInputRef.current.value,
         city: cityInputRef.current.value,
      });
   };

   const nameControlClasses = `${classes.control} ${
      formInputsValidity.name ? '' : classes.invalid
   }`;
   const streetControlClasses = `${classes.control} ${
      formInputsValidity.street ? '' : classes.invalid
   }`;
   const ciryControlClasses = `${classes.control} ${
      formInputsValidity.city ? '' : classes.invalid
   }`;
   const postalControlClasses = `${classes.control} ${
      formInputsValidity.postal ? '' : classes.invalid
   }`;

   return (
      <form onSubmit={confirmHandler}>
         <div className={nameControlClasses}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" ref={nameInputRef} />
            {!formInputsValidity.name && <p>Please enter a valid name!</p>}
         </div>
         <div className={streetControlClasses}>
            <label htmlFor="street">Street</label>
            <input type="text" id="street" ref={streetInputRef} />
            {!formInputsValidity.street && <p>Please enter a valid street!</p>}
         </div>
         <div className={postalControlClasses}>
            <label htmlFor="postal">Postal code</label>
            <input type="text" id="postal" ref={postalInputRef} />
            {!formInputsValidity.postal && (
               <p>Please enter a valid postal code!</p>
            )}
         </div>
         <div className={ciryControlClasses}>
            <label htmlFor="city">City</label>
            <input type="text" id="city" ref={cityInputRef} />
            {!formInputsValidity.city && <p>Please enter a valid city!</p>}
         </div>
         <div className={classes.actions}>
            <button type="button" onClick={props.onCancel}>
               Cancel
            </button>
            <button className={classes.submit} type="submit">
               Confirm
            </button>
         </div>
      </form>
   );
};

export default Checkout;
