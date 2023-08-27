import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
   name: 'cart',
   initialState: {
      items: [],
      changed: false,
   },
   reducers: {
      addItemToCart(state, action) {
         const addedItem = action.payload;
         const existingItem = state.items.find(
            (item) => item.id === addedItem.id
         );

         existingItem
            ? (existingItem.quantity = existingItem.quantity + 1)
            : state.items.push({
                 id: addedItem.id,
                 price: addedItem.price,
                 title: addedItem.title,
                 quantity: 1,
              });
         state.changed = true;
      },
      removeItemFromCart(state, action) {
         const id = action.payload;
         const existingItem = state.items.find((item) => item.id === id);
         existingItem.quantity === 1
            ? (state.items = state.items.filter((item) => item.id !== id))
            : existingItem.quantity--;
         state.changed = true;
      },
      replaceCart(state, action) {
         state.items = action.payload.items;
      },
   },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
