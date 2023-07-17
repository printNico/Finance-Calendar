import Card from "@/components/Basic/Card/Card";
import styled from "styled-components";
import {DayOfMonth} from "@/lib/Calendar/useDaysOfMonth";

const StyledCard = styled(Card)`
	outline: 1px solid white;
`

type CalendarDayProps = {
	className?: string;
	day: DayOfMonth
}

const CalendarDay = (props: CalendarDayProps) => {
	return (
		<>
			<StyledCard className={props.className}>
				{props.day.date.getDate()}
			</StyledCard>
		</>
	)
}

export default CalendarDay;