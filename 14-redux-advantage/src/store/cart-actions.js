import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

export const getCartData = () => {
   return async (dispatch) => {
      const getRequest = async () => {
         const response = await fetch(
            'https://food-order-53539-default-rtdb.firebaseio.com/cart.json'
         );

         if (!response.ok) throw new Error('Getting cart data failed');

         const cartData = await response.json();
         return cartData;
      };

      try {
         const cartData = await getRequest();

         dispatch(
            cartActions.replaceCart({
               items: cartData || [],
            })
         );
      } catch (err) {
         dispatch(
            uiActions.showNotification({
               status: 'error',
               title: 'Error occurred',
               message: 'Getting cart data failed',
            })
         );
      }
   };
};

export const sendCartData = (cartItems) => {
   return async (dispatch) => {
      dispatch(
         uiActions.showNotification({
            status: 'sending',
            title: 'Sending...',
            message: 'Sending cart data',
         })
      );

      const sendRequest = async () => {
         const response = await fetch(
            'https://food-order-53539-default-rtdb.firebaseio.com/cart.json',
            {
               method: 'PUT',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(cartItems),
            }
         );
         if (!response.ok) throw new Error('Sending cart data failed');
      };
      try {
         await sendRequest();

         dispatch(
            uiActions.showNotification({
               status: 'success',
               title: 'Success!',
               message: 'Sending cart data succesfully',
            })
         );
      } catch (err) {
         dispatch(
            uiActions.showNotification({
               status: 'error',
               title: 'Error occurred',
               message: 'Sending cart data failed',
            })
         );
      }
   };
};
