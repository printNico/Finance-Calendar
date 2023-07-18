import {configureStore} from "@reduxjs/toolkit";
import entriesSlice from "@/store/entriesSlice";
import cachedMonthsSlice from "@/store/cachedMonthsSlice";

export const store = configureStore({
    reducer: {
        entries: entriesSlice,
        cachedMonths: cachedMonthsSlice
    },
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch