import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {selectPreviousCachedMonth} from "@/store/cachedMonthsSlice";
import {selectEntriesOlderThan, selectRecurringEntries} from "@/store/entriesSlice";
import {Entry, EntryAction} from "@/lib/types/Entry";
import {useEffect, useState} from "react";
import {DayStats} from "@/lib/types/DayStats";
import {useTimeSelectionContext} from "@/lib/Calendar/TimeSelectionProvider";

const useSelectedDayStats = (): DayStats | undefined => {
    const {selectedDate} = useTimeSelectionContext();
    const previousMonth = useSelector((state: RootState) => selectPreviousCachedMonth(state, selectedDate))

    const entriesOlderThan = useSelector((state: RootState) => selectEntriesOlderThan(state, selectedDate))
    const recurringEntriesOfMonth = useSelector((state: RootState) => selectRecurringEntries(state, selectedDate))

    const [dayStatsResult, setDayStatsResult] = useState<DayStats | undefined>(undefined);

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

    const getRelevantRecurringEntriesOfMonth = (recurringEntries: Entry[], selectedDate: Date) => {
        const relevantEntries: Entry[] = [];
        const daysOfMonth = selectedDate.getDate();

        for (let i = 1; i <= daysOfMonth; i++) {
            const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i);
            const relevantEntriesOfDay = getRelevantRecurringEntriesOfDay(recurringEntries, date);
            relevantEntries.push(...relevantEntriesOfDay);
        }

        return relevantEntries;
    }

    const calculateDayTotal = (relevantEntries: Entry[]) => {
        const previousTotal = previousMonth?.total ?? 0;

        const currentTotal = relevantEntries
            .map(x => (x.amount * (x.action === EntryAction.additive ? 1 : -1)))
            .reduce((a, b) => a + b, previousTotal);

        return Math.round(currentTotal * 100) / 100;
    }

    const relevantRecurringEntries = getRelevantRecurringEntriesOfMonth(recurringEntriesOfMonth, selectedDate);
    const relevantEntries = entriesOlderThan.concat(relevantRecurringEntries)

    useEffect(() => {
        const calculatedTotal = calculateDayTotal(relevantEntries);
        const dayStats: DayStats = {
            date: selectedDate.valueOf(),
            total: calculatedTotal
        }

        setDayStatsResult(dayStats)
    }, [selectedDate])

    return dayStatsResult;
}

export default useSelectedDayStats;