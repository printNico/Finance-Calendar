import {configureStore} from "@reduxjs/toolkit";
import entriesSlice from "@/store/entriesSlice";

export const store = configureStore({
    reducer: {
        entries: entriesSlice
    },
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch