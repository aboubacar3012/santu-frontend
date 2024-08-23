import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import controlsSlice from "./features/controlsSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import authSlice from "./features/authSlice";

const rootReducer = combineReducers({
  controls: controlsSlice,
  auth: authSlice,
});

const persistConfig = {
  key: "santupro_v0.1.1",
  storage,
};

// persist all slices
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

 

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;