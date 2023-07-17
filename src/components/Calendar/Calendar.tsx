"use client"

import useDaysOfMonth, {DayOfMonth} from "@/lib/Calendar/useDaysOfMonth";
import CalendarDay from "@/components/Calendar/CalendarDay";
import styled from "styled-components";
import {useTimeSelectionContext} from "@/lib/Calendar/TimeSelectionProvider";

const StyledContainerGrid = styled.div`
  display: grid;

  gap: 10px;
  grid-template-columns: repeat(7, minmax(0, 1fr));

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`

const StyledCalendarDay = styled(CalendarDay)<{$activeDay: boolean}>`
  grid-column: ${props => props.day.date.getDay()};

  aspect-ratio: 1/1;
  
  ${props => props.$activeDay && `
    border-color: ${props.theme.colors.primary}
  `};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-column: 1;
  }
`

type CalendarProps = {}

const Calendar = (props: CalendarProps) => {
    const {selectedDate, selectDay} = useTimeSelectionContext();
    const days = useDaysOfMonth();

    const isActiveDay = (day: DayOfMonth) => {
        if(!selectedDate) return false;
        return day.date.toDateString() === selectedDate.toDateString();
    }

    const setActiveDay = (day: DayOfMonth) => {
        selectDay(day.date.getDate())
    }

    return (
        <>
            <StyledContainerGrid>
                {days.map((day, index) =>
                    <StyledCalendarDay
                        key={day.date.toDateString() + index}
                        day={day}
                        onClick={() => setActiveDay(day)}
                        $activeDay={isActiveDay(day)}
                    />
                )}
            </StyledContainerGrid>
        </>
    )
}

export default Calendar;