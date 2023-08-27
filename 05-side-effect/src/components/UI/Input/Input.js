import React, { useRef, useImperativeHandle } from 'react';
import classes from './Input.module.css';

//useImperativeHandle사용을 위해 forwardRef사용
//(Ref와 바인딩될 수 있는 리액트 컴포넌트)
const Input = React.forwardRef((props, ref) => {
   const inputRef = useRef();
   const activate = () => {
      inputRef.current.focus();
   };

   useImperativeHandle(ref, () => {
      return {
         activate: activate,
      };
   });
   return (
      <div
         className={`${classes.control} ${
            props.isValid === false ? classes.invalid : ''
         }`}
      >
         <label htmlFor={props.id}>{props.label}</label>
         <input
            ref={inputRef}
            type={props.type}
            id={props.id}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
         />
      </div>
   );
});

export default Input;
