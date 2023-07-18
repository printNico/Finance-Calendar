"use client"

import Card from "@/components/Basic/Card/Card";
import styled from "styled-components";
import useCurrentMonthStats from "@/lib/Stats/useCurrentMonthStats";
import {ReactElement, useEffect, useState} from "react";
import {formatValue} from "react-currency-input-field";
import useSelectedDayStats from "@/lib/Stats/useSelectedDayStats";
import {IoCalendarNumber, IoCalendarSharp} from "react-icons/io5";

const StyledCard = styled(Card)`
  width: auto;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  justify-content: space-evenly;
  align-items: center;
`


type StatsBarProps = {
    className?: string
}

const StatsBar = (props: StatsBarProps) => {
    const currentMonthStats = useCurrentMonthStats();
    const selectedDayStats = useSelectedDayStats();

    const [endOfMonthTotal, setEndOfMonthTotal] = useState<string>("0 €");
    const [endOfDayTotal, setEndOfDayTotal] = useState<string>("0 €");

    useEffect(() => {
        if (currentMonthStats) {
            const formattedTotal = formatValue({
                value: currentMonthStats.total.toString(),
                suffix: '€',
            })
            setEndOfMonthTotal(formattedTotal)
        }
    }, [currentMonthStats]);

    useEffect(() => {
        if (selectedDayStats) {
            const formattedTotal = formatValue({
                value: selectedDayStats.total.toString(),
                suffix: '€',
            })
            setEndOfDayTotal(formattedTotal)
        }
    }, [selectedDayStats]);

    return (
        <StyledCard className={props.className}>
            <Stat
                title="Total at the end of the month"
                value={endOfMonthTotal}
                Icon={<IoCalendarNumber size="48px" />}
            />

            <Stat
                title="Total at the end of day"
                value={endOfDayTotal}
                Icon={<IoCalendarSharp size="48px" />}
            />
        </StyledCard>
    );
}

const StyledStatIconContainer = styled.div`
    margin-right: 1rem;
`

const StyledStatContentContainer = styled.div`
`

const StyledStatContentTitle = styled.h1`
  font-size: 1.25rem;

`

const StyledStatsContentValue = styled.p`
  font-size: 1.75rem;
  font-weight: 600;
`

const StyledStat = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  
    justify-content: center;
    align-items: center;
`

type StatProps = {
    title: string,
    value: string,
    Icon: ReactElement
}

const Stat = (props: StatProps) => {
    return (
        <StyledStat>
            <StyledStatIconContainer>
                {props.Icon}
            </StyledStatIconContainer>
            <StyledStatContentContainer>
                <StyledStatContentTitle aria-label="Stat Title">
                    {props.title}
                </StyledStatContentTitle>
                <StyledStatsContentValue aria-label="Stat Value">
                    {props.value}
                </StyledStatsContentValue>
            </StyledStatContentContainer>
        </StyledStat>
    )
}

export default StatsBar;