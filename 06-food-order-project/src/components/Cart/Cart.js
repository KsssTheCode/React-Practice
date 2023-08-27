import React, { useContext } from 'react';
import CartModalContext from '../../store/cart/cart-modal/cart-modal-context';
import Modal from '../UI/Modal/Modal';
import CartContext from '../../store/cart/cart-context';
import CartItem from './CartItem';

import classes from './Cart.module.css';

const Cart = (props) => {
   const cartModalContext = useContext(CartModalContext);
   const cartContext = useContext(CartContext);

   const addCartItemHandler = (item) => {
      cartContext.addItem({ ...item, amount: 1 });
   };
   const deleteCartItemHandler = (id) => {
      cartContext.deleteItem(id);
   };

   const cartsList = (
      <ul className={classes['cart-items']}>
         {cartContext.items.map((item) => (
            <CartItem
               key={item.id}
               name={item.name}
               amount={item.amount}
               price={item.price}
               onAdd={addCartItemHandler.bind(null, item)}
               onDelete={deleteCartItemHandler.bind(null, item.id)}
            />
         ))}
      </ul>
   );
   const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;

   return (
      <Modal>
         {cartsList}
         <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
         </div>
         <div className={classes.actions}>
            <button
               className={classes['button--alt']}
               onClick={cartModalContext.hideCartModal}
            >
               Cancel
            </button>
            {cartContext.items.length > 0 ? (
               <button className={classes.button}>Order</button>
            ) : undefined}
         </div>
      </Modal>
   );
};

export default Cart;
