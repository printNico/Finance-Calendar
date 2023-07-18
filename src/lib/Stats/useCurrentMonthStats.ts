import {useTimeSelectionContext} from "@/lib/Calendar/TimeSelectionProvider";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {addMonth, selectCurrentCachedMonth, selectPreviousCachedMonth, updateMonth} from "@/store/cachedMonthsSlice";
import {MonthStats} from "@/lib/types/MonthStats";
import {selectEntriesOfMonth, selectRecurringEntries} from "@/store/entriesSlice";
import {useEffect, useState} from "react";
import {Entry, EntryAction} from "@/lib/types/Entry";

const useCurrentMonthStats = (): MonthStats | undefined => {
    const {selectedDate} = useTimeSelectionContext();
    const dispatch = useDispatch();

    const currentMonth = useSelector((state: RootState) => selectCurrentCachedMonth(state, selectedDate))
    const previousMonth = useSelector((state: RootState) => selectPreviousCachedMonth(state, selectedDate))

    const entriesOfMonth = useSelector((state: RootState) => selectEntriesOfMonth(state, selectedDate))
    const recurringEntriesOfMonth = useSelector((state: RootState) => selectRecurringEntries(state, selectedDate))

    const getRelevantRecurringEntriesOfDay = (recurringEntries: Entry[], date: Date): Entry[] => {
        const relevantEntries: Entry[] = [];

        for (const entry of recurringEntries) {
            let isFound = false;
            let iterationDate = new Date(entry.date);

            while ((date > iterationDate) && !isFound) {
                iterationDate.setDate(iterationDate.getDate() + entry.frequency + 1)

                if (date.valueOf() === iterationDate.valueOf()) {
                    relevantEntries.push(entry);
                    isFound = true;
                }
            }
        }

        return relevantEntries;
    }

    const getRelevantRecurringEntriesOfMonth = (recurringEntries: Entry[], currentMonth: Date) => {
        const relevantEntries: Entry[] = [];
        const daysOfMonth = currentMonth.getDate();

        for (let i = 1; i <= daysOfMonth; i++) {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
            const relevantEntriesOfDay = getRelevantRecurringEntriesOfDay(recurringEntries, date);
            relevantEntries.push(...relevantEntriesOfDay);
        }

        return relevantEntries;
    }

    const calculateMonthTotal = (relevantEntries: Entry[]) => {
        const previousTotal = previousMonth?.total ?? 0;

        const currentTotal = relevantEntries
            .map(x => (x.amount * (x.action === EntryAction.additive ? 1 : -1)))
            .reduce((a, b) => a + b, previousTotal);

        return Math.round(currentTotal * 100) / 100;
    }

    const addOrUpdateMonth = (monthStats: MonthStats) => {
        if (currentMonth) {
            dispatch(updateMonth(monthStats));
        } else {
            dispatch(addMonth(monthStats));
        }
    }

    const currentMonthDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);

    const relevantRecurringEntries = getRelevantRecurringEntriesOfMonth(recurringEntriesOfMonth, currentMonthDate);
    const relevantEntries = entriesOfMonth.concat(relevantRecurringEntries)

    useEffect(() => {
        const calculatedTotal = calculateMonthTotal(relevantEntries);
        const monthStats: MonthStats = {
            id: currentMonth?.id ?? '',
            date: currentMonthDate.valueOf(),
            total: calculatedTotal
        }

        addOrUpdateMonth(monthStats);
    }, [selectedDate, entriesOfMonth])

    return currentMonth;
}

export default useCurrentMonthStats;