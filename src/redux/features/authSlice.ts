
import { Campaign, Partner, User } from "@/src/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Auth = {
  isAuthenticated?: boolean;
  loggedUserInfos?: User | null;
  token?: string;
  userToEdit?: Partial<User> | null;
  partnerToEdit?: Partial<Partner> | null;
  campaignToEdit?: Partial<Campaign> | null;
};

let initialState: Auth = {
  isAuthenticated: false,
  loggedUserInfos: null,
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
      if (action.payload.loggedUserInfos) {
        state.loggedUserInfos = action.payload.loggedUserInfos;
      }
      return state;
    },
    updateUserToEdit: (state, action: PayloadAction<Partial<User>>) => {
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
    resetUserToEdit: (state) => {
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
  updateUserToEdit, 
  updatePartnerToEdit, 
  updateCampaignToEdit,
  resetUserToEdit, 
  resetPartnerToEdit,
  resetCampaignToEdit,
} = authSlice.actions;

export default authSlice.reducer;
