import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import Button from './Button';
import Card from './Card';
import classes from './ErrorModal.module.css';

const Backdrop = (props) => {
   return <div className={classes.backdrop} onClick={props.onConfirm}></div>;
};

const Overlay = (props) => {
   return (
      <Card className={classes.modal}>
         <header className={classes.header}>
            <h2 className={classes.h2}>{props.title}</h2>
         </header>
         <div className={classes.content}>{props.message}</div>
         <footer>
            <Button
               className={classes.actions}
               onClick={props.onConfirmClicked}
            >
               Okay
            </Button>
         </footer>
      </Card>
   );
};

const ErrorModal = (props) => {
   return (
      <Fragment>
         {ReactDOM.createPortal(
            <Backdrop onConfirm={props.onConfirm} />,
            document.getElementById('backdrop-root')
         )}
         {
            (ReactDOM.createPortal(
               <Overlay
                  title={props.title}
                  message={props.message}
                  onConfirm={props.onConfirmClicked}
               />
            ),
            document.getElementById('overlay-root'))
         }
      </Fragment>
   );
};

export default ErrorModal;
