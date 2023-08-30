import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import AuthReducer from './Reducers/AuthReducer';

export const Store = configureStore({
  reducer: {
    AuthReducer: AuthReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
