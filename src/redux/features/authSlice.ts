
import { Account } from "@/src/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Auth = {
  isAuthenticated?: boolean;
  loggedAccountInfos?: Account | null;
  token?: string | null;
};

let initialState: Auth = {
  isAuthenticated: false,
  loggedAccountInfos: null,
  token: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
      return state;
    },
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      return state;
    },
    loginReducer: (state, action: PayloadAction<Auth>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      if (action.payload.loggedAccountInfos) {
        state.loggedAccountInfos = action.payload.loggedAccountInfos;
      }
      return state;
    },
    
    logout: () => {
      return initialState;
    },
  },
});

export const { 
  loginReducer, 
  logout, 
  setIsAuthenticated, 
  updateToken, 
} = authSlice.actions;

export default authSlice.reducer;
