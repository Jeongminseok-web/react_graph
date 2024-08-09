import { configureStore } from '@reduxjs/toolkit';
import apiReducer from './slices/ApiSlice';

const store = configureStore({
  reducer: {
    api: apiReducer,
  },
});

export default store;
