"use client"

import {useTimeSelectionContext} from "@/lib/Calendar/TimeSelectionProvider";
import Card from "@/components/Basic/Card/Card";
import styled from "styled-components";
import {
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight
} from "react-icons/md";
import IconButton from "@/components/Basic/Button/IconButton";
import {IconContext} from "react-icons";

const StyledCardTimeSelector = styled(Card)`
  width: auto;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  justify-content: center;
  align-items: center;
`

const StyledButton = styled(IconButton)`
  margin-inline: 4px;
`

type TimeSelectorProps = {
    className?: string
}

const TimeSelector = (props: TimeSelectorProps) => {
    const {selectedDate, moveByMonth, moveByDay} = useTimeSelectionContext();

    return (
        <StyledCardTimeSelector className={props.className}>
            <IconContext.Provider value={{size: '24px'}}>
                <StyledButton
                    Icon={<MdKeyboardDoubleArrowLeft/>}
                    onClick={() => moveByMonth(-1)}
                />
                <StyledButton
                    Icon={<MdKeyboardArrowLeft/>}
                    onClick={() => moveByDay(-1)}
                />
                {selectedDate?.toDateString()}
                <StyledButton
                    Icon={<MdKeyboardArrowRight/>}
                    onClick={() => moveByDay(1)}
                />
                <StyledButton
                    Icon={<MdKeyboardDoubleArrowRight/>}
                    onClick={() => moveByMonth(1)}
                />
            </IconContext.Provider>
        </StyledCardTimeSelector>
    )
}

export default TimeSelector;