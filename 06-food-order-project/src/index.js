import ReactDOM from 'react-dom/client';
import CartModalProvider from './store/cart/cart-modal/CartModalProvider';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <CartModalProvider>
      <App />
   </CartModalProvider>
);
