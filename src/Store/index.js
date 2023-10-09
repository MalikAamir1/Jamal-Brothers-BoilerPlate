import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import AuthReducer from './Reducers/AuthReducer';
import ScreenReducer from './Reducers/ScreenReducer';

export const Store = configureStore({
  reducer: {
    AuthReducer: AuthReducer,
    ScreenReducer: ScreenReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
