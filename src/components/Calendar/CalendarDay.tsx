import Card from "@/components/Basic/Card/Card";
import styled from "styled-components";
import {DayOfMonth} from "@/lib/Calendar/useDaysOfMonth";
import IconButton from "@/components/Basic/Button/IconButton";
import {MdAddCircleOutline} from "react-icons/md";

const StyledContentContainer = styled.div`

`

const StyledActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;

  opacity: 0.1;
`

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 5px;

  &:hover {
    ${StyledActionsContainer} {
      opacity: 1;
    }
  }
`

type CalendarDayProps = {
    day: DayOfMonth
    className?: string;
    onClick?: () => void;
}

const CalendarDay = (props: CalendarDayProps) => {
    const onCardClickEvent = () => {
        if (props.onClick) props.onClick();
    }

    const onAddButtonClickEvent = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
    }

    return (
        <>
            <StyledCard
                className={props.className}
                onClick={onCardClickEvent}
            >
                <StyledContentContainer>
                    {props.day.date.getDate()}
                </StyledContentContainer>
                <StyledActionsContainer>
                    <IconButton
                        Icon={<MdAddCircleOutline size='24px'/>}
                        onClick={onAddButtonClickEvent}
                    />
                </StyledActionsContainer>
            </StyledCard>
        </>
    )
}

export default CalendarDay;