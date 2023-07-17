"use client"

import useDaysOfMonth, {DayOfMonth} from "@/lib/Calendar/useDaysOfMonth";
import CalendarDay from "@/components/Calendar/CalendarDay";
import styled from "styled-components";
import {useTimeSelectionContext} from "@/lib/Calendar/TimeSelectionProvider";

const StyledContainerGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(7, 1fr);

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: repeat(1, 1fr);
  }
`

const StyledCalendarDay = styled(CalendarDay)<{$activeDay: boolean}>`
  grid-column: ${props => props.day.date.getDay()};

  height: 200px
  
  ${props => props.$activeDay && `
    background: red
  `};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-column: 1;
  }
`

type CalendarProps = {}

const Calendar = (props: CalendarProps) => {
    const {selectedDate} = useTimeSelectionContext();
    const days = useDaysOfMonth();

    const isActiveDay = (day: DayOfMonth) => {
        if(!selectedDate) return false;
        return day.date.toDateString() === selectedDate.toDateString();
    }

    return (
        <>
            <StyledContainerGrid>
                {days.map((day, index) =>
                    <StyledCalendarDay
                        key={day.date.toDateString() + index}
                        day={day}
                        $activeDay={isActiveDay(day)}
                    />
                )}
            </StyledContainerGrid>
        </>
    )
}

export default Calendar;