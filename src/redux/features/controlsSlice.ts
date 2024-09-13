import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


type Controls = {
  spinner: boolean;
  openAccountForm: boolean;
  editAccount: boolean;
  openPartnerForm: boolean;
  editPartner: boolean;
  openCampaignForm: boolean;
  editCampaign: boolean;
};

const initialState: Controls = {
  spinner: false,
  openAccountForm: false,
  editAccount: false,
  openPartnerForm: false,
  editPartner: false,
  openCampaignForm: false,
  editCampaign: false,
};

export const controlsSlice = createSlice({
  name: "controlsSlice",
  initialState,
  reducers: {
    updateControl: (state, action: PayloadAction<Partial<Controls>>) => {
      state = { ...state, ...action.payload };
      return state;
    },
    clearControls: () => {
      return initialState;
    },
  },
});

export const { updateControl, clearControls } = controlsSlice.actions;

export default controlsSlice.reducer;
