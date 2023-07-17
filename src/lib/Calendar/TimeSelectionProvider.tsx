"use client"

import {getDaysOfMonth} from "@/lib/Calendar/useDaysOfMonth";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";

type TimeSelectionContext = {
    selectedDate: Date,

    selectYear(year: number): void;
    selectMonth(month: number): void;
    selectDay(day: number): void;

    moveByYear(year: number): void;
    moveByMonth(month: number): void;
    moveByDay(day: number): void;
}

const DefaultTimeSelectionContext: TimeSelectionContext = {
    selectedDate: new Date(),

    selectYear: (year: number) => {
    },
    selectMonth: (month: number) => {
    },
    selectDay: (day: number) => {
    },

    moveByYear: (year: number) => {
    },
    moveByMonth: (month: number) => {
    },
    moveByDay: (day: number) => {
    }
}

const TimeSelectionContext = createContext<TimeSelectionContext>(DefaultTimeSelectionContext);

export const useTimeSelectionContext = () => useContext(TimeSelectionContext);

type TimeSelectionProviderProps = {
    children?: ReactNode;
}

const TimeSelectionProvider = (props: TimeSelectionProviderProps) => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    // Time-manipulation methods
    const selectYear = (year: number) => {
        if(year < 1970 || year > 2100) return;

        const date = new Date(selectedDate);
        date.setFullYear(year);
        setSelectedDate(date);
    }

    const selectMonth = (month: number) => {
        if(month < 1 || month > 12) return;

        const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth());
        date.setMonth(month - 1);

        if(getDaysOfMonth(date) < selectedDate.getDate())
            date.setDate(getDaysOfMonth(date))
        else
            date.setDate(selectedDate.getDate())

        setSelectedDate(date);
    }

    const selectDay = (day: number) => {
        if (day < 1 || day > 31) return;

        const date = new Date(selectedDate);
        date.setDate(day);
        setSelectedDate(date);
    }

    const moveByYear = (year: number) => {
        const date = new Date(selectedDate);
        date.setFullYear(date.getFullYear() + year);

        setSelectedDate(date);
    }

    const moveByMonth = (month: number) => {
        const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth());
        date.setMonth(date.getMonth() + month);

        if(getDaysOfMonth(date) < selectedDate.getDate())
            date.setDate(getDaysOfMonth(date))
        else
            date.setDate(selectedDate.getDate())

        setSelectedDate(date);
    }

    const moveByDay = (day: number) => {
        const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
        date.setDate(date.getDate() + day);

        setSelectedDate(date);
    }

    const ProviderValues: TimeSelectionContext = {
        selectedDate,

        selectYear,
        selectMonth,
        selectDay,

        moveByYear,
        moveByMonth,
        moveByDay
    }

    return (
        <>
            <TimeSelectionContext.Provider value={ProviderValues}>
                {props.children}
            </TimeSelectionContext.Provider>
        </>
    )
}

export default TimeSelectionProvider;