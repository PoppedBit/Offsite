import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: undefined,
  navigation: undefined
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.navigation = undefined;
    },
    updateUser: (state, action) => {
      state.user = {
        // @ts-ignore
        ...state.user,
        ...action.payload
      };
    },
    clearUser: (state) => {
      state.user = undefined;
      state.navigation = undefined;
    },
    setNavigation: (state, action) => {
      state.navigation = action.payload;
    }
  }
});

export const { setUser, clearUser, setNavigation, updateUser } = userSlice.actions;

export default userSlice.reducer;
