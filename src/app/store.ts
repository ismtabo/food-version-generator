import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';
import dataReducer from "./reducer";

export const store = configureStore({
  reducer: dataReducer,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = (): AppDispatch => useDispatch()