import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  username: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        ...action.payload
      };
    },
    clearUser: (state) => {
      state = {
        ...initialState
      };
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
