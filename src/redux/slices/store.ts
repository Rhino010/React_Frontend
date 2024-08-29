import { configureStore } from "@reduxjs/toolkit";
import {reducer} from '../slices/RootSlice';

export const store = configureStore({
    reducer: reducer,
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;