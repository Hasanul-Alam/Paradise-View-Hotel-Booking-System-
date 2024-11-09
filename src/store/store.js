// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './authSlice';
import authReducer from '../features/auth/authSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
