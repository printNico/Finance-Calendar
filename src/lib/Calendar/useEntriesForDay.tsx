import {DayOfMonth} from "@/lib/Calendar/useDaysOfMonth";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {selectEntriesWithDate, selectRecurringEntries} from "@/store/entriesSlice";
import {Entry} from "@/lib/types/Entry";

const useEntriesForDay = (day: DayOfMonth) => {
    const entries = useSelector((state: RootState) => selectEntriesWithDate(state, day));
    const recurringEntries = useSelector((state: RootState) => selectRecurringEntries(state, day));

    const getRelevantRecurringEntries = (recurringEntries: Entry[]): Entry[] => {
        const relevantEntries: Entry[] = [];
        const currentDate = day.date;

        for (const entry of recurringEntries) {
            let isFound = false;
            let iterationDate = new Date(entry.date);

            while ((currentDate > iterationDate) && !isFound) {
                iterationDate.setDate(iterationDate.getDate() + entry.frequency + 1)

                if (currentDate.valueOf() === iterationDate.valueOf()) {
                    relevantEntries.push(entry);
                    isFound = true;
                }
            }
        }

        return relevantEntries;
    }

    const relevantRecurringEntries = getRelevantRecurringEntries(recurringEntries)
    return entries.concat(relevantRecurringEntries);
}

export default useEntriesForDay;