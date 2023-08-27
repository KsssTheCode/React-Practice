import React, { useContext } from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartModalContext from './store/cart/cart-modal/cart-modal-context';
import CartProvider from './store/cart/CartProvider';

function App() {
   const cartModalContext = useContext(CartModalContext);
   return (
      <CartProvider>
         {cartModalContext.activeCartModal && <Cart />}
         <Header />
         <main>
            <Meals />
         </main>
      </CartProvider>
   );
}

export default App;
