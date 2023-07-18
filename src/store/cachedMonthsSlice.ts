import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DayOfMonth} from "@/lib/Calendar/useDaysOfMonth";
import {RootState} from "@/store/store";
import {MonthStats} from "@/lib/types/MonthStats";

const LOCAL_STORAGE_KEY = 'months'

const GenerateRandomId = () => {
    return Math.random().toString(36).slice(2, 9)
}

const saveToLocalStorage = (entries: MonthStats[]) => {
    try {
        const serializedEntries = JSON.stringify(entries)
        localStorage.setItem(LOCAL_STORAGE_KEY, serializedEntries)
    } catch (e) {
        console.error(e)
    }
}

const loadFromLocalStorage = (): CachedMonthsSlice => {
    try {
        if (typeof window === 'undefined') return {months: []}

        const serializedEntries = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (serializedEntries === null) {
            return {months: []}
        }

        const parsedEntries = JSON.parse(serializedEntries)
        return {months: parsedEntries ?? []}
    } catch (e) {
        console.error(e)
        return {months: []}
    }
}

export type CachedMonthsSlice = {
    months: MonthStats[]
}

const cachedMonthsSlice = createSlice({
    name: 'cachedMonths',
    initialState: loadFromLocalStorage(),
    reducers: {
        addMonth(state, action: PayloadAction<MonthStats>) {
            const month = action.payload;
            month.id = GenerateRandomId()

            state.months.push(month)
            saveToLocalStorage(state.months)
        },
        updateMonth(state, action: PayloadAction<MonthStats>) {
            const month = action.payload
            const index = state.months.findIndex(e => e.id === month.id)
            state.months[index] = month
            saveToLocalStorage(state.months)
        },
        removeMonth(state, action: PayloadAction<MonthStats>) {
            state.months = state.months.filter(entry => entry.id !== action.payload.id)
            saveToLocalStorage(state.months)
        }
    }
})

export const selectCurrentCachedMonth = createSelector(
    [
        (state: RootState) => state.cachedMonths.months,
        (state, date: Date) => date
    ],
    (cachedMonths, date: Date) => {
        let currentMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)
        return cachedMonths.find(entry => entry.date === currentMonth.valueOf())
    }
);

export const selectPreviousCachedMonth = createSelector(
    [
        (state: RootState) => state.cachedMonths.months,
        (state, date: Date) => date
    ],
    (cachedMonths, date: Date) => {
        let currentMonth = new Date(date.getFullYear(), date.getMonth(), 0)
        return cachedMonths.find(entry => entry.date === currentMonth.valueOf())
    }
);

export const {addMonth, updateMonth, removeMonth} = cachedMonthsSlice.actions
export default cachedMonthsSlice.reducer