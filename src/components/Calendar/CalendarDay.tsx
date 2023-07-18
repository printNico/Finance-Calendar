import Card from "@/components/Basic/Card/Card";
import styled from "styled-components";
import {DayOfMonth} from "@/lib/Calendar/useDaysOfMonth";
import IconButton from "@/components/Basic/Button/IconButton";
import {MdAddCircleOutline} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import {addEntry, editEntry, removeEntry, selectEntriesWithDate} from "@/store/entriesSlice";
import {Entry} from "@/lib/types/Entry";
import {RootState} from "@/store/store";
import AddEntryDialog from "@/components/Calendar/AddEntryDialog";
import {useState} from "react";
import {readableColor} from "polished";
import EditEntryDialog from "@/components/Calendar/EditEntryDialog";
import useEntriesForDay from "@/lib/Calendar/useEntriesForDay";

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

  &:hover {
    ${StyledAddButton} {
      opacity: 0.4;
    }
  }
`

const StyledDayEntry = styled.div<{ $color: string }>`
  background: ${props => props.$color};
  color: ${props => readableColor(props.$color)};

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
    const entries = useEntriesForDay(props.day);

    const [showCreationDialog, setShowCreationDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState<Entry | undefined>(undefined);

    const onCardClickEvent = () => {
        if (props.onClick) props.onClick();
    }

    const onAddButtonClickEvent = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        setShowCreationDialog(true);
    }

    const onEditButtonClickEvent = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, entry: Entry) => {
        event.stopPropagation();
        setShowEditDialog(entry);
    }

    const onEditEntryEvent = (entry: Entry) => {
        dispatch(editEntry(entry));
        setShowEditDialog(undefined);
    }

    const onRemoveEntryEvent = (entry: Entry) => {
        dispatch(removeEntry(entry));
        setShowEditDialog(undefined);
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

            <EditEntryDialog
                show={showEditDialog !== undefined}
                entry={showEditDialog!}
                onClose={() => setShowEditDialog(undefined)}
                onEdit={onEditEntryEvent}
                onRemove={onRemoveEntryEvent}
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
                            <StyledDayEntry
                                $color={entry.color}
                                key={index}
                                onClick={(event) => onEditButtonClickEvent(event, entry)}
                            >
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