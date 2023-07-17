import {useTimeSelectionContext} from "@/lib/Calendar/TimeSelectionProvider";
import {useEffect, useState} from "react";

export type DayOfMonth = {
    date: Date;
}

const useDaysOfMonth = (): DayOfMonth[] => {
    const {selectedDate} = useTimeSelectionContext();
    const [daysOfMonth, setDaysOfMonth] = useState<DayOfMonth[]>([]);

    const pushToArray = (item: DayOfMonth) => {
        setDaysOfMonth(prevState => [...prevState, item])
    }

    useEffect(() => {
        // Reset to empty on every trigger
        setDaysOfMonth([])

        const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0)
        const daysOfMonthCount = date.getDate();

        for (let i = 1; i <= daysOfMonthCount; i++) {
            const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i);
            pushToArray({date});
        }
    }, [selectedDate]);

    return daysOfMonth;
}

export const getDaysOfMonth = (date: Date): number => {
    const tempDate = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    return tempDate.getDate();
}

export default useDaysOfMonth;