import React, {
   useState,
   useEffect,
   useReducer,
   useContext,
   useRef,
} from 'react';

import Card from '../UI/Card/Card';
import Input from '../UI/Input/Input';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

const Login = (props) => {
   //useReducer로 변경
   //  const [enteredEmail, setEnteredEmail] = useState('');
   //  const [emailIsValid, setEmailIsValid] = useState();
   //  const [enteredPassword, setEnteredPassword] = useState('');
   //  const [passwordIsValid, setPasswordIsValid] = useState();

   const authContext = useContext(AuthContext);
   const emailInputRef = useRef();
   const passwordInputRef = useRef();
   const [formIsValid, setFormIsValid] = useState(false);

   const emailReducer = (state, action) => {
      if (action.type === 'USER_INPUT') {
         return { value: action.val, isValid: action.val.includes('@') };
      }
      if (action.type === 'INPUT_BLUR') {
         return { value: state.value, isValid: state.value.includes('@') };
      }
      return { value: '', isValid: false };
   };

   const [emailState, dispatchEmail] = useReducer(emailReducer, {
      value: '',
      isValid: null,
   });

   const passwordReducer = (state, action) => {
      if (action.type === 'USER_INPUT') {
         return { value: action.val, isValid: action.val.trim().length > 6 };
      }
      if (action.type === 'INPUT_BLUR') {
         return { value: state.value, isValid: state.value.trim().length > 6 };
      }
      return { value: '', isValid: false };
   };

   const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
      value: '',
      isValid: null,
   });

   //useEffect() 사용 시 불필요한 useEffect사용을 막기위해,
   //email과 password변경될 때마다 실행되지 않고, ( [emailSate, passwordState] )
   //유효성 검사를 통과한 후 한 번, 다시 유효성 검사를 어긴 후 한 번만 실행되도록 하기위해
   //각 state의 isValid값을 구조분해를 통한 별칭을 부여하여
   //[emailSate, passwordState] => [emailIsValid, passwordIsValid]로 변경
   const { isValid: emailIsValid } = emailState;
   const { isValid: passwordIsValid } = passwordState;

   useEffect(() => {
      const identifier = setTimeout(() => {
         setFormIsValid(emailIsValid && passwordIsValid);
      }, 500);

      return () => {
         clearTimeout(identifier);
      };
   }, [emailIsValid, passwordIsValid]);

   const emailChangeHandler = (event) => {
      // setEnteredEmail(event.target.value);
      dispatchEmail({ type: 'USER_INPUT', val: event.target.value });

      // setFormIsValid(
      //    // event.target.value.includes('@') && enteredPassword.isValid
      //    event.target.value.includes('@') && passwordState.isValid
      // );
   };

   const passwordChangeHandler = (event) => {
      // setEnteredPassword(event.target.value);
      dispatchPassword({ type: 'USER_INPUT', val: event.target.value });

      // setFormIsValid(
      //    emailState.isValid && event.target.value.trim().length > 6
      //    //enteredEmail.isValid && event.target.value.trim().length > 6
      // );
   };

   const validateEmailHandler = () => {
      // setEmailIsValid(enteredEmail.includes('@'));
      dispatchEmail({ type: 'INPUT_BLUR' });
   };

   const validatePasswordHandler = () => {
      // setPasswordIsValid(enteredPassword.trim().length > 6);
      dispatchPassword({ type: 'INPUT_BLUR' });
   };

   const submitHandler = (event) => {
      event.preventDefault();
      if (formIsValid) {
         authContext.onLogin(emailState.value, passwordState.value);
      } else if (!emailIsValid) {
         emailInputRef.current.activate();
      } else {
         passwordInputRef.current.activate();
      }
   };

   return (
      <Card className={classes.login}>
         <form onSubmit={submitHandler}>
            <Input
               ref={emailInputRef}
               id="email"
               label="E-Mail"
               type="email"
               isValid={emailIsValid}
               value={emailState.value}
               onChange={emailChangeHandler}
               onBlur={validateEmailHandler}
            />
            <Input
               ref={passwordInputRef}
               id="password"
               label="Password"
               type="password"
               isValid={passwordIsValid}
               value={passwordState.value}
               onChange={passwordChangeHandler}
               onBlur={validatePasswordHandler}
            />
            <div className={classes.actions}>
               <Button
                  type="submit"
                  className={classes.btn}
                  // disabled={!formIsValid}
               >
                  Login
               </Button>
            </div>
         </form>
      </Card>
   );
};

export default Login;
