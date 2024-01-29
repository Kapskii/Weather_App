import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { weatherSlice } from "./weatherSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const rootReducer = combineSlices(weatherSlice);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
