import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './counter';
import authReducer from './auth';

const store = configureStore({
   reducer: { counter: counterReducer, auth: authReducer },
});
//reducer가 여러개일 경우 reducer의 밸류값은 {}로 하여 여러개 병합하도록 함

export default store;
