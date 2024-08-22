// Store is a small temporary database in between the servers and the apps

import { configureStore } from "@reduxjs/toolkit";
import { reducer } from '../slices/RootSlice';

export const store = configureStore({
    reducer,
    devTools: true,
    });

    export default store;