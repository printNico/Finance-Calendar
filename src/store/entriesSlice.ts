import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Entry, EntryType} from "@/lib/types/Entry";
import {DayOfMonth} from "@/lib/Calendar/useDaysOfMonth";
import {RootState} from "@/store/store";

const LOCAL_STORAGE_KEY = 'entries'

const GenerateRandomId = () => {
    return Math.random().toString(36).slice(2, 9)
}

const saveToLocalStorage = (entries: Entry[]) => {
    try {
        const serializedEntries = JSON.stringify(entries)
        localStorage.setItem(LOCAL_STORAGE_KEY, serializedEntries)
    } catch (e) {
        console.error(e)
    }
}

const loadFromLocalStorage = (): EntriesSlice => {
    try {
        if (typeof window === 'undefined') return {entries: []}

        const serializedEntries = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (serializedEntries === null) {
            return {entries: []}
        }

        const parsedEntries = JSON.parse(serializedEntries)
        return {entries: parsedEntries ?? []}
    } catch (e) {
        console.error(e)
        return {entries: []}
    }
}

export type EntriesSlice = {
    entries: Entry[]
}

const entriesSlice = createSlice({
    name: 'entries',
    initialState: loadFromLocalStorage(),
    reducers: {
        addEntry(state, action: PayloadAction<Entry>) {
            const entry = action.payload;
            entry.id = GenerateRandomId()

            state.entries.push(entry)
            saveToLocalStorage(state.entries)
        },
        editEntry(state, action: PayloadAction<Entry>) {
            const entry = action.payload
            const index = state.entries.findIndex(e => e.id === entry.id)
            state.entries[index] = entry
            saveToLocalStorage(state.entries)
        },
        removeEntry(state, action: PayloadAction<Entry>) {
            state.entries = state.entries.filter(entry => entry.id !== action.payload.id)
            saveToLocalStorage(state.entries)
        }
    }
})

export const selectEntriesWithDate = createSelector(
    [
        (state: RootState) => state.entries.entries,
        (state, date: Date) => date
    ],
    (entries, date: Date) => entries.filter(entry => entry.date === date.valueOf())
)


export const selectRecurringEntries = createSelector(
    [
        (state: RootState) => state.entries.entries,
        (state, date?: Date) => date
    ],
    (entries, date?: Date) => {
        return entries.filter(entry => {
            if (entry.type !== EntryType.recurring) return false;
            if (!date) return true;
            return entry.date <= date.valueOf()
        })
    }
)

export const selectEntriesOlderThan = createSelector(
    [
        (state: RootState) => state.entries.entries,
        (state, date: Date) => date
    ], (entries, date: Date) => {
        const monthDate = new Date(date.getFullYear(), date.getMonth(), 1)
        return entries.filter(entry => entry.date <= date.valueOf() && entry.date >= monthDate.valueOf())
    }
)

export const selectEntriesOfMonth = createSelector(
    [
        (state: RootState) => state.entries.entries,
        (state, date: Date) => date
    ],
    (entries, date: Date) => {
        return entries.filter(entry => {
            let entryDate = new Date(entry.date);
            let entryMonth = new Date(entryDate.getFullYear(), entryDate.getMonth() + 1, 0)
            let month = new Date(date.getFullYear(), date.getMonth() + 1, 0)

            return entryMonth.valueOf() === month.valueOf();
        })
    }
)

export const {addEntry, editEntry, removeEntry} = entriesSlice.actions
export default entriesSlice.reducer