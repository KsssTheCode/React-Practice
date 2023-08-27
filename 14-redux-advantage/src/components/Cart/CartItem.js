import { useDispatch } from 'react-redux';

import { cartActions } from '../../store/cart-slice';
import classes from './CartItem.module.css';

const CartItem = (props) => {
   const dispatch = useDispatch();
   const { id, title, price, quantity } = props.cartItem;

   const onAddToCartHandler = (e) => {
      e.preventDefault();
      dispatch(cartActions.addItemToCart(props.cartItem));
   };

   const onRemoveFromCartHandler = (e) => {
      e.preventDefault();
      dispatch(cartActions.removeItemFromCart(id));
   };

   return (
      <li className={classes.item}>
         <header>
            <h3>{title}</h3>
            <div className={classes.price}>
               ${+(price * quantity).toFixed(2)}{' '}
               <span className={classes.itemprice}>
                  (${price.toFixed(2)}/item)
               </span>
            </div>
         </header>
         <div className={classes.details}>
            <div className={classes.quantity}>
               x <span>{quantity}</span>
            </div>
            <div className={classes.actions}>
               <button onClick={onRemoveFromCartHandler}>-</button>
               <button onClick={onAddToCartHandler}>+</button>
            </div>
         </div>
      </li>
   );
};

export default CartItem;
