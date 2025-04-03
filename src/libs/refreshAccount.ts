import { Dispatch } from "@reduxjs/toolkit";
import { getAccountById } from "../services/account";
// import { loginReducer, updateToken } from "../redux/features/authSlice";

export const refreshAccount = async (dispatch: Dispatch, accountId: string, token: string) => {
    getAccountById(accountId, token).then((data) => {
      if (data.success) {
        // dispatch(loginReducer({ isAuthenticated: true, loggedAccountInfos: data.account }))
      }
    }).catch((error) => {
      throw new Error(error);
    });
}