import { Account } from '@/src/types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type Auth = {
  token?: string | null;
  loggedAccountInfos?: Account | null;
};

let initialState: Auth = {
  token: null,
  loggedAccountInfos: null,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      return state;
    },
    updateLoggedAccountInfos: (state, action: PayloadAction<Account>) => {
      state.loggedAccountInfos = action.payload;
      return state;
    },
  },
});

export const { updateToken, updateLoggedAccountInfos } = authSlice.actions;

export default authSlice.reducer;
