import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const initialState = {
  userData: false,
  error: '',
  status: '',
};

const ScreenReducer = createSlice({
  name: 'screenReducer',
  // initialState,
  initialState,
  reducers: {
    otpScreen: (state, action) => {
      state.userData = action.payload;
    },
    removeOtpScreen: (state, action) => {
      state.userData = false;
    },
  },
});

export default ScreenReducer.reducer;
export const {otpScreen, removeOtpScreen} = ScreenReducer.actions;
