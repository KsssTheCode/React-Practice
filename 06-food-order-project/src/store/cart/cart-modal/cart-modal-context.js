import React from 'react';

const CartModalContext = React.createContext({
   activeCartModal: false,
   openCartModal: () => {},
   hideCartModal: () => {},
});

export default CartModalContext;
