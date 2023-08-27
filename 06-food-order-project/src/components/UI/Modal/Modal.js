import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import CartModalContext from '../../../store/cart/cart-modal/cart-modal-context';

import classes from './Modal.module.css';

const Backdrop = () => {
   const cartModalContext = useContext(CartModalContext);
   return (
      <div
         className={classes.backdrop}
         onClick={cartModalContext.hideCartModal}
      ></div>
   );
};

const ModalOverlay = (props) => {
   return (
      <div className={classes.modal}>
         <div className={classes.content}>{props.children}</div>
      </div>
   );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
   return (
      <div className={classes.modal}>
         {ReactDOM.createPortal(<Backdrop />, portalElement)}
         {ReactDOM.createPortal(
            <ModalOverlay>{props.children}</ModalOverlay>,
            portalElement
         )}
      </div>
   );
};

export default Modal;
