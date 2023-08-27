import React, { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import CartModalContext from '../../store/cart/cart-modal/cart-modal-context';
import CartContext from '../../store/cart/cart-context';

import classes from './HeaderCartButton.module.css';
import './Header.module.css';

const HeaderCartButton = () => {
   const [buttonHilight, setButtonHilight] = useState(false);
   const cartModalContext = useContext(CartModalContext);
   const cartContext = useContext(CartContext);

   const cartItemsCount = cartContext.items.reduce((number, item) => {
      return parseInt(number) + parseInt(item.amount);
   }, 0);

   const buttonClasses = `${classes.button} ${
      buttonHilight ? classes.bump : ''
   }`;

   useEffect(() => {
      if (cartContext.items.length === 0) {
         return;
      }
      setButtonHilight(true);

      const timer = setTimeout(() => {
         setButtonHilight(false);
      }, 300);

      return () => {
         clearTimeout(timer);
      };
   }, [cartContext.items]);

   return (
      <button
         className={buttonClasses}
         onClick={cartModalContext.openCartModal}
      >
         <span className={classes.icon}>
            <CartIcon />
         </span>
         <span>Your Cart</span>
         <span className={classes.badge}>{cartItemsCount}</span>
      </button>
   );
};

export default HeaderCartButton;
