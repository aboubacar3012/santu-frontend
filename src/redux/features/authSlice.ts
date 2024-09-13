
import { Campaign, Partner, Account } from "@/src/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Auth = {
  isAuthenticated?: boolean;
  loggedAccountInfos?: Account | null;
  token?: string;
  userToEdit?: Partial<Account> | null;
  partnerToEdit?: Partial<Partner> | null;
  campaignToEdit?: Partial<Campaign> | null;
};

let initialState: Auth = {
  isAuthenticated: false,
  loggedAccountInfos: null,
  userToEdit: null,
  partnerToEdit: null,
  campaignToEdit: null,
  token: "",
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
    updateAccountToEdit: (state, action: PayloadAction<Partial<Account>>) => {
      state.userToEdit = action.payload;
      return state;
    },
    updatePartnerToEdit: (state, action: PayloadAction<Partial<Partner>>) => {
      state.partnerToEdit = action.payload;
      return state;
    },
    updateCampaignToEdit: (state, action: PayloadAction<Partial<Campaign>>) => {
      state.campaignToEdit = action.payload;
      return state;
    },

    logout: () => {
      return initialState;
    },
    resetAccountToEdit: (state) => {
      state.userToEdit = null;
      return state;
    },
    resetPartnerToEdit: (state) => {
      state.partnerToEdit = null;
      return state;
    },
    resetCampaignToEdit: (state) => {
      state.campaignToEdit = null;
      return state;
    }
  },
});

export const { 
  loginReducer, 
  logout, 
  setIsAuthenticated, 
  updateToken, 
  updateAccountToEdit, 
  updatePartnerToEdit, 
  updateCampaignToEdit,
  resetAccountToEdit, 
  resetPartnerToEdit,
  resetCampaignToEdit,
} = authSlice.actions;

export default authSlice.reducer;
