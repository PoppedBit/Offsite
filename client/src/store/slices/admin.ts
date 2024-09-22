import { createSlice } from '@reduxjs/toolkit';
import { User } from 'types/auth';

interface AdminState {
  users: User[] | undefined;
}

const initialState: AdminState = {
  users: undefined,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  }
});

export const {
  setUsers,
} = adminSlice.actions;

export default adminSlice.reducer;
