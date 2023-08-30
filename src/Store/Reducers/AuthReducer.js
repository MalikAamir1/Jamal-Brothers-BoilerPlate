import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const initialState = {
  userData: {},
  error: '',
  status: '',
};

const AuthReducer = createSlice({
  name: 'authReducer',
  // initialState,
  initialState,
  reducers: {
    userDataFromAsyncStorage: (state, action) => {
      state.userData = action.payload;
    },
    removeUserDataFromAsyncStorage: (state, action) => {
      state.userData = {};
    },
  },
});

export default AuthReducer.reducer;
export const {userDataFromAsyncStorage, removeUserDataFromAsyncStorage} =
  AuthReducer.actions;
