import { useSelector, useDispatch } from 'react-redux';

import { uiActions } from '../../store/ui-slice';

import classes from './CartButton.module.css';

const CartButton = (props) => {
   const { items } = useSelector((state) => state.cart);
   let totalQuantity = 0;

   items.map((item) => (totalQuantity += item.quantity));

   const dispatch = useDispatch();

   const toggleCartHandler = () => {
      dispatch(uiActions.toggle());
   };
   return (
      <button className={classes.button} onClick={toggleCartHandler}>
         <span>My Cart</span>
         <span className={classes.badge}>{totalQuantity}</span>
      </button>
   );
};

export default CartButton;
