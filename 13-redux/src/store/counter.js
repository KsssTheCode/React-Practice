import { createSlice } from '@reduxjs/toolkit';

const initialCounterState = { counter: 0, showCounter: true };
const counterSlice = createSlice({
   name: 'counter',
   initialState: initialCounterState,
   reducers: {
      increaseOne(state) {
         state.counter++;
      },
      increaseFive(state) {
         state.counter = state.counter + 5;
      },
      decreaseOne(state) {
         state.counter--;
      },
      decreaseFive(state) {
         state.counter = state.counter - 5;
      },
      calculateInput(state, action) {
         state.counter = state.counter + +action.payload;
      },
      initialize(state) {
         state.counter = 0;
      },
      toggle(state) {
         state.showCounter = !state.showCounter;
      },
   },
});

export const counterActions = counterSlice.actions;
export default counterSlice.reducer;
