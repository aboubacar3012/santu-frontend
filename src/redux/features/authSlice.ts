import { Account } from '@/src/types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type Auth = {
  token?: string | null;
};

let initialState: Auth = {
  token: null,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      return state;
    },
  },
});

export const { updateToken } = authSlice.actions;

export default authSlice.reducer;
