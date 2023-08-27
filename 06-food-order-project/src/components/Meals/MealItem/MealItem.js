import { useContext } from 'react';
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cart/cart-context';

import classes from './MealItem.module.css';

const MealItem = (props) => {
   const cartContext = useContext(CartContext);
   const price = `$${props.price}`;

   const addToCartHandler = (amount) => {
      cartContext.addItem({
         id: props.id,
         name: props.name,
         amount: amount,
         price: props.price,
      });
   };
   return (
      <li className={classes.meal}>
         <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{price}</div>
         </div>
         <div>
            <MealItemForm onAddItem={addToCartHandler} />
         </div>
      </li>
   );
};

export default MealItem;
