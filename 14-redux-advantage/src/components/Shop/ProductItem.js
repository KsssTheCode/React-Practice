import { useDispatch } from 'react-redux';

import { cartActions } from '../../store/cart-slice';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';

const ProductItem = (props) => {
   const dispatch = useDispatch();

   const onAddToCartHandler = (e) => {
      e.preventDefault();
      dispatch(
         cartActions.addItemToCart({
            id: props.id,
            title: props.title,
            price: props.price,
         })
      );
   };

   return (
      <li className={classes.item}>
         <Card>
            <header>
               <h3>{props.title}</h3>
               <div className={classes.price}>${props.price.toFixed(2)}</div>
            </header>
            <p>{props.description}</p>
            <div className={classes.actions}>
               <button onClick={onAddToCartHandler}>Add to Cart</button>
            </div>
         </Card>
      </li>
   );
};

export default ProductItem;
