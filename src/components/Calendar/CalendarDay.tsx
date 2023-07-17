import Card from "@/components/Basic/Card/Card";
import styled from "styled-components";
import {DayOfMonth} from "@/lib/Calendar/useDaysOfMonth";
import IconButton from "@/components/Basic/Button/IconButton";
import {MdAddCircleOutline} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import {addEntry, selectEntriesWithDate} from "@/store/entriesSlice";
import {Entry} from "@/lib/types/Entry";
import {RootState} from "@/store/store";
import AddEntryDialog from "@/components/Calendar/AddEntryDialog";
import {useState} from "react";
import {readableColor} from "polished";

const StyledHeaderContainer = styled.div`
  font-size: .8rem;
  font-weight: 600;

  color: ${props => props.theme.colors.noColor};
  
  margin-bottom: .4rem;
`

const StyledContentContainer = styled.div`

`

const StyledAddButton = styled(IconButton)`
  transition: opacity 0.5s ease-out;
  
  opacity: 0;

  &:hover {
    opacity: 1 !important;
  }
`

const StyledActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
`

const StyledCardCalendar = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: .5rem;

  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 5px;

  &:hover {
    ${StyledAddButton} {
      opacity: 0.4;
    }
  }
`



const StyledDayEntry = styled.div<{ $color: string }>`
  background: ${props => props.$color};
  color: ${props => readableColor(props.$color)};

  border-radius: 5px;

  height: 1rem;
  overflow: hidden;

  font-size: .8rem;
  font-weight: 600;

  padding: .25rem;
  margin-bottom: .25rem;
`

type CalendarDayProps = {
    day: DayOfMonth
    className?: string;
    onClick?: () => void;
}

const CalendarDay = (props: CalendarDayProps) => {
    const dispatch = useDispatch();
    const entries = useSelector((state: RootState) => selectEntriesWithDate(state, props.day));

    const [showCreationDialog, setShowCreationDialog] = useState(false);

    const onCardClickEvent = () => {
        if (props.onClick) props.onClick();
    }

    const onAddButtonClickEvent = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        setShowCreationDialog(true);
    }

    const onAddEntryEvent = (entry: Entry) => {
        entry.date = props.day.date.valueOf();
        dispatch(addEntry(entry));
        setShowCreationDialog(false)
    }

    return (
        <>
            <AddEntryDialog
                show={showCreationDialog}
                onAdd={onAddEntryEvent}
                onClose={() => setShowCreationDialog(false)}
            />
            <StyledCardCalendar
                className={props.className}
                onClick={onCardClickEvent}
            >
                <div>
                    <StyledHeaderContainer>
                        {props.day.date.getDate()}.
                    </StyledHeaderContainer>
                    <StyledContentContainer>
                        {entries.map((entry, index) =>
                            <StyledDayEntry $color={entry.color} key={index}>
                                {entry.title}
                            </StyledDayEntry>
                        )}
                    </StyledContentContainer>
                </div>
                <StyledActionsContainer>
                    <StyledAddButton
                        Icon={<MdAddCircleOutline size='24px'/>}
                        onClick={onAddButtonClickEvent}
                    />
                </StyledActionsContainer>
            </StyledCardCalendar>
        </>
    )
}

export default CalendarDay;