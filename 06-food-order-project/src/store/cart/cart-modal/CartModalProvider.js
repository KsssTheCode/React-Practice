import React, { useState } from 'react';
import CartModalContext from './cart-modal-context';

const CartModalProvider = (props) => {
   const [activeCartModal, setActiveCartModal] = useState(false);

   const openCartModalHandler = () => {
      setActiveCartModal(true);
   };

   const hideCartModalHandler = () => {
      setActiveCartModal(false);
   };

   return (
      <CartModalContext.Provider
         value={{
            activeCartModal: activeCartModal,
            openCartModal: openCartModalHandler,
            hideCartModal: hideCartModalHandler,
         }}
      >
         {props.children}
      </CartModalContext.Provider>
   );
};

export default CartModalProvider;
